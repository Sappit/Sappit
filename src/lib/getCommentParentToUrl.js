export default function getCommentParentToUrl (item) {
  const { parent_id, permalink, link_id, id } = item;
  if (parent_id && parent_id !== link_id && permalink) {
    return permalink.replace(id, parent_id.slice(3));
  }
  return null;
}
