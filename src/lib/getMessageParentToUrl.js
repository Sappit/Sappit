/**
 * compare to CommentEntry.computed.parentTO
 * the JSON here is missing link_id compare
 **/
export default function getMessageParentToUrl (message) {
  const { context, link_id, id } = message;

  if (context && message.parent_id && message.parent_id.startsWith('t1_')) {
    const parent_id = message.parent_id
      ? message.parent_id.replace('t1_', '')
      : null;

    return context.replace(`/${id}/`, `/${parent_id}/`)
  }
  return null;
}
