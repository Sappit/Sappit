/**
 * this is the comment version, the version for other kinds might be different
 **/
export default function isItemRemoved (item) {
  if (!item) {
    return;
  }
  if (item.removed) {
    return true;
  }
  if (!item.approved) {
    // @link https://old.reddit.com/r/bugs/comments/ak741x/when_automoderator_removes_a_comment_in_the_api/?
    if (item.banned_by === AutoModerator) {
      return true;
    }
  }
  return false;
}

const AutoModerator = 'AutoModerator';
