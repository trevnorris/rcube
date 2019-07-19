'use strict';

const { arrF, replace } = require('./utils.js');
const rotator = require('./rotator.js');

class RubiCube {
  constructor() {
    this._cube = [ arrF(8, 0), arrF(8, 1), arrF(8, 2),
                    arrF(8, 3), arrF(8, 4), arrF(8, 5) ];
    this._state = { u: 0, f: 1, l: 2, b: 3, r: 4, d: 5 };
    this._colors = { u: 'w', f: 'g', l: 'o', b: 'b', r: 'r', d: 'y' }
  }
  build = build;
  rotate = rotate;
}

function build() {
  return this._cube.map(e => {
    const a = e.slice();
    for (let o in this._state) {
      // TODO: Don't like the +1. Indexes should be fine w/o it.
      replace(a, this._state[o], this._colors[o]);
    }
    return a;
  });
}

function rotate(move) {
  move = move.toLowerCase();
  move.split(' ').forEach(m => {
    // TODO: Should this detect if something goes wrong?
    rotator.moves[m](this._cube, this._state);
  });
}


const ITER = 1e6;
const t = hr2ms();
const r = new RubiCube();
for (var i = 0; i < ITER; i++) {
  r.rotate(`r r r' r r' r' r`);
  r.build();
}
const u = hr2ms();
console.log(ITER / (u - t));
console.log(u-t);

function hr2ms() {
  const t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
}
/* */

/*
const r = new RubiCube();
//console.log(r.build());
r.rotate(`r r'`);
console.log(r.build());
r.rotate('r r r');
console.log(r.build());
//console.log(r._cube);
/* */
