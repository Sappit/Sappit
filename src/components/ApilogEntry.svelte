<div class="apilog-entry">
  <div class="card">
    <div class="card-header">
      <tt class={statusCssClass}>{item.status}</tt>

      <tt>{ (item.method || '').toUpperCase() }</tt>

      <tt>{ item.fullPath }</tt>
      <span class="text-muted"> as </span>
      <UserLink username={item.username} />
      <div class="pull-right">
        { item.ms.toFixed() } ms
        <TimeAgo value={item.start}/>
        {#if item.method !== 'get'}
        <span class="btn-see-result" on:click|preventDefault|stopPropagation={$show.togglePayload}>
          <i class="fa fa-fw fa-btn fa-code"/>
          <span>see payload</span>
        </span>
        {/if}

        <span class="btn-see-result" on:click|preventDefault|stopPropagation={$show.toggleResult}>
          <i class="fa fa-fw fa-btn fa-code"/>
          <span>see result</span>
        </span>

        <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
          <i class="fa fa-fw fa-btn fa-code"/>
          <span>see source</span>
        </span>
      </div>
    </div>
    {#if $show.payload && item.method !== 'get'}
    <div class="card-body">
      <pre>
        <tt>{ JSON.stringify(item.data) }</tt>
      </pre>
    </div>
    {/if}
    {#if $show.result}
    <div class="card-body {statusBgCssClass}">
      <div class="card-text">
        <pre>
          <tt>{ item.result }</tt>
        </pre>
      </div>
    </div>
    {/if}
    {#if $show.source}
      <ShowSource value={item} />
    {/if}
  </div>
</div>

<script>
import TimeAgo from '~/components/TimeAgo';
import UserLink from '~/components/UserLink';
import ShowSource from '~/components/ShowSource';
import validatePropItem from '~/lib/validateProp/item';
import { oneOpen } from '~/lib/open';

// props
export let item;
let show = oneOpen();

// $: validatePropItem(item);

$: status = item ? item.status : null;
$: statusCssClass = (
  status >= 400
    ? 'text-danger'
    : (status >= 300 ? 'text-warning' : 'text-success')
)
$: statusBgCssClass = (
  status >= 400
    ? 'bg-danger'
    : (status >= 300 ? 'bg-warning' : 'bg-success')
)
</script>
