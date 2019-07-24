'use strict';

const { RubiCube } = require('../lib/rubicube.js');
const { gen_moves } = require('../gen-cube.js');

const cube_states = {};
const cube = new RubiCube();

for (let i = 0; i < 100000; i++) {
  const m = gen_moves(6);
  cube.rotate(m);
  insertCubeState(cube.compact(), m);
}

function insertCubeState(arr, moves) {
  let cobj = cube_states;

  if (cobj[arr[0]] === undefined)
    cobj[arr[0]] = {};

  cobj = cobj[arr[0]];
  if (cobj[arr[1]] === undefined)
    cobj[arr[1]] = {};

  cobj = cobj[arr[1]];
  if (cobj[arr[2]] === undefined)
    cobj[arr[2]] = {};

  cobj = cobj[arr[2]];
  if (cobj[arr[3]] === undefined)
    cobj[arr[3]] = {};

  cobj = cobj[arr[3]];
  if (cobj[arr[4]] === undefined)
    cobj[arr[4]] = {};

  cobj = cobj[arr[4]];
  if (cobj[arr[5]] === undefined)
    cobj[arr[5]] = [];

  cobj = cobj[arr[5]];
  cobj.push(moves);
}
