const nums_arr = [
  [['███'], ['█ █'], ['█ █'], ['█ █'], ['███']],  // 0
  [[' █ '], ['██ '], [' █ '], [' █ '], ['███']],  // 1
  [['███'], ['  █'], ['███'], ['█  '], ['███']],  // 2
  [['███'], ['  █'], [' ██'], ['  █'], ['███']],  // 3
  [['█ █'], ['█ █'], ['███'], ['  █'], ['  █']],  // 4
  [['███'], ['█  '], ['███'], ['  █'], ['███']],  // 5
  [['███'], ['█  '], ['███'], ['█ █'], ['███']],  // 6
  [['███'], ['  █'], ['  █'], ['  █'], ['  █']],  // 7
  [['███'], ['█ █'], ['███'], ['█ █'], ['███']],  // 8
  [['███'], ['█ █'], ['███'], ['  █'], ['███']],  // 9
  [['   '], ['   '], ['   '], ['   '], [' █ ']],  // .
  [['   '], [' █ '], ['   '], [' █ '], ['   ']],  // :
]

function gen_number(ms) {
  const min = ((ms / 1000) / 60) >>> 0;
  const sec = ((ms / 1000) % 60) >>> 0;
  const hec = ((ms / 10) % 100) >>> 0;
  const t_arr = n_to_arr(min, sec, hec);
  let out_str = '';

  // Loop through each line of numbers and append each one.
  for (let i = 0; i < nums_arr[0].length; i++) {
    for (let j = 0; j < t_arr.length; j++) {
      out_str += nums_arr[t_arr[j]][i] + ' ';
    }
    out_str += '\n';
  }

  return out_str;
}

function n_to_arr(min, sec, hec) {
  const a = [];

  a.push(min / 10 >>> 0, min % 10, 11);
  a.push(sec / 10 >>> 0, sec % 10, 10);
  a.push(hec / 10 >>> 0, hec % 10);

  return a;
}

module.exports = {
  gen_number,
};
