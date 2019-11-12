export default function cleanupSubName(name) {
  name = name || '';
  name = name.trim();
  // if (name[0] === '!') {
  //   name = name.substring(1);
  // }
  return name.trim();
}
