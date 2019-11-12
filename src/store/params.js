import { get as store_get, writable } from 'svelte/store'
import { stores } from '@sapper/app'

// $page.params.username
export const user = writable(null);

// $page.params.subreddit
export const subreddit = writable(null);

// $page.params.multi
export const multi = writable(null);
