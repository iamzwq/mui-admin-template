import { useMatches } from 'react-router';

export function DocumentTitle() {
  const matches = useMatches();
  const cur: Record<string, any> = matches[matches.length - 1];
  const title = cur.handle?.title || 'Default Title';
  return <title>{title}</title>;
}
