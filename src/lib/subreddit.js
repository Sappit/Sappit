import includes from 'lodash/includes';
import { Kind } from '~/lib/enum';

// 'random' causes some weird issues
const virtualSubs = ['friends', 'all', 'popular', 'mod', 'random'];

/*
 * virtual subs come from a whitelist or are multiple subs combined with +
 **/
export function isVirtualSubreddit(subreddit) {
  return includes(subreddit, '+') || includes(virtualSubs, subreddit)
}

export function makeVirtualSubreddit(subreddit) {
  return {
    kind: Kind.Subreddit,
    display_name: subreddit,
  };
}
