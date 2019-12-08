<div class="posts-grouped-by-links-list">
  {#each linksList as link (link.link_id)}
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
        <span class="badge badge-dark">
          {link.comments ? link.comments.length : 'NA'}
        </span>

        <a class="small" rel="nofollow" target="_blank" href={link.url}>
          {link.display_url}
        </a>
      </div>
      <div class="card-body">
        {#if !collapsedLinks[link.display_url]}
          {#if link.post}
            <MixedList items={[link.post]}/>
          {/if}
          <MixedList items={link.comments}/>
        {:else}
          <small>{ link.comments.length } items hidden</small>
        {/if}
      </div>
    </div>
  {/each}
</div>

<script>
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import find from 'lodash/find';
import MixedList from '~/components/MixedList';
import getItemsLinksFiltered from '~/lib/getItemsLinksFiltered'
import validatePropItems from '~/lib/validateProp/items';

// props
export let items;
let collapsedLinks = {};
let linksList = null;

$: validatePropItems(items);
// $: links = getItemsLinksFiltered(items, c => c.hidden !== true && c.author !== '[deleted]')
$: links = getItemsLinksFiltered(items)
$: onLinksChange(links);
// $: console.log(items);

// immediate: true,
function onLinksChange (newValue) {
  // console.log('onLinksChange', newValue);
  forEach(newValue, l => {
    // autocollapse link section if all items have been interacted with
    collapsedLinks[l.display_url] =
      (get(l, 'postEntry.hidden') === true) ||
      !find(l.comments, whereNotInteractedWith);
  });

  linksList = Object.values(links);
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
</script>
