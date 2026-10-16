import Mock from 'mockjs';

import './user';
import './message-box';
import '@/views/dashboard/workplace/mock';
import '@/views/list/card/mock';
import '@/views/list/search-table/mock';
import '@/views/list/image/mock';
import '@/views/system/user/mock';
import '@/views/visualization/mock';

Mock.setup({
  timeout: '600-1000',
});
