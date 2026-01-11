import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/config',
  component: Layout,
  name: 'config',
  meta: {
    title: $t('route.config.root'),
    icon: 'i-heroicons-solid:menu-alt-3',
  },
}

export default routes
