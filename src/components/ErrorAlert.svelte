  <div class="alert alert-danger">{(value ? value.message : null) || value}</div>

<script>
export let value = null

$: console.error(value)
// @todo handle this scenario:
//     <div class="alert alert-danger">{ error ? error.message : 'error' } <pre><code><tt>{ (error && error.response &&
        // error.response.data) || error }</tt/></pre></div>

</script>
