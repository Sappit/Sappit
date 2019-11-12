import validatePropItem from './item';
import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropItem(value);
  if (value.kind !== Kind.PushshiftPost) {
    console.log('validatePropPushshiftPost', {value})
    throw new Error('value must be valid comment object');
  }
}
