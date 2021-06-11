// package: zdautomotive.protobuf
// file: proto/management.proto

import * as jspb from "google-protobuf";
import * as proto_wrappers_pb from "./wrappers_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class ZDServiceSubscriber extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getType(): ZDServiceSubscriber.SUBSCRIBER_TYPEMap[keyof ZDServiceSubscriber.SUBSCRIBER_TYPEMap];
  setType(value: ZDServiceSubscriber.SUBSCRIBER_TYPEMap[keyof ZDServiceSubscriber.SUBSCRIBER_TYPEMap]): void;

  clearServicetypeList(): void;
  getServicetypeList(): Array<proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap]>;
  setServicetypeList(value: Array<proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap]>): void;
  addServicetype(value: proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap], index?: number): proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap];

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDServiceSubscriber.AsObject;
  static toObject(includeInstance: boolean, msg: ZDServiceSubscriber): ZDServiceSubscriber.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDServiceSubscriber, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDServiceSubscriber;
  static deserializeBinaryFromReader(message: ZDServiceSubscriber, reader: jspb.BinaryReader): ZDServiceSubscriber;
}

export namespace ZDServiceSubscriber {
  export type AsObject = {
    id: string,
    type: ZDServiceSubscriber.SUBSCRIBER_TYPEMap[keyof ZDServiceSubscriber.SUBSCRIBER_TYPEMap],
    servicetypeList: Array<proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap]>,
  }

  export interface SUBSCRIBER_TYPEMap {
    OBSERVER: 0;
    PROVIDER: 1;
  }

  export const SUBSCRIBER_TYPE: SUBSCRIBER_TYPEMap;
}

export class ZDSubscriberStatus extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  clearServiceList(): void;
  getServiceList(): Array<ZDService>;
  setServiceList(value: Array<ZDService>): void;
  addService(value?: ZDService, index?: number): ZDService;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDSubscriberStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ZDSubscriberStatus): ZDSubscriberStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDSubscriberStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDSubscriberStatus;
  static deserializeBinaryFromReader(message: ZDSubscriberStatus, reader: jspb.BinaryReader): ZDSubscriberStatus;
}

export namespace ZDSubscriberStatus {
  export type AsObject = {
    id: string,
    serviceList: Array<ZDService.AsObject>,
  }
}

export class ZDService extends jspb.Message {
  getType(): proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap];
  setType(value: proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap]): void;

  getStatus(): ZDService.SERVICE_STATUSMap[keyof ZDService.SERVICE_STATUSMap];
  setStatus(value: ZDService.SERVICE_STATUSMap[keyof ZDService.SERVICE_STATUSMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDService.AsObject;
  static toObject(includeInstance: boolean, msg: ZDService): ZDService.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDService, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDService;
  static deserializeBinaryFromReader(message: ZDService, reader: jspb.BinaryReader): ZDService;
}

export namespace ZDService {
  export type AsObject = {
    type: proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap],
    status: ZDService.SERVICE_STATUSMap[keyof ZDService.SERVICE_STATUSMap],
  }

  export interface SERVICE_STATUSMap {
    DISABLED: 0;
    ENABLED: 1;
  }

  export const SERVICE_STATUS: SERVICE_STATUSMap;
}

export class ZDServiceRequest extends jspb.Message {
  getType(): proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap];
  setType(value: proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap]): void;

  getSession(): string;
  setSession(value: string): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_any_pb.Any | undefined;
  setData(value?: google_protobuf_any_pb.Any): void;

  getCreatetime(): number;
  setCreatetime(value: number): void;

  getExpiretime(): number;
  setExpiretime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDServiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ZDServiceRequest): ZDServiceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDServiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDServiceRequest;
  static deserializeBinaryFromReader(message: ZDServiceRequest, reader: jspb.BinaryReader): ZDServiceRequest;
}

export namespace ZDServiceRequest {
  export type AsObject = {
    type: proto_wrappers_pb.SERVICE_TYPEMap[keyof proto_wrappers_pb.SERVICE_TYPEMap],
    session: string,
    data?: google_protobuf_any_pb.Any.AsObject,
    createtime: number,
    expiretime: number,
  }
}

export class ZDServiceRequestResult extends jspb.Message {
  hasRequest(): boolean;
  clearRequest(): void;
  getRequest(): ZDServiceRequest | undefined;
  setRequest(value?: ZDServiceRequest): void;

  hasResponse(): boolean;
  clearResponse(): void;
  getResponse(): proto_wrappers_pb.ZDResponse | undefined;
  setResponse(value?: proto_wrappers_pb.ZDResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDServiceRequestResult.AsObject;
  static toObject(includeInstance: boolean, msg: ZDServiceRequestResult): ZDServiceRequestResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDServiceRequestResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDServiceRequestResult;
  static deserializeBinaryFromReader(message: ZDServiceRequestResult, reader: jspb.BinaryReader): ZDServiceRequestResult;
}

export namespace ZDServiceRequestResult {
  export type AsObject = {
    request?: ZDServiceRequest.AsObject,
    response?: proto_wrappers_pb.ZDResponse.AsObject,
  }
}

