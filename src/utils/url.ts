export const redirectLoginPage = () => {
  const { pathname, search, hash } = window.location;
  if (pathname === '/login') {
    return; // already on login page, do nothing
  }
  const encodedPath = encodeURIComponent(`${pathname}${search}${hash}`);
  window.location.href = `/login?redirect=${encodedPath}`; // redirect to login page
};
