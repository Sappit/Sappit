import { get as store_get, derived, writable } from 'svelte/store';
import { lsWritable } from '~/lib/ls';
import reddit, {
  fetchAccessToken as api_fetchAccessToken,
  fetchRefreshedAccessToken as api_fetchRefreshedAccessToken,
} from '~/lib/reddit';
import get from 'lodash/get';
import { goto } from '@sapper/app';
import now from '~/lib/now';

// tmp store during verification
export const tmpOAuthData = writable(null);

// current username
export const current = lsWritable('Current', null);
export const username = current;
// username.subscribe(username => {
//   console.log('authStore.username', username)
// })


// all user accounts
export const accounts = lsWritable('Accounts', null);

// MeData for current account
export const MeData = derived([accounts, current], ([accounts, current]) => {
  return (current && get(accounts, `${current}.MeData`)) || {};
});

export const fetchedAt  = derived(MeData, MeData => {
  return get(MeData, 'fetchedAt');
});

export const isAuthenticated  = derived(MeData, MeData => {
  return !!get(MeData, 'name');
});

// OAuthData for current account
export const OAuthData = derived([accounts, current], ([accounts, current]) => {
  return (current && get(accounts, `${current}.OAuthData`)) || {};
});

// usernames with OAuthData and MeData
export const usernames  = derived(accounts, accounts => {
  return Object.values(accounts || [])
    .filter(data => data && data.OAuthData && data.MeData && data.MeData.name)
    .map(data => data.MeData.name)
});

export async function fetchMe(username) {
  // console.log('fetchMe', {username})
  try {
    const response = await reddit.get('api/v1/me', { username });
    response.data.fetchedAt = now();

    const accountsValue = store_get(accounts);

    if (response.data.name) {
      const MeData = {
        ...get(accountsValue, `${response.data.name}.MeData`),
        ...response.data,
      };
      accounts.set({
        ...accountsValue,
        [response.data.name]: {
          ...get(accountsValue, `${response.data.name}`),
          MeData,
        },
      });
      return MeData;
    }
  } catch (err) {
    if (!username && get(err.response, 'status') === 401) {
      await goto('/login');
    } else {
      throw err;
    }
  }
}
export async function fetchAccessToken(params) {
  const response = await api_fetchAccessToken(params);
  if (params.username) {

    const accountsValue = store_get(accounts);

    accounts.set({
      ...accountsValue,
      [params.username]: {
        ...get(accountsValue, `${params.username}`),
        OAuthData: {
          ...get(accountsValue, `${params.username}.OAuthData`),
          ...response.data,
        },
      },
    });
  } else {
    tmpOAuthData.set(response.data);
  }
  return response;
}
export async function fetchRefreshedAccessToken({ username }) {

  const accountsValue = store_get(accounts);

  const response = await (username
    ? api_fetchRefreshedAccessToken(
        get(accountsValue, `${username}.OAuthData`),
      )
    : api_fetchRefreshedAccessToken(store_get(tmpOAuthData)));
  if (username) {
    accounts.set({
      ...accountsValue,
      [username]: {
        ...get(accountsValue, `${username}`),
        OAuthData: {
          ...get(accountsValue, `${username}.OAuthData`),
          expires_at: Date.now() + response.data.expires_in,
          ...response.data,
        },
      },
    });
  } else {
    tmpOAuthData.set({
      ...store_get(tmpOAuthData),
      expires_at: Date.now() + response.data.expires_in,
      ...response.data,
    });
  }
}
export async function logout(username) {
  if (username) {
    accounts.update(accountsValue => {
      delete accountsValue[username];
      return accountsValue;
    });
  } else {
    current.set(null);
    tmpOAuthData.set(null);
  }
}
export async function moveTmpOAuthData(username) {
  if (username) {

    const accountsValue = store_get(accounts);

    accounts.set({
      ...accountsValue,
      [username]: {
        ...get(accountsValue, `${username}`),
        OAuthData: {
          ...get(accountsValue, `${username}.OAuthData`),
          ...store_get(tmpOAuthData),
        },
      },
    });
    tmpOAuthData.set(null);
  }
}
