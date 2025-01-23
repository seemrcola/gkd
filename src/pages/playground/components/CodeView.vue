<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
    code: string
    isLoading: boolean
}>()
</script>

<template>
    <div class="relative min-h-full">
        <!-- 加载状态 -->
        <div
            v-if="isLoading"
            class="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center"
        >
            <Loader2 class="animate-spin h-8 w-8 text-muted-foreground" />
        </div>

        <!-- 代码展示区域 -->
        <div class="p-4 min-h-full font-mono text-sm leading-6">
            <div class="rounded-lg bg-[#fafafa] dark:bg-[#0d1117] p-4 overflow-x-auto code-container border">
                <pre class="w-[45vw]">
                    <code class="hljs language-typescript" v-html="code" />
                </pre>
            </div>
        </div>
    </div>
</template>

<style>
.code-container {
    scrollbar-gutter: stable;
}

pre, code {
    white-space: pre !important;
}
</style>
