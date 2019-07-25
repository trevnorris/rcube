'use strict';

const rubin = require('../build/Release/rubicube_native.node');

const moves = {
  'r': rotateR,
  'r\'': rotateRp,
  'l': rotateL,
  'l\'': rotateLp,
  'u': rotateU,
  'u\'': rotateUp,
  'd': rotateD,
  'd\'': rotateDp,
  'f': rotateF,
  'f\'': rotateFp,
  'b': rotateB,
  'b\'': rotateBp,
};

const moveListArray = `r r' l l' u u' d d' f f' b b'`.split(' ');
const movesArr = [null];
const moveList = {};

moveListArray.forEach((e, i) => {
  moveList[e] = i + 1;
  movesArr[i + 1] = moves[e];
});
moveListArray.unshift(null);

module.exports = {
  moves,
  movesArr,
  moveListArray,
  moveList,
};

function rotateR(ab) {
  rubin.rotateR(ab);
}

function rotateRp(ab) {
  rubin.rotateRp(ab);
}

function rotateL(ab) {
  rubin.rotateL(ab);
}

function rotateLp(ab) {
  rubin.rotateLp(ab);
}

function rotateU(ab) {
  rubin.rotateU(ab);
}

function rotateUp(ab) {
  rubin.rotateUp(ab);
}

function rotateD(ab) {
  rubin.rotateD(ab);
}

function rotateDp(ab) {
  rubin.rotateDp(ab);
}

function rotateF(ab) {
  rubin.rotateF(ab);
}

function rotateFp(ab) {
  rubin.rotateFp(ab);
}

function rotateB(ab) {
  rubin.rotateB(ab);
}

function rotateBp(ab) {
  rubin.rotateBp(ab);
}
