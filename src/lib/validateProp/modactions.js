import validatePropArray from './array';

export default function assert (value) {
  validatePropArray(value);
  // console.log(value)
  // throw new Error('value must be a modaction object');
}
