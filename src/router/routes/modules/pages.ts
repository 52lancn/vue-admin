import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const PAGES: AppRouteRecordRaw = {
  path: '/pages',
  name: 'pages',
  component: DEFAULT_LAYOUT,
  meta: {
    activeMenu: '页面示例',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 2,
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        activeMenu: '成功页',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'error',
      name: 'Error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        activeMenu: '错误页',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '403',
      name: '403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        activeMenu: '403',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        activeMenu: '404',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        activeMenu: '500',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PAGES;
