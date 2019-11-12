import validatePropItem from './item';

export default function assert (value) {
  console.log(value)
  throw new Error('value must be a users list object');
}
