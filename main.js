'use script';

const readline = require('readline');
const { gen_timer } = require('./gen-timer');
const { gen_cube } = require('./gen-cube');

const argv = require('minimist')(process.argv.slice(2), {
  default: { 'auto-gen': 'yes' },
});

const default_strs = {
  yes: 'Generate cube (Y/n):',
  no: '\nGenerate cube (y/N):',
};

const auto_gen_str = argv['auto-gen'].toLowerCase();
if (auto_gen_str !== 'yes' && auto_gen_str !== 'no') {
  throw new Error(`auto-gen should be yes/no: ${auto_gen_str}`);
}

const gen_cube_str = default_strs[auto_gen_str];

let start_time = null;
let timer_obj = null;
// States are 'gen'/'wait'/'run';
let state = auto_gen_str === 'yes' ? 'gen' : 'wait';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

function detect_keypress() {
  process.stdin.once('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.stdout.write('\n');
      process.exit();
    }
    if (key.ctrl && key.name === 'l') {
      process.stdout.write('\033c');
      return detect_keypress();
    }
    if (key.ctrl) {
      return setTimeout(detect_keypress, 100);
    }

    if (state === 'gen') {
      if (key.name === 'return' || key.name === 'y') {
        const gened = gen_cube();
        //process.stdout.moveCursor(-process.stdout.columns, -1);
        process.stdout.clearLine();
        process.stdout.write(`\n${gened.moves}\n\n${gened.faces}\n`);
      }
      state = 'wait'
      process.stdout.write('\npress any key to start timer...');
    } else if (start_time === null) {
      start_timer();
    } else {
      stop_timer();
    }

    setTimeout(detect_keypress, 100);
  });
}

function start_timer() {
  state = 'run';
  start_time = hr_ms();
  process.stdout.moveCursor(-process.stdout.columns, -1);
  process.stdout.clearLine();
  process.stdout.write('\n');
  process.stdout.write(gen_timer(0));
  timer_obj = setInterval(() => {
    process.stdout.moveCursor(-30, -5);
    process.stdout.write(gen_timer(hr_ms() - start_time));
  }, 59);
}

function stop_timer() {
  const done_time = hr_ms() - start_time;
  clearInterval(timer_obj);
  process.stdout.moveCursor(-30, -5);
  process.stdout.write(gen_timer(done_time));
  process.stdout.write(gen_cube_str);
  state = auto_gen_str === 'yes' ? 'gen' : 'wait';
  timer_obj = null;
  start_time = null;
}

function hr_ms() {
  const t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
}

detect_keypress();
process.stdout.write(gen_cube_str);
