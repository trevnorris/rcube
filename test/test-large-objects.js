'use strict';

const { RubiCube } = require('../lib/rubicube.js');
const { gen_moves } = require('../gen-cube.js');

const cube_states = {};
const cube = new RubiCube();
let state_entries = 0;
let state_repeats = 0;

for (let i = 0; i < 200000; i++) {
  const m = gen_moves(7);
  cube.reset();
  cube.rotate(m);
  insertCubeState(cube.compact(), m);
}

//console.log(JSON.stringify(cube_states));
//let states_length = 0;
//for (let i in cube_states)
  //states_length++;
//console.log(states_length);

console.log(Object.keys(cube_states).length);
console.log(state_entries);
console.log(state_repeats);

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
  //if (!cobj.includes(moves))
    //cobj.push(moves);
/* debug:start */
  if (!cobj.includes(moves)) {
    cobj.push(moves);
    state_entries++;
  } else {
    state_repeats++;
  }
/* debug:stop */
}
