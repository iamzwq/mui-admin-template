import { createBrowserRouter, type RouteObject } from 'react-router';
import { ErrorBoundary } from '~/components/error-boundary';
import { FullscreenSpinner } from '~/components/fullscreen-spinner';
import Root from '../root';

const lazyLoad = (importFn: () => Promise<{ default: React.ComponentType }>) => {
  return async () => ({
    Component: (await importFn()).default,
  });
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <FullscreenSpinner />,
    children: [
      {
        lazy: lazyLoad(() => import('~/layout')),
        children: [
          {
            index: true,
            lazy: lazyLoad(() => import('~/pages/home')),
            handle: { title: 'Home' },
          },
          {
            path: 'posts',
            lazy: lazyLoad(() => import('~/pages/posts')),
            handle: { title: 'Posts' },
          },
          {
            path: 'posts/:id',
            lazy: lazyLoad(() => import('~/pages/posts/post')),
            handle: { title: 'Post' },
          },
          {
            path: 'user-list',
            lazy: lazyLoad(() => import('~/pages/users')),
            handle: { title: 'User List' },
          },
          {
            path: 'upload',
            lazy: lazyLoad(() => import('~/pages/upload')),
            handle: { title: 'Dashboard' },
          },
          {
            path: 'settings',
            children: [
              {
                path: 'profile',
                lazy: lazyLoad(() => import('~/pages/settings/profile')),
                handle: { title: 'Profile' },
              },
              {
                path: 'account',
                lazy: lazyLoad(() => import('~/pages/settings/account')),
                handle: { title: 'Account' },
              },
            ],
          },
        ],
      },

      // Authentication routes
      {
        path: 'login',
        lazy: lazyLoad(() => import('~/pages/login')),
        handle: { title: 'Login' },
      },

      // Catch-all route
      {
        path: '*',
        lazy: lazyLoad(() => import('~/pages/not-found')),
        handle: { title: 'Not Found' },
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
