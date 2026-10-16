import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import type { GetParams } from '@/types/global';

const { Random } = Mock;

const data = Mock.mock({
  'list|36': [
    {
      'id|+1': 1,
      name: Random.cname(),
      account: /[a-z]{4,8}/,
      email: Random.email(),
      'role|1': ['admin', 'editor', 'viewer'],
      'status|1': ['enabled', 'disabled'],
      'department|1': ['技术部', '产品部', '运营部', '市场部'],
      createdTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/system/user'), (params: GetParams) => {
      const query = qs.parseUrl(params.url).query;
      const current = Number(query.current ?? 1);
      const pageSize = Number(query.pageSize ?? 10);
      const keyword = (query.keyword as string) ?? '';
      const role = (query.role as string) ?? '';
      const status = (query.status as string) ?? '';
      let list = data.list as any[];
      if (keyword) {
        list = list.filter(
          (item) =>
            item.name.includes(keyword) || item.account.includes(keyword)
        );
      }
      if (role) {
        list = list.filter((item) => item.role === role);
      }
      if (status) {
        list = list.filter((item) => item.status === status);
      }
      return successResponseWrap({
        list: list.slice((current - 1) * pageSize, current * pageSize),
        total: list.length,
      });
    });
  },
});
