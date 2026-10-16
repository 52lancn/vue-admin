import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    activeMenu: '系统管理',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 3,
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        activeMenu: '用户管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'info',
      name: 'ProfileInfo',
      component: () => import('@/views/profile/info/index.vue'),
      meta: {
        activeMenu: '账号信息',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
