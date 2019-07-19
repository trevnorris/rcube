'use strict';

module.exports = {
  arrF,
  replace
};

function arrF(length, fill) {
  return (new Array(length)).fill(fill);
}

function replace(arr, before, after) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === before) {
      arr[i] = after;
    }
  }
  return arr;
}
