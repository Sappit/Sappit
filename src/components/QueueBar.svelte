{#if $list.length > 0}
<div class="btn-group">
  <a class="btn btn-secondary" href="/sappit/queue">
    <i class="fa fa-fw fa-database"/>
    ({ $list.length })
  </a>
  {#if moreThanOne && isPageQueued && !isLast}
    <div class="btn btn-secondary"
        on:click|preventDefault|stopPropagation={requeueAndNext}>
      <i class="fa fa-fw fa-arrows-cw"/>
    </div>
  {/if}
  {#if isPageQueued}
    <div class="btn btn-secondary" on:click|preventDefault|stopPropagation={popAndStay}>
      <i class="fa fa-fw fa-eject"/>
    </div>
  {/if}
  {#if nextEntry}
    <a class="btn btn-secondary" href={nextEntry.route} on:click|preventDefault|stopPropagation={popNext}>
      <i class="fa fa-fw fa-to-end"/>
      <small>{ (nextEntry.text || '').slice(0, 64) }</small>
    </a>
  {/if}
</div>
{/if}

<script>
import get from 'lodash/get';
import find from 'lodash/find';
import first from 'lodash/first';
import last from 'lodash/last';
import { list, markDone, requeue } from '~/store/queue';
import { goto, stores } from '@sapper/app'

const { page } = stores();

$: firstEntry = first($list)
$: lastEntry = last($list)
$: currentEntry = find($list, entry => entry.route === $page.path);
$: nextEntry = setNextEntry($list, currentEntry, firstEntry)
$: moreThanOne = $list.length > 1;
$: isPageQueued = !!currentEntry;
$: isLast = isPageQueued && lastEntry && lastEntry === currentEntry;

function popAndStay() {
  if (currentEntry) {
    markDone(currentEntry);
  }
}
function requeueAndNext() {
  if (nextEntry && nextEntry !== currentEntry) {
    requeue(currentEntry);
    goto(nextEntry.route);
  }
}
function popNext() {
  if (nextEntry && nextEntry !== currentEntry) {
    markDone(currentEntry);
  }
  if (nextEntry) {
    goto(nextEntry.route);
  }
}
function setNextEntry(list, currentEntry, firstEntry) {
  if (currentEntry) {
    const index = list.indexOf(currentEntry);
    if (index >= 0 && list[index + 1]) {
      return list[index + 1];
    }
    if (index > 0) {
      return list[0];
    }
  }
  if (!currentEntry && firstEntry) {
    return firstEntry;
  }
  return null;
}

</script>


