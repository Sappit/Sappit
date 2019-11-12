import validatePropObject from './object';
// import { Kind } from '~/lib/enum';

export default function assert (value) {
  validatePropObject(value);
// createdAt: 1573093343
// name: "t1_e9kuwy8"
// route: "/r/AskReddit/comments/9whgf4/stan_lee_has_passed_away_at_95_years_old/e9kuwy8/"
// text: "FYI to those wh
  // if (value.kind !== Kind.QueueEntry) {
  //   console.log('validatePropQueueEntry', {value})
  //   throw new Error('value must be valid queue entry object');
  // }
}
