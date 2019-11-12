<p class="small">
  <strong>aaaa bbbb</strong>
  <br>
  <span>find items containing "aaaa" AND "bbbb"</span>
  <br>
  <strong>aaaa | bbbb</strong>
  <br>
  <span>find items containing "aaaa" OR "bbbb"</span>
  <br>
  <strong>cccc | (aaaa | bbbb)</strong>
  <br>
  <span>find items containing "aaaa" OR "bbbb", and always "cccc"</span>
  <br>
  <strong>cccc | (aaaa | bbbb) -dddd</strong>
  <br>
  <span>find items containing "aaaa" OR "bbbb", and always "cccc", and will exclude any result containing
      "dddd"</span>
  <br>
  <strong>cccc | (aaaa | bbbb) -dddd -eeee*</strong>
  <br>
  <span>same as above, but will exclude matches containing "eeee" and exclude matches that contain a match for
      the wildcard phrase "eeee*"</span>
</p>
