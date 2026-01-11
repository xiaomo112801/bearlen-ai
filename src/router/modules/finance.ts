import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/finance',
  component: Layout,
  name: 'finance',
  meta: {
    title: $t('route.finance.root'),
    icon: 'i-heroicons-solid:credit-card',
  },
}

export default routes
