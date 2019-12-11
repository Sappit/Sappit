<div class="container">
<select name="method" class="form-control r-select" value={method}>
  <option value="GET">GET</option>
  <option value="HEAD">HEAD</option>
  <option value="POST">POST</option>
  <option value="PUT">PUT</option>
  <option value="PATCH">PATCH</option>
  <option value="DELETE">DELETE</option>
</select>

<div class="form-group">
  <input type="text" class="form-control" value={path}/>
</div>

<div>
  {#each queryList as ql}
    <div class="form-group row">
      <input class="col" value={ql.key}/>
      <input class="col" value={ql.value}/>
      <button on:click={() => { queryList = queryList.filter(entry => entry !== ql) }}>x</button>
    </div>
  {/each}
  <div class="form-group row">  
    <button class="col" on:click={() => { queryList.push({key: '', value: ''}); queryList = queryList }}>+</button>
  </div>
</div>

<div>
  {#each dataList as item}
    <div class="form-group row">
      <input class="col" value={item.key}/>
      <input class="col" value={item.value}/>
      <button on:click={() => { dataList = dataList.filter(entry => entry !== item) }}>x</button>
    </div>
  {/each}
  <div class="form-group row">  
    <button class="col" on:click={() => { dataList.push({key: '', value: ''}); dataList = dataList }}>+</button>
  </div>
</div>

<div class="row">
  <div class="col">
    <SelectAuthUsername bind:value={username}/>
  </div>
</div>

<div class="row">
  <div class="col">
    <ShowSource value={'Payload '+JSON.stringify(payload, null, 2)}/>
  </div>
</div>

<div class="row">
  <button class="col" on:click={execute}>execute</button>
</div>

<div class="form-group">
  <textarea class="form-control" value={resultText}></textarea>
</div>
{#if error}
  <ErrorAlert value={errorText || error}/>
{/if}
</div>

<script>
import { onMount } from 'svelte';
import ShowSource from '~/components/ShowSource'
import SelectAuthUsername from '~/components/SelectAuthUsername'
import ErrorAlert from '~/components/ErrorAlert'
import qs from 'qs'
import reddit from '~/lib/reddit'
import { usernames } from '~/store/auth';

let method = 'GET'
let path = '/r/popular'
let queryList = []
let dataList = []
let response = null
let error = null
let username = null
let fetching = false
let resultText = ''

$: query = queryList.reduce(kvListToObject, {})
$: data = dataList.reduce(kvListToObject, {})
$: url = queryList.length ? `${path}?${qs.stringify(query)}` : path
$: payload = {
  username,
  method,
  url,
  data,
}
$: responseText = (response && getResponseText(response)) || ''
$: errorText = (error && error.response && getResponseText(error.response)) || error || ''
$: statusCode = (response && response.status) ||
  (error && error.response && error.response.status) ||
  (error && error.status) || null

onMount(() => {
  username = $usernames[0] || null
})

async function execute () {
  try {
    fetching = true
    response = await reddit(payload)
    error = null
  } catch (err) {
    response = null
    error = err
  } finally {
    fetching = false
  }
}

function getResponseText (response) {
  if (response) {
    if (typeof response.data === 'string') {
      return response.data
    }
    if (typeof response.data === 'object') {
      // @todo yaml mode
      return JSON.stringify(response.data, null, 2)
    }
  }
  // don't know how to stringify this one
  return response
}

function kvListToObject (carry, row) {
  if (row && row.key) {
    carry[row.key] = row.value
  }
  return carry
}
</script>
