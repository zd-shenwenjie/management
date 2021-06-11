// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_configuration_pb = require('./configuration_pb.js');
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


var ConfigurationManagerService = exports.ConfigurationManagerService = {
  getConfig: {
    path: '/zdautomotive.protobuf.ConfigurationManager/getConfig',
    requestStream: false,
    responseStream: false,
    requestType: proto_wrappers_pb.ZDRequest,
    responseType: proto_wrappers_pb.ZDResponse,
    requestSerialize: serialize_zdautomotive_protobuf_ZDRequest,
    requestDeserialize: deserialize_zdautomotive_protobuf_ZDRequest,
    responseSerialize: serialize_zdautomotive_protobuf_ZDResponse,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDResponse,
  },
  setConfig: {
    path: '/zdautomotive.protobuf.ConfigurationManager/setConfig',
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

exports.ConfigurationManagerClient = grpc.makeGenericClientConstructor(ConfigurationManagerService);
