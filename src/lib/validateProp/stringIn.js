import includes from 'lodash/includes';
import validatePropString from './string';

// haystack might be array or string
export default function assert (value, haystack) {
  validatePropString(value);
  if (!includes(haystack, value)) {
    console.log(value)
    throw new Error('value must be in '+(
      (haystack && haystack.join)
        ? haystack.join(', ')
        : haystack
    ));
  }
}
