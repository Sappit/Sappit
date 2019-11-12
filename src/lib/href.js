const qs = require('qs');

export function parse (value) {
  if (typeof value === 'string') {
    value = new URL(value);
    return {
      // hash: value.hash,
      path: value.pathname,
      query: value.search ? qs.parse(value.search.slice(1)) : {},
    };
  }
  return value;
}

export function merge (route1, route2) {
  if (route1 && route2) {
    route1 = parse(route1);
    route2 = parse(route2);

    route1 = {
      path: route2.path || route1.path,
      query: {
        ...route1.query,
        ...route2.query,
      },
    };
  }
  return route1 || route2;
}

export default function href (route1, route2) {
  // console.log('href', { route1, route2 });
  if (route2) {
    return href(merge(route1, route2));
  }

  if (typeof route1 === 'object') {
    return route1.path + '?' + qs.stringify(route1.query)
  }

  return route1
}
