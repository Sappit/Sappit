<div class="history-entry">
  <div class="card">
    <div class="card-header">
      <tt>
        { item.path }
        <span class="text-muted">?...</span>
      </tt>
    </div>
    <div class="card-body">
      <table>
        <tbody>
          {#each item.subEntries as se, index (se.timestamp)}
            <tr>
              <td>
                <a href={href(se)}>
                  <tt>{ href(se) }</tt>
                </a>
              </td>
              <td><TimeAgo value={se.timestamp} /></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="card-footer bg-light">
      <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
        <i class="fa fa-fw fa-btn fa-code"/>
        <span>see source</span>
      </span>
    </div>
    {#if $show.source}
      <ShowSource value={item} />
    {/if}
  </div>
</div>

<script>
import TimeAgo from '~/components/TimeAgo';
import ShowSource from '~/components/ShowSource';
import validatePropItem from '~/lib/validateProp/item';
import href from '~/lib/href';
import { oneOpen } from '~/lib/open';

// props
export let item;
let show = oneOpen();

// $: console.log(item);
// $: validatePropItem(item);

</script>
