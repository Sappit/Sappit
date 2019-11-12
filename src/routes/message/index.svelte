<span>redirecting to /message/inbox</span>

<script>
import { onMount } from 'svelte';
import { goto } from '@sapper/app';

onMount(() => {
  goto('/message/inbox');
})
</script>
