// package: zdautomotive.protobuf
// file: proto/wrappers.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class ZDRequest extends jspb.Message {
  getType(): SERVICE_TYPEMap[keyof SERVICE_TYPEMap];
  setType(value: SERVICE_TYPEMap[keyof SERVICE_TYPEMap]): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_any_pb.Any | undefined;
  setData(value?: google_protobuf_any_pb.Any): void;

  hasOption(): boolean;
  clearOption(): void;
  getOption(): ZDRequest.ZDRequestOption | undefined;
  setOption(value?: ZDRequest.ZDRequestOption): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ZDRequest): ZDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDRequest;
  static deserializeBinaryFromReader(message: ZDRequest, reader: jspb.BinaryReader): ZDRequest;
}

export namespace ZDRequest {
  export type AsObject = {
    type: SERVICE_TYPEMap[keyof SERVICE_TYPEMap],
    data?: google_protobuf_any_pb.Any.AsObject,
    option?: ZDRequest.ZDRequestOption.AsObject,
  }

  export class ZDRequestOption extends jspb.Message {
    getTimeout(): number;
    setTimeout(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZDRequestOption.AsObject;
    static toObject(includeInstance: boolean, msg: ZDRequestOption): ZDRequestOption.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZDRequestOption, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZDRequestOption;
    static deserializeBinaryFromReader(message: ZDRequestOption, reader: jspb.BinaryReader): ZDRequestOption;
  }

  export namespace ZDRequestOption {
    export type AsObject = {
      timeout: number,
    }
  }
}

export class ZDResponse extends jspb.Message {
  getCode(): ZDResponse.ERROR_CODEMap[keyof ZDResponse.ERROR_CODEMap];
  setCode(value: ZDResponse.ERROR_CODEMap[keyof ZDResponse.ERROR_CODEMap]): void;

  getMessage(): string;
  setMessage(value: string): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_any_pb.Any | undefined;
  setData(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ZDResponse): ZDResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDResponse;
  static deserializeBinaryFromReader(message: ZDResponse, reader: jspb.BinaryReader): ZDResponse;
}

export namespace ZDResponse {
  export type AsObject = {
    code: ZDResponse.ERROR_CODEMap[keyof ZDResponse.ERROR_CODEMap],
    message: string,
    data?: google_protobuf_any_pb.Any.AsObject,
  }

  export interface ERROR_CODEMap {
    OK: 0;
    CLIENT_ERROR: 1;
    SERVER_ERROR: 2;
  }

  export const ERROR_CODE: ERROR_CODEMap;
}

export interface SERVICE_TYPEMap {
  SERVICE_SYS_CANCEL: 0;
  SERVICE_GET_CONFIG: 1;
  SERVICE_SET_CONFIG: 2;
  SERVICE_EXAMPLE_A: 3;
  SERVICE_EXAMPLE_B: 4;
  SERVICE_EXAMPLE_C: 5;
}

export const SERVICE_TYPE: SERVICE_TYPEMap;

