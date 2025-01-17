<script setup lang="ts">
import type { User } from './data'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { computed, ref } from 'vue'
import { users } from './data'

const editor = ref<HTMLDivElement>()
const userListContainer = ref<HTMLDivElement>()
const mentionListVisible = ref(false)
const searchQuery = ref('')
const selectedIndex = ref(-1)

const beforeText = ref('')
const afterText = ref('')

// 添加下拉框位置状态
const dropdownPosition = ref({ top: 0, left: 0 })

// 计算匹配的用户列表
const filteredUsers = computed(() => {
    if (!searchQuery.value)
        return users
    return users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
})

// 处理键盘事件
function handleKeydown(event: KeyboardEvent) {
    if (!mentionListVisible.value)
        return

    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault()
            if (selectedIndex.value === -1) {
                selectedIndex.value = filteredUsers.value.length - 1
            }
            else {
                selectedIndex.value = selectedIndex.value > 0
                    ? selectedIndex.value - 1
                    : filteredUsers.value.length - 1
            }
            scrollSelectedIntoView()
            break

        case 'ArrowDown':
            event.preventDefault()
            if (selectedIndex.value === -1) {
                selectedIndex.value = 0
            }
            else {
                selectedIndex.value = selectedIndex.value < filteredUsers.value.length - 1
                    ? selectedIndex.value + 1
                    : 0
            }
            scrollSelectedIntoView()
            break

        case 'Enter':
            event.preventDefault()
            if (selectedIndex.value !== -1 && filteredUsers.value.length > 0)
                selectUser(filteredUsers.value[selectedIndex.value])
            break

        case 'Escape':
            mentionListVisible.value = false
            break
    }
}

// 滚动选中项到可视区域
function scrollSelectedIntoView() {
    if (!userListContainer.value)
        return

    const selectedElement = userListContainer.value.children[selectedIndex.value] as HTMLElement
    if (!selectedElement)
        return

    selectedElement.scrollIntoView({
        block: 'nearest', // 垂直方向上最小的滚动
        inline: 'nearest', // 水平方向上最小的滚动
        behavior: 'smooth', // 平滑滚动
    })
}

// 处理输入事件
function handleInput() {
    // 分割文本
    splitText()
    // 更新下拉框位置
    updateDropdownPosition()
    // 判断是否展示提示列表
    handleMentionShow()
}

// 分割文本
function splitText() {
    if (!editor.value)
        return

    const selection = window.getSelection()
    if (!selection || !selection.rangeCount)
        return

    const range = selection.getRangeAt(0)

    // 获取所有文本内容，包括 span 元素
    let before = ''
    let after = ''

    // 遍历所有子节点
    const nodes = Array.from(editor.value.childNodes)
    let foundCursor = false

    for (const node of nodes) {
        // 检查节点是否包含range光标
        if (node === range.startContainer || node.contains(range.startContainer)) {
            // 处理文本节点
            if (node.nodeType === Node.TEXT_NODE) {
                before += node.textContent?.slice(0, range.startOffset) || ''
                after += node.textContent?.slice(range.startOffset) || ''
            }
            // 处理元素节点 比如 @mention span
            else if (node.nodeType === Node.ELEMENT_NODE) {
                if (!foundCursor) {
                    // 如过没有找到光标 则属于before
                    before += node.textContent
                }
                else {
                    // 如果找到光标 则属于after
                    after += node.textContent
                }
            }
            // 找到光标的标记
            foundCursor = true
        }
        else {
            // 处理非光标节点
            if (!foundCursor) {
                // 如过没有找到光标 则属于before
                before += node.textContent
            }
            else {
                // 如果找到光标 则属于after
                after += node.textContent
            }
        }
    }

    beforeText.value = before
    afterText.value = after
}

// 处理提示列表显示
function handleMentionShow() {
    // 1. 如果afterText.value为空 则表示光标在文本最后
    // 1.1 光标之前的文本最后一个字符是@ 则展示提示列表
    if (afterText.value === '' && beforeText.value.slice(-1) === '@') {
        mentionListVisible.value = true
        searchQuery.value = ''
        selectedIndex.value = -1
    }
    // 2. 如果afterText.value不为空 则表示光标在文本中间某个地方
    // 2.1 光标之前的文本最后一个字符是@ 则展示提示列表
    else if (beforeText.value.slice(-1) === '@') {
        mentionListVisible.value = true
        searchQuery.value = ''
        selectedIndex.value = -1
    }
    // 更多情况todo....
    else {
        mentionListVisible.value = false
    }
}

function selectUser(user: User) {
    if (!editor.value)
        return

    // 拿到range
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount)
        return
    const range = selection.getRangeAt(0)

    // 插入文本
    insertMentionText(user, range)

    // 关闭提示列表
    mentionListVisible.value = false
    searchQuery.value = ''
    selectedIndex.value = -1
}

// 插入文本
function insertMentionText(user: User, range: Range) {
    // 创建 mention span
    const insertMentionSpan = createMentionSpan(user.name)

    // 先将 range 的起始位置向前移动一个字符（@ 符号）
    range.setStart(range.startContainer, range.startOffset - 1)
    // 现在 range 包含了 @ 符号 再删除
    range.deleteContents()
    // 插入提及用户的文本
    range.insertNode(insertMentionSpan)

    // 插入空格
    const spaceNode = document.createTextNode(' ')
    insertMentionSpan.after(spaceNode)

    // 将光标移动到空格后面
    const newRange = document.createRange()
    newRange.setStartAfter(spaceNode)
    newRange.setEndAfter(spaceNode)

    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(newRange)
}

// 创建 mention span
function createMentionSpan(name: string) {
    const mentionSpan = document.createElement('span')
    mentionSpan.textContent = `@${name}`
    mentionSpan.contentEditable = 'false'
    mentionSpan.classList.add('text-blue-500', 'bg-gray-100/70', 'font-bold', 'rounded-md', 'px-1', 'py-0.5')
    return mentionSpan
}

// 添加更新下拉框位置的函数
function updateDropdownPosition() {
    if (!editor.value)
        return

    const selection = window.getSelection()
    if (!selection || !selection.rangeCount)
        return

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const editorRect = editor.value.getBoundingClientRect()

    // 计算相对于编辑器的位置
    dropdownPosition.value = {
        top: rect.bottom - editorRect.top,
        left: rect.left - editorRect.left,
    }
}
</script>

<template>
    <div class="container mx-auto p-6 max-w-2xl space-y-6">
        <Card class="p-6">
            <h2 class="text-2xl font-bold mb-4">
                Mention 演示
            </h2>

            <div class="relative">
                <div
                    ref="editor"
                    contenteditable="true"
                    class="
                        min-h-[100px]
                        w-full
                        p-3
                        rounded-lg
                        border
                        border-input
                        focus:outline-none
                        focus:ring-2
                        focus:ring-ring
                        whitespace-pre-wrap
                        break-words
                    "
                    placeholder="输入 @ 来提及用户..."
                    @input="handleInput"
                    @keydown="handleKeydown"
                />

                <!-- 修改用户列表弹出框的样式和定位 -->
                <div
                    v-if="mentionListVisible"
                    class="absolute z-50 bg-popover rounded-lg shadow-lg border border-border overflow-hidden"
                    :style="{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: '200px', // 设置固定宽度
                    }"
                >
                    <!-- 搜索输入框 - 固定在顶部 -->
                    <div class="sticky top-0 p-1.5 border-b border-border bg-popover">
                        <Input
                            v-model="searchQuery"
                            placeholder="搜索用户..."
                            class="w-full h-7 text-sm"
                        />
                    </div>

                    <!-- 用户列表 - 可滚动区域 -->
                    <div
                        ref="userListContainer"
                        class="max-h-[160px] overflow-y-auto py-1"
                    >
                        <div
                            v-for="(user, index) in filteredUsers"
                            :key="user.id"
                            class="px-2 py-1 hover:bg-accent cursor-pointer flex items-center gap-2 text-sm"
                            :class="{
                                'bg-accent': index === selectedIndex,
                            }"
                            @click="selectUser(user)"
                            @mouseover="selectedIndex = index"
                        >
                            <span class="text-base">{{ user.avatar }}</span>
                            <span>{{ user.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<style>
[contenteditable]:empty:before {
    content: attr(placeholder);
    color: #9ca3af;
    pointer-events: none;
}
</style>
