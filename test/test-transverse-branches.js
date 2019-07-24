'use strict';

/* Number of entries at each transversal of n.
 *  13, 127, 1195, 11206, 105046, 983926
 */

const { RubiCube } = require('../lib/rubicube.js');
/* debug:start */
const crypto = require('crypto');
/* debug:stop */

const cube = new RubiCube();
const stateStor = {};
const stateArr = [];
const lastStates = [];
/* debug:start */
let state_entries = 0;
let state_repeats = 0;
let stores = 0;
let t = Date.now();
let transverse_calls = 0;
/* debug:stop */

// Need function that will give the next set of movements based on current
// depth. Taking into account

function transverse(depth, moves = []) {
/* debug:start */
transverse_calls++;
/* debug:stop */

  const cp = cube.reset().rotate(moves).compact().join(',');

  //stateStor[RubiCube.rotate2String(moves)] = cube.rotate(moves).compact(4);
  //if (stateStor[cp]) {
    //return;
  //}
  //insertCubeState(cube.reset().rotate(moves).compact(),
                  //RubiCube.rotate2String(moves));

  //stateStor[cp] = true;

  if (!stateStor[cp])
    stateStor[cp] = [];
  stateStor[cp].push(RubiCube.rotate2String(moves, ''));

  if (depth === 0) {
    return;
  }

  // First create loop that calls transverse() again with the updated cube
  // The variable i is the move from moveListArray.
  for (let i = 1; i < RubiCube.moveListArray.length; i++) {

    /* */
    if (moves.length > 1) {
      const check = (i % 2) === 0 ? -1 : 1;
      if (i + check === moves[moves.length - 1]) {
        continue;
      }
    }
    /* */

    if (moves.length > 2) {
      const mb2 = moves[moves.length - 2];
      const mb1 = moves[moves.length - 1];
      if (mb2 === mb1 && mb1 === i) {
        continue;
      }
    }
    const m2 = moves.slice();
    m2.push(i);
    transverse(depth - 1, m2);
  }
}

transverse(+process.argv[2] || 4);
//console.log(stateStor);
//console.log(Object.keys(stateStor).length);

/* debug:start */

//Object.keys(stateStor).forEach(e => console.log(`[${e}]: ${stateStor[e].join('; ')}`));
//Object.keys(stateStor).sort().forEach(e => console.log(`[${e}]`));

const actual = Object.keys(stateStor).length;
console.log(`${actual}\t${transverse_calls - actual}`);
console.log(Date.now() - t);

/* debug:stop */

process.on('SIGINT', () => {
  const actual = Object.keys(stateStor).length;
  console.log(`${actual}\t${transverse_calls - actual}`);
  console.log(Date.now() - t);
});


function insertCubeState(arr, moves) {
  let cobj = stateStor;

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
  if (cobj.length !== 0) {
    state_repeats++;
  }
  if (!cobj.includes(moves)) {
    cobj.push(moves);
    state_entries++;
  }
/* debug:stop */
}
