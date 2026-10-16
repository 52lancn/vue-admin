import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const FEATURES: AppRouteRecordRaw = {
  path: '/features',
  name: 'features',
  component: DEFAULT_LAYOUT,
  meta: {
    activeMenu: '功能示例',
    requiresAuth: true,
    icon: 'icon-tool',
    order: 1,
  },
  children: [
    {
      path: 'search-table',
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        activeMenu: '查询表格',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        activeMenu: '卡片列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'image',
      name: 'ImageList',
      component: () => import('@/views/list/image/index.vue'),
      meta: {
        activeMenu: '图片列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'basic',
      name: 'BasicForm',
      component: () => import('@/views/form/basic/index.vue'),
      meta: {
        activeMenu: '基础表单',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'step',
      name: 'StepForm',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        activeMenu: '分步表单',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/visualization/analysis/index.vue'),
      meta: {
        activeMenu: '分析页',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'multi',
      name: 'MultiChart',
      component: () => import('@/views/visualization/multi/index.vue'),
      meta: {
        activeMenu: '多维图表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default FEATURES;
