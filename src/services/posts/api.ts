import { request } from '~/utils';

export const fetchPosts = async () => {
  const res = await request.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  return res.data;
};

export const fetchPost = async (id: string) => {
  const res = await request.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.data;
};
