// GENERATED CODE -- DO NOT EDIT!

// package: zdautomotive.protobuf
// file: proto/configuration.proto

import * as proto_configuration_pb from "./configuration_pb";
import * as proto_wrappers_pb from "./wrappers_pb";
import * as grpc from "@grpc/grpc-js";

interface IConfigurationManagerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getConfig: grpc.MethodDefinition<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
  setConfig: grpc.MethodDefinition<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
}

export const ConfigurationManagerService: IConfigurationManagerService;

export interface IConfigurationManagerServer extends grpc.UntypedServiceImplementation {
  getConfig: grpc.handleUnaryCall<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
  setConfig: grpc.handleUnaryCall<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
}

export class ConfigurationManagerClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getConfig(argument: proto_wrappers_pb.ZDRequest, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  getConfig(argument: proto_wrappers_pb.ZDRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  getConfig(argument: proto_wrappers_pb.ZDRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  setConfig(argument: proto_wrappers_pb.ZDRequest, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  setConfig(argument: proto_wrappers_pb.ZDRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  setConfig(argument: proto_wrappers_pb.ZDRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
}
