<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { locales } from './index'

const settingsStore = useSettingsStore()

const token = ref({
  colorPrimary: '',
  colorInfo: '',
  colorTextBase: '',
  colorBgElevated: '',
  colorBgContainer: '',
  colorBgBase: '',
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
    colorTextBase: `hsl(${rootStyles.getPropertyValue('--foreground')})`,
    colorBgElevated: `hsl(${rootStyles.getPropertyValue('--popover')})`,
    colorBgContainer: `hsl(${rootStyles.getPropertyValue('--card')})`,
    colorBgBase: `hsl(${rootStyles.getPropertyValue('--background')})`,
    borderRadius: Number.parseFloat(rootStyles.getPropertyValue('--radius')) * 16,
  }
}, {
  immediate: true,
})

const themeConfig = computed(() => ({
  algorithm: settingsStore.currentColorScheme === 'dark' ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
  token: token.value,
}))
</script>

<template>
  <AConfigProvider :locale="locales[settingsStore.lang]" :theme="themeConfig">
    <slot />
  </AConfigProvider>
</template>
