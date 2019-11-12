{#if expanded}
  <i
    class="fa fa-fw fa-minus"
    on:click|preventDefault|stopPropagation={() => expanded = false}
  />
  {#each domain_list as name}
    <div>
      <i
        class="fa fa-fw fa-cancel"
        on:click|preventDefault|stopPropagation={() => {
          $domain_csv = domain_list.filter(n => n !== name).join(',')
        }}
      />
      <span class="badge badge-secondary">{name}</span>
    </div>
  {/each}
  <div class="row">
    <div class="col">
      <input
        class="form-control"
        name="add_domain"
        bind:value={nextname}
        placeholder="domain"
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
            if ($domain_csv) {
              $domain_csv = `${$domain_csv},${nextname}`
            } else {
              $domain_csv = nextname;
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
            bind:checked={$domainnegated}
          />
          <label class="form-check-label" for="inlineCheckbox1">exclude</label>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      {#each quickRemovesFiltered as qr}
        <button
          class="btn btn-sm btn-success"
          on:click|preventDefault|stopPropagation={() => {
          if ($domain_csv) {
            $domain_csv = `${$domain_csv},${qr.name}`
          } else {
            $domain_csv = qr.name;
          }
        }}>
          <i class="fa fa-fw fa-plus"/>
          Add <tt>{ qr.name }</tt> ({ qr.count })
        </button>
      {/each}
    </div>
  </div>
{:else}
  <i class="fa fa-fw fa-plus" on:click|preventDefault|stopPropagation={() => expanded = true}/>
  { $domainnegated ? 'Excluding' : 'Including' } Domains:
  <span class="badge badge-secondary">{domain_list.slice(0, 5).join(', ') || 'None'}</span>
  {#if domain_list.length > 5}
    <span class="badge badge-secondary">...{ (domain_list.length - 5) } more</span>
  {/if}
{/if}

<script>
import queryStore from '~/store/query';
import cleanupSubName from '~/lib/cleanupSubName'
import getQuickRemovesFiltered from '~/lib/getQuickRemovesFiltered'
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropQuickRemoves from '~/lib/validateProp/quickRemoves';
import validatePropString from '~/lib/validateProp/string';

const { domain: domain_csv, domainnegated } = queryStore

// props
export let quickRemoves;
let expanded = false;
let nextname = '';

$: validatePropQuickRemoves(quickRemoves);
$: validatePropBoolean(expanded);
$: validatePropString(nextname);
$: domain_list = ((($domain_csv && $domain_csv.split)
  ? $domain_csv.split(',').map(cleanupSubName).filter(Boolean)
  : null) || [])
$: quickRemovesFiltered = getQuickRemovesFiltered(quickRemoves, domain_list)
</script>
