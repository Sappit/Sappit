{#if !$noBlogs}
<span
  class="btn-tumblr-share"
  on:click|preventDefault|stopPropagation={(event) => dispatch('click', event)}
>
  <i class="fa fa-fw fa-btn fa-cw"/>
  tumblr
</span>
{/if}

<script>
import { createEventDispatcher } from 'svelte';
import { noBlogs } from '~/store/tumblr';
const dispatch = createEventDispatcher();
</script>
