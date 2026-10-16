import axios from 'axios';
import qs from 'query-string';

export interface SystemUserRecord {
  id: number;
  name: string;
  account: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'enabled' | 'disabled';
  department: string;
  createdTime: string;
}

export interface SystemUserParams {
  current: number;
  pageSize: number;
  keyword?: string;
  role?: string;
  status?: string;
}

export interface SystemUserListRes {
  list: SystemUserRecord[];
  total: number;
}

export function querySystemUserList(params: SystemUserParams) {
  return axios.get<SystemUserListRes>('/api/system/user', {
    params,
    paramsSerializer: (obj) => qs.stringify(obj),
  });
}
