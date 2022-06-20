import { writeFile } from 'fs/promises';
import RSS from 'rss';

/**
 * INPORTANT: this won't be implemented until contentlayer is available for vite
 * @see {@link https://www.contentlayer.dev/docs/environments/vite}
 */
async function generateRSS() {
  try {
    const feed = new RSS({
      title: 'Omar Aziz',
      site_url: 'https://omaraziz.dev',
      feed_url: 'https://omaraziz.dev/feed.xml',
    });
    await writeFile('public/feed.xml', feed.xml());
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error;
    console.trace(errorMessage);
    return false;
  }
}

generateRSS().then(_ => console.log(JSON.stringify(_, null, 2)));
