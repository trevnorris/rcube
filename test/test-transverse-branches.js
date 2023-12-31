'use strict';

/* Number of unique entries at each transversal:
 *  13, 127, 1195, 11206, 105046, 983926, 9205558
 */

const rubin = require('../build/Release/rubicube_native.node');

const movesArray = [
  null,
  rubin.rotateR, rubin.rotateRp, rubin.rotateL, rubin.rotateLp,
  rubin.rotateU, rubin.rotateUp, rubin.rotateD, rubin.rotateDp,
  rubin.rotateF, rubin.rotateFp, rubin.rotateB, rubin.rotateBp,
]

function callRubin(ab, moves) {
  //for (let i = 0; i < moves.length; i++) {
    //movesArray[moves[i]](ab);
    //movesArray[12](ab);
  //}
  let m;
  for (m of moves) {
    if (m === 1)
      rubin.rotateR(ab);
    else if (m === 2)
      rubin.rotateRp(ab);
    else if (m === 3)
      rubin.rotateL(ab);
    else if (m === 4)
      rubin.rotateLp(ab);
    else if (m === 5)
      rubin.rotateU(ab);
    else if (m === 6)
      rubin.rotateUp(ab);
    else if (m === 7)
      rubin.rotateD(ab);
    else if (m === 8)
      rubin.rotateDp(ab);
    else if (m === 9)
      rubin.rotateF(ab);
    else if (m === 10)
      rubin.rotateFp(ab);
    else if (m === 11)
      rubin.rotateB(ab);
    else if (m === 12)
      rubin.rotateBp(ab)
    //movesArray[m](ab);
  }
}

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
let rotate_calls = 0;
/* debug:stop */

// Need function that will give the next set of movements based on current
// depth. Taking into account

const rotation_moves = `r u u l`;
const TO_MATCH = cube.reset().rotate(rotation_moves).compact().join('.');

//const TO_MATCH = cube.reset().set(
  //'wgrobwyw grogwggg gbrooooo wwobbbbb wwbrrrrr yyyyyyyg').compact().join('.');

stateStor[TO_MATCH] = [];
const compact_arr = [0, 0, 0, 0, 0, 0];

// TODO: The matches should be collapsed and remove patterns that aren't
// actually needed. e.g. d' l d r
function transverse(depth) {

  //moves.subarray(0, move_depth);
  //cube.reset();
  //cube.compact(3, compact_arr);
  //cube.rotate(moves.subarray(0, move_depth));

  //cube.reset().rotate(moves.subarray(0, move_depth)).compact(3, compact_arr);

  callRubin(cube.reset()._cubeab, moves.subarray(0, move_depth));
  const cp = cube.compact(3, compact_arr);


  //const cp = cube.reset().rotate(moves.subarray(0, move_depth)).compact().join('.');

  if (cp === TO_MATCH) {
    const r2s = RubiCube.rotate2String(moves.subarray(0, move_depth));
    //stateStor[TO_MATCH].push(
      //RubiCube.invert(r2s));
    console.log(r2s);
  }

/* debug:start */
transverse_calls++;
rotate_calls += move_depth;
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

let user_move = process.argv[3] ? JSON.parse(process.argv[3]) : null;
if (typeof user_move === 'string') {
  user_move = RubiCube.rotate2Array(user_move);
}
if (user_move) {
  move_depth = user_move.length;
  moves.set(user_move);
}
transverse((+process.argv[2] || 4) + move_depth);

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
t = Date.now() - t;
console.error(`transvers: ${transverse_calls}\t${t}ms\t${(transverse_calls/t*1000).toFixed(2)}/sec`);
console.error(`rotations: ${rotate_calls}\t${t}ms\t${(rotate_calls/t*1000).toFixed(2)}/sec`);

stateStor[TO_MATCH].sort((a, b) => a.length - b.length);
//console.log(stateStor);

/* debug:stop */
