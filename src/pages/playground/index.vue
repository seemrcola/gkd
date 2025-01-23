<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Layout } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CodePanel from './CodePanel.vue'
import PreviewPanel from './PreviewPanel.vue'

const route = useRoute()
const router = useRouter()
const demo = computed(() => route.params.demo as string)

// 标题映射
const demoTitles: Record<string, string> = {
    mention: 'Mention 提及功能',
    face: '人脸识别基本案例',
    gif: 'gif播放器案例',
    pip: '画中画案例',
}

const currentTitle = computed(() => demoTitles[demo.value] || '示例')

// 处理 demo 切换
function handleDemoChange(value: string) {
    router.push(`/playground/${value}`)
}
</script>

<template>
    <div class="h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <!-- 顶部导航 -->
        <header class="border-b px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div class="flex items-center gap-2">
                <Layout class="h-5 w-5" />
                <h1 class="text-xl font-semibold">
                    Playground
                </h1>
            </div>
            <div class="w-[240px]">
                <Select :value="demo" @update:model-value="handleDemoChange">
                    <SelectTrigger class="h-9">
                        <SelectValue :placeholder="currentTitle" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="(title, demo) in demoTitles"
                            :key="demo"
                            :value="demo"
                        >
                            {{ title }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </header>

        <!-- 主要内容区域 -->
        <main class="flex-1 flex overflow-hidden p-6 gap-6">
            <CodePanel :demo="demo" />
            <PreviewPanel
                :demo="demo"
                :title="currentTitle"
            />
        </main>
    </div>
</template>

<style>
.hljs {
    background: transparent !important;
    padding: 0 !important;
}

/* 代码容器样式 */
.code-container {
    scrollbar-gutter: stable;
}

/* 美化滚动条 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.3);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.5);
}

/* 确保代码内容不会被压缩 */
pre, code {
    white-space: pre !important;
}
</style>
