import validatePropArray from './array';
import validatePropPost from './post';

export default function assert (value) {
  // console.log('validatePropPosts', {value})
  validatePropArray(value)
  if (value.length > 0) {
    validatePropPost(value[0])
  }
  // console.log(value)
  // throw new Error('value must be a items list object');
}
