import validatePropItem from './item';
import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropItem(value);
  // could be comment or other thing
  // if (value.kind !== Kind.Message) {
  //   console.log('validatePropMessage', {value})
  //   throw new Error('value must be valid message object');
  // }
}
