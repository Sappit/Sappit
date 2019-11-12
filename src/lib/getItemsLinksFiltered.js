export default function getItemsLinksFiltered (items, filterFn) {
  if (filterFn) {
    items = items.filter(filterFn);
  }
  return items.reduce((carry, comment) => {
    const link_id = comment.link_id;
    const url = comment.url || comment.permalink;
    if (!carry[link_id]) {
      carry[link_id] = {
        link_id,
        url,
        display_url: urlToDisplayUrl(url),
        comments: [],
        post: null,
      };
    }
    if (!carry[link_id].post) {
      carry[link_id].post = comment.postEntry || null;
    }
    carry[link_id].comments.push(comment);
    return carry;
  }, {});
}

const startRegex = /^(http|https|ftp):\/\/(www[0-9]{0,3}\.){0,1}/i;
function urlToDisplayUrl(url) {
  return url.replace(startRegex, '').slice(0, 128);
}
