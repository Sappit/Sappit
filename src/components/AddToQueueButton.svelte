{#if isValidQueueable}
<span
  class="btn-add-to-queue"
  class:text-success={queued}
  class:disabled={busy}
  disabled={busy}
  on:click|preventDefault|stopPropagation={addToQueue}
  {title}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if queued}
      unqueuing
    {:else}
      queueing
    {/if}
  {:else if queued}
    <i class="fa fa-fw fa-btn fa-cancel"/>
    queued
    {#if position}
      <span title="position: {position}">
        ({position})
      </span>
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-plus"/>
    queue
  {/if}
</span>
{/if}

<script>
import { startMinWait } from '~/lib/sleep';
import { Kind } from '~/lib/enum';
import now from '~/lib/now';
import disabled from '~/lib/disabled';
import { list, add, remove, isSameEntry } from '~/store/queue';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);
$: payload = makePayload(item);
$: isPayloadSameEntry = e => isSameEntry(payload, e);
$: queued = !!find($list, isPayloadSameEntry);
$: isValidQueueable = !(!(payload && payload.route));
$: title = makeTooltip(payload);
$: payloadIndex = findIndex($list, isPayloadSameEntry);
$: position = payloadIndex >= 0 ? payloadIndex + 2 : null;

function makePayload (item) {
  const { kind, context, permalink, name, title, body, subject } = item;
  const route = permalink || context;
  const createdAt = now();
  if (kind === Kind.Comment) {
    return {
      name: name,
      text: (body || '').slice(0, 128),
      route,
      createdAt,
    };
    // console.log(item);
  } else if (kind === Kind.Post) {
    return {
      name: name,
      text: title,
      route,
      createdAt,
    };
    // console.log(item);
  } else if (kind === Kind.Message) {
    // console.log(item);
    return {
      name: name,
      title: subject,
      route,
      createdAt,
    };
    // console.log(item);
  } else {
    // console.log('kind', kind);
  }
  return null;
}

function makeTooltip (payload) {
  return JSON.stringify(payload, null, 2);
}

async function addToQueue($event) {
  busy = true;
  const minWait = startMinWait();
  setQueued(!queued);
  await minWait;
  busy = false;
}

async function setQueued (value) {
  if (value) {
    await add(payload);
  } else {
    await remove(payload);
  }
}
</script>
