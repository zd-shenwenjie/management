import * as grpc from '@grpc/grpc-js';
import Subscriber from '../service/subscriber';
import { SERVICE_TYPEMap, ZDRequest, ZDResponse } from '../lib/proto/wrappers_pb'
import { ZDServiceSubscriber, ZDServiceRequest, ZDServiceRequestResult, ZDSubscriberStatus, ZDService } from '../lib/proto/manager_pb'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import ZDServiceRequestManager from '../service/request.manager';
import ZDServiceRequestFactory from '../service/request.factory';
import ZDSubscriberManager from '../service/subscriber.manager';
import ZDServiceManager from '../service/service.manager';
import logger from '../lib/utils/logger';

export function ping(call: grpc.ServerUnaryCall<Empty, Empty>, callback: grpc.sendUnaryData<Empty>): void {
    callback(null, new Empty());
}

export function register(call: grpc.ServerWritableStream<ZDServiceSubscriber, ZDServiceRequest>): void {
    const zdsubscriber: ZDServiceSubscriber = call.request;
    logger.info('register:', zdsubscriber.getId());
    if (zdsubscriber) {
        const subscriber: Subscriber = new Subscriber();
        subscriber.setSubscriber(zdsubscriber);
        subscriber.setServiceStream(call);
        const serviceTypeList: SERVICE_TYPEMap[keyof SERVICE_TYPEMap][] = zdsubscriber.getServicetypeList();
        serviceTypeList.forEach((type) => {
            ZDServiceRequestManager.getInstance().subscribe(subscriber, type);
        });
        ZDSubscriberManager.getInstance().addSubscriber(subscriber);
    }
}

export function unregister(call: grpc.ServerUnaryCall<StringValue, ZDResponse>, callback: grpc.sendUnaryData<ZDResponse>): void {
    const subscriberId: string = call.request.getValue();
    if (subscriberId) {
        ZDServiceRequestManager.getInstance().unsubscribe(subscriberId);
        ZDSubscriberManager.getInstance().deleteSubscriberById(subscriberId);
        ZDServiceManager.getInstance().deleteServiceById(subscriberId);
        const response = new ZDResponse();
        response.setCode(ZDResponse.ERROR_CODE.OK);
        response.setMessage('unregister success');
        callback(null, response);
    }
}

export function keepAlive(call: grpc.ServerDuplexStream<ZDSubscriberStatus, ZDResponse>): void {
    call.on('data', (status: ZDSubscriberStatus) => {
        if (status) {
            const subscriberId: string = status.getId();
            const subscriber = ZDSubscriberManager.getInstance().findSubscriberById(subscriberId);
            // logger.info('receive keep alive id:', subscriberId);
            if (subscriber) {
                subscriber.setKeepAliveStream(call);
                subscriber.updateExpireTime();
                const type = subscriber.getSubscriberType();
                if (type === ZDServiceSubscriber.SUBSCRIBER_TYPE.PROVIDER) {
                    const services = status.getServiceList();
                    ZDServiceManager.getInstance().updateServicesStatus(subscriberId, services);
                }
                const response = new ZDResponse();
                response.setCode(ZDResponse.ERROR_CODE.OK);
                response.setMessage(`keep alive : ${subscriberId}`);
                call.write(response);
            } else {
                const response = new ZDResponse();
                response.setCode(ZDResponse.ERROR_CODE.SERVER_ERROR);
                response.setMessage(`not found subscriber : ${subscriberId}`);
                call.write(response);
            }
        }
    });
    call.on('error', (err) => {
        const subscriberId = ZDSubscriberManager.getInstance().deleteSubscriberByStream(call);
        const subscriber = ZDSubscriberManager.getInstance().findSubscriberById(subscriberId);
        if (subscriber && subscriber.getSubscriberType() === ZDServiceSubscriber.SUBSCRIBER_TYPE.PROVIDER) {
            ZDServiceManager.getInstance().deleteServiceById(subscriberId);
        }
        logger.debug('keep alive stream error.', err.message);
    });
    call.on('end', () => {
        logger.info('keep alive stream end.');
        const subscriberId = ZDSubscriberManager.getInstance().deleteSubscriberByStream(call);
        const subscriber = ZDSubscriberManager.getInstance().findSubscriberById(subscriberId);
        if (subscriber && subscriber.getSubscriberType() === ZDServiceSubscriber.SUBSCRIBER_TYPE.PROVIDER) {
            ZDServiceManager.getInstance().deleteServiceById(subscriberId);
        }
    })
}

export function submitRequestResult(call: grpc.ServerUnaryCall<ZDServiceRequestResult, ZDResponse>, callback: grpc.sendUnaryData<ZDResponse>): void {
    const result: ZDServiceRequestResult = call.request;
    if (result) {
        const b = ZDServiceRequestManager.getInstance().submit(result);
        if (b) {
            const res = new ZDResponse();
            res.setCode(ZDResponse.ERROR_CODE.OK);
            res.setMessage('submit req result success.');
            callback(null, res);
        } else {
            const res = new ZDResponse();
            res.setCode(ZDResponse.ERROR_CODE.SERVER_ERROR);
            res.setMessage('submit req result failed.');
        }
    }
}

export function getPostZDServiceRequestMethod(type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]): (call: grpc.ServerUnaryCall<ZDRequest, ZDResponse>, callback: grpc.sendUnaryData<ZDResponse>) => void {
    return (call: grpc.ServerUnaryCall<ZDRequest, ZDResponse>, callback: grpc.sendUnaryData<ZDResponse>) => {
        const req: ZDRequest = call.request;
        onDispatchServiceRequest(type, req, callback);
    }
}

function onDispatchServiceRequest(type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap], req: ZDRequest, callback: grpc.sendUnaryData<ZDResponse>): void {
    if (req) {
        if (onInterceptServiceRequest(type)) {
            logger.info('onInterceptServiceRequest:', type);
            const res = new ZDResponse();
            res.setCode(ZDResponse.ERROR_CODE.SERVER_ERROR);
            res.setMessage(`service (serviceType:${type}) is disabled`);
            callback(null, res);
        } else {
            logger.info('onDispatchServiceRequest：', type);
            const serviceReq: ZDServiceRequest = ZDServiceRequestFactory.getInstance().createZDServiceRequest(req, type);
            ZDServiceRequestManager.getInstance().post(serviceReq, (res: ZDResponse) => {
                logger.debug(res.getCode(), res.getMessage(), res.getData()?.toString());
                callback(null, res);
            });
        }
    }
}

function onInterceptServiceRequest(type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]): boolean {
    const service = ZDServiceManager.getInstance().findServiceByType(type);
    if (service) {
        const serviceStatus = service.getStatus();
        return serviceStatus === ZDService.SERVICE_STATUS.DISABLED;
    } else {
        logger.info(`service(type:${type}) not found !`);
    }
    return true;
}