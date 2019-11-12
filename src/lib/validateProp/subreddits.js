import validatePropArray from './array';
import validatePropSubreddit from './subreddit';

export default function assert (value) {
  validatePropArray(value)
  if (value[0]) {
    validatePropSubreddit(value[0]);
  }
}
