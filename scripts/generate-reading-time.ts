import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';

const postsDirectory = resolve(__dirname, '../src/data/articles');

export const getReadingTime = async (text: string) => {
  const { default: readingTime } = await import('reading-time');
  return readingTime(text);
};

export interface Article {
  filename: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

const userInput = process.argv[2];
readFile(`${postsDirectory}/${userInput}`, 'utf8').then(async data => {
  if (!userInput) return;
  const { default: articlesJSON } = (await import(`${postsDirectory}/articles.json`)) as {
    default: Article[];
  };
  const { text: readingTime } = await getReadingTime(data);
  const articleIndex = articlesJSON.findIndex(({ filename }) => userInput.includes(filename));
  const withReadingTime = { ...articlesJSON[articleIndex], readingTime } as Article;
  if (!withReadingTime) return;
  articlesJSON.splice(articleIndex, 1, withReadingTime);
  writeFile(`${postsDirectory}/articles.json`, JSON.stringify(articlesJSON, null, 2));
});
