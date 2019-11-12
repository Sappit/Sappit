import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';

export default function getQuickRemovesFiltered (quickRemoves, authorsList) {
  return sortBy(
    Object.values(quickRemoves).filter(
      qr => !includes(authorsList, qr.name),
    ),
    'name',
  );
}
