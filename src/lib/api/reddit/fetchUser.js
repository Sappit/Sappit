import reddit from '~/lib/reddit';
import undata from '~/lib/undata';

const fetchUserPromises = {};

export default async function fetchUser(username) {
  if (!fetchUserPromises[username]) {
    fetchUserPromises[username] = reddit.get(`/user/${username}/about`).then(res => {
      return undata(res.data);
    });
  }
  return await fetchUserPromises[username];
}
