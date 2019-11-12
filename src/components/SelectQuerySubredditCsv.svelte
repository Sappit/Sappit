{#if expanded}
  <i
    class="fa fa-fw fa-minus"
    on:click|preventDefault|stopPropagation={() => expanded = false}
  />
  {#each subreddit_list as name}
    <div>
      <i
        class="fa fa-fw fa-cancel"
        on:click|preventDefault|stopPropagation={() => {
          $subreddit_csv = subreddit_list.filter(n => n !== name).join(',');
        }}
      />
      <span class="badge badge-secondary">{name}</span>
    </div>
  {/each}
  <div class="row">
    <div class="col">
      <input
        class="form-control"
        name="add_subreddit"
        bind:value={nextname}
        placeholder="subreddit"
      />
    </div>
    <div class="col row">
      <div class="col">
        <button
          class="btn btn-success"
          class:disabled={!cleanupSubName(nextname)}
          disabled={!cleanupSubName(nextname)}
          on:click|preventDefault|stopPropagation={() => {
            nextname = cleanupSubName(nextname)
            if ($subreddit_csv) {
              $subreddit_csv = `${$subreddit_csv},${nextname}`
            } else {
              $subreddit_csv = nextname;
            }
            nextname = '';
          }}
        >
          <i class="fa fa-fw fa-plus"/>
          Add
        </button>

      </div>
      <div class="col">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input" type="checkbox" id="inlineCheckbox1"
            bind:checked={$subredditnegated}
          />
          <label class="form-check-label" for="inlineCheckbox1">exclude</label>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      {#each quickRemovesFiltered as qr}
        <div
          class="btn btn-sm btn-success"
          on:click|preventDefault|stopPropagation={() => {
          if ($subreddit_csv) {
            $subreddit_csv = `${$subreddit_csv},${qr.name}`
          } else {
            $subreddit_csv = qr.name;
          }
        }}>
          <i class="fa fa-fw fa-plus"/>
          Add <tt>{ qr.name }</tt> ({ qr.count })
        </div>
      {/each}
    </div>
  </div>
{:else}
  <i class="fa fa-fw fa-plus" on:click|preventDefault|stopPropagation={() => expanded = true}/>
  { $subredditnegated ? 'Excluding' : 'Including' } Subs:
  <span class="badge badge-secondary">{subreddit_list.slice(0, 5).join(', ') || 'None'}</span>
  {#if subreddit_list.length > 5}
    <span class="badge badge-secondary">...{ (subreddit_list.length - 5) } more</span>
  {/if}
{/if}

<script>
import queryStore from '~/store/query';
import cleanupSubName from '~/lib/cleanupSubName'
import getQuickRemovesFiltered from '~/lib/getQuickRemovesFiltered'
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropQuickRemoves from '~/lib/validateProp/quickRemoves';
import validatePropString from '~/lib/validateProp/string';

const { subreddit: subreddit_csv, subredditnegated } = queryStore;

// props
export let quickRemoves;
let expanded = false;
let nextname = '';

$: validatePropQuickRemoves(quickRemoves);
$: validatePropBoolean(expanded);
$: validatePropString(nextname);
$: subreddit_list = ((($subreddit_csv && $subreddit_csv.split)
  ? $subreddit_csv.split(',').map(cleanupSubName).filter(Boolean)
  : null) || [])
$: quickRemovesFiltered = getQuickRemovesFiltered(quickRemoves, subreddit_list)
</script>
