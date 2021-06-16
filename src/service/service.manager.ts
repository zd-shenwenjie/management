import { SERVICE_TYPEMap } from '../lib/proto/wrappers_pb';
import { ZDService } from '../lib/proto/manager_pb';
import logger from '../lib/utils/logger';

export default class ZDServiceManager {

    private static instance: ZDServiceManager;
    private servicesBySubscriberId: Map<string, ZDService[]>;

    private constructor() {
        this.servicesBySubscriberId = new Map<string, ZDService[]>();
    }

    public static getInstance(): ZDServiceManager {
        if (!ZDServiceManager.instance) {
            ZDServiceManager.instance = new ZDServiceManager();
        }
        return ZDServiceManager.instance;
    }

    public deleteServiceById(id: string): void {
        if (this.servicesBySubscriberId.has(id)) {
            this.servicesBySubscriberId.delete(id);
        }
    }

    public updateServicesStatus(subscriberId: string, serviceList: ZDService[]): void {
        if (subscriberId && serviceList && serviceList.length > 0) {
            this.servicesBySubscriberId.set(subscriberId, serviceList);
            serviceList.forEach((service: ZDService) => {
                const type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap] = service.getType();
                const status: ZDService.SERVICE_STATUSMap[keyof ZDService.SERVICE_STATUSMap] = service.getStatus();
                logger.info(`${subscriberId} update service(type:${type}) status (${status === ZDService.SERVICE_STATUS.ENABLED ? 'ENABLED' : 'DISABLED'})`);
            })
        }
    }

    public findServiceByType(type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]): ZDService | null {
        let found = null;
        this.servicesBySubscriberId.forEach((services: ZDService[]) => {
            services.forEach((service: ZDService) => {
                const serviceType = service.getType();
                if (type === serviceType) {
                    found = service;
                    const status: ZDService.SERVICE_STATUSMap[keyof ZDService.SERVICE_STATUSMap] = service.getStatus();
                    logger.info(`found service(type:${type}) is ${status === ZDService.SERVICE_STATUS.ENABLED ? 'ENABLED' : 'DISABLED'}`);
                }
            })
        })
        return found;
    }

    public findServicesById(id: string): ZDService[] | null {
        const service = this.servicesBySubscriberId.get(id);
        return service ? service : null;
    }
}