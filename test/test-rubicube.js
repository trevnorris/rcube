'use strict';

const { RubiCube } = require('../lib/rubicube.js');


const ITER = 1e6;
const t = hr2ms();
const r = new RubiCube();
for (var i = 0; i < ITER; i++) {
  r.rotate(`R U B L' L' R B U D`);
  //r.build();
}
const u = hr2ms();
console.log(ITER / (u - t), 'iter ms');
console.log(u-t, 'total ms');

function hr2ms() {
  const t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
}
/* */

/*
const r = new RubiCube();
//console.log(r.build());
r.rotate(`R' D' B' L' F' D' U' D' L' F' B'`);
console.log(r.build());
//r.rotate('r r r');
//console.log(r.build());
//console.log(r._cube);
/* */
