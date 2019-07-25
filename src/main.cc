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


void RotateR(const CallbackInfo& info) {
  Env env = info.Env();
  Uint8Array u;
  Uint8Array f;
  Uint8Array d;
  Uint8Array b;
  Uint8Array r;
  uint8_t k[3];
  ROTATE_CHECK(info, env, u, f, d, b, r);
  k[0] = u[2];
  k[1] = u[3];
  k[2] = u[4];

  //return info[0].As<TypedArray>();
  //return Number::New(env, ta.ElementSize());
}

Object InitAll(Env env, Object exports) {
  exports.Set("rotateR", Function::New(env, RotateR));
  return exports;
}

#undef FN_SETUP

NODE_API_MODULE(rubicube_native, InitAll)
