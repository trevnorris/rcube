'use strict';

/* Number of entries at each transversal of n.
 *  12, 115, 1096, 10478, 100161, 957219
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
/* debug:stop */

// Need function that will give the next set of movements based on current
// depth. Taking into account

function transverse(depth, moves = []) {
  if (depth === 0) {
    //insertCubeState(cube.reset().rotate(moves).compact(),
                    //RubiCube.rotate2String(moves));
    let cp = cube.reset().rotate(moves).compact().join('');
/* debug:start */
cp = crypto.createHash('md5').update(cp).digest('binary');
/* debug:stop */
    stateStor[cp] = true;
    //if (!stateArr.includes(cp))
      //stateArr.push(cp);
    //stateStor[cube.reset().rotate(moves).compact(4)] = moves;
/* debug:start */
stores++;
/* debug:stop */
    //stateStor[RubiCube.rotate2String(moves)] = cube.rotate(moves).compact(4);
    return;
  }
  // First create loop that calls transverse() again with the updated cube
  for (let i = 1; i < RubiCube.moveListArray.length; i++) {
    //const check = (i % 2) === 0 ? -1 : 1;
    //if (moves.length > 0 && i + check === moves[moves.length - 1]) {
      //continue;
    //}
    //if (moves.length > 2 &&
        //moves[moves.length - 2] === moves[moves.length - 1] &&
        //moves[moves.length - 1] === i) {
      //continue;
    //}
    const m2 = moves.slice();
    m2.push(i);
    transverse(depth - 1, m2);
  }
}

transverse(+process.argv[2] || 4);
//console.log(stateStor);
//console.log(Object.keys(stateStor).length);

/* debug:start */
//console.log(state_entries);
//console.log(state_repeats);
//console.log(state_entries - state_repeats);
const actual = Object.keys(stateStor).length;
console.log(stores);
console.log(actual);
console.log(stores - actual);
//console.log(stateArr.length);
//console.log(Date.now() - t);
/* debug:stop */


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
