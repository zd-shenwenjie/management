// package: zdautomotive.protobuf
// file: proto/yourService.proto

import * as jspb from "google-protobuf";
import * as proto_wrappers_pb from "./wrappers_pb";

export class YourRequestParameter extends jspb.Message {
  getNumber(): number;
  setNumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): YourRequestParameter.AsObject;
  static toObject(includeInstance: boolean, msg: YourRequestParameter): YourRequestParameter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: YourRequestParameter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): YourRequestParameter;
  static deserializeBinaryFromReader(message: YourRequestParameter, reader: jspb.BinaryReader): YourRequestParameter;
}

export namespace YourRequestParameter {
  export type AsObject = {
    number: number,
  }
}

export class YourResponseParameter extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): YourResponseParameter.AsObject;
  static toObject(includeInstance: boolean, msg: YourResponseParameter): YourResponseParameter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: YourResponseParameter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): YourResponseParameter;
  static deserializeBinaryFromReader(message: YourResponseParameter, reader: jspb.BinaryReader): YourResponseParameter;
}

export namespace YourResponseParameter {
  export type AsObject = {
    message: string,
  }
}

