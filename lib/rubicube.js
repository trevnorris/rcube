'use strict';

const { arrF, replace } = require('./utils.js');
const rotator = require('./rotator.js');


class RubiCube {
  constructor() {
    const ab = new ArrayBuffer(8 * 6);
    const ui8 = new Uint8Array(ab);
    // For simplicity store each face in a uint8, even though two faces can
    // technically be stored in 1 byte.
    this._cube = [
      ui8.subarray(0, 8).fill(0), ui8.subarray(8, 16).fill(1),
      ui8.subarray(16, 24).fill(2), ui8.subarray(24, 32).fill(3),
      ui8.subarray(32, 40).fill(4), ui8.subarray(40).fill(5),
    ];
    this._state = { u: 0, f: 1, l: 2, b: 3, r: 4, d: 5 };
    this._colors = { u: 'w', f: 'g', l: 'o', b: 'b', r: 'r', d: 'y' };
    this._colors_inv = { w: 0, g: 1, o: 2, b: 3, r: 4, y: 5 };
    this._state_inv = [];
    for (let i in this._state) {
      this._state_inv[this._state[i]] = i;
    }
    //this.build = build;
    //this.compact = compact;
    //this.compact32 = compact32;
    //this.expand = expand;
    //this.reset = reset;
    //this.rotate = rotate;
  }
  // This only works in node v12.x ?
  build = build;
  compact = compact;
  compact32 = compact32;
  expand = expand;
  reset = reset;
  rotate = rotate;
  set = set;
}

module.exports.RubiCube = RubiCube;
RubiCube.moveListArray = rotator.moveListArray.slice();
RubiCube.moveList = {};
Object.assign(RubiCube.moveList, rotator.moveList);

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

function compact(bitSize = 3) {
  const vals = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < this._cube.length; i++) {
    const e = this._cube[i];
    let s = 0;
    s += (e[0] + 1);
    s += (e[1] + 1) << (bitSize * 1);
    s += (e[2] + 1) << (bitSize * 2);
    s += (e[3] + 1) << (bitSize * 3);
    s += (e[4] + 1) << (bitSize * 4);
    s += (e[5] + 1) << (bitSize * 5);
    s += (e[6] + 1) << (bitSize * 6);
    s += (e[7] + 1) << (bitSize * 7);
    vals[i] = s;
  }
  return vals;
}

function compact32(bitSize, arr) {
  for (let i = 0; i < this._cube.length; i++) {
    const e = this._cube[i];
    let s = 0;
    s += (e[0] + 1);
    s += (e[1] + 1) << (bitSize * 1);
    s += (e[2] + 1) << (bitSize * 2);
    s += (e[3] + 1) << (bitSize * 3);
    s += (e[4] + 1) << (bitSize * 4);
    s += (e[5] + 1) << (bitSize * 5);
    s += (e[6] + 1) << (bitSize * 6);
    s += (e[7] + 1) << (bitSize * 7);
    arr[i] = s;
  }
  return arr;
}

function expand(arr, bitSize = 3) {
  const and = 0xffffffff >>> (32 - bitSize);
  for (let i = 0; i < this._cube.length; i++) {
    const comp = +arr[i];
    const face = this._cube[i];
    face[0] = (comp & and) - 1;
    face[1] = ((comp >>> (bitSize * 1)) & and) - 1;
    face[2] = ((comp >>> (bitSize * 2)) & and) - 1;
    face[3] = ((comp >>> (bitSize * 3)) & and) - 1;
    face[4] = ((comp >>> (bitSize * 4)) & and) - 1;
    face[5] = ((comp >>> (bitSize * 5)) & and) - 1;
    face[6] = ((comp >>> (bitSize * 6)) & and) - 1;
    face[7] = ((comp >>> (bitSize * 7)) & and) - 1;
  }
  return this;
}

function rotate(move, check = true) {
  if (typeof move === 'string')
    return rotateString(this, move, check);
  if (Array.isArray(move) || move.constructor === Uint8Array)
    return rotateArray(this, move);
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
  return cube;
}

function rotateArray(cube, move) {
  for (let m of move) {
    rotator.movesArr[m](cube._cube, cube._state)
  }
  return cube;
}

RubiCube.invert = function invert(str) {
  const arr = RubiCube.rotate2Array(str).map(e => {
    return e + ((e % 2) === 0 ? -1 : 1);
  });
  return RubiCube.rotate2String(arr.reverse());
}

// Takes a string of wgobry, 8 colors for each face following 1-8 pattern.
function set(str) {
  str = str.replace(/ /g, '');
  if (str.length !== 6 * 8)
    throw new Error('string length is incorrect');
  if (!/^[wgobry]*$/.test(str))
    throw new Error('invalid characters in string');
  str = str.toLowerCase();
  const arr = [
    str.substr(0, 8), str.substr(8, 8), str.substr(16, 8),
    str.substr(24, 8), str.substr(32, 8), str.substr(40, 8),
  ];
  for (let i = 0; i < arr.length; i++) {
    const e = this._cube[i];
    const s = arr[i];
    for (let j = 0; j < e.length; j++) {
      e[j] = this._colors_inv[s[j]];
    }
  }
  return this;
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

RubiCube.rotate2String = function rotate2String(arr, sep = ' ') {
  const str_arr = [];
  for (let e of arr) {
    str_arr.push(RubiCube.moveListArray[e]);
  }
  return str_arr.join(sep);
}

function reset() {
  this._cube[0].fill(0);
  this._cube[1].fill(1);
  this._cube[2].fill(2);
  this._cube[3].fill(3);
  this._cube[4].fill(4);
  this._cube[5].fill(5);
  return this;
}
