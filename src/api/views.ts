import { devLogger } from '@/utilities';
import articles from '@/data/articles/articles.json';

interface Views {
  slug: string;
  views: string;
}

type FetchTotalBlogViewsResponse = { error: string | null; data: Array<Views> | null };
type FetchTotalBlogViews = () => Promise<FetchTotalBlogViewsResponse>;

export const fetchTotalBlogViews: FetchTotalBlogViews = async () => {
  try {
    const response = await fetch(`/api/views`, { method: 'GET', cache: 'force-cache' });
    const data: FetchTotalBlogViewsResponse = await response.json();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error;
    devLogger(['fetchTotalBlogViews', errorMessage]);
    return { error: errorMessage, data: null };
  }
};

type FetchBlogViewsResponse = { error: string | null; data: Views | null };
type FetchBlogViews = (slug: string) => Promise<FetchBlogViewsResponse>;

export const fetchBlogViews: FetchBlogViews = async (slug: string) => {
  try {
    const article = articles.find(({ filename }) => filename === slug);
    if (!article) throw new Error(`Article with slug ${slug} not found`);
    const response = await fetch(`/api/views/${slug}`, { method: 'PUT', cache: 'force-cache' });
    const data: FetchBlogViewsResponse = await response.json();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error;
    devLogger(['fetchBlogViews', errorMessage]);
    return { error: errorMessage, data: null };
  }
};
