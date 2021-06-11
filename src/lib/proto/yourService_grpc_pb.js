// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_yourService_pb = require('./yourService_pb.js');
var proto_wrappers_pb = require('./wrappers_pb.js');

function serialize_zdautomotive_protobuf_ZDRequest(arg) {
  if (!(arg instanceof proto_wrappers_pb.ZDRequest)) {
    throw new Error('Expected argument of type zdautomotive.protobuf.ZDRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zdautomotive_protobuf_ZDRequest(buffer_arg) {
  return proto_wrappers_pb.ZDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_zdautomotive_protobuf_ZDResponse(arg) {
  if (!(arg instanceof proto_wrappers_pb.ZDResponse)) {
    throw new Error('Expected argument of type zdautomotive.protobuf.ZDResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zdautomotive_protobuf_ZDResponse(buffer_arg) {
  return proto_wrappers_pb.ZDResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var YourServiceManagerService = exports.YourServiceManagerService = {
  yourServiceRequestMethodA: {
    path: '/zdautomotive.protobuf.YourServiceManager/yourServiceRequestMethodA',
    requestStream: false,
    responseStream: false,
    requestType: proto_wrappers_pb.ZDRequest,
    responseType: proto_wrappers_pb.ZDResponse,
    requestSerialize: serialize_zdautomotive_protobuf_ZDRequest,
    requestDeserialize: deserialize_zdautomotive_protobuf_ZDRequest,
    responseSerialize: serialize_zdautomotive_protobuf_ZDResponse,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDResponse,
  },
  yourServiceRequestMethodB: {
    path: '/zdautomotive.protobuf.YourServiceManager/yourServiceRequestMethodB',
    requestStream: false,
    responseStream: false,
    requestType: proto_wrappers_pb.ZDRequest,
    responseType: proto_wrappers_pb.ZDResponse,
    requestSerialize: serialize_zdautomotive_protobuf_ZDRequest,
    requestDeserialize: deserialize_zdautomotive_protobuf_ZDRequest,
    responseSerialize: serialize_zdautomotive_protobuf_ZDResponse,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDResponse,
  },
  yourServiceRequestMethodC: {
    path: '/zdautomotive.protobuf.YourServiceManager/yourServiceRequestMethodC',
    requestStream: false,
    responseStream: false,
    requestType: proto_wrappers_pb.ZDRequest,
    responseType: proto_wrappers_pb.ZDResponse,
    requestSerialize: serialize_zdautomotive_protobuf_ZDRequest,
    requestDeserialize: deserialize_zdautomotive_protobuf_ZDRequest,
    responseSerialize: serialize_zdautomotive_protobuf_ZDResponse,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDResponse,
  },
};

exports.YourServiceManagerClient = grpc.makeGenericClientConstructor(YourServiceManagerService);
