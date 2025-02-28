import { isRouteErrorResponse, useRouteError } from 'react-router';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="rounded-4 m-3 border border-(--palette-divider) bg-(--palette-grey-50) p-3 dark:bg-(--palette-grey-900)">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }
  if (error instanceof Error) {
    return (
      <div className="rounded-4 m-3 border border-(--palette-divider) bg-(--palette-grey-50) p-3 dark:bg-(--palette-grey-900)">
        <h2 className="mb-2 text-2xl">Oops! Something went wrong.</h2>
        <details>
          <summary>{error.message}</summary>
          <pre className="mt-4">{error.stack}</pre>
        </details>
      </div>
    );
  }
  return <h1 className="text-2xl">Unknown Error</h1>;
}
