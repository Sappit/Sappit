export const Kind = {
  Comment: 't1',
  User: 't2',
  Post: 't3',
  Message: 't4',
  Subreddit: 't5',
  ModAction: 'modaction',
  PushshiftComment: 'psc',
  PushshiftPost: 'psp',
  LabeledMulti: 'LabeledMulti',
};

const queryToEnum = {
  submission: 'Post',
  post: 'Post',
  comment: 'Comment',
  subreddit: 'Subreddit',
  psc: 'PushshiftComment',
  psp: 'PushshiftPost',
};

export function parseKind(value) {
  // console.log({
  //   value,
  //   a1: queryToEnum[value],
  //   a2: Kind[queryToEnum[value]],
  //   b: Kind[value],
  //   c: Object.values(Kind).filter(kindId => kindId === value)[0],
  // });
  if (queryToEnum[value]) {
    return Kind[queryToEnum[value]];
  }
  if (Kind[value]) {
    return Kind[value];
  }
  return (
    Object.values(Kind).filter(kindId => kindId === value)[0] || Kind.Comment
  );
}
