'use strict';

const { RubiCube } = require('../lib/rubicube.js');
const { gen_moves } = require('../gen-cube.js');

//const r = new RubiCube();
//console.log(r.compact());
//r.compact().forEach(e => {
  //console.log(e.toString(2));
//});

console.log(gen_moves(6));
return;

const ITER = 1e6;
const t = hr2ms();
const r = new RubiCube();
for (var i = 0; i < ITER; i++) {
  r.rotate(gen_moves(6));
  //gen_moves(6);
  //r.rotate(`R U B L' L' R B U D`);
  //r.compact();
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
r.rotate(`R2 D'2`);
console.log(r.build());
//r.rotate('r r r');
//console.log(r.build());
//console.log(r._cube);
/* */
