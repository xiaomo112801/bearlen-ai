import type { App } from 'vue'
import Antd from 'ant-design-vue'
import en from 'ant-design-vue/es/locale/en_US'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import zhTW from 'ant-design-vue/es/locale/zh_TW'
import 'ant-design-vue/dist/reset.css'

function install(app: App) {
  app.use(Antd)
}

// 此处的对象属性和 src/locales/index.ts 中的 messages 对象属性一一对应
const locales: Record<string, any> = {
  'zh-cn': zhCN,
  'zh-tw': zhTW,
  'en': en,
}

export default { install }
export { locales }
