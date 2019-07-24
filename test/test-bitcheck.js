'use strict';

const { RubiCube } = require('../lib/rubicube.js');
const { gen_moves } = require('../gen-cube.js');

const cube = new RubiCube();

console.log(cube._cube);
return;

console.log(cube.compact());
console.log(cube.compact().map((e, i, a) => {
  //e = (e >> (i * 3)) & 0b111;
  return padbits(e.toString(2), 8 * 3);
}));

//console.log(compact4bit(cube));
//console.log(compact4bit(cube).map(e => padbits(e.toString(2))));

//cube.rotate(gen_moves(20));
//console.log(compact4bit(cube));


function compact4bit(cube, n = 4) {
  const vals = [];
  for (let e of cube._cube) {
    let s = 0;
    s += (e[0] + 1);
    s += (e[1] + 1) << (n * 1);
    s += (e[2] + 1) << (n * 2);
    s += (e[3] + 1) << (n * 3);
    s += (e[4] + 1) << (n * 4);
    s += (e[5] + 1) << (n * 5);
    s += (e[6] + 1) << (n * 6);
    s += (e[7] + 1) << (n * 7);
    vals.push(s);
  }
  return vals;
}

function expandBits(com) {
  const vals = [];
  for (let e of com) {
    let s = 0;
  }
}

function padbits(n, l = 32) {
  return '0'.repeat(l - n.length) + n;
}
