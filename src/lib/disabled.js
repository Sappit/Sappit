/*
    {...disabled(expression)}
*/

const isDisabled = Object.freeze({
  disabled: true,
  'aria-disabled': true,
  class: 'disabled',
  style: {cursor: 'not-allowed'},
});
const notDisabled = Object.freeze({
  // disabled: false,
  // 'aria-disabled': false,
  // class: 'disabled',
  // style: {cursor: null},
});

export default function disabled(bool) {
  return bool ? isDisabled : notDisabled;
}
