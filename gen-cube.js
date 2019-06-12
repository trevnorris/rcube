'use strict';

module.exports = {
  gen_cube,
};

const Cube = require('cubejs');
const block = '█';
const moveMap = `U U2 U' F F2 F' L L2 L' D D2 D' B B2 B' R R2 R'`.split(' ');

const colorc = {
  y: '\x1b[1;33m',
  r: '\x1b[0;31m',
  b: '\x1b[0;34m',
  //o: '\x1b[0;33m',
  o: '\x1b[38;5;214m',
  g: '\x1b[0;32m',
  w: '\x1b[1;37m',
  nc: '\x1b[0m',
};

// Each one of these is a row to print.
const cube_arr = [
  new Array(12).fill('  '), new Array(12).fill('  '), new Array(12).fill('  '),
  new Array(12).fill('  '), new Array(12).fill('  '), new Array(12).fill('  '),
  new Array(12).fill('  '), new Array(12).fill('  '), new Array(12).fill('  '),
];

// These are all used in gen_moves() to better ensure random cube state.
const uMoves = [3,4,5,6,7,8,12,13,14,5,16,17];
const fMoves = [0,1,2,6,7,8,9,10,11,15,16,17];
const lMoves = [0,1,2,3,4,5,9,10,11,12,13,14];
const dMoves = [3,4,5,6,7,8,12,13,14,15,16,17];
const bMoves = [0,1,2,6,7,8,9,10,11,15,16,17];
const rMoves = [0,1,2,3,4,5,9,10,11,12,13,14];
const allMoves =
  { 0: uMoves, 3: fMoves, 6: lMoves, 9: dMoves, 12: bMoves, 15: rMoves };

// String sould be in the format of:
// U...R...F...D...L...B...
// except using color codes yrbogw; case insensitive.
// quick color translation is:
// Y...G...R...W...B...O...
// TODO Allow drawing using a different orientation
function gen_cube() {
  const cube = new Cube();
  const moves = gen_moves(20);
  cube.move(moves);
  const faces = turn_to_colors(cube.asString());
  const up = faces.substr(0, 9);
  const right = faces.substr(9, 9);
  const front = faces.substr(18, 9);
  const down = faces.substr(27, 9);
  const left = faces.substr(36, 9);
  const back = faces.substr(45, 9);

  write_face(4, 1, up);
  write_face(7, 4, right);
  write_face(4, 4, front);
  write_face(4, 7, down);
  write_face(1, 4, left);
  write_face(10, 4, back);

  return { moves, faces: cube_arr.map(e => e.join('')).join('\n') };
}


function write_face(x, y, colors) {
  y = y - 1;
  x = x - 1;
  for (let i = 0; i < 3; i++) {
    cube_arr[y+0][i+x] = `${colorc[colors[i+0]]}${block}${block}${colorc.nc}`;
    cube_arr[y+1][i+x] = `${colorc[colors[i+3]]}${block}${block}${colorc.nc}`;
    cube_arr[y+2][i+x] = `${colorc[colors[i+6]]}${block}${block}${colorc.nc}`;
  }
}

function turn_to_colors(facelets) {
  return facelets.replace(/U/g,'y').replace(/F/g,'r').replace(/L/g, 'b')
    .replace(/R/g, 'g').replace(/B/g,'o').replace(/D/g, 'w');
}

function gen_moves(nmoves) {
  const arr = [];
  let last_move = Math.random() * 18 >>> 0;
  arr.push(moveMap[last_move]);

  while (arr.length < nmoves) {
    const a = allMoves[last_move - (last_move % 3)];
    const move = a[Math.random() * a.length >>> 0];
    arr.push(moveMap[move]);
    last_move = move;
  }

  return arr.join(' ');
}
