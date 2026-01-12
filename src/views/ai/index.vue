<script setup lang="ts">
import type { ConversationsProps } from 'ant-design-x-vue'
import type { CSSProperties } from 'vue'
import { CloudUploadOutlined, CommentOutlined, LinkOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Button, Flex, message, Space, theme, Typography } from 'ant-design-vue'
import { Bubble, Conversations, Sender } from 'ant-design-x-vue'
import { h } from 'vue'

defineOptions({ name: 'AXConversationsBasic' })

const { token } = theme.useToken()

const items: ConversationsProps['items'] = Array.from({ length: 6 }).map((_, index) => {
  const timestamp = index <= 3
    ? 1732204800000
    : 1732204800000 - 60 * 60 * 24

  return {
    key: `item${index + 1}`,
    label: `Conversation ${index + 1}`,
    timestamp: timestamp + index * 60 * 60,
    group: index <= 3 ? 'Today' : 'Yesterday',
  }
})

const groupable: ConversationsProps['groupable'] = {
  sort(a, b) {
    if (a === b) {
      return 0
    }

    return a === 'Today' ? -1 : 1
  },
  title: (group, { components: { GroupTitle } }) =>
    group
      ? h(
          GroupTitle,
          null,
          () => [h(Space, null, () => [h(CommentOutlined), h('span', null, group)])],
        )
      : h(GroupTitle),
}

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

const value = ref<string>('')
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
const open = ref(false)
function openChange(v: boolean) {
  open.value = v
}

function triggerOpen() {
  open.value = !open.value
}

function selectFileClick() {
  message.info('Mock select file')
}
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <div class="absolute inset-0 flex">
    <Flex gap="middle" horizontal class="h-full w-full">
      <Flex gap="middle" vertical class="h-full w-full flex flex-[0.2] flex-shrink-0 items-center p-4">
        <div class="w-full flex items-center justify-center px-3">
          <AButton class="w-full">
            <PlusOutlined />
            添加会话
          </AButton>
        </div>
        <Conversations :items="items" default-active-key="item1" class="w-full flex flex-1 items-center justify-start" />
      </Flex>
      <Flex gap="middle" vertical class="h-full min-w-0 flex-1 p-4">
        <Flex gap="middle" vertical class="h-full min-w-0 flex-1 p-2">
          <Flex gap="middle" vertical class="min-h-0 w-full flex-1 overflow-y-auto p-2" />
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
          class="flex-shrink-0"
        >
          <Sender
            v-model:value="value"
            :loading="loading"
            :auto-size="{ minRows: 2, maxRows: 6 }"
            :groupable="groupable"
            @submit="() => {
              value = '';
              loading = true
              messageApi.info('Send message!');
            }"
            @cancel="() => {
              loading = false
              messageApi.error('Cancel sending!');
            }"
          >
            <template #header>
              <Sender.Header
                title="Upload Sample"
                :open="open"
                @open-change="openChange"
              >
                <Flex
                  vertical
                  align="center"
                  gap="small"
                  :style="{ marginBlock: token.paddingLG }"
                >
                  <CloudUploadOutlined style="font-size: 4em;" />
                  <Typography.Title
                    :level="5"
                    style="margin: 0;"
                  >
                    Drag file here(just demo)
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    Support pdf, doc, xlsx, ppt, txt, image file types
                  </Typography.Text>
                  <Button @click="selectFileClick">
                    Select File
                  </Button>
                </Flex>
              </Sender.Header>
            </template>
            <template #prefix>
              <Button
                type="text"
                @click="triggerOpen"
              >
                <template #icon>
                  <LinkOutlined />
                </template>
              </Button>
            </template>
          </Sender>
        </Flex>
      </Flex>
    </flex>
  </div>
</template>

<style scoped lang="scss">
:deep(.ant-sender-content) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.ant-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 明亮模式下使用主题色，暗黑模式下使用 border 颜色
:deep(.ant-btn-default) {
  border-color: hsl(var(--primary)) !important;
}

html.dark :deep(.ant-btn-default) {
  border-color: hsl(var(--border)) !important;
}

// 只在暗黑模式下修改 ant-design-x-vue 组件配色，与导航栏保持一致
</style>

<style lang="scss">
html.dark .ant-conversations-item {
  color: hsl(var(--muted-foreground)) !important;
  background-color: transparent !important;
}

html.dark .ant-conversations-item:hover {
  color: hsl(var(--muted-foreground)) !important;
  background-color: hsl(var(--muted)) !important;
}

html.dark .ant-conversations-item-active {
  color: hsl(var(--muted-foreground)) !important;
  background-color: hsl(var(--accent)) !important;
}

html.dark .ant-conversations-item * {
  color: hsl(var(--muted-foreground)) !important;
}

html.dark .ant-bubble {
  color: hsl(var(--muted-foreground)) !important;
}

html.dark .ant-bubble-content {
  color: hsl(var(--muted-foreground)) !important;
  background-color: hsl(var(--muted)) !important;
}

html.dark .ant-bubble[data-placement="end"] .ant-bubble-content {
  color: hsl(var(--muted-foreground)) !important;
  background-color: hsl(var(--accent)) !important;
}

html.dark .ant-sender {
  color: hsl(var(--foreground)) !important;
}

html.dark .ant-sender-input {
  color: hsl(var(--foreground)) !important;
  background-color: hsl(var(--card)) !important;
  border-color: hsl(var(--border)) !important;
}

html.dark .ant-sender-action {
  color: hsl(var(--foreground)) !important;
  background-color: hsl(0deg 0% 20%) !important;
}

html.dark .ant-sender-actions-btn {
  color: hsl(var(--foreground)) !important;
  background-color: hsl(0deg 0% 25%) !important;
}

.ant-conversations-item {
  width: 100%;
  text-align: center;
}

.conversation-sidebar {
  background-color: #fff;
}
</style>
