import { get as store_get, writable } from 'svelte/store'
import { goto, stores } from '@sapper/app'
import href from '~/lib/href'

// this file is a facade for reading/writing URL query attributes directly
// e.g. more specific than goto/$page

// const { page } = stores();
const proxyCache = {};

let page = null;
let $page = null;

const query = new Proxy(proxyCache, {
  get (target, name, receiver) {
    // console.log('query', {target, name, receiver})
    // @todo
    if (!page) {
      page = stores().page;
      page.subscribe(newPageValue => $page = newPageValue);
    }
    if (!proxyCache[name]) {
      proxyCache[name] = writable($page.query[name]);
      proxyCache[name].subscribe(newValue => {
        const oldValue = ($page.query[name]===null || $page.query[name]==='') ? void 0 : $page.query[name];
        newValue = (newValue===null || newValue==='') ? void 0 : newValue;
        if (newValue !== oldValue) {
          const url = href($page, {
            query: {
              [name]: newValue,
            },
          });
          // console.log('store/query', {name, newValue, url});
          goto(url, {
            // replaceState: true,
          }).then(res => {
            // console.log('goto', url);
            // console.log(res);
          }, err => {
            console.log('goto', url);
            console.error(err);
          })
        }
      })
    }
    return proxyCache[name];
  },
  // set (target, name, value, receiver) {
  //   console.log('query', {target, name, value, receiver})
  //   // @todo
  // },
});

export default query
