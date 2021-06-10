import * as grpc from '@grpc/grpc-js';
import { ZDResponse } from '../proto/wrappers_pb'
import { ZDServiceSubscriber } from '../proto/management_pb'
import Subscriber from './subscriber'
import logger from '../utils/logger';

export default class ZDSubscriberManager {

    private static instance: ZDSubscriberManager;
    private subscriberMap: Map<string, Subscriber>; // Map <id,subscriber>

    private constructor() {
        this.subscriberMap = new Map<string, Subscriber>()
    }

    public static getInstance(): ZDSubscriberManager {
        if (!ZDSubscriberManager.instance) {
            ZDSubscriberManager.instance = new ZDSubscriberManager();
        }
        return ZDSubscriberManager.instance;
    }

    public findSubscriberById(id: string): Subscriber | null {
        const subscriber = this.subscriberMap.get(id);
        return subscriber ? subscriber : null;
    }

    public addSubscriber(subscriber: Subscriber): void {
        if (subscriber) {
            const id = subscriber.getSubscriberId();
            if (id) {
                this.subscriberMap.set(id, subscriber);
                logger.info(`add subscriber:${id}`);
            }
        }
    }

    public deleteSubscriberById(id: string): void {
        if (this.subscriberMap.has(id)) {
            this.subscriberMap.delete(id);
            logger.info(`delete subscriber:${id}`);
        }
    }

    public deleteSubscriberByStream(call: grpc.ServerDuplexStream<ZDServiceSubscriber, ZDResponse>): string {
        let subscriberId = '';
        if (call) {
            logger.info('find subscriber by stream.');
            this.subscriberMap.forEach((subscriber, id) => {
                if (subscriber.isSameKeepAliveStream(call)) {
                    subscriberId = id;
                }
            });
            if (subscriberId) {
                this.subscriberMap.delete(subscriberId);
                logger.info(`delete subscriber:${subscriberId}`);
            } else {
                logger.info(`not found ${subscriberId} by stream.`);
            }
        }
        return subscriberId;
    }
}