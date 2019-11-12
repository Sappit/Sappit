import isNumber from 'lodash/isNumber';

export default function assert (value) {
  if (!isNumber(value)) {
    console.log(value)
    throw new Error('value must be number');
  }
}
