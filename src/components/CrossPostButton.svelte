<span class="btn-cross-post" on:click|preventDefault|stopPropagation={(event) => dispatch('click', event)}>
  <i class="fa fa-fw fa-btn fa-cw"/>
  <span>crosspost</span>
</span>

<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
</script>
