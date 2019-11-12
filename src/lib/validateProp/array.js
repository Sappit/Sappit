import isArray from 'lodash/isArray';

export default function assert (value) {
  if (!isArray(value)) {
    console.log(value)
    throw new Error('value must be array');
  }
}
