'use strict';

module.exports = {
  fns: {
    rotateR,
    rotateRp,
    rotateL,
    rotateLp,
    rotateU,
    rotateUp,
    rotateD,
    rotateDp,
    rotateF,
    rotateFp,
    rotateB,
    rotateBp,
  },
  moves: {
    'r': rotateR,
    'r\'': rotateRp,
    'l': rotateL,
    'l\'': rotateLp,
    'u': rotateU,
    'u\'': rotateUp,
    'd': rotateD,
    'd\'': rotateDp,
    'f': rotateF,
    'f\'': rotateFp,
    'b': rotateB,
    'b\'': rotateBp,
  },
};

function rotateR(cube, state) {
  const u = cube[state.u];
  const f = cube[state.f];
  const d = cube[state.d];
  const b = cube[state.b];
  const r = cube[state.r];
  const k = [u[2], u[3], u[4]];
  const s = r[0];
  u[2] = f[2]; u[3] = f[3]; u[4] = f[4];
  f[2] = d[6]; f[3] = d[7]; f[4] = d[0];
  d[0] = b[0]; d[7] = b[7]; d[6] = b[6];
  b[0] = k[2]; b[7] = k[1]; b[6] = k[0];
  r[0] = r[1]; r[1] = r[2]; r[2] = r[3]; r[3] = r[4];
  r[4] = r[5]; r[5] = r[6]; r[6] = r[7]; r[7] = s;
}

function rotateRp(cube, state) {
  const u = cube[state.u];
  const f = cube[state.f];
  const d = cube[state.d];
  const b = cube[state.b];
  const r = cube[state.r];
  const k = [u[2], u[3], u[4]];
  const s = r[7];
  u[2] = b[6]; u[3] = b[7]; u[4] = b[0];
  b[0] = d[0]; b[7] = d[7]; b[6] = d[6];
  d[0] = f[4]; d[7] = f[3]; d[6] = f[2];
  f[2] = k[0]; f[3] = k[1]; f[4] = k[2];
  r[7] = r[6]; r[6] = r[5]; r[5] = r[4]; r[4] = r[3];
  r[3] = r[2]; r[2] = r[1]; r[1] = r[0]; r[0] = s;
}

function rotateL(cube, state) {
}

function rotateLp(cube, state) {
}

function rotateU(cube, state) {
}

function rotateUp(cube, state) {
}

function rotateD(cube, state) {
}

function rotateDp(cube, state) {
}

function rotateF(cube, state) {
}

function rotateFp(cube, state) {
}

function rotateB(cube, state) {
}

function rotateBp(cube, state) {
}
