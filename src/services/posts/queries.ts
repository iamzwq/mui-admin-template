import { queryOptions } from '@tanstack/react-query';
import { fetchPosts } from './api';

export const postsQueryOptions = queryOptions({
  queryKey: ['GET_POSTS'],
  queryFn: () => fetchPosts(),
});
