import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/ai',
  component: Layout,
  name: 'ai',
  meta: {
    title: $t('route.ai.root'),
    icon: 'i-heroicons-solid:sparkles',
  },
  children: [
    {
      path: '',
      name: 'aiIndex',
      component: () => import('@/views/ai/index.vue'),
      meta: {
        title: $t('route.ai.root'),
      },
    },
  ],
}

export default routes
