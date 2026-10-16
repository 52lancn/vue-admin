import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import type { GetParams } from '@/types/global';

const { Random } = Mock;

const data = Mock.mock({
  'list|48': [
    {
      'id|+1': 1,
      title: Random.ctitle(4, 10),
      'category|1': ['landscape', 'portrait', 'product'],
      url: () => `https://picsum.photos/seed/${Random.integer(1, 999)}/320/200`,
      author: Random.cname(),
      size: () => `${Random.integer(200, 4800)} KB`,
      createdTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/media/image'), (params: GetParams) => {
      const query = qs.parseUrl(params.url).query;
      const current = Number(query.current ?? 1);
      const pageSize = Number(query.pageSize ?? 10);
      const category = (query.category as string) ?? '';
      const keyword = (query.keyword as string) ?? '';
      let list = data.list as any[];
      if (category) {
        list = list.filter((item) => item.category === category);
      }
      if (keyword) {
        list = list.filter((item) => item.title.includes(keyword));
      }
      return successResponseWrap({
        list: list.slice((current - 1) * pageSize, current * pageSize),
        total: list.length,
      });
    });
  },
});
