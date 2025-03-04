import { href, Link, useSearchParams } from 'react-router';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Stack, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPosts } from './api';

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');

  const { data: posts } = useSuspenseQuery({
    queryKey: ['GET_POSTS', { page, limit }],
    queryFn: () => fetchPosts({ page, limit }),
  });

  return (
    <Stack p={2} spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<KeyboardArrowLeftIcon />}
          onClick={() => {
            setSearchParams(prev => ({ ...prev, page: Math.max(page - 1, 1) }));
          }}
        >
          Prev
        </Button>
        <Button
          endIcon={<KeyboardArrowRightIcon />}
          onClick={() => {
            setSearchParams(prev => ({ ...prev, page: Math.min(page + 1, 10) }));
          }}
        >
          Next
        </Button>
      </Stack>
      <Stack spacing={2}>
        {posts.slice(0, 10).map(post => (
          <Link
            key={post.id}
            to={href('/posts/:id', { id: String(post.id) })}
            className="flex items-center gap-x-2 rounded-lg border-2 border-(--border-color) p-2 hover:border-(--primary-color)"
          >
            <Typography variant="h4" fontWeight={'bold'} color="primary">
              #{post.id}
            </Typography>
            <Typography variant="body2">{post?.title}</Typography>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
