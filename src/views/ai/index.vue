<script setup lang="ts">
import type { ConversationsProps } from 'ant-design-x-vue'
import type { CSSProperties } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { Flex, message } from 'ant-design-vue'
import { Bubble, Conversations, Sender } from 'ant-design-x-vue'
import { h } from 'vue'

defineOptions({ name: 'AXConversationsBasic' })

const items: ConversationsProps['items'] = Array.from({ length: 4 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
  disabled: index === 3,
}))

const fooAvatar: CSSProperties = {
  color: '#f56a00',
  backgroundColor: '#fde3cf',
}

const barAvatar: CSSProperties = {
  color: '#fff',
  backgroundColor: '#87d068',
}

const hideAvatar: CSSProperties = {
  visibility: 'hidden',
}

const [messageApi, contextHolder] = message.useMessage()

const value = ref('Hello? this is X!')
const loading = ref<boolean>(false)

// Mock send message
let timer: ReturnType<typeof setTimeout> | null = null
watch(loading, () => {
  if (loading.value) {
    timer = setTimeout(() => {
      loading.value = false
      messageApi.success('Send message successfully!')
      timer = null
    }, 3000)
  }
  else {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
})
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <Flex gap="middle" horizontal class="h-full w-full p-2">
    <Flex gap="middle" vertical class="h-full p-2">
      <Conversations :items="items" default-active-key="item1" style="ant-conversations-container" />
    </Flex>
    <Flex gap="middle" vertical class="h-full w-full p-2">
      <Flex gap="middle" vertical class="w-full p-2">
        <Bubble
          placement="start"
          content="Good morning, how are you?"
          :avatar="{ icon: h(UserOutlined), style: fooAvatar }"
        />
        <Bubble
          placement="start"
          content="What a beautiful day!"
          :styles="{ avatar: hideAvatar }"
          :avatar="{}"
        />
        <Bubble
          placement="end"
          content="Hi, good morning, I'm fine!"
          :avatar="{ icon: h(UserOutlined), style: barAvatar }"
        />
        <Bubble placement="end" content="Thank you!" :styles="{ avatar: hideAvatar }" :avatar="{}" />
      </Flex>
      <contextHolder />
      <Flex
        vertical
        gap="middle"
      >
        <Sender
          v-model:value="value"
          :loading="loading"
          :auto-size="{ minRows: 2, maxRows: 6 }"
          @submit="() => {
            value = '';
            loading = true
            messageApi.info('Send message!');
          }"
          @cancel="() => {
            loading = false
            messageApi.error('Cancel sending!');
          }"
        />
        <Sender
          value="Force as loading"
          loading
          read-only
        />
        <Sender
          disabled
          value="Set to disabled"
        />
      </Flex>
    </Flex>
  </flex>
</template>

<style scoped lang="scss">
.ant-conversations-container {
  width: 256px;
  background: #f0f2f5;
  border-radius: 4px;
}
</style>
