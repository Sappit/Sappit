import validatePropObject from './object';

export default function assert (value) {
  validatePropObject(value);
  // console.log(value)
  // throw new Error('value must be a tumblrpost object');
}
