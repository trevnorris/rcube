'use strict';

module.exports = genCube;

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

// String sould be in the format of:
// U...R...F...D...L...B...
// except using color codes yrbogw; case insensitive.
// quick color translation is:
// Y...G...R...W...B...O...
function genCube() {
  const cube = new Cube();
  const moves = genMoves(20);
  cube.move(moves);
  const faces = turnToColors(cube.asString());
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

function turnToColors(facelets) {
  return facelets.replace(/U/g,'y').replace(/F/g,'r').replace(/L/g, 'b')
    .replace(/R/g, 'g').replace(/B/g,'o').replace(/D/g, 'w');
}

function genMoves(nmoves) {
  const arr = [];
  let last_move = -1;
  while (arr.length < nmoves) {
    const move = Math.random() * 18 >>> 0;
    const move_mod = move % 3;
    if (move === last_move) {
      continue;
    }
    if (move_mod === 0 && (move + 1 === last_move || move + 2 === last_move)) {
      continue;
    }
    if (move_mod === 1 && (move - 1 === last_move || move + 1 === last_move)) {
      continue;
    }
    if (move_mod === 2 && (move - 2 === last_move || move - 1 === last_move)) {
      continue;
    }
    arr.push(moveMap[move]);
    last_move = move;
  }
  return arr.join(' ');
}
