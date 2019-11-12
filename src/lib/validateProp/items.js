import validatePropArray from './array';
import validatePropItem from './item';

export default function assert (value) {
  // console.log('validatePropItems', {value})
  validatePropArray(value)
  if (value.length > 0) {
    validatePropItem(value[0])
  }
  // console.log(value)
  // throw new Error('value must be a items list object');
}
