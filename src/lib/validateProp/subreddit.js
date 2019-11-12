import validatePropItem from './item';
import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropItem(value);
  if (value.kind !== Kind.Subreddit) {
    console.log('validatePropSubreddit', {value})
    throw new Error('value must be valid subreddit object');
  }
}
