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
    Object.assign(this.moveList, rotator.moveList);
  }
  moveList = {};
  moveListArr = rotator.moveListArr.slice();
  build = build;
  compact = compact;
  reset = reset;
  rotate = rotate;
  //rotate2Array = rotate2Array;
}

module.exports.RubiCube = RubiCube;

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

// TODO: If each of these was shoved into a uint32, would make reading/writing
// much simpler. But it does add an extra 6 bytes per cube.
function compact() {
  const vals = [];
  for (let e of this._cube) {
    let s = 0;
    s += (e[0] + 1);
    s += (e[1] + 1) << 3;
    s += (e[2] + 1) << 6;
    s += (e[3] + 1) << 9;
    s += (e[4] + 1) << 12;
    s += (e[5] + 1) << 15;
    s += (e[6] + 1) << 18;
    s += (e[7] + 1) << 21;
    vals.push(s);
  }
  return vals;
}

function rotate(move, check = true) {
  if (typeof move === 'string')
    return rotateString(this, move, check);
  if (Array.isArray(move))
    return rotateArray(this, move, check);
  throw new Error('Invalid move type');
}

function rotateString(cube, move, check) {
  move = move.toLowerCase();
  if (check && !/^([udlrfb]'?2?\s?)+$/.test(move)) {
    throw new Error(`Invalid rotation: ${move}`);
  }
  move.split(/\s/g).forEach(m => {
    // TODO: Should this detect if something goes wrong
    const last_char = m[m.length - 1];
    if (last_char !== '2') {
      rotator.moves[m](cube._cube, cube._state);
      return;
    }
    m = m.slice(0, -1);
    rotator.moves[m](cube._cube, cube._state);
    rotator.moves[m](cube._cube, cube._state);
  });
}

function rotateArray(cube, move) {
  for (let m of move) {
    rotator.movesArr[m](cube._cube, cube._state)
  }
}

RubiCube.rotate2Array = function rotate2Array(move, check = true) {
  move = move.toLowerCase();
  const arr = [];
  if (check && !/^([udlrfb]'?2?\s?)+$/.test(move)) {
    throw new Error(`Invalid rotation: ${move}`);
  }
  move.split(/\s/g).forEach(m => {
    // TODO: Should this detect if something goes wrong
    const last_char = m[m.length - 1];
    if (last_char !== '2') {
      arr.push(rotator.moveList[m]);
      return;
    }
    m = m.slice(0, -1);
    arr.push(rotator.moveList[m]);
    arr.push(rotator.moveList[m]);
  });
  return arr;
}

function reset() {
  this._cube[0].fill(0);
  this._cube[1].fill(1);
  this._cube[2].fill(2);
  this._cube[3].fill(3);
  this._cube[4].fill(4);
  this._cube[5].fill(5);
}
