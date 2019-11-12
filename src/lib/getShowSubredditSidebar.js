const arr = [
  'r-subreddit-description',
  'r-subreddit-community-details',
];

export default function getShowSubredditSidebar (subreddit, route) {
  if (subreddit && route && route.name) {
    return !arr.includes(route.name);
  }
  return false;
}
