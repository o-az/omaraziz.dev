# [`DocumentFragment`](!https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)

> DocumentFragments allow developers to place child elements onto an arbitrary node-like parent, allowing for node-like interactions without a true root node. Doing so allows developers to produce structure without doing so within the visible DOM -- an increase of speed is the true advantage.
>
> : David Walsh, Mozilla Web Developer

The other day I was thinking of an easy straightforward way of storing `markdown` blog posts. Long story short, I decided to test out GitHub gists as a `CDN`. A nice-to-have feature of a good blog post is syntax highlighting. For that, the options are `Prism` and `highlight.js` among other libs. However, I also wanted to include custom styling per blog post (or at least I want ot have that as an option). Ok, so store `.md` blog posts and a `css` file per post, on GitHub gists.

To test out this plan, I stored some [borrowed CSS in a gist](https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/306a5b678779e79b842b09e54f166a7e349bb9a6/stylesheet.css). Let's see how we can use this in a webpage. First attempt:

```js
import 'https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/306a5b678779e79b842b09e54f166a7e349bb9a6/stylesheet.css';
```

Ops, problematic MIME type:

```log
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/plain".
Strict MIME type checking is enforced for module scripts per HTML spec.
```

This is apparently by [design](https://webapps.stackexchange.com/a/37100), `"text/plain"` MIME type effectively prevents from using gists as a CDN. Second attempt, adding it as a `<link>`:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/306a5b678779e79b842b09e54f166a7e349bb9a6/stylesheet.css"
/>
```

Same story, even with `type="text/css"`:

```log
Failed to load module script … responded with a MIME type of "text/plain".
```

Third attempt, fetch the content of the gist as plain text, create a `<style>` element, insert plan text style to style element, append it to the document `<head>`.

We're going to add additional attributes to the `<style>` element so that we can validate successful import. Specifically we'll add two `data-attribute`s. Final form should look like this:

```html
<style data-title="EXTERNAL_CSS" data-url="https://gist....sheet.css">
  /* ... */
</style>
```

Setup:

```js
// url
const gistURL =
  'https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/6070da8ac2821ffc94de51f1a3bc1b30d862643c/stylesheet.css';

const attributes = [
  ['data-title', 'EXTERNAL_CSS'],
  ['data-url', gistURL],
];
```

Fetch the content of the gist as plain text, create a `<style>` element, insert plain text style to style element, set the attirbutes we defined above, append it to the document `<head>`.

```js
async function fetchGistContent(url) {
  const response = await fetch(url);
  return await response.text();
}

async function importGistCSS(url) {
  const plainTextCSS = await fetchGistContent(url);
  const style = document.createElement('style');
  style.textContent = plainTextCSS;
  attributes.forEach(([name, value]) => style.setAttribute(name, value));
  document.head.appendChild(style);
}
```

(3) Moment of truth. To test this, I put it all together in a `<script>` tag. You probably want better error handling and code org. in a real world scenario.

```html
<script type="module">
  const gistURL =
    'https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/6070da8ac2821ffc94de51f1a3bc1b30d862643c/stylesheet.css';

  const attributes = [
    ['data-title', 'EXTERNAL_CSS'],
    ['data-url', gistURL],
  ];

  async function fetchGistContent(url) {
    const response = await fetch(url);
    return await response.text();
  }

  async function importGistCSS(url) {
    const plainTextCSS = await fetchGistContent(url);
    const style = document.createElement('style');
    style.textContent = plainTextCSS; // set style
    // set attributes
    attributes.forEach(([name, value]) => style.setAttribute(name, value));
    // append new style to head
    document.head.appendChild(style);
  }

  importGistCSS(gistURL)
    .then(() => {
      const { head } = document;
      // access the last style element in head, that would be our style
      const lastStyle = [...head.getElementsByTagName('style')].pop();
      // check if the style element has the `data-attribute`s we defined above
      for (const [attribute, value] of attributes) {
        const attributeValue = lastStyle.getAttribute(attribute);
        if (attributeValue !== value) {
          console.log(`❌  could not find ${attribute} with value ${value}`);
          return;
        }
        console.log(`✅  found ${attribute} with value ${value}`);
      }
      console.log('✅  all attributes found. Stylesheet successfully imported.');
    })
    .catch(console.error);
</script>
<body>
  <pre class="language-js">
    <code>
      const code = `const snippet = "cool markdown highlighting!";`
    </code>
  </pre>
</body>
```

Nice, that worked:

![](https://media.discordapp.net/attachments/874767980423159831/979545659403288596/0010.png)

Now I also want to do the same but for a few `<script>` tags in addition to the `<style>` tag.

The problem is, the more DOM manipulation, access/read/write, the worse the performance. Can we improve this? Enter [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).
