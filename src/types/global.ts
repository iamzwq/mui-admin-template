declare global {
  type Option = {
    value: string | number;
    label: string;
  };
  type Pagination = {
    page: number;
    limit: number;
  };
}
