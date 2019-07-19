'use strict';

const { arrF, replace } = require('./utils.js');
const rotator = require('./rotator.js');

class RubiCube {
  constructor() {
    const ui8 = new Uint8Array(8 * 6);
    this._cube = [
      ui8.subarray(0, 8).fill(0), ui8.subarray(8, 16).fill(1),
      ui8.subarray(16, 24).fill(2), ui8.subarray(24, 32).fill(3),
      ui8.subarray(32, 40).fill(4), ui8.subarray(40).fill(5),
    ];
    this._state = { u: 0, f: 1, l: 2, b: 3, r: 4, d: 5 };
    this._colors = { u: 'w', f: 'g', l: 'o', b: 'b', r: 'r', d: 'y' }
    this._state_inv = [];
    for (let i in this._state) {
      this._state_inv[this._state[i]] = i;
    }
  }
  build = build;
  rotate = rotate;
}

function build() {
  const cube = [];
  this._cube.forEach(e => {
    const a = [];
    for (let o of e) {
      a.push(this._colors[this._state_inv[o]]);
    }
    cube.push(a);
  });
  return cube;
}

function rotate(move) {
  move = move.toLowerCase();
  // TODO: Split on whitespace, not single space.
  move.split(' ').forEach(m => {
    // TODO: Should this detect if something goes wrong?
    rotator.moves[m](this._cube, this._state);
  });
}


/*
const ITER = 1e6;
const t = hr2ms();
const r = new RubiCube();
for (var i = 0; i < ITER; i++) {
  r.rotate(`r r r' r r' r' r`);
  //r.build();
}
const u = hr2ms();
console.log(ITER / (u - t));
console.log(u-t);

function hr2ms() {
  const t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
}
/* */

const r = new RubiCube();
//console.log(r.build());
r.rotate(`R' D' B' L' F' D' U' D' L' F' B'`);
console.log(r.build());
//r.rotate('r r r');
//console.log(r.build());
//console.log(r._cube);
/* */
