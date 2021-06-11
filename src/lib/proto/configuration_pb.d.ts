// package: zdautomotive.protobuf
// file: proto/configuration.proto

import * as jspb from "google-protobuf";
import * as proto_wrappers_pb from "./wrappers_pb";

export class ZDConfig extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getZone(): string;
  setZone(value: string): void;

  getModel(): number;
  setModel(value: number): void;

  getVersion(): string;
  setVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ZDConfig.AsObject;
  static toObject(includeInstance: boolean, msg: ZDConfig): ZDConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ZDConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ZDConfig;
  static deserializeBinaryFromReader(message: ZDConfig, reader: jspb.BinaryReader): ZDConfig;
}

export namespace ZDConfig {
  export type AsObject = {
    name: string,
    zone: string,
    model: number,
    version: string,
  }
}

