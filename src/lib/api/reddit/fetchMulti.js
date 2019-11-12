import find from 'lodash/find';
import reddit from '~/lib/reddit';
import undata from '~/lib/undata';

export default async function fetchMulti (multiname) {
  const multis = await reddit.get(`/api/multi/mine`);
  //eslint-disable-next-line
  // console.log(multis.data, multi, find(multis.data, m => m.data.name === multi));
  // console.log(multis.data);

  const multi = undata(find(multis.data, m => m.data.name === multiname));
  // console.log(multi);

  return multi;
}
