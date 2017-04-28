// Code generated by protoc-gen-go.
// source: api.proto
// DO NOT EDIT!

/*
Package stakepoolrpc is a generated protocol buffer package.

It is generated from these files:
	api.proto

It has these top-level messages:
	PingRequest
	PingResponse
	UpdateVotingPrefsRequest
	UpdateVotingPrefsResponse
	VersionRequest
	VersionResponse
*/
package stakepoolrpc

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type PingRequest struct {
}

func (m *PingRequest) Reset()                    { *m = PingRequest{} }
func (m *PingRequest) String() string            { return proto.CompactTextString(m) }
func (*PingRequest) ProtoMessage()               {}
func (*PingRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

type PingResponse struct {
}

func (m *PingResponse) Reset()                    { *m = PingResponse{} }
func (m *PingResponse) String() string            { return proto.CompactTextString(m) }
func (*PingResponse) ProtoMessage()               {}
func (*PingResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

type UpdateVotingPrefsRequest struct {
	Userid int64 `protobuf:"varint,1,opt,name=Userid" json:"Userid,omitempty"`
}

func (m *UpdateVotingPrefsRequest) Reset()                    { *m = UpdateVotingPrefsRequest{} }
func (m *UpdateVotingPrefsRequest) String() string            { return proto.CompactTextString(m) }
func (*UpdateVotingPrefsRequest) ProtoMessage()               {}
func (*UpdateVotingPrefsRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

func (m *UpdateVotingPrefsRequest) GetUserid() int64 {
	if m != nil {
		return m.Userid
	}
	return 0
}

type UpdateVotingPrefsResponse struct {
}

func (m *UpdateVotingPrefsResponse) Reset()                    { *m = UpdateVotingPrefsResponse{} }
func (m *UpdateVotingPrefsResponse) String() string            { return proto.CompactTextString(m) }
func (*UpdateVotingPrefsResponse) ProtoMessage()               {}
func (*UpdateVotingPrefsResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{3} }

type VersionRequest struct {
}

func (m *VersionRequest) Reset()                    { *m = VersionRequest{} }
func (m *VersionRequest) String() string            { return proto.CompactTextString(m) }
func (*VersionRequest) ProtoMessage()               {}
func (*VersionRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{4} }

type VersionResponse struct {
	VersionString string `protobuf:"bytes,1,opt,name=version_string,json=versionString" json:"version_string,omitempty"`
	Major         uint32 `protobuf:"varint,2,opt,name=major" json:"major,omitempty"`
	Minor         uint32 `protobuf:"varint,3,opt,name=minor" json:"minor,omitempty"`
	Patch         uint32 `protobuf:"varint,4,opt,name=patch" json:"patch,omitempty"`
	Prerelease    string `protobuf:"bytes,5,opt,name=prerelease" json:"prerelease,omitempty"`
	BuildMetadata string `protobuf:"bytes,6,opt,name=build_metadata,json=buildMetadata" json:"build_metadata,omitempty"`
}

func (m *VersionResponse) Reset()                    { *m = VersionResponse{} }
func (m *VersionResponse) String() string            { return proto.CompactTextString(m) }
func (*VersionResponse) ProtoMessage()               {}
func (*VersionResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{5} }

func (m *VersionResponse) GetVersionString() string {
	if m != nil {
		return m.VersionString
	}
	return ""
}

func (m *VersionResponse) GetMajor() uint32 {
	if m != nil {
		return m.Major
	}
	return 0
}

func (m *VersionResponse) GetMinor() uint32 {
	if m != nil {
		return m.Minor
	}
	return 0
}

func (m *VersionResponse) GetPatch() uint32 {
	if m != nil {
		return m.Patch
	}
	return 0
}

func (m *VersionResponse) GetPrerelease() string {
	if m != nil {
		return m.Prerelease
	}
	return ""
}

func (m *VersionResponse) GetBuildMetadata() string {
	if m != nil {
		return m.BuildMetadata
	}
	return ""
}

func init() {
	proto.RegisterType((*PingRequest)(nil), "stakepoolrpc.PingRequest")
	proto.RegisterType((*PingResponse)(nil), "stakepoolrpc.PingResponse")
	proto.RegisterType((*UpdateVotingPrefsRequest)(nil), "stakepoolrpc.UpdateVotingPrefsRequest")
	proto.RegisterType((*UpdateVotingPrefsResponse)(nil), "stakepoolrpc.UpdateVotingPrefsResponse")
	proto.RegisterType((*VersionRequest)(nil), "stakepoolrpc.VersionRequest")
	proto.RegisterType((*VersionResponse)(nil), "stakepoolrpc.VersionResponse")
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// Client API for StakepooldService service

type StakepooldServiceClient interface {
	// Queries
	Ping(ctx context.Context, in *PingRequest, opts ...grpc.CallOption) (*PingResponse, error)
	// Control
	UpdateVotingPrefs(ctx context.Context, in *UpdateVotingPrefsRequest, opts ...grpc.CallOption) (*UpdateVotingPrefsResponse, error)
}

type stakepooldServiceClient struct {
	cc *grpc.ClientConn
}

func NewStakepooldServiceClient(cc *grpc.ClientConn) StakepooldServiceClient {
	return &stakepooldServiceClient{cc}
}

func (c *stakepooldServiceClient) Ping(ctx context.Context, in *PingRequest, opts ...grpc.CallOption) (*PingResponse, error) {
	out := new(PingResponse)
	err := grpc.Invoke(ctx, "/stakepoolrpc.StakepooldService/Ping", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *stakepooldServiceClient) UpdateVotingPrefs(ctx context.Context, in *UpdateVotingPrefsRequest, opts ...grpc.CallOption) (*UpdateVotingPrefsResponse, error) {
	out := new(UpdateVotingPrefsResponse)
	err := grpc.Invoke(ctx, "/stakepoolrpc.StakepooldService/UpdateVotingPrefs", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for StakepooldService service

type StakepooldServiceServer interface {
	// Queries
	Ping(context.Context, *PingRequest) (*PingResponse, error)
	// Control
	UpdateVotingPrefs(context.Context, *UpdateVotingPrefsRequest) (*UpdateVotingPrefsResponse, error)
}

func RegisterStakepooldServiceServer(s *grpc.Server, srv StakepooldServiceServer) {
	s.RegisterService(&_StakepooldService_serviceDesc, srv)
}

func _StakepooldService_Ping_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PingRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(StakepooldServiceServer).Ping(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/stakepoolrpc.StakepooldService/Ping",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(StakepooldServiceServer).Ping(ctx, req.(*PingRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _StakepooldService_UpdateVotingPrefs_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateVotingPrefsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(StakepooldServiceServer).UpdateVotingPrefs(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/stakepoolrpc.StakepooldService/UpdateVotingPrefs",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(StakepooldServiceServer).UpdateVotingPrefs(ctx, req.(*UpdateVotingPrefsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _StakepooldService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "stakepoolrpc.StakepooldService",
	HandlerType: (*StakepooldServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Ping",
			Handler:    _StakepooldService_Ping_Handler,
		},
		{
			MethodName: "UpdateVotingPrefs",
			Handler:    _StakepooldService_UpdateVotingPrefs_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "api.proto",
}

// Client API for VersionService service

type VersionServiceClient interface {
	Version(ctx context.Context, in *VersionRequest, opts ...grpc.CallOption) (*VersionResponse, error)
}

type versionServiceClient struct {
	cc *grpc.ClientConn
}

func NewVersionServiceClient(cc *grpc.ClientConn) VersionServiceClient {
	return &versionServiceClient{cc}
}

func (c *versionServiceClient) Version(ctx context.Context, in *VersionRequest, opts ...grpc.CallOption) (*VersionResponse, error) {
	out := new(VersionResponse)
	err := grpc.Invoke(ctx, "/stakepoolrpc.VersionService/Version", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for VersionService service

type VersionServiceServer interface {
	Version(context.Context, *VersionRequest) (*VersionResponse, error)
}

func RegisterVersionServiceServer(s *grpc.Server, srv VersionServiceServer) {
	s.RegisterService(&_VersionService_serviceDesc, srv)
}

func _VersionService_Version_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(VersionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(VersionServiceServer).Version(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/stakepoolrpc.VersionService/Version",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(VersionServiceServer).Version(ctx, req.(*VersionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _VersionService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "stakepoolrpc.VersionService",
	HandlerType: (*VersionServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Version",
			Handler:    _VersionService_Version_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "api.proto",
}

func init() { proto.RegisterFile("api.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 324 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x84, 0x92, 0x4d, 0x4f, 0x72, 0x31,
	0x10, 0x85, 0x73, 0x5f, 0x3e, 0xde, 0x30, 0x02, 0x4a, 0x63, 0x4c, 0xb9, 0x7e, 0x84, 0xdc, 0x44,
	0x65, 0xc5, 0x02, 0xd7, 0x6e, 0xdd, 0x99, 0x90, 0x4b, 0x20, 0xee, 0x48, 0xa1, 0x23, 0x56, 0xa1,
	0xad, 0x6d, 0xe1, 0xb7, 0xb9, 0xf5, 0x9f, 0x99, 0xdb, 0x16, 0x02, 0x11, 0xe2, 0xf2, 0x3c, 0x9d,
	0x99, 0x33, 0x39, 0x53, 0xa8, 0x31, 0x2d, 0x7a, 0xda, 0x28, 0xa7, 0x48, 0xdd, 0x3a, 0xf6, 0x81,
	0x5a, 0xa9, 0x85, 0xd1, 0xb3, 0xac, 0x01, 0x27, 0x03, 0x21, 0xe7, 0x39, 0x7e, 0xae, 0xd0, 0xba,
	0xac, 0x09, 0xf5, 0x20, 0xad, 0x56, 0xd2, 0x62, 0xd6, 0x07, 0x3a, 0xd2, 0x9c, 0x39, 0x1c, 0x2b,
	0x27, 0xe4, 0x7c, 0x60, 0xf0, 0xd5, 0xc6, 0x5a, 0x72, 0x01, 0xd5, 0x91, 0x45, 0x23, 0x38, 0x4d,
	0x3a, 0x49, 0xb7, 0x94, 0x47, 0x95, 0x5d, 0x42, 0xfb, 0x40, 0x4f, 0x1c, 0x78, 0x06, 0xcd, 0x31,
	0x1a, 0x2b, 0x94, 0xdc, 0x58, 0x7e, 0x27, 0x70, 0xba, 0x45, 0xa1, 0x8a, 0xdc, 0x42, 0x73, 0x1d,
	0xd0, 0xc4, 0x3a, 0x23, 0xe4, 0xdc, 0x5b, 0xd4, 0xf2, 0x46, 0xa4, 0x43, 0x0f, 0xc9, 0x39, 0x54,
	0x96, 0xec, 0x5d, 0x19, 0xfa, 0xaf, 0x93, 0x74, 0x1b, 0x79, 0x10, 0x9e, 0x0a, 0xa9, 0x0c, 0x2d,
	0x45, 0x5a, 0x88, 0x82, 0x6a, 0xe6, 0x66, 0x6f, 0xb4, 0x1c, 0xa8, 0x17, 0xe4, 0x06, 0x40, 0x1b,
	0x34, 0xb8, 0x40, 0x66, 0x91, 0x56, 0xbc, 0xc9, 0x0e, 0x29, 0x16, 0x99, 0xae, 0xc4, 0x82, 0x4f,
	0x96, 0xe8, 0x18, 0x67, 0x8e, 0xd1, 0x6a, 0x58, 0xc4, 0xd3, 0xe7, 0x08, 0xfb, 0x5f, 0x09, 0xb4,
	0x86, 0x9b, 0x58, 0xf9, 0x10, 0xcd, 0x5a, 0xcc, 0x90, 0x3c, 0x42, 0xb9, 0x08, 0x93, 0xb4, 0x7b,
	0xbb, 0x91, 0xf7, 0x76, 0xf2, 0x4e, 0xd3, 0x43, 0x4f, 0x31, 0x04, 0x0e, 0xad, 0x5f, 0x39, 0x92,
	0xbb, 0xfd, 0x86, 0x63, 0xc7, 0x49, 0xef, 0xff, 0xac, 0x0b, 0x2e, 0xfd, 0x97, 0xed, 0x41, 0x36,
	0x6b, 0x3f, 0xc1, 0xff, 0x48, 0xc8, 0xd5, 0xfe, 0x94, 0xfd, 0xcb, 0xa5, 0xd7, 0x47, 0x5e, 0xc3,
	0xe4, 0x69, 0xd5, 0xff, 0xb7, 0x87, 0x9f, 0x00, 0x00, 0x00, 0xff, 0xff, 0x4c, 0x5b, 0x70, 0x0b,
	0x7c, 0x02, 0x00, 0x00,
}
