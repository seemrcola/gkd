<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { usePip } from './usePip'

const targetElement = ref<HTMLElement | null>(null)
const isPiPActive = ref(false)

async function startPiP() {
    const { startPiP } = usePip(targetElement.value as HTMLElement)
    startPiP()
}

// 为了演示效果，添加一个计时器更新时间
const currentTime = ref(new Date().toLocaleTimeString())
setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
}, 1000)
</script>

<template>
    <div class="container mx-auto p-6 space-y-6">
        <div class="flex gap-4">
            <Button
                :disabled="isPiPActive"
                @click="startPiP"
            >
                开启画中画
            </Button>
        </div>

        <!-- 示例内容 -->
        <div
            ref="targetElement"
            class="
                max-w-2xl
                p-6
                rounded-lg
                bg-black/10
                shadow-lg
                space-y-4
            "
        >
            <h2 class="text-2xl font-bold">
                画中画演示内容
            </h2>
            <div class="space-y-2">
                <p>
                    这是一个可以进入画中画模式的元素。点击"开启画中画"按钮，
                    这个内容区域将会在一个独立的小窗口中显示。
                </p>
                <p>
                    当前时间：
                    <span class="font-mono">
                        {{ currentTime }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
