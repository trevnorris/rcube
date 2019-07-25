'use strict';

const rubin = require('../build/Release/rubicube_native.node');
const { RubiCube } = require('../lib/rubicube.js');
const assert = require('assert');

const m = `r l d2 f2 b' u`;

const r1 = new RubiCube();
const r2 = new RubiCube();

// Check that initial array matches a 3-bit compaction.
assert.deepEqual(r1.compact(), [
  0x249249, 0x492492, 0x6db6db, 0x924924, 0xb6db6d, 0xdb6db6,
]);
// Check that initial array matches a 4-bit compaction.
assert.deepEqual(r1.compact(4), [
  0x11111111, 0x22222222, 0x33333333, 0x44444444, 0x55555555, 0x66666666,
]);

r1.rotate(m);
r2.rotate(RubiCube.rotate2Array(m));

// Check that conversion of move string to array is correct.
assert.deepEqual(r1.build(), r2.build());

let cp1 = r1.compact(4);

// Check that both compactions match.
assert.deepEqual(cp1, r2.compact(4));

r2.reset();

// Check that reset() works
assert.deepEqual(r2.compact(), [
  0x249249, 0x492492, 0x6db6db, 0x924924, 0xb6db6d, 0xdb6db6,
]);
r2.expand(cp1, 4);
assert.deepEqual(r2.compact(4), cp1);

cp1 = r1.compact();

assert.deepEqual(cp1, r2.compact());
r2.reset();
r2.expand(cp1);
assert.deepEqual(r2._cube, r1._cube);

function callNativeRotateR(cube, state) {
  const u = cube[state.u];
  const f = cube[state.f];
  const d = cube[state.d];
  const b = cube[state.b];
  const r = cube[state.r];
  rubin.rotateR(u, f, d, b, r);
}

r1.reset().rotate('r');
r2.reset();
callNativeRotateR(r2._cube, r2._state);
assert.deepEqual(r1.build(), r2.build());

const ITER = 1e6;
let t = process.hrtime();
for (let i = 0; i < ITER; i++) {
  r1.rotate([2]);
  //r1.rotate([1]);
}
t = process.hrtime(t);
console.log((t[0] * 1e9 + t[1]) / ITER);

/*
const y = RubiCube.rotate2Array(m);
const z = RubiCube.rotate2String(y);
console.log(m);
console.log(y);
console.log(z);
*/
