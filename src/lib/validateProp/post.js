import validatePropItem from './item';
import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropItem(value);
  if (value.kind !== Kind.Post) {
    console.log('validatePropPost', {value})
    throw new Error('value must be valid post object');
  }
}
