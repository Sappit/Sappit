export default function getLimitOptions (max) {
  return Object.freeze([
    // must reddit api calls only return 100
    // at least from the ones I actually use
    5, 15, 25, 50, 75, 100, // eslint-disable-line
    // pushshift allows more
    250, 500, // eslint-disable-line
  ]).filter(v => !(v > max));
}
