import { request } from '~/utils';

export function fetchLogin(data: LoginFormValues) {
  return request.post('/login', { data, needToken: false });
}
