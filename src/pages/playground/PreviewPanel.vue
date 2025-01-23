<script setup lang="ts">
import { PlayCircle } from 'lucide-vue-next'
import Preview from './components/Preview.vue'

defineProps<{
    demo: string
    title: string
}>()
</script>

<template>
    <div class="w-1/2 flex flex-col rounded-xl border bg-background shadow-sm">
        <div class="px-4 h-12 flex items-center justify-between border-b">
            <div class="flex items-center gap-2">
                <PlayCircle class="h-4 w-4 text-muted-foreground" />
                <h2 class="font-medium">
                    预览
                </h2>
            </div>
            <span class="text-sm text-muted-foreground">
                {{ title }}
            </span>
        </div>
        <div class="flex-1 overflow-auto">
            <Preview
                :key="`preview-${demo}`"
                :demo="demo"
            />
        </div>
    </div>
</template>
