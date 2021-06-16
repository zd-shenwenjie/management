import Subscriber from './subscriber';
import { ZDServiceSubscriber, ZDServiceRequest, ZDServiceRequestResult } from '../lib/proto/manager_pb';
import { ZDResponse, SERVICE_TYPEMap, SERVICE_TYPE } from '../lib/proto/wrappers_pb';
import logger from '../lib/utils/logger';
export default class ZDServiceRequestManager {

    private static instance: ZDServiceRequestManager;
    private subscriptionsByServiceType: Map<SERVICE_TYPEMap[keyof SERVICE_TYPEMap], Subscriber[]>; // Map<serviceType, subscriber[]>
    private requestLintenersBySession: Map<string, (response: ZDResponse) => void>; // Map<session, callback>
    private pendingServiceRequestList: ZDServiceRequest[];
    // private countdownHandler: NodeJS.Timeout | null = null;

    private constructor() {
        this.subscriptionsByServiceType = new Map<SERVICE_TYPEMap[keyof SERVICE_TYPEMap], Subscriber[]>();
        this.requestLintenersBySession = new Map<string, (response: ZDResponse) => void>();
        this.pendingServiceRequestList = [];
        setInterval(() => {
            if (this.pendingServiceRequestList.length > 0) {
                const now = Date.now();
                this.pendingServiceRequestList.forEach(((req, index) => {
                    const expire = req.getExpiretime();
                    if (expire <= now) {
                        const session = req.getSession();
                        if (this.requestLintenersBySession.has(session)) {
                            const callback = this.requestLintenersBySession.get(session);
                            if (callback) {
                                const res = new ZDResponse();
                                res.setCode(ZDResponse.ERROR_CODE.SERVER_ERROR);
                                res.setMessage('req timeout error.');
                                callback(res);
                                this.pendingServiceRequestList.splice(index, 1);
                                const subscriberList = this.subscriptionsByServiceType.get(req.getType());
                                if (subscriberList) {
                                    const provider = subscriberList.find((sub) => {
                                        return sub.getSubscriberType() === ZDServiceSubscriber.SUBSCRIBER_TYPE.PROVIDER;
                                    });
                                    if (provider) {
                                        req.setType(SERVICE_TYPE.SERVICE_SYS_CANCEL);
                                        provider.doPostRequest(req);
                                    }
                                }
                            }
                        }
                    }
                }))
            }
        }, 1000);
    }

    public static getInstance(): ZDServiceRequestManager {
        if (!ZDServiceRequestManager.instance) {
            ZDServiceRequestManager.instance = new ZDServiceRequestManager();
        }
        return ZDServiceRequestManager.instance;
    }

    public subscribe(subscriber: Subscriber, serviceType: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]): void {
        let subscriberList: Subscriber[] | undefined = this.subscriptionsByServiceType.get(serviceType);
        if (subscriberList) {
            const id = subscriber.getSubscriberId();
            const index = subscriberList.findIndex(sub => {
                return sub.getSubscriberId() === id;
            });
            if (index === -1) {
                subscriberList.push(subscriber);
            }
            this.subscriptionsByServiceType.set(serviceType, subscriberList);
            logger.debug(`add subscriptions (serviceType:${serviceType},subscriber:${subscriber.getSubscriberId()})`);
        } else {
            subscriberList = [];
            subscriberList.push(subscriber);
            this.subscriptionsByServiceType.set(serviceType, subscriberList);
            logger.debug(`init subscriptions (serviceType:${serviceType},subscriber:${subscriber.getSubscriberId()})`);
        }
    }

    public unsubscribe(id: string): void {
        if (id) {
            this.subscriptionsByServiceType.forEach((subscribers: Subscriber[], serviceType: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]) => {
                const newSubscriptions = subscribers.filter((subscriber: Subscriber) => {
                    return subscriber.getSubscriberId() !== id;
                });
                this.subscriptionsByServiceType.set(serviceType, newSubscriptions);
            });
        }
    }

    public post(req: ZDServiceRequest, callback: (response: ZDResponse) => void): void {
        const type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap] = req.getType();
        const session: string = req.getSession();
        const subscribers = this.subscriptionsByServiceType.get(type);
        if (subscribers) {
            this.pendingServiceRequestList.push(req);
            this.requestLintenersBySession.set(session, callback);
            subscribers.forEach((subscriber) => {
                logger.info(`send req(${req.getType()}) to ${subscriber.getSubscriberId()}(${subscriber.getSubscriberType()})`);
                subscriber.doPostRequest(req);
            })
        }
    }

    public submit(result: ZDServiceRequestResult): boolean {
        const req: ZDServiceRequest | undefined = result.getRequest();
        const res: ZDResponse | undefined = result.getResponse();
        if (req && res) {
            const session = req.getSession();
            if (session) {
                const callback = this.requestLintenersBySession.get(session);
                if (callback) {
                    callback(res);
                    logger.debug(`req(${session}) callback found .`);
                    const index = this.pendingServiceRequestList.findIndex((pendingReq) => {
                        return pendingReq.getSession() === session;
                    });
                    if (index !== -1) {
                        this.pendingServiceRequestList.splice(index, 1);
                        logger.debug(`remove req(${session}) from pending req list.`);
                    }
                    return true;
                } else {
                    logger.debug(`req(${session}) callback not found .`);
                }
            }
        }
        return false;
    }

}
