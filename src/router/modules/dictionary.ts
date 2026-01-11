import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/dictionary',
  component: Layout,
  name: 'dictionary',
  meta: {
    title: $t('route.dictionary.root'),
    icon: 'i-heroicons-solid:book-open',
  },
}

export default routes
