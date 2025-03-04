import { request } from '~/utils';

export const fetchUsers = async (count: number) => {
  const res = await request.get<{ results: User[] }>(
    `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture,phone,location&noinfo`
  );
  return res.data.results;
};
