'use strict';

const readline = require('readline');
const { gen_number } = require('./number-font');

const stuffs = ['\\', '|', '/', '-'];

const pre_arr = ((x, y) => {
  const a = [];
  for (let y = 0; y < 10; y++) {
    a.push('a'.repeat(x))
  }
  return Buffer.from(a.join('\n') + '\n');
})(40, 10);

function write_stuffs(x, y, c, b) {
  //const lines = [];
  //for (let i = 0; i < y; i++) {
    //let str = '';
    //for (let j = 0; j < x; j++) {
      //str += stuffs[(Math.random() * 12 % 4) >>> 0];
    //}
    //lines.push(str);
   //lines.push(c.repeat(x));
  //}
  //process.stdout.write(lines.join('\n') + '\n');

  //const b = Buffer.alloc((x + 1) * y);
  for (let i = 0; i < y; i++) {
   b.write(c.repeat(x) + '\n', (x + 1) * i);
  }
  process.stdout.write(b);
}

//write_stuffs(40, 10, Math.random().toString(36).slice(-1));
//return;

function hr_ns() {
  const t = process.hrtime();
  return t[0] * 1e9 + t[1];
}

function print_results(iter, ns) {
  //process.stdout.clearScreenDown();
  //console.log(`${(iter / ns * 1e9).toFixed(2)} iterations per sec`);
}

const ITER = 100000;
const X = 40;
const Y = 10;
let t = hr_ns();
const b = Buffer.alloc((X + 1) * Y);

process.stdout.write(gen_number((hr_ns() - t) / 1e6 >>> 0));
(function to_screen(n) {
  if (--n <= 0)
    return print_results(ITER, hr_ns() - t);
  process.stdout.moveCursor(-30, -5);
  process.stdout.write(gen_number((hr_ns() - t) / 1e6 >>> 0));
  //write_stuffs(X, Y, Math.random().toString(36).slice(-1), b);
  setTimeout(() => to_screen(n), 50);
    //to_screen(n);
  //});
})(ITER);
/* */

/*
process.stdout.write('aaa\nbbb\nccc');

process.stdout.moveCursor(-3, -2);

process.stdout.write('bam');
/* */
