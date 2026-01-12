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
    icon: 'i-heroicons-solid:chat-bubble-bottom-center-text',
  },
  children: [
    {
      path: '',
      name: 'aiIndex',
      component: () => import('@/views/ai/index.vue'),
      meta: {
        title: $t('route.ai.aiIndex'),
        menu: false,
      },
    },
  ],
}

export default routes
