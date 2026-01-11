import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/user',
  component: Layout,
  name: 'user',
  meta: {
    title: $t('route.user.root'),
    icon: 'i-ri:shield-keyhole-line',
  },
  children: [
    {
      path: '',
      name: 'userIndex',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: $t('route.user.userInfo'),
        menu: false,
        breadcrumb: false,
        activeMenu: '/user',
      },
    },

  ],
}

export default routes
