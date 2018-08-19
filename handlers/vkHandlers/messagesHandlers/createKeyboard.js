module.exports = (arr, row, name) => {
  let len = arr.length;
  let idx = 1;
  arr = arr.map(gr => {
    return {
      action: {
        type: "text",
        label: gr,
        payload: `{"${name}": ${idx++}}`
      },
      color: "primary"
    };
  });
  idx = 0;
  let num = Math.floor(arr.length / row);
  let keyboard = { one_time: false, buttons: [] };
  for (let i = 0; i < num; i++) {
    keyboard.buttons.push([...arr.slice(idx, idx + row)]);
    idx += row;
  }
  if (len % row > 0) keyboard.buttons.push([...arr.slice(idx, arr.length)]);
  return keyboard;
};
