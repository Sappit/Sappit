export default function getCommentLinkToFullComments (item, page) {
  const { parent_id, permalink, link_id, id } = item;
  if (parent_id && permalink) {
    const linkPath = permalink.replace(`/${id}/`, '/');
    if (page.path !== linkPath) {
      return linkPath;
    }
  }
  return null;
}
