import includes from 'lodash/includes';
import { Kind } from '~/lib/enum';

// 'random' causes some weird issues
const virtualSubs = ['friends', 'all', 'popular', 'mod', 'random'];

export function isVirtualSubreddit(subreddit) {
  return includes(virtualSubs, subreddit);
}

export function makeVirtualSubreddit(subreddit) {
  return {
    kind: Kind.Subreddit,
    display_name: subreddit,
  };
}
