import validatePropItem from './item';
import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropItem(value);
  if (value.kind !== Kind.User) {
    console.log('validatePropUser', {value})
    throw new Error('value must be valid user object');
  }
}
