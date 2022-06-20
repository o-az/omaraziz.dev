import { readdir, writeFile, readFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';
import { getReadingTime } from './generate-reading-time';

interface JsonPost {
  title: string;
  description: string;
  date: string;
  filename: string;
  tags: string[];
  readingTime: string;
}

const postsDirectory = path.resolve(__dirname, '../src/data/articles');

export async function newBlog() {
  try {
    const { default: postsJSON }: { default: JsonPost[] } = await import(`${postsDirectory}/articles.json`);
    const filenames = postsJSON.map(({ filename }) => filename);
    const files = await readdir(postsDirectory);

    const newFiles = files.filter(file => !filenames.includes(file));
    const newFilesDetected = newFiles.length > 0;
    if (!newFilesDetected) return;

    const newFilesJSON = newFiles.map(async (file, index) => {
      if (file === 'articles.json') return;
      // remove .* in the end of the filename
      const title = file.replace(/\.[^/.]+$/, '');
      // TODO: think about how to generate description
      const description = `TODO: Add description for ${title}`;
      const [date] = new Date().toISOString().split('T');
      // TODO: think about how to add tags
      const tags = [] as const;
      const fileContent = await readFile(`${postsDirectory}/${file}`, 'utf8');
      const { text: readingTime } = await getReadingTime(fileContent);
      return { title, description, date, filename: file, tags, readingTime };
    });
    const newPostsJSON = [...postsJSON, ...(await Promise.all(newFilesJSON))];
    const newPostsJSONString = JSON.stringify(newPostsJSON, null, 2);
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.cjs');
    const formatted = prettier.format(newPostsJSONString, { ...prettierConfig, parser: 'json' });
    await writeFile(`${postsDirectory}/articles.json`, formatted);
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error;
    console.trace(errorMessage);
    return false;
  }
}
const text = 'hello world this is a test';
const localize = new Intl.ListFormat('en');
console.log(text.split(' '));
// console.log(localize.format(text.split(' ')))
//newBlog().then(_ => console.log(JSON.stringify(_, null, 2)))
