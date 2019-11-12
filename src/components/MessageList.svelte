<div class="messages-list">
  {#each messages as message (message.id)}
    <MessageEntry {message} />
  {/each}
</div>

<script>
import MessageEntry from '~/components/MessageEntry';
import validatePropMessages from '~/lib/validateProp/messages';

// props
export let messages;

$: validatePropMessages(messages);
</script>


