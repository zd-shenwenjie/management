import fs from 'fs-extra';
import path from 'path';
import * as grpc from '@grpc/grpc-js';
import { ServiceManagerService, IServiceManagerServer } from '../lib/proto/manager_grpc_pb';
import { NetworkManagerService, INetworkManagerServer } from '../lib/proto/networkif_grpc_pb';
import * as handler from './grpc.handler';
import logger from '../lib/utils/logger';
import { BlockFilter, ProtocolTag } from '../lib/proto/networkif_pb';
import { ZDRequest, ZDResponse } from '../lib/proto/wrappers_pb';
import { Any } from 'google-protobuf/google/protobuf/any_pb';

const PROTO_LIB_DIR = path.join(__dirname, '../../src/lib/proto');
const SYS_SERVICE_PROTO = ['wrappers_grpc_pb.d.ts', 'manager_grpc_pb.d.ts', 'networkif_grpc_pb.d.ts'];

export async function start(host: string): Promise<void> {
    host = host ? host : '0.0.0.0:5000';
    const server: grpc.Server = new grpc.Server();
    // test
    const iNetworkManagerServer: INetworkManagerServer = {
        test(call: grpc.ServerUnaryCall<BlockFilter, ProtocolTag>, callback: grpc.sendUnaryData<ProtocolTag>): void {
            const req = call.request;
            logger.info(req.getPhyid());
            const tag: ProtocolTag = new ProtocolTag();
            tag.setVlanid(456);
            callback(null, tag);
        },
        send(call: grpc.ServerUnaryCall<ZDRequest, ZDResponse>, callback: grpc.sendUnaryData<ZDResponse>): void {
            const req: ZDRequest = call.request;
            const type = req.getType();
            logger.info('type', type);
            const data: Any | undefined = req.getData();
            if (data) {
                const result: BlockFilter | null = data.unpack(BlockFilter.deserializeBinary, 'zdautomotive.protobuf.BlockFilter');
                if (result) {
                    logger.info('unpack req data:', result.getPhyid(), result.getVlanid(), result.getSrcip(), result.getDstip(), result.getSrcport(), result.getDstport());
                    const res: ZDResponse = new ZDResponse();
                    const anyData: any = new Any();
                    const tag: ProtocolTag = new ProtocolTag();
                    tag.setVlanid(456);
                    tag.setSrcport(456);
                    tag.setDstport(456);
                    tag.setTag('456');
                    anyData.pack(tag.serializeBinary(), 'zdautomotive.protobuf.ProtocolTag');
                    res.setCode(ZDResponse.ERROR_CODE.OK);
                    res.setMessage('send block filter success.');
                    res.setData(anyData);
                    callback(null, res);
                } else {
                    logger.info('unpack req data is null');
                }
            } else {
                logger.info('req data is null');
            }
        }
    }
    server.addService(NetworkManagerService, iNetworkManagerServer);
    // zd grpc management
    const iServiceProviderManager: IServiceManagerServer = {
        subscribe: handler.register,
        unsubscribe: handler.unregister,
        keepAlive: handler.keepAlive,
        submitRequestResult: handler.submitRequestResult,
        ping: handler.ping
    };
    server.addService(ServiceManagerService, iServiceProviderManager);
    // zd grpc service
    const protoFileNames = fs.readdirSync(PROTO_LIB_DIR)
    // logger.info(protoFileNames);
    const protoFilePaths = protoFileNames.filter((fileName: string) => {
        return fileName.indexOf('grpc_pb.d.ts') !== -1 && SYS_SERVICE_PROTO.indexOf(fileName) === -1;
    }).map((fileName: string) => {
        return path.join(PROTO_LIB_DIR, fileName.replace('.d.ts', ''));
    });
    // logger.info(protoFilePaths);
    for (const filePath of protoFilePaths) {
        const pb = await import(filePath);
        // logger.info('pb:', pb);
        Object.keys(pb).filter((key: string) => {
            return key !== 'default';
        }).forEach((key: string) => {
            // logger.info(key, typeof pb[key], JSON.stringify(pb[key]));
            if (typeof pb[key] === 'object') {
                const definition: grpc.ServiceDefinition<grpc.UntypedServiceImplementation> = pb[key];
                const implementation: grpc.UntypedServiceImplementation = {};
                // logger.info('service keys->', Object.keys(definition));
                Object.keys(definition).forEach((name: string) => {
                    implementation[name] = handler.getPostZDServiceRequestMethod();
                });
                // logger.info('implementation->', implementation);
                server.addService(definition, implementation);
            }
        });
    }
    server.bindAsync(host, grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
        if (err) {
            logger.error(`Server error: ${err.message}`);
        } else {
            logger.info(`Server bound on port: ${port}`);
            server.start();
        }
    });
}
