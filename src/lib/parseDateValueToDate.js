import isNumber from 'lodash/isNumber';

export default function parseDateValueToDate (value) {
  if (value instanceof Date) {
    return value;
  }
  if (isNumber(value)) {
    return new Date(value * 1000);
  }
  return new Date(value);
}
