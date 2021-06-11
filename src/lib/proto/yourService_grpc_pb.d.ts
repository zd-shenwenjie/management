// GENERATED CODE -- DO NOT EDIT!

// package: zdautomotive.protobuf
// file: proto/yourService.proto

import * as proto_yourService_pb from "./yourService_pb";
import * as proto_wrappers_pb from "./wrappers_pb";
import * as grpc from "@grpc/grpc-js";

interface IYourServiceManagerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  yourServiceRequestMethodA: grpc.MethodDefinition<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
  yourServiceRequestMethodB: grpc.MethodDefinition<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
  yourServiceRequestMethodC: grpc.MethodDefinition<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
}

export const YourServiceManagerService: IYourServiceManagerService;

export interface IYourServiceManagerServer extends grpc.UntypedServiceImplementation {
  yourServiceRequestMethodA: grpc.handleUnaryCall<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
  yourServiceRequestMethodB: grpc.handleUnaryCall<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
  yourServiceRequestMethodC: grpc.handleUnaryCall<proto_wrappers_pb.ZDRequest, proto_wrappers_pb.ZDResponse>;
}

export class YourServiceManagerClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  yourServiceRequestMethodA(argument: proto_wrappers_pb.ZDRequest, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodA(argument: proto_wrappers_pb.ZDRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodA(argument: proto_wrappers_pb.ZDRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodB(argument: proto_wrappers_pb.ZDRequest, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodB(argument: proto_wrappers_pb.ZDRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodB(argument: proto_wrappers_pb.ZDRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodC(argument: proto_wrappers_pb.ZDRequest, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodC(argument: proto_wrappers_pb.ZDRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  yourServiceRequestMethodC(argument: proto_wrappers_pb.ZDRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
}
