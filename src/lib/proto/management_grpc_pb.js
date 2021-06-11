// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_management_pb = require('./management_pb.js');
var proto_wrappers_pb = require('./wrappers_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_StringValue(arg) {
  if (!(arg instanceof google_protobuf_wrappers_pb.StringValue)) {
    throw new Error('Expected argument of type google.protobuf.StringValue');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_StringValue(buffer_arg) {
  return google_protobuf_wrappers_pb.StringValue.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_zdautomotive_protobuf_ZDServiceRequest(arg) {
  if (!(arg instanceof proto_management_pb.ZDServiceRequest)) {
    throw new Error('Expected argument of type zdautomotive.protobuf.ZDServiceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zdautomotive_protobuf_ZDServiceRequest(buffer_arg) {
  return proto_management_pb.ZDServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_zdautomotive_protobuf_ZDServiceRequestResult(arg) {
  if (!(arg instanceof proto_management_pb.ZDServiceRequestResult)) {
    throw new Error('Expected argument of type zdautomotive.protobuf.ZDServiceRequestResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zdautomotive_protobuf_ZDServiceRequestResult(buffer_arg) {
  return proto_management_pb.ZDServiceRequestResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_zdautomotive_protobuf_ZDServiceSubscriber(arg) {
  if (!(arg instanceof proto_management_pb.ZDServiceSubscriber)) {
    throw new Error('Expected argument of type zdautomotive.protobuf.ZDServiceSubscriber');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zdautomotive_protobuf_ZDServiceSubscriber(buffer_arg) {
  return proto_management_pb.ZDServiceSubscriber.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_zdautomotive_protobuf_ZDSubscriberStatus(arg) {
  if (!(arg instanceof proto_management_pb.ZDSubscriberStatus)) {
    throw new Error('Expected argument of type zdautomotive.protobuf.ZDSubscriberStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_zdautomotive_protobuf_ZDSubscriberStatus(buffer_arg) {
  return proto_management_pb.ZDSubscriberStatus.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServiceManagerService = exports.ServiceManagerService = {
  // *
// 发送ping/pong请求，判断grpc server是否启动
ping: {
    path: '/zdautomotive.protobuf.ServiceManager/ping',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // *
// 观察者/生产者订阅频道
register: {
    path: '/zdautomotive.protobuf.ServiceManager/register',
    requestStream: false,
    responseStream: true,
    requestType: proto_management_pb.ZDServiceSubscriber,
    responseType: proto_management_pb.ZDServiceRequest,
    requestSerialize: serialize_zdautomotive_protobuf_ZDServiceSubscriber,
    requestDeserialize: deserialize_zdautomotive_protobuf_ZDServiceSubscriber,
    responseSerialize: serialize_zdautomotive_protobuf_ZDServiceRequest,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDServiceRequest,
  },
  // *
// 观察者长连接保活/生产者同步服务状态
keepAlive: {
    path: '/zdautomotive.protobuf.ServiceManager/keepAlive',
    requestStream: true,
    responseStream: true,
    requestType: proto_management_pb.ZDSubscriberStatus,
    responseType: proto_wrappers_pb.ZDResponse,
    requestSerialize: serialize_zdautomotive_protobuf_ZDSubscriberStatus,
    requestDeserialize: deserialize_zdautomotive_protobuf_ZDSubscriberStatus,
    responseSerialize: serialize_zdautomotive_protobuf_ZDResponse,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDResponse,
  },
  // *
// 生产者提交请求处理结果
submitRequestResult: {
    path: '/zdautomotive.protobuf.ServiceManager/submitRequestResult',
    requestStream: false,
    responseStream: false,
    requestType: proto_management_pb.ZDServiceRequestResult,
    responseType: proto_wrappers_pb.ZDResponse,
    requestSerialize: serialize_zdautomotive_protobuf_ZDServiceRequestResult,
    requestDeserialize: deserialize_zdautomotive_protobuf_ZDServiceRequestResult,
    responseSerialize: serialize_zdautomotive_protobuf_ZDResponse,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDResponse,
  },
  // *
// 观察者/生产者取消订阅
unregister: {
    path: '/zdautomotive.protobuf.ServiceManager/unregister',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_wrappers_pb.StringValue,
    responseType: proto_wrappers_pb.ZDResponse,
    requestSerialize: serialize_google_protobuf_StringValue,
    requestDeserialize: deserialize_google_protobuf_StringValue,
    responseSerialize: serialize_zdautomotive_protobuf_ZDResponse,
    responseDeserialize: deserialize_zdautomotive_protobuf_ZDResponse,
  },
};

exports.ServiceManagerClient = grpc.makeGenericClientConstructor(ServiceManagerService);
