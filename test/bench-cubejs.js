'use strict';

const Cube = require('cubejs');
const { RubiCube } = require('../lib/rubicube.js');
const { gen_moves } = require('../gen-cube.js');
const ITER = 1e6;

const benchList = {
  genmoves,
  genarray,
  cubejs,
  rubicube,
  rubicubearray,
  reset,
  compact,
  compact32,
};

const bench = process.argv[2];

if (!benchList[bench]) {
  throw new Error('Pass a valid benchmark');
}

benchList[bench]();

function genmoves() {
  const l = +process.argv[3] || 6;
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    gen_moves(l);
  }
  printResults(hr2ms(), t);
}

function genarray() {
  const l = +process.argv[3] || 6;
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    RubiCube.rotate2Array(gen_moves(l), false);
  }
  printResults(hr2ms(), t);
}

function cubejs() {
  const cube = new Cube();
  const l = +process.argv[3] || 6;
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    cube.move(gen_moves(l));
  }
  printResults(hr2ms(), t);
}


function rubicube() {
  const r = new RubiCube();
  const l = +process.argv[3] || 6;
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    r.rotate(gen_moves(l), false);
  }
  printResults(hr2ms(), t);
}


function rubicubearray() {
  const r = new RubiCube();
  const l = +process.argv[3] || 6;
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    r.rotate(RubiCube.rotate2Array(gen_moves(l), false), false);
  }
  printResults(hr2ms(), t);
}


function compact() {
  const r = new RubiCube();
  const b = +process.argv[3] || 3;
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    //r.rotate(gen_moves(2)).compact(b);
    r.compact(b);
  }
  printResults(hr2ms(), t);
}


function compact32() {
  const r = new RubiCube();
  const ui32 = new Uint32Array(6);
  const b = +process.argv[3] || 3;
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    //r.rotate(gen_moves(2)).compact32(b, ui32);
    r.compact32(b, ui32);
  }
  printResults(hr2ms(), t);
}


function reset() {
  const r = new RubiCube();
  const t = hr2ms();
  for (var i = 0; i < ITER; i++) {
    r.reset();
  }
  printResults(hr2ms(), t);
}


function hr2ms() {
  const t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
}

function printResults(u, t) {
  console.log((ITER / (u - t)).toFixed(4), 'iter ms');
  console.log((u - t).toFixed(4), 'total ms');
}
