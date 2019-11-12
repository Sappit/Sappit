import reddit from '~/lib/reddit';
import undata from '~/lib/undata';
import { isVirtualSubreddit, makeVirtualSubreddit } from '~/lib/subreddit';

const fetchSubPromises = {};

export default async function fetchSubreddit(subname) {
  if (!fetchSubPromises[subname]) {
    fetchSubPromises[subname] = _fetchSubreddit(subname);
  }
  return await fetchSubPromises[subname];
}

async function _fetchSubreddit (subname) {
  if (isVirtualSubreddit(subname)) {
    return makeVirtualSubreddit(subname);
    // sidebar = null;
  }

  return reddit.get(`/r/${subname}/about`, {
    params: {
      api_type: 'json',
    },
  }).then(res => {
    return undata(res.data);
  }, err => {
    // attempting to handle 404 subreddit DNE
    if (err.message === 'Network Error') {
      const vsub = makeVirtualSubreddit(subname);
      vsub.networkError = true;
      return vsub;
      // console.error(err);
      // console.error(err.response); // undefined
      // console.error(err.config); // valid, but useless
      // console.error(err.request); // undefined
      // console.error(err.code); // undefined
      // console.error(err.message); // 'Network Error'
      // console.error(err.prototype); // undefined
    }

    throw err;
  })
}
