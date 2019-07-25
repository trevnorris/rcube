'use strict';

const moves = {
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
};

const moveListArray = `r r' l l' u u' d d' f f' b b'`.split(' ');
const movesArr = [null];
const moveList = {};

moveListArray.forEach((e, i) => {
  moveList[e] = i + 1;
  movesArr[i + 1] = moves[e];
});
moveListArray.unshift(null);

module.exports = {
  moves,
  movesArr,
  moveListArray,
  moveList,
};

function rotateR(cube, state) {
  const u = cube[state.u];
  const f = cube[state.f];
  const d = cube[state.d];
  const b = cube[state.b];
  const k = [u[2], u[3], u[4]];
  u[2] = f[2]; u[3] = f[3]; u[4] = f[4];
  f[2] = d[6]; f[3] = d[7]; f[4] = d[0];
  d[0] = b[0]; d[7] = b[7]; d[6] = b[6];
  b[0] = k[2]; b[7] = k[1]; b[6] = k[0];
  rotateCW(cube[state.r]);
}

function rotateRp(cube, state) {
  const u = cube[state.u];
  const f = cube[state.f];
  const d = cube[state.d];
  const b = cube[state.b];
  const k = [u[2], u[3], u[4]];
  u[2] = b[6]; u[3] = b[7]; u[4] = b[0];
  b[0] = d[0]; b[7] = d[7]; b[6] = d[6];
  d[0] = f[4]; d[7] = f[3]; d[6] = f[2];
  f[2] = k[0]; f[3] = k[1]; f[4] = k[2];
  rotateCCW(cube[state.r]);
}

function rotateL(cube, state) {
  const u = cube[state.u];
  const b = cube[state.b];
  const d = cube[state.d];
  const f = cube[state.f];
  const k = [u[0], u[7], u[6]];
  u[0] = b[4]; u[7] = b[3]; u[6] = b[2];
  b[2] = d[2]; b[3] = d[3]; b[4] = d[4];
  d[2] = f[6]; d[3] = f[7]; d[4] = f[0];
  f[0] = k[0]; f[7] = k[1]; f[6] = k[2];
  rotateCW(cube[state.l]);
}

function rotateLp(cube, state) {
  const u = cube[state.u];
  const b = cube[state.b];
  const d = cube[state.d];
  const f = cube[state.f];
  const k = [u[0], u[7], u[6]];
  u[0] = f[0]; u[7] = f[7]; u[6] = f[6];
  f[0] = d[4]; f[7] = d[3]; f[6] = d[2];
  d[2] = b[2]; d[3] = b[3]; d[4] = b[4];
  b[2] = k[2]; b[3] = k[1]; b[4] = k[0];
  rotateCCW(cube[state.l]);
}

function rotateU(cube, state) {
  const f = cube[state.f];
  const r = cube[state.r];
  const b = cube[state.b];
  const l = cube[state.l];
  const k = [f[0], f[1], f[2]];
  f[0] = r[0]; f[1] = r[1]; f[2] = r[2];
  r[0] = b[0]; r[1] = b[1]; r[2] = b[2];
  b[0] = l[0]; b[1] = l[1]; b[2] = l[2];
  l[0] = k[0]; l[1] = k[1]; l[2] = k[2];
  rotateCW(cube[state.u]);
}

function rotateUp(cube, state) {
  const f = cube[state.f];
  const r = cube[state.r];
  const b = cube[state.b];
  const l = cube[state.l];
  const k = [f[0], f[1], f[2]];
  f[0] = l[0]; f[1] = l[1]; f[2] = l[2];
  l[0] = b[0]; l[1] = b[1]; l[2] = b[2];
  b[0] = r[0]; b[1] = r[1]; b[2] = r[2];
  r[0] = k[0]; r[1] = k[1]; r[2] = k[2];
  rotateCCW(cube[state.u]);
}

function rotateD(cube, state) {
  const f = cube[state.f];
  const l = cube[state.l];
  const b = cube[state.b];
  const r = cube[state.r];
  const k = [f[4], f[5], f[6]];
  f[4] = l[4]; f[5] = l[5]; f[6] = l[6];
  l[4] = b[4]; l[5] = b[5]; l[6] = b[6];
  b[4] = r[4]; b[5] = r[5]; b[6] = r[6];
  r[4] = k[0]; r[5] = k[1]; r[6] = k[2];
  rotateCW(cube[state.d]);
}

function rotateDp(cube, state) {
  const f = cube[state.f];
  const l = cube[state.l];
  const b = cube[state.b];
  const r = cube[state.r];
  const k = [f[4], f[5], f[6]];
  f[4] = r[4]; f[5] = r[5]; f[6] = r[6];
  r[4] = b[4]; r[5] = b[5]; r[6] = b[6];
  b[4] = l[4]; b[5] = l[5]; b[6] = l[6];
  l[4] = k[0]; l[5] = k[1]; l[6] = k[2];
  rotateCCW(cube[state.d]);
}

function rotateF(cube, state) {
  const u = cube[state.u];
  const l = cube[state.l];
  const d = cube[state.d];
  const r = cube[state.r];
  const k = [u[4], u[5], u[6]];
  u[4] = l[2]; u[5] = l[3]; u[6] = l[4];
  l[2] = d[4]; l[3] = d[5]; l[4] = d[6];
  d[4] = r[6]; d[5] = r[7]; d[6] = r[0];
  r[0] = k[2]; r[7] = k[1]; r[6] = k[0];
  rotateCW(cube[state.f]);
}

function rotateFp(cube, state) {
  const u = cube[state.u];
  const l = cube[state.l];
  const d = cube[state.d];
  const r = cube[state.r];
  const k = [u[4], u[5], u[6]];
  u[4] = r[6]; u[5] = r[7]; u[6] = r[0];
  r[0] = d[6]; r[7] = d[5]; r[6] = d[4];
  d[4] = l[2]; d[5] = l[3]; d[6] = l[4];
  l[2] = k[0]; l[3] = k[1]; l[4] = k[2];
  rotateCCW(cube[state.f]);
}

function rotateB(cube, state) {
  const u = cube[state.u];
  const r = cube[state.r];
  const d = cube[state.d];
  const l = cube[state.l];
  const k = [u[0], u[1], u[2]];
  u[0] = r[2]; u[1] = r[3]; u[2] = r[4];
  r[2] = d[0]; r[3] = d[1]; r[4] = d[2];
  d[0] = l[6]; d[1] = l[7]; d[2] = l[0];
  l[0] = k[2]; l[7] = k[1]; l[6] = k[0];
  rotateCW(cube[state.b]);
}

function rotateBp(cube, state) {
  const u = cube[state.u];
  const r = cube[state.r];
  const d = cube[state.d];
  const l = cube[state.l];
  const k = [u[0], u[1], u[2]];
  u[0] = l[6]; u[1] = l[7]; u[2] = l[0];
  l[0] = d[2]; l[7] = d[1]; l[6] = d[0];
  d[0] = r[2]; d[1] = r[3]; d[2] = r[4];
  r[2] = k[0]; r[3] = k[1]; r[4] = k[2];
  rotateCCW(cube[state.b]);
}

function rotateCW(arr) {
  const s = [arr[0], arr[1]];
  arr[0] = arr[6]; arr[6] = arr[4]; arr[4] = arr[2]; arr[2] = s[0];
  arr[1] = arr[7]; arr[7] = arr[5]; arr[5] = arr[3]; arr[3] = s[1];
}

function rotateCCW(arr) {
  const s = [arr[0], arr[1]];
  arr[0] = arr[2]; arr[2] = arr[4]; arr[4] = arr[6]; arr[6] = s[0];
  arr[1] = arr[3]; arr[3] = arr[5]; arr[5] = arr[7]; arr[7] = s[1];
}
