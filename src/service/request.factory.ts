
import { Guid } from 'guid-typescript';
import { ZDServiceRequest } from '../lib/proto/manager_pb';
import { SERVICE_TYPEMap, ZDRequest } from '../lib/proto/wrappers_pb';

export default class ZDServiceRequestFactory {

    private static instance: ZDServiceRequestFactory;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): ZDServiceRequestFactory {
        if (!ZDServiceRequestFactory.instance) {
            ZDServiceRequestFactory.instance = new ZDServiceRequestFactory();
        }
        return ZDServiceRequestFactory.instance;
    }

    public createZDServiceRequest(req: ZDRequest, type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]): ZDServiceRequest {
        const request: ZDServiceRequest = new ZDServiceRequest();
        // const option = req.getOption();
        request.setType(type);
        request.setCreatetime(Date.now());
        request.setExpiretime(Date.now() + (30 * 1000));
        request.setSession(Guid.create().toString());
        request.setData(req.getData());
        return request;
    }

}