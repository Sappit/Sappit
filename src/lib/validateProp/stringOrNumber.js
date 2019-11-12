import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

export default function assert (value) {
  if (!isNumber(value) && !isString(value)) {
    console.log(value)
    throw new Error('value must be string or number');
  }
}
