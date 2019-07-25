'use strict';

const rubin = require('../build/Release/rubicube_native.node');
const { RubiCube } = require('../lib/rubicube.js');

const r1 = new RubiCube();

const ITER = 1e6;
let t = process.hrtime();
for (let i = 0; i < ITER; i++) {
  //r1.rotate([2]);
  //r1.rotate([1]);
  //rubin.rotateR(r1._cubeab);
  r1._rotateArray2(r1, [1]);
}
t = process.hrtime(t);
console.log((t[0] * 1e9 + t[1]) / ITER);
