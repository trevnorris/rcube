'use strict';

const readline = require('readline');


readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

const start_time = hr2ms();
let t = start_time;
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.stdout.write('\n');
    process.exit();
  }

  const u = hr2ms();
  const v = (u - t).toFixed(3);
  const w = (u - start_time).toFixed(3);
  const x = Buffer.from(str).toString('hex');
  console.log(`KeyPress time: ${w} tdiff: ${v} string: 0x${x}`);
  t = u;
});


setTimeout(() => {}, 10000000);
console.log(process.pid);


function hr2ms() {
  const t = process.hrtime();
  return +(t[0] * 1e3 + t[1] / 1e6).toFixed(3);
}
