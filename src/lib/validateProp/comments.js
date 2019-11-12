import validatePropArray from './array';
import validatePropComment from './item';

export default function assert (value) {
  // console.log('validatePropComments', {value})
  validatePropArray(value)
  if (value.length > 0) {
    validatePropComment(value[0])
  }
  // console.log(value)
  // throw new Error('value must be a items list object');
}
