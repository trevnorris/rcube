#include <napi.h>

using Napi::CallbackInfo;
using Napi::Env;
using Napi::Function;
using Napi::Object;
using Napi::TypeError;
using Napi::TypedArray;
using Napi::Uint8Array;

#define ROTATE_CHECK(info, env, a, b, c, d, e)                                 \
  do {                                                                         \
    if (info.Length() != 5 ||                                                  \
        !info[0].IsTypedArray() ||                                             \
        !info[1].IsTypedArray() ||                                             \
        !info[2].IsTypedArray() ||                                             \
        !info[3].IsTypedArray() ||                                             \
        !info[4].IsTypedArray()) {                                             \
      TypeError::New(env, "TypedArray expected")                               \
        .ThrowAsJavaScriptException();                                         \
    }                                                                          \
    if (info[0].As<TypedArray>().TypedArrayType() != napi_uint8_array ||       \
        info[1].As<TypedArray>().TypedArrayType() != napi_uint8_array ||       \
        info[2].As<TypedArray>().TypedArrayType() != napi_uint8_array ||       \
        info[3].As<TypedArray>().TypedArrayType() != napi_uint8_array ||       \
        info[4].As<TypedArray>().TypedArrayType() != napi_uint8_array) {       \
      TypeError::New(env, "Uint8Array expected")                               \
        .ThrowAsJavaScriptException();                                         \
    }                                                                          \
    a = info[0].As<Uint8Array>();                                              \
    b = info[1].As<Uint8Array>();                                              \
    c = info[2].As<Uint8Array>();                                              \
    d = info[3].As<Uint8Array>();                                              \
    e = info[4].As<Uint8Array>();                                              \
    if (a.ElementLength() != 8 ||                                              \
        b.ElementLength() != 8 ||                                              \
        c.ElementLength() != 8 ||                                              \
        d.ElementLength() != 8 ||                                              \
        e.ElementLength() != 8) {                                              \
      TypeError::New(env, "All faces should have 8 tiles")                     \
        .ThrowAsJavaScriptException();                                         \
    }                                                                          \
  } while(0)

static void RotateCW(Uint8Array& arr) {
  uint8_t s[2] = { arr[0], arr[1] };
  arr[0] = arr[6]; arr[6] = arr[4]; arr[4] = arr[2]; arr[2] = s[0];
  arr[1] = arr[7]; arr[7] = arr[5]; arr[5] = arr[3]; arr[3] = s[1];
}

static void RotateCCW(Uint8Array& arr) {
  uint8_t s[2] = { arr[0], arr[1] };
  arr[0] = arr[2]; arr[2] = arr[4]; arr[4] = arr[6]; arr[6] = s[0];
  arr[1] = arr[3]; arr[3] = arr[5]; arr[5] = arr[7]; arr[7] = s[1];
}

static void RotateR(const CallbackInfo& info) {
  Env env = info.Env();
  Uint8Array u;
  Uint8Array f;
  Uint8Array d;
  Uint8Array b;
  Uint8Array r;
  uint8_t k[3];
  ROTATE_CHECK(info, env, u, f, d, b, r);
  k[0] = u[2]; k[1] = u[3]; k[2] = u[4];
  u[2] = f[2]; u[3] = f[3]; u[4] = f[4];
  f[2] = d[6]; f[3] = d[7]; f[4] = d[0];
  d[0] = b[0]; d[7] = b[7]; d[6] = b[6];
  b[0] = k[2]; b[7] = k[1]; b[6] = k[0];
  RotateCW(r);
}

Object InitAll(Env env, Object exports) {
  exports.Set("rotateR", Function::New(env, RotateR));
  return exports;
}

#undef FN_SETUP

NODE_API_MODULE(rubicube_native, InitAll)
