export const redirectLoginPage = () => {
  const { pathname, search, hash } = window.location;
  const { VITE_DEPLOY_URL } = import.meta.env;
  if (pathname === `${VITE_DEPLOY_URL}/login`) {
    return; // already on login page, do nothing
  }
  const encodedPath = encodeURIComponent(`${pathname}${search}${hash}`);
  window.location.href = `${VITE_DEPLOY_URL}/login?redirect=${encodedPath}`; // redirect to login page
};
