'use strict';

/* Number of unique entries at each transversal:
 *  13, 127, 1195, 11206, 105046, 983926, 9205558
 */

const { RubiCube } = require('../lib/rubicube.js');

const cube = new RubiCube();
const stateStor = {};
const stateArr = [];
const lastStates = [];

const moves = new Uint8Array(26);
let move_depth = 0;


/* debug:start */
let t = Date.now();
let transverse_calls = 0;
/* debug:stop */

// Need function that will give the next set of movements based on current
// depth. Taking into account

//const TO_MATCH = cube.set(
  //'wwoggwww ggywgggg booooooo brrbbbbb rrwrrrwb yyyyyyry').compact().join('.');
const TO_MATCH = cube.reset().rotate(`r u r'`).compact().join('.');
stateStor[TO_MATCH] = [];

function transverse(depth) {
  const cp = cube.reset().rotate(moves.subarray(0, move_depth)).compact().join('.');

  if (cp === TO_MATCH) {
    stateStor[TO_MATCH].push(RubiCube.rotate2String(moves.subarray(0, move_depth)));
  }

/* debug:start */
transverse_calls++;
/* debug:stop */

  //stateStor[RubiCube.rotate2String(moves)] = cube.rotate(moves).compact(4);
  //if (stateStor[cp]) {
    //return;
  //}
  //insertCubeState(cube.reset().rotate(moves).compact(),
                  //RubiCube.rotate2String(moves));

  //stateStor[cp] = true;

  //if (!stateStor[cp])
    //stateStor[cp] = [];
  //stateStor[cp].push(RubiCube.rotate2String(moves, ''));

  if (depth === move_depth) {
    return;
  }

  // First create loop that calls transverse() again with the updated cube
  // The variable i is the move from moveListArray.
  for (let i = 1; i < RubiCube.moveListArray.length; i++) {

    if (move_depth > 0) {
      const check = (i % 2) === 0 ? -1 : 1;
      if (i + check === moves[move_depth - 1]) {
        continue;
      }
    }

    if (move_depth > 1) {
      const mb2 = moves[move_depth - 2];
      const mb1 = moves[move_depth - 1];
      if (mb2 === mb1 && mb1 === i) {
        continue;
      }
    }

    moves[move_depth] = i;
    move_depth++;
    transverse(depth);
    move_depth--;
  }
}

const user_move = +process.argv[3] || null;
transverse(+process.argv[2] || 4, user_move ? [user_move] : []);

//console.log(stateStor);
//console.log(Object.keys(stateStor).length);

/* debug:start */

//Object.keys(stateStor).forEach(e => console.log(`[${e}]: ${stateStor[e].join('; ')}`));
//Object.keys(stateStor).sort().forEach(e => console.log(`[${e}]`));

//let all_moves = 0;
//for (let e in stateStor) {
  //all_moves += stateStor[e].length
//}

//console.error(all_moves);
//const actual = Object.keys(stateStor).length;
//console.error(`${actual}\t${transverse_calls - actual}\t${transverse_calls}`);
console.error(`calls: ${transverse_calls}   ${Date.now() - t}ms`);

stateStor[TO_MATCH].sort((a, b) => a.length - b.length);
console.log(stateStor);

/* debug:stop */
