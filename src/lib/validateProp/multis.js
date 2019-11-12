import validatePropArray from './array';
import validatePropMulti from './multi';

export default function assert (value) {
  validatePropArray(value)
  if (value[0]) {
    validatePropMulti(value[0]);
  }
}
