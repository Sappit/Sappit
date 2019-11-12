import validatePropItem from './item';
import validatePropArray from './array';
import validatePropBoolean from './boolean';
import validatePropObject from './object';
import validatePropString from './string';

// items: (2) [{…}, {…}]
// path: "/user/undefined/overview"
// query: {sort: "new"}
// showBottomPagination: false
// zeroResults: false

export default function assert (value) {
  try {
    validatePropObject(value)

    validatePropArray(value.items)
    validatePropObject(value.query)
    validatePropString(value.path)
    validatePropBoolean(value.showBottomPagination)
    validatePropBoolean(value.zeroResults)
  } catch (err) {
    console.log(value)
    throw err;
    // throw new Error('value must be a collection object');
  }
}
