export default function toggle (currentValue, key) {
  return (currentValue===key) ? null : key;
}
