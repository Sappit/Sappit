import { goto } from '@sapper/app';
import { isAuthenticated } from '~/store/auth';
import { get as store_get } from 'svelte/store';

export default async function() {
  if (store_get(isAuthenticated)) {
    return goto('/home');
  }
}
