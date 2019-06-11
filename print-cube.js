'use strict';

const block = '█';

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
  new Array(24).fill(' '), new Array(24).fill(' '), new Array(24).fill(' '),
  new Array(24).fill(' '), new Array(24).fill(' '), new Array(24).fill(' '),
  new Array(24).fill(' '), new Array(24).fill(' '), new Array(24).fill(' '),
];

// String sould be in the format of:
// U...R...F...D...L...B...
// except using color codes yrbogw; case insensitive.
function genCube(str) {
  const faces = str.toLowerCase();
  const up = faces.substr(0, 9);
  const right = faces.substr(9, 9);
  const front = faces.substr(18, 9);
  const down = faces.substr(27, 9);
  const left = faces.substr(36, 9);
  const back = faces.substr(45, 9);

  for (let i = 0; i < 3; i++) {
    cube_arr[0][i+6] = `${colorc[up[i]]}${block}${block}${colorc.nc}`;
    cube_arr[1][i+6] = `${colorc[up[i+3]]}${block}${block}${colorc.nc}`;
    cube_arr[2][i+6] = `${colorc[up[i+6]]}${block}${block}${colorc.nc}`;

    cube_arr[6][i+6] = `${colorc[down[i]]}${block}${block}${colorc.nc}`;
    cube_arr[7][i+6] = `${colorc[down[i+3]]}${block}${block}${colorc.nc}`;
    cube_arr[8][i+6] = `${colorc[down[i+6]]}${block}${block}${colorc.nc}`;
  }


}


/* debug:start */
const example_str = 'ryywybwrbryowgywbgogwrrgorgwyrgworwobobrbwgogbgyoobyby';
genCube(example_str);
console.log(cube_arr.map(e => e.join('')).join('\n'));
/* debug:stop */
