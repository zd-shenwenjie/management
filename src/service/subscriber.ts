import * as grpc from '@grpc/grpc-js';
import { ZDResponse } from '../proto/wrappers_pb'
import { ZDServiceSubscriber, ZDServiceRequest, ZDSubscriberStatus } from '../proto/management_pb'
// import logger from '../../lib/utils/logger';

const SUBSCRIBER_TIME_OUT = 60 * 1000;
export default class Subscriber {

    private zdsubscriber: ZDServiceSubscriber | null = null;
    private serviceStream: grpc.ServerWritableStream<ZDServiceSubscriber, ZDServiceRequest> | null = null;
    private keepAliveStream: grpc.ServerDuplexStream<ZDSubscriberStatus, ZDResponse> | null = null;
    private createTime = 0;
    private expireTime = 0;

    public setSubscriber(subscriber: ZDServiceSubscriber): void {
        this.zdsubscriber = subscriber;
        this.createTime = Date.now();
        this.expireTime = this.createTime + SUBSCRIBER_TIME_OUT;
    }

    public setServiceStream(stream: grpc.ServerWritableStream<ZDServiceSubscriber, ZDServiceRequest>): void {
        if(this.serviceStream === null){
            this.serviceStream = stream;
        }
    }

    public setKeepAliveStream(stream: grpc.ServerDuplexStream<ZDServiceSubscriber, ZDResponse>): void {
        if(this.keepAliveStream === null){
            this.keepAliveStream = stream;
        }
    }

    public isSameKeepAliveStream(stream: grpc.ServerDuplexStream<ZDSubscriberStatus, ZDResponse>): boolean {
        return this.keepAliveStream === stream;
    }

    public updateExpireTime(): void {
        this.createTime = Date.now();
        this.expireTime = this.createTime + SUBSCRIBER_TIME_OUT;
        // logger.info(`update subscriber(${this.zdsubscriber.getId() as string}) expireTime:${this.expireTime}`);
    }

    public getSubscriberId(): string {
        return this.zdsubscriber ? this.zdsubscriber.getId() : '';
    }

    public getSubscriberType(): ZDServiceSubscriber.SUBSCRIBER_TYPEMap[keyof ZDServiceSubscriber.SUBSCRIBER_TYPEMap] {
        if (this.zdsubscriber) {
            return this.zdsubscriber.getType();
        }
        return ZDServiceSubscriber.SUBSCRIBER_TYPE.OBSERVER;
    }

    public doPostRequest(req: ZDServiceRequest): boolean {
        return this.serviceStream ? this.serviceStream.write(req) : false;
    }

    public doReplyAlive(res: ZDResponse): boolean {
        return this.keepAliveStream ? this.keepAliveStream.write(res) : false;
    }

}