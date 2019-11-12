export default function assert (value) {
  if (!(value && value.kind)) {
    console.log('validatePropItem', {value})
    throw new Error('value must be a valid item object');
  }
  if (value && value.data) {
    console.log('validatePropItem', {value})
    throw new Error('item object should have unnested it\'s data prop');
  }
}
