import type { RecursiveRequired, Settings } from '#/global'
import { cloneDeep } from 'es-toolkit'
import settingsDefault from '@/settings.default'
import { merge } from '@/utils/object'

const globalSettings: Settings.all = {
  app: {
    enableDynamicTitle: true,
  },
  menu: {
    mainMenuClickMode: 'smart',
  },
  topbar: {
    mode: 'sticky',
  },
  tabbar: {
    enable: true,
    style: 'fashion',
    enableIcon: true,
    enableMemory: true,
    enableHotkeys: true,
  },
  toolbar: {
    favorites: true,
    notification: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  breadcrumb: {
    style: 'modern',
    enableMainMenu: true,
  },
  mainPage: {
    transitionMode: 'slide-left',
  },
  copyright: {
    enable: true,
    dates: '2026',
    company: '玄宇信息科技（烟台）有限公司',
    beian: '鲁ICP备2024108245号-3',
  },
}

export default merge(globalSettings, cloneDeep(settingsDefault)) as RecursiveRequired<Settings.all>
