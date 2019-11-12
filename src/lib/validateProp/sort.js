export const allowedSortList = [
  'hot',
  'new',
  'top',
  'controversial',
  // theres probably more
];

export default function assert (value) {
  if (!allowedSortList.includes(value)) {
    throw new Error('sort value must be in '+allowedSortList.join(', '))
  }
}
