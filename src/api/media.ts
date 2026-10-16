import axios from 'axios';
import qs from 'query-string';

export interface ImageRecord {
  id: number;
  title: string;
  category: 'landscape' | 'portrait' | 'product';
  url: string;
  author: string;
  size: string;
  createdTime: string;
}

export interface ImageListParams {
  current: number;
  pageSize: number;
  category?: string;
  keyword?: string;
}

export interface ImageListRes {
  list: ImageRecord[];
  total: number;
}

export function queryImageList(params: ImageListParams) {
  return axios.get<ImageListRes>('/api/media/image', {
    params,
    paramsSerializer: (obj) => qs.stringify(obj),
  });
}
