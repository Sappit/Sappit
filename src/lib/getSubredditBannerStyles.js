export default function getSubredditBannerStyles (subreddit) {
  const banner_img = subreddit ? subreddit.banner_img : null;
  return {
    'background-image': (banner_img
      ? `url("${banner_img}")`
      : null),
  };
}
