import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPost } from '../api';

export default function PostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Post />
    </Suspense>
  );
}

function Post() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: post } = useSuspenseQuery({
    queryKey: ['GET_POST', id],
    queryFn: () => fetchPost(id!),
  });

  return (
    <Box p={2}>
      <Button onClick={() => navigate('/posts')} variant="outlined" startIcon={<ArrowBackIcon />}>
        Go Back to posts
      </Button>

      <Box className="mt-2 flex gap-2 rounded-lg border-2 border-(--primary-color) p-2">
        <Typography color="primary" fontWeight="bold" variant="h3">
          #{post.id}
        </Typography>
        <Box className="grow">
          <Typography variant="h5" fontWeight="bold">
            {post.title}
          </Typography>
          <Typography variant="body2">{post.body}</Typography>
          {/* <Typography variant="body2" fontWeight="bold" color="secondary">
            {user?.name} | {user?.email}
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
}
