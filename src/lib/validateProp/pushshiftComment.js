import validatePropItem from './item';
import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropItem(value);
  if (value.kind !== Kind.PushshiftComment) {
    console.log('validatePropPushshiftComment', {value})
    throw new Error('value must be valid comment object');
  }
}
