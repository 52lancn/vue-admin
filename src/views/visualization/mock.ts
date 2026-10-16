import Mock from 'mockjs';
import dayjs from 'dayjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const { Random } = Mock;

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/visualization/overview'), () => {
      return successResponseWrap({
        users: Random.integer(10000, 99999),
        visits: Random.integer(100000, 999999),
        payments: Random.integer(1000, 9999),
        conversion: Random.float(1, 10, 2, 2),
      });
    });

    Mock.mock(new RegExp('/api/visualization/visit-trend'), () => {
      const count = 7;
      const xAxis = new Array(count)
        .fill(0)
        .map((_, idx) =>
          dayjs()
            .subtract(count - 1 - idx, 'day')
            .format('YYYY-MM-DD')
        );
      return successResponseWrap({
        xAxis,
        data: [
          {
            name: '访问量',
            value: new Array(count)
              .fill(0)
              .map(() => Random.integer(1000, 9000)),
          },
        ],
      });
    });

    Mock.mock(new RegExp('/api/visualization/channel'), () => {
      return successResponseWrap([
        { name: '搜索引擎', value: Random.integer(2000, 6000) },
        { name: '直接访问', value: Random.integer(1500, 4000) },
        { name: '邮件营销', value: Random.integer(800, 2500) },
        { name: '联盟广告', value: Random.integer(600, 2000) },
        { name: '视频广告', value: Random.integer(400, 1500) },
      ]);
    });
  },
});
