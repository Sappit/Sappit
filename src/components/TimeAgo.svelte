<span {title}>{text}</span>

<script>
import isNumber from 'lodash/isNumber';
import parseDateValueToDate from '~/lib/parseDateValueToDate';
import validatePropStringOrNumber from '~/lib/validateProp/stringOrNumber'
const distanceInWordsToNow = require('date-fns/distance_in_words_to_now');

// props
export let value;

$: validatePropStringOrNumber(value);
$: dateValue = parseDateValueToDate(value)
$: title = (dateValue && dateValue.toLocaleString) ? (
  dateValue.toLocaleString() + '\nISO8601: ' + dateValue.toISOString()
) : 'NA';
$: text = distanceInWordsToNow(dateValue) + ' ago'
</script>
