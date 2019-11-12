import isString from 'lodash/isString';

export default function assert (value) {
  if (!isString(value)) {
    console.log(value)
    throw new Error('subredditName must be string');
  }
  if (!value) {
    console.log(value)
    throw new Error('subredditName must be present');
  }
}
