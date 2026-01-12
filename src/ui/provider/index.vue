<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { XProvider } from 'ant-design-x-vue'
import { locales } from './index'

const settingsStore = useSettingsStore()

const token = ref({
  colorPrimary: '',
  colorInfo: '',
  colorText: '',
  colorTextBase: '',
  colorBgElevated: '',
  colorBgContainer: '',
  colorBgBase: '',
  colorBorder: '',
  borderRadius: 0,
})

watch([
  () => settingsStore.settings.app.colorScheme,
  () => settingsStore.settings.app.lightTheme,
  () => settingsStore.settings.app.darkTheme,
  () => settingsStore.settings.app.themeSync,
  () => settingsStore.settings.app.radius,
], () => {
  const rootStyles = getComputedStyle(document.documentElement)
  token.value = {
    colorPrimary: `hsl(${rootStyles.getPropertyValue('--primary')})`,
    colorInfo: `hsl(${rootStyles.getPropertyValue('--primary')})`,
    colorText: `hsl(${rootStyles.getPropertyValue('--foreground')})`,
    colorTextBase: `hsl(${rootStyles.getPropertyValue('--foreground')})`,
    colorBgElevated: `hsl(${rootStyles.getPropertyValue('--popover')})`,
    colorBgContainer: `hsl(${rootStyles.getPropertyValue('--card')})`,
    colorBgBase: `hsl(${rootStyles.getPropertyValue('--background')})`,
    colorBorder: `hsl(${rootStyles.getPropertyValue('--border')})`,
    borderRadius: Number.parseFloat(rootStyles.getPropertyValue('--radius')) * 16,
  }
}, {
  immediate: true,
})

const themeConfig = computed(() => {
  // 明亮模式下使用主题色，暗黑模式下使用 border 颜色以确保可见性
  const borderColor = settingsStore.currentColorScheme === 'dark' ? token.value.colorBorder : token.value.colorPrimary

  return {
    algorithm: settingsStore.currentColorScheme === 'dark' ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
    token: token.value,
    components: {
      Button: {
        colorBorder: borderColor,
        defaultBorderColor: borderColor,
        defaultHoverBorderColor: borderColor,
        defaultActiveBorderColor: borderColor,
      },
    },
  }
})
</script>

<template>
  <XProvider :locale="locales[settingsStore.lang]" :theme="themeConfig">
    <slot />
  </XProvider>
</template>
