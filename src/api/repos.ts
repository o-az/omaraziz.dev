import { devLogger } from '@/utilities';

type FetchMyReposFn = () => Promise<any>;
export const fetchMyRepos: FetchMyReposFn = async () => {
  try {
    const response = await fetch(`/api/repos`, { method: 'GET' });
    if (!response.ok) {
      const data = await response.text();
      // console.log({ data })
      throw new Error(`fetchMyRepos: ${response.status} ${response.statusText} ${data}`);
    }
    return await response.json();
  } catch (error) {
    devLogger(['src/api/repos', error]);
    throw { error };
  }
};
