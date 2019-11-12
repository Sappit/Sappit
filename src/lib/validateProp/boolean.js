export default function assert (value) {
  if (value !== false && value !== true) {
    console.log(value)
    throw new Error('value must be true or false');
  }
}
