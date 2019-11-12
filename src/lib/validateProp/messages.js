import validatePropArray from './array';
import validatePropMessage from './message';

export default function assert (value) {
  validatePropArray(value)
  if (value[0]) {
    validatePropMessage(value[0]);
  }
}
