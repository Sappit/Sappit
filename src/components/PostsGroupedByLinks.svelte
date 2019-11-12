<div class="posts-grouped-by-links-list">
  {#each links as link (link.display_url)}
    <div class="card">
      <div class="card-header">
        <div class="pull-right">
          <i
            class="fa fa-fw fa-btn btn-collapse"
            class:fa-plus={collapsedLinks[link.display_url]}
            class:fa-minus={!collapsedLinks[link.display_url]}
            on:click|preventDefault|stopPropagation={() => toggleLinkCollapse(link)}
          />
        </div>
        <span class="badge badge-dark">{link.posts ? link.posts.length : 'NA'}</span>

        <a class="small" rel="nofollow" target="_blank" href={link.url}>
          {link.display_url}
        </a>
      </div>
      {#if !collapsedLinks[link.display_url]}
        <div class="card-body">
          {#each link.posts as post, index (post.id)}
            <PostEntry {post} show-thumbnail={index===0}/>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>

<script>
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import CommentEntry from '~/components/CommentEntry';
import PostEntry from '~/components/PostEntry';
import PushshiftMissingEntry from '~/components/PushshiftMissingEntry';
import SubredditEntry from '~/components/SubredditEntry';
import validatePropItems from '~/lib/validateProp/items';

// const notHidden = p => p.data.hidden !== true;
const notAuthorDeleted = p => p.author !== '[deleted]';


// props
export let items;
let collapsedLinks = {};

$: validatePropItems(items);
$: links = getLinks(items)
$: onLinksChanged(items)

function getLinks(collection) {
  let items = this.items.data.children;
  // items = items.filter(notHidden);
  items = items.filter(notAuthorDeleted);
  return items.reduce((carry, post) => {
    const url = post.url || post.permalink;
    if (!carry[url]) {
      carry[url] = {
        url,
        display_url: urlToDisplayUrl(url),
        posts: [],
      };
    }
    carry[url].posts.push(post);
    return carry;
  }, {});
}

// immediate: true,
function onLinksChanged(newValue) {
  forEach(newValue, l => {
    // autocollapse link section if all items have been interacted with
    collapsedLinks[l.display_url] = !!find(l.posts, whereNotInteractedWith);
  });
  collapsedLinks = collapsedLinks;
}

function whereNotInteractedWith (post) {
  if (post.hidden === true) return false;
  if (post.saved === true) return false;
  if (post.likes !== null) return false;
  return true;
}

function toggleLinkCollapse(link) {
  collapsedLinks[link.display_url] = !collapsedLinks[link.display_url]
  collapsedLinks = collapsedLinks
}

const startRegex = /^(http|https|ftp):\/\/(www[0-9]{0,3}\.){0,1}/i;
function urlToDisplayUrl(url) {
  return url.replace(startRegex, '').slice(0, 128);
}
</script>
