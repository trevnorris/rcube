'use strict';

const Cube = require('cubejs');
const genCube = require('../print-cube');

for (let i = 0; i < 10; i++) {
  console.log(genCube().moves);
}

return;
Cube.initSolver();

const cube = new Cube();
const gened = genCube();

cube.move(gened.moves);

console.log(gened.moves);
console.log(cube.solve());


