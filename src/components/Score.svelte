<span {title}>{humanNumber}</span>

<script>
import isNumber from 'lodash/isNumber';
import validatePropItem from '~/lib/validateProp/item';

// props
export let item;

$: validatePropItem(item);
$: humanNumber = item.score_hidden ? '?' : item.score;
$: title = item.score_hidden ? 'score hidden' : (
  isNumber(item.UpVote_ratio) ? `${item.UpVote_ratio * 100}%` : null
);
</script>
