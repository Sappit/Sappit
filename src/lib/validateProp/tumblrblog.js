import validatePropObject from './object';

export default function assert (value) {
  validatePropObject(value);
  if (!(value.uuid && value.name && value.url && value.type)) {
    console.log(value)
    throw new Error('value must be a tumblrblog object');
  }
}
