import * as grpc from '@grpc/grpc-js';
import { ServiceManagerService, IServiceManagerServer } from '../lib/proto/manager_grpc_pb';
import { NetworkManagerService, INetworkManagerServer } from '../lib/proto/networkif_grpc_pb';
import { ConfigurationManagerService, IConfigurationManagerServer } from '../lib/proto/config_grpc_pb';
import { SERVICE_TYPE } from '../lib/proto/wrappers_pb';
import * as handler from './grpc.handler';
import logger from '../lib/utils/logger';


export async function start(host: string): Promise<void> {
    host = host ? host : '0.0.0.0:5000';
    const server: grpc.Server = new grpc.Server();
    const iConfigurationManagerServer: IConfigurationManagerServer = {
        getConfig: handler.getPostZDServiceRequestMethod(SERVICE_TYPE.SERVICE_GET_CONFIG),
        setConfig: handler.getPostZDServiceRequestMethod(SERVICE_TYPE.SERVICE_SET_CONFIG)
    }
    server.addService(ConfigurationManagerService, iConfigurationManagerServer);
    const iNetworkManagerServer: INetworkManagerServer = {
        setNetwork: handler.getPostZDServiceRequestMethod(SERVICE_TYPE.SERVICE_SET_NETWORK)
    }
    server.addService(NetworkManagerService, iNetworkManagerServer);
    const iServiceProviderManager: IServiceManagerServer = {
        subscribe: handler.register,
        unsubscribe: handler.unregister,
        keepAlive: handler.keepAlive,
        submitRequestResult: handler.submitRequestResult,
        ping: handler.ping
    };
    server.addService(ServiceManagerService, iServiceProviderManager);
    server.bindAsync(host, grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
        if (err) {
            logger.error(`Server error: ${err.message}`);
        } else {
            logger.info(`Server bound on port: ${port}`);
            server.start();
        }
    });
}
