import isInteger from 'lodash/isInteger';

export default function assert (value) {
  if (!isInteger(value)) {
    console.log(value)
    throw new Error('value must be integer');
  }
}
