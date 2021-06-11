// GENERATED CODE -- DO NOT EDIT!

// package: zdautomotive.protobuf
// file: proto/management.proto

import * as proto_management_pb from "./management_pb";
import * as proto_wrappers_pb from "./wrappers_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as grpc from "@grpc/grpc-js";

interface IServiceManagerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  ping: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>;
  register: grpc.MethodDefinition<proto_management_pb.ZDServiceSubscriber, proto_management_pb.ZDServiceRequest>;
  keepAlive: grpc.MethodDefinition<proto_management_pb.ZDSubscriberStatus, proto_wrappers_pb.ZDResponse>;
  submitRequestResult: grpc.MethodDefinition<proto_management_pb.ZDServiceRequestResult, proto_wrappers_pb.ZDResponse>;
  unregister: grpc.MethodDefinition<google_protobuf_wrappers_pb.StringValue, proto_wrappers_pb.ZDResponse>;
}

export const ServiceManagerService: IServiceManagerService;

export interface IServiceManagerServer extends grpc.UntypedServiceImplementation {
  ping: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>;
  register: grpc.handleServerStreamingCall<proto_management_pb.ZDServiceSubscriber, proto_management_pb.ZDServiceRequest>;
  keepAlive: grpc.handleBidiStreamingCall<proto_management_pb.ZDSubscriberStatus, proto_wrappers_pb.ZDResponse>;
  submitRequestResult: grpc.handleUnaryCall<proto_management_pb.ZDServiceRequestResult, proto_wrappers_pb.ZDResponse>;
  unregister: grpc.handleUnaryCall<google_protobuf_wrappers_pb.StringValue, proto_wrappers_pb.ZDResponse>;
}

export class ServiceManagerClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  ping(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  ping(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  ping(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  register(argument: proto_management_pb.ZDServiceSubscriber, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<proto_management_pb.ZDServiceRequest>;
  register(argument: proto_management_pb.ZDServiceSubscriber, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<proto_management_pb.ZDServiceRequest>;
  keepAlive(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<proto_management_pb.ZDSubscriberStatus, proto_wrappers_pb.ZDResponse>;
  keepAlive(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<proto_management_pb.ZDSubscriberStatus, proto_wrappers_pb.ZDResponse>;
  submitRequestResult(argument: proto_management_pb.ZDServiceRequestResult, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  submitRequestResult(argument: proto_management_pb.ZDServiceRequestResult, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  submitRequestResult(argument: proto_management_pb.ZDServiceRequestResult, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  unregister(argument: google_protobuf_wrappers_pb.StringValue, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  unregister(argument: google_protobuf_wrappers_pb.StringValue, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
  unregister(argument: google_protobuf_wrappers_pb.StringValue, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_wrappers_pb.ZDResponse>): grpc.ClientUnaryCall;
}
