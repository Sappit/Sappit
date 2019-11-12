import isObject from 'lodash/isObject';

export default function assert (value) {
  if (!isObject(value)) {
    console.log(value)
    throw new Error('value must be object');
  }
}
