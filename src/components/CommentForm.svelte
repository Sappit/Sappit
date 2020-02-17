<div class="comment-form">
  <textarea
    class="form-control comment-body"
    value={body}
    on:input={(event) => body = event.target.value}
    rows="3"
  ></textarea>
  <p>
    {#if isEditing}
      Editing
    {:else if isReplying}
      Replying
    {/if}
    as
    {#if isEditing}
      <UserLink username={selectedUsername || $MeData.name} />
    {:else}
      <SelectAuthUsername bind:value={selectedUsername}/>
    {/if}
  </p>
  {#if errors}
    <ErrorAlert value={errors} />
  {/if}
  <button
    class="btn btn-secondary"
    class:disabled={(isSaveDisabled)}
    disabled={(isSaveDisabled)}
    on:click|preventDefault|stopPropagation={save}
  >
    {#if saving}
      <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
      {#if editingComment && editingComment.id}
        Updating
      {:else}
        Saving
      {/if}
    {:else}
      <i class="fa fa-fw fa-btn fa-floppy"/>
      {#if editingComment && editingComment.id}
        {#if editingComment.body === body}
          Update
        {:else}
          Update
        {/if}
      {:else}
        Save
      {/if}
    {/if}
  </button>
  <button class="btn btn-info btn-cancel" on:click|preventDefault|stopPropagation={() => dispatch("close")}>
    <i class="fa fa-fw fa-btn fa-cancel"/>
    {#if !editingComment || !editingComment.id || body !== editingComment.body}
      Cancel
      {#if (body && !editingComment) || (editingComment && body !==
          editingComment.body)}
        <small>(unsaved changes!)</small>
      {/if}
    {:else}
      Done
    {/if}
  </button>
</div>

<script>
import get from 'lodash/get';
import ErrorAlert from '~/components/ErrorAlert';
import SelectAuthUsername from '~/components/SelectAuthUsername';
import UserLink from '~/components/UserLink';
import { startMinWait } from '~/lib/sleep';
import thingsToTree from '~/lib/thingsToTree';
import reddit from '~/lib/reddit';
import { createEventDispatcher, onMount } from 'svelte'
import { MeData } from '~/store/auth';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropComment from '~/lib/validateProp/comment';
import validatePropString from '~/lib/validateProp/string';

const dispatch = createEventDispatcher();

// props
export let parent;
export let comment = null;
let selectedUsername = null;
let body = '';
let editingComment = null;
let saving = false;
let trashing = false;
let errors = null;

$: parent===null || validatePropItem(parent);
$: comment===null || validatePropComment(comment);
$: validatePropBoolean(saving);
$: validatePropBoolean(trashing);
$: editingComment===null || validatePropComment(editingComment);
$: validatePropString(body);
$: selectedUsername===null || validatePropString(selectedUsername);
$: isSaveDisabled = saving || trashing || !body;
$: isReplying = !isEditing || !!parent;
$: isEditing = !!editingComment;
$: console.log('editingComment', editingComment);

onMount(() => {
  editingComment = comment;
  if (comment) {
    body = comment.body;
    selectedUsername = comment.author;
  }
})

async function save($event) {
  const minWait = startMinWait();
  errors = null;
  try {
    saving = true;
    if (editingComment && editingComment.id) {
      const response = await reddit.post(
        '/api/editusertext',
        {
          thing_id: editingComment.name,
          text: body,
          return_rtjson: true,
        },
        {
          username: editingComment.author,
        },
      );

      if (get(response, 'data.json.errors.length')) {
        errors = response.data.json.errors;
      } else {
        Object.assign(editingComment, response.data);
        dispatch('updated-comment', editingComment);
      }
    } else {
      const parent_id = parent.name;
      const response = await reddit.post(
        '/api/comment',
        {
          thing_id: parent.name,
          text: body,
          return_rtjson: true,
          api_type: 'json',
        },
        {
          username: selectedUsername,
        },
      );

      if (get(response, 'data.json.errors.length')) {
        errors = response.data.json.errors;
      } else if (get(response, 'data.json.data.things')) {
        const tree = thingsToTree(
          get(response, 'data.json.data.things'),
          parent_id,
        );
        dispatch('append-replies', tree);
      } else {
        editingComment = {
          ...response.data,
          kind: 't1',
        };
        dispatch('created-comment', editingComment);
      }
    }
  } catch (err) {
    errors = err;
    throw err;
  } finally {
    await minWait;
    saving = false;
  }
}
</script>
