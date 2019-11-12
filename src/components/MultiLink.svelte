<a class={classes} href="/me/m/{name}">/me/m/{name}</a>

<script>
import validatePropString from '~/lib/validateProp/string';

// props
export let name;

$: validatePropString(name);
$: classes = `mrl-${name}`

</script>
