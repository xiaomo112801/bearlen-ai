import type { Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:meta-layouts'
import { $t } from '@/locales'
import pinia from '@/store'
import Ai from './modules/ai'
import Config from './modules/config'
import Customer from './modules/customer'
import Dictionary from './modules/dictionary'
import Finance from './modules/finance'
import MultilevelMenuExample from './modules/multilevel.menu.example'
import System from './modules/system'
import User from './modules/user'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      whiteList: true,
      title: $t('app.route.login'),
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        meta: {
          title: $t(useSettingsStore(pinia).settings.home.title),
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: $t('app.route.reload'),
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'i-uim:box',
    },
    children: [
      MultilevelMenuExample,
    ],
  },
  {
    meta: {
      title: 'AI',
      icon: 'i-heroicons-solid:sparkles',
    },
    children: [
      Ai,
    ],
  },
  {
    meta: {
      title: '客户',
      icon: 'i-heroicons-solid:user',
    },
    children: [
      Customer,
    ],
  },
  {
    meta: {
      title: '用户',
      icon: 'i-heroicons-solid:user',
    },
    children: [
      User,
    ],
  },
  {
    meta: {
      title: '财务',
      icon: 'i-heroicons-solid:credit-card',
    },
    children: [
      Finance,
    ],
  },
  {
    meta: {
      title: '字典',
      icon: 'i-heroicons-solid:book-open',
    },
    children: [
      Dictionary,
    ],
  },
  {
    meta: {
      title: '配置',
      icon: 'i-heroicons-solid:cog-6-tooth',
    },
    children: [
      Config,
    ],
  },
  {
    meta: {
      title: '系统',
      icon: 'i-heroicons-solid:cog-6-tooth',
    },
    children: [
      System,
    ],
  },

]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = [...setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))]

export {
  asyncRoutes,
  asyncRoutesByFilesystem,
  constantRoutes,
  constantRoutesByFilesystem,
  systemRoutes,
}
