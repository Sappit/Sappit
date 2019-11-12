import validatePropItem from './item';

export default function assert (value) {
  validatePropItem(value);
  console.log(value)
  throw new Error('value must be a wikibanneduser object');
}
