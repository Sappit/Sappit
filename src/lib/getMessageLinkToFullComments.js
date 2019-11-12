export default function getMessageLinkToFullComments (message, page) {
  const { context, id } = message;
  if (context) {
    const linkPath = context.replace(`/${id}/`, '/');
    if (page.path !== linkPath && context !== linkPath) {
      return linkPath;
    }
  }
  return null;
}
