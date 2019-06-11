'use script';

const readline = require('readline');
const { gen_number } = require('./number-font');
let start_time = null;
let timer_obj = null;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.on('SIGINT', process.exit);

function detect_keypress() {
  process.stdin.once('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c')
      process.exit();

    if (start_time === null)
      start_timer();
    else
      stop_timer();

    setTimeout(detect_keypress, 100);
  });
}

function start_timer() {
  start_time = hr_ms();
  process.stdout.moveCursor(-process.stdout.columns, 0);
  process.stdout.write(gen_number(0));
  timer_obj = setInterval(() => {
    process.stdout.moveCursor(-30, -5);
    process.stdout.write(gen_number(hr_ms() - start_time));
  }, 59);
}

function stop_timer() {
  const done_time = hr_ms() - start_time;
  clearInterval(timer_obj);
  process.stdout.moveCursor(-30, -5);
  process.stdout.write(gen_number(done_time));
  process.stdout.write('\nwaiting for keypress...');
  timer_obj = null;
  start_time = null;
}

function hr_ms() {
  const t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
}

detect_keypress();
process.stdout.write('waiting for keypress...');
