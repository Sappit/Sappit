<pre>
  <tt>
    <small>{ json }</small>
  </tt>
</pre>

<script>
  export let value = null

$: json = JSON.stringify(value, null, 2)
</script>
