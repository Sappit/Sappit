{#if zeroComments}
  <div class="comment-tree zero-messages">No messages.</div>
{:else}
  <div class="comment-tree has-messages">
    {#each messages.data.children as message, index (message.id)}
      {#if message.kind === Kind.Message}
        <MessageEntry {message} />
      {:else}
        <div class="text-danger">unknown entry type { message.kind }</div>
      {/if}
    {/each}
  </div>
{/if}

<script>
import get from 'lodash/get';
import MessageEntry from '~/components/MessageEntry';
import validatePropMessages from '~/lib/validateProp/messages';
import { Kind } from '~/lib/enum';

// props
export let messages;

$: validatePropMessages(messages);
$:zeroComments = !(get(messages, 'data.children', 0) > 0)

async function collapseAll(value = true) {
  // const { $children } = this;
  // for (let i = 0, len = $children.length; i < len; i++) {
  //   if ($children[i] && $children[i].setCollapsed) {
  //     $children[i].setCollapsed(value);
  //   }
  //   if (i % 5 === 100) {
  //     await null;
  //   }
  // }
}
function appendChildren(children) {
  // this.messages.data.children = this.messages.data.children.concat(
  //   children,
  // );
}
function removeMore(moreItem) {
//   this.messages.data.children = this.messages.data.children.filter(c => {
//     if (c && c.data) {
//       if (c.kind !== 'more') return true;
//       if (c.data.name !== moreItem.data.name) return true;
//       if (c.data.count !== moreItem.data.count) return true;
//     }
//     return false;
//   });
}
</script>
