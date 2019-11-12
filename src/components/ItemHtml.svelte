<div class="item-html">
  {@html html}
</div>

<script>
import Mark from 'mark.js';
import get from 'lodash/get';
import memoize from 'lodash/memoize';
import validatePropItem from '~/lib/validateProp/item';
import validatePropString from '~/lib/validateProp/string';
import { stores } from '@sapper/app'
const { page } = stores();


const highlightRegEx = /-{0,1}('[\s-_a-z0-9?*]*'|"([\s-_a-z0-9?*]*)"|[-_a-z0-9?*]*)/gim;
const getHighlightTerms = memoize(v => {
  return ((v || '').match(highlightRegEx) || [])
    .filter(v => v && v.trim())
    .filter(v => !v.trim().startsWith('-'))
    .map(v => {
      if (v.startsWith('"') && v.endsWith('"')) {
        return v.slice(1, v.length - 1);
      }
      if (v.startsWith("'") && v.endsWith("'")) {
        return v.slice(1, v.length - 1);
      }
      return v;
    });
});

const linkRegEx = /<a href="https{0,1}:\/\/(i\.|www\.|np\.|old\.){0,1}reddit\.com\//gim;
const newLink = '<a href="/';

// props
export let item = null;
export let value = null;

$: item===null || validatePropItem(item);
$: value===null || validatePropString(value);
$: html = getHtml(item, $page)

function getHtml(item, $page) {
  let html =
    value ||
    get(item, 'body_html') ||
    get(item, 'selftext_html') ||
    get(item, 'body') ||
    '';

  if (html === '[removed]') {
    html = get(item, 'pushshiftEntry.body') || html;
  }

  html = html.replace(linkRegEx, newLink);
  if (html && ($page.query.q || $page.query.highlight)) {
    const terms = getHighlightTerms(
      ($page.query.q || '') +
        ' ' +
        ($page.query.highlight || ''),
    );
    if (terms && terms.length) {
      const div = document.createElement('div');
      div.innerHTML = html;
      const m = new Mark(div);
      m.mark(terms, {
        // @link https://markjs.io/#api
        // accuracy: 'complementary',
        separateWordSearch: false,
        accuracy: 'exactly',
        acrossElements: true,
        wildcards: 'withSpaces',
      });
      html = div.innerHTML;
    }
  }
  return html;
}
</script>
