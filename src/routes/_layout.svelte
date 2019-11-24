{#if process.browser}
  <NavBar {segment}/>
  <QueueBar/>
  <slot/>
  <div class="last-br"/>
  <BackToTop>
    <button class="btn btn-info btn-to-top" type="button">
      <i class="fa fa-up-open"/>
    </button>
  </BackToTop>
{/if}

<script>
import NavBar from '~/components/NavBar'
import QueueBar from '~/components/QueueBar'
import BackToTop from 'svelte-backtotop/src/components/SimpleBackToTop.svelte'
import { stores } from '@sapper/app';
import { add } from '~/store/history';
import clientInit from '~/lib/clientInit';

const { page } = stores();

export let segment

// add page to history
$: add($page);

if (process.brower) {
  clientInit();
}
// $: console.log({ segment })
</script>
