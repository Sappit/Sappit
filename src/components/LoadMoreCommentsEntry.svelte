{#if comments}
  <CommentTree class="comment-tree-loaded" {comments} />
{:else}
  <div class="load-more-comments-entry">
    <div class="btn-load-more" on:click|preventDefault|stopPropagation={loadMore}>
      {#if fetching}
        <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
      {:else}
        <i class="fa fa-fw fa-btn fa-chat"/>
      {/if}
      load more comments ({ item.count } replies)
    </div>
  </div>
{/if}

<script>
import CommentTree from '~/components/CommentTree';
import { createEventDispatcher } from 'svelte';
import startMinWait from '~/lib/sleep';
import thingsToTree from '~/lib/thingsToTree';
import reddit from '~/lib/reddit';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropComments from '~/lib/validateProp/comments';
import { stores } from '@sapper/app'
const { page } = stores();

const dispatch = createEventDispatcher();

// the backend can't handle large incoming requests
const MAX_MORE_CHILDREN = 500;

// props
export let item;
let comments = null;
let fetching = false;

$: validatePropItem(item);
$: validatePropBoolean(fetching);
$: comments===null || validatePropComments(comments);

async function loadMore($event) {
  const minWait = startMinWait();
  try {
    const { children, name, parent_id } = item;
    const { post_id } = $page.params;
    fetching = true;

    const response = await reddit.get('/api/morechildren', {
      params: {
        api_type: 'json',
        // only first MAX_MORE_CHILDREN
        children: children.slice(0, MAX_MORE_CHILDREN).join(','),
        link_id: `t3_${post_id}`,
        sort: 'new',
      },
    });

    const tree = thingsToTree(response.data.json.data.things, parent_id);

    dispatch('append-children', tree);
    dispatch('remove-more', item);
  } finally {
    await minWait;
    fetching = false;
  }
}
</script>
