import { request } from '~/utils';

export const fetchPosts = async (pagination: Pagination) => {
  const res = await request.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  const { page, limit } = pagination;
  const start = (page - 1) * limit;
  const end = page * limit;
  const data = res.data.slice(start, end);
  return data;
};

export const fetchPost = async (id: string) => {
  const res = await request.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.data;
};
