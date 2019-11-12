<input
  class="form-control"
  name={path}
  placeholder={placeholder===null ? path : placeholder}
  {value}
  on:change={(event) => {
    valueProxy.set(event.target.value);
  }}
/>

<script>
import validatePropString from '~/lib/validateProp/string';
import queryStore from '~/store/query';
import { stores } from '@sapper/app';
const { page } = stores();

export let path;
export let placeholder = null;

let value = '';

const valueProxy = queryStore[path]

$: validatePropString(path);
$: placeholder===null || validatePropString(placeholder);
$: value = $page.query[path] || '';
</script>
