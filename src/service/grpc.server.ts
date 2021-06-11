import fs from 'fs-extra';
import path from 'path';
import * as grpc from '@grpc/grpc-js';
import { ServiceManagerService, IServiceManagerServer } from '../lib/proto/management_grpc_pb';
import * as handler from './grpc.handler';
import logger from '../lib/utils/logger';

export async function start(host: string): Promise<void> {
    host = host ? host : '0.0.0.0:5000';
    const server: grpc.Server = new grpc.Server();
    const iServiceProviderManager: IServiceManagerServer = {
        register: handler.register,
        unregister: handler.unregister,
        keepAlive: handler.keepAlive,
        submitRequestResult: handler.submitRequestResult,
        ping: handler.ping
    };
    server.addService(ServiceManagerService, iServiceProviderManager);
    const protoDir = path.join(__dirname, '../proto');
    const protoFileNames = fs.readdirSync(protoDir);
    const protoFilePaths = protoFileNames.filter((fileName: string) => {
        return fileName.indexOf('grpc_pb.d.ts') !== -1 &&
            fileName.indexOf('management_grpc_pb.d.ts') === -1 &&
            fileName.indexOf('wrappers_grpc_pb.d.ts') === -1;
    }).map((fileName: string) => {
        return '../../lib/proto/' + fileName.replace('.d.ts', '');
    });
    for (const filePath of protoFilePaths) {
        const pb = await import(filePath);
        // logger.info('pb:', filePath, 'keys:', Object.keys(pb));
        Object.keys(pb).forEach((key: string) => {
            logger.info(key, typeof pb[key]);
            if (typeof pb[key] === 'object' && key !== 'default') {
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
