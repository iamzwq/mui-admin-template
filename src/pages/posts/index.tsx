import { Link } from 'react-router';
import { Stack, Typography } from '@mui/material';
import { type QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { postsQueryOptions } from '~/services/posts/queries';

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(postsQueryOptions);
  return {};
};

export default function Posts() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions);
  return (
    <Stack spacing={2} p={2}>
      {posts.slice(0, 10).map(post => (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}
          className="flex items-center gap-x-2 rounded-lg border-2 border-(--border-color) p-2 hover:border-(--primary-color)"
        >
          <Typography variant="h4" fontWeight={'bold'} color="primary">
            #{post.id}
          </Typography>
          <Typography variant="body2">{post?.title}</Typography>
        </Link>
      ))}
    </Stack>
  );
}
