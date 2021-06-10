import { SERVICE_TYPEMap } from '../proto/wrappers_pb';
import { ZDService } from '../proto/management_pb';
import logger from '../utils/logger';

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

    // public addService(id: string, services: ZDService[]): void {
    //     this.servicesBySubscriberId.set(id, services);
    // }

    public deleteServiceById(id: string): void {
        if (this.servicesBySubscriberId.has(id)) {
            this.servicesBySubscriberId.delete(id);
        }
    }

    public updateServicesStatus(id: string, services: ZDService[]): void {
        if (id && services && services.length > 0) {
            this.servicesBySubscriberId.set(id, services);
            logger.info(`update (${id}) services status (${services.toString()})`);
        }
    }

    public findServiceByType(type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]): ZDService | null {
        let found = null;
        this.servicesBySubscriberId.forEach((services: ZDService[]) => {
            services.forEach((service: ZDService) => {
                const serviceType = service.getType();
                if (type === serviceType) {
                    found = service;
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