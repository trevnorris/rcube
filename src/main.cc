#include <v8.h>
#include <node.h>

#define u_offset (0 * 8)
#define f_offset (1 * 8)
#define l_offset (2 * 8)
#define b_offset (3 * 8)
#define r_offset (4 * 8)
#define d_offset (5 * 8)

#define FACE_VARS(a, b, c, d, e)                                               \
  uint8_t* a = cube + a ## _offset;                                            \
  uint8_t* b = cube + b ## _offset;                                            \
  uint8_t* c = cube + c ## _offset;                                            \
  uint8_t* d = cube + d ## _offset;                                            \
  uint8_t* e = cube + e ## _offset;

using v8::ArrayBuffer;
using v8::FunctionCallbackInfo;
using v8::Local;
using v8::Object;
using v8::Value;

static void RotateCW(uint8_t* arr) {
  uint8_t s[2] = { arr[0], arr[1] };
  arr[0] = arr[6]; arr[6] = arr[4]; arr[4] = arr[2]; arr[2] = s[0];
  arr[1] = arr[7]; arr[7] = arr[5]; arr[5] = arr[3]; arr[3] = s[1];
}

static void RotateCCW(uint8_t* arr) {
  uint8_t s[2] = { arr[0], arr[1] };
  arr[0] = arr[2]; arr[2] = arr[4]; arr[4] = arr[6]; arr[6] = s[0];
  arr[1] = arr[3]; arr[3] = arr[5]; arr[5] = arr[7]; arr[7] = s[1];
}

static void RotateR(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, f, d, b, r)
  uint8_t k[3] = { u[2], u[3], u[4] };
  u[2] = f[2]; u[3] = f[3]; u[4] = f[4];
  f[2] = d[6]; f[3] = d[7]; f[4] = d[0];
  d[0] = b[0]; d[7] = b[7]; d[6] = b[6];
  b[0] = k[2]; b[7] = k[1]; b[6] = k[0];
  RotateCW(r);
}

static void RotateRp(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, f, d, b, r)
  uint8_t k[3] = { u[2], u[3], u[4] };
  u[2] = b[6]; u[3] = b[7]; u[4] = b[0];
  b[0] = d[0]; b[7] = d[7]; b[6] = d[6];
  d[0] = f[4]; d[7] = f[3]; d[6] = f[2];
  f[2] = k[0]; f[3] = k[1]; f[4] = k[2];
  RotateCCW(r);
}

static void RotateL(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, b, d, f, l)
  uint8_t k[3] = { u[0], u[7], u[6] };
  u[0] = b[4]; u[7] = b[3]; u[6] = b[2];
  b[2] = d[2]; b[3] = d[3]; b[4] = d[4];
  d[2] = f[6]; d[3] = f[7]; d[4] = f[0];
  f[0] = k[0]; f[7] = k[1]; f[6] = k[2];
  RotateCW(l);
}

static void RotateLp(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, b, d, f, l)
  uint8_t k[3] = { u[0], u[7], u[6] };
  u[0] = f[0]; u[7] = f[7]; u[6] = f[6];
  f[0] = d[4]; f[7] = d[3]; f[6] = d[2];
  d[2] = b[2]; d[3] = b[3]; d[4] = b[4];
  b[2] = k[2]; b[3] = k[1]; b[4] = k[0];
  RotateCCW(l);
}

static void RotateU(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(f, r, b, l, u)
  uint8_t k[3] = { f[0], f[1], f[2] };
  f[0] = r[0]; f[1] = r[1]; f[2] = r[2];
  r[0] = b[0]; r[1] = b[1]; r[2] = b[2];
  b[0] = l[0]; b[1] = l[1]; b[2] = l[2];
  l[0] = k[0]; l[1] = k[1]; l[2] = k[2];
  RotateCW(u);
}

static void RotateUp(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(f, r, b, l, u)
  uint8_t k[3] = { f[0], f[1], f[2] };
  f[0] = l[0]; f[1] = l[1]; f[2] = l[2];
  l[0] = b[0]; l[1] = b[1]; l[2] = b[2];
  b[0] = r[0]; b[1] = r[1]; b[2] = r[2];
  r[0] = k[0]; r[1] = k[1]; r[2] = k[2];
  RotateCCW(u);
}

static void RotateD(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(f, l, b, r, d)
  uint8_t k[3] = { f[4], f[5], f[6] };
  f[4] = l[4]; f[5] = l[5]; f[6] = l[6];
  l[4] = b[4]; l[5] = b[5]; l[6] = b[6];
  b[4] = r[4]; b[5] = r[5]; b[6] = r[6];
  r[4] = k[0]; r[5] = k[1]; r[6] = k[2];
  RotateCW(d);
}

static void RotateDp(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(f, l, b, r, d)
  uint8_t k[3] = { f[4], f[5], f[6] };
  f[4] = r[4]; f[5] = r[5]; f[6] = r[6];
  r[4] = b[4]; r[5] = b[5]; r[6] = b[6];
  b[4] = l[4]; b[5] = l[5]; b[6] = l[6];
  l[4] = k[0]; l[5] = k[1]; l[6] = k[2];
  RotateCCW(d);
}

static void RotateF(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, l, d, r, f)
  uint8_t k[3] = { u[4], u[5], u[6] };
  u[4] = l[2]; u[5] = l[3]; u[6] = l[4];
  l[2] = d[4]; l[3] = d[5]; l[4] = d[6];
  d[4] = r[6]; d[5] = r[7]; d[6] = r[0];
  r[0] = k[2]; r[7] = k[1]; r[6] = k[0];
  RotateCW(f);
}

static void RotateFp(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, l, d, r, f)
  uint8_t k[3] = { u[4], u[5], u[6] };
  u[4] = r[6]; u[5] = r[7]; u[6] = r[0];
  r[0] = d[6]; r[7] = d[5]; r[6] = d[4];
  d[4] = l[2]; d[5] = l[3]; d[6] = l[4];
  l[2] = k[0]; l[3] = k[1]; l[4] = k[2];
  RotateCCW(f);
}

static void RotateB(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, r, d, l, b)
  uint8_t k[3] = { u[0], u[1], u[2] };
  u[0] = r[2]; u[1] = r[3]; u[2] = r[4];
  r[2] = d[0]; r[3] = d[1]; r[4] = d[2];
  d[0] = l[6]; d[1] = l[7]; d[2] = l[0];
  l[0] = k[2]; l[7] = k[1]; l[6] = k[0];
  RotateCW(b);
}

static void RotateBp(const FunctionCallbackInfo<Value>& info) {
  uint8_t* cube = static_cast<uint8_t*>(
      info[0].As<ArrayBuffer>()->GetContents().Data());
  FACE_VARS(u, r, d, l, b)
  uint8_t k[3] = { u[0], u[1], u[2] };
  u[0] = l[6]; u[1] = l[7]; u[2] = l[0];
  l[0] = d[2]; l[7] = d[1]; l[6] = d[0];
  d[0] = r[2]; d[1] = r[3]; d[2] = r[4];
  r[2] = k[0]; r[3] = k[1]; r[4] = k[2];
  RotateCCW(b);
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "rotateR", RotateR);
  NODE_SET_METHOD(exports, "rotateRp", RotateRp);
  NODE_SET_METHOD(exports, "rotateL", RotateL);
  NODE_SET_METHOD(exports, "rotateLp", RotateLp);
  NODE_SET_METHOD(exports, "rotateU", RotateU);
  NODE_SET_METHOD(exports, "rotateUp", RotateUp);
  NODE_SET_METHOD(exports, "rotateD", RotateD);
  NODE_SET_METHOD(exports, "rotateDp", RotateDp);
  NODE_SET_METHOD(exports, "rotateF", RotateF);
  NODE_SET_METHOD(exports, "rotateFp", RotateFp);
  NODE_SET_METHOD(exports, "rotateB", RotateB);
  NODE_SET_METHOD(exports, "rotateBp", RotateBp);
}

NODE_MODULE(rubicube_native, Initialize)
