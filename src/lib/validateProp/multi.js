import validatePropItem from './item';
import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropItem(value);
  if (value.kind !== Kind.LabeledMulti) {
    console.log(value)
    throw new Error('value must be a multi object');
  }
}
