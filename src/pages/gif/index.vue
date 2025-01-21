<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { createGifPlayer } from './gif'

const canvasRef = ref<HTMLCanvasElement>()
const player = ref<ReturnType<typeof createGifPlayer>>()
const playerState = reactive({
    isPlaying: false,
    progress: 0,
})
let unsubscribe: (() => void) | undefined

// 初始化 GIF 播放器
async function initGifPlayer() {
    try {
        // 加载示例 GIF 文件
        const response = await fetch('/example.gif')
        const arrayBuffer = await response.arrayBuffer()

        // 创建播放器实例
        player.value = createGifPlayer(arrayBuffer)

        // 订阅状态变化
        unsubscribe = player.value.subscribe((state) => {
            playerState.isPlaying = state.isPlaying
            playerState.progress = state.progress
        })

        await player.value.init()
        renderLoop()
    }
    catch (error) {
        console.error('Failed to load GIF:', error)
    }
}

// 渲染循环
function renderLoop() {
    if (!canvasRef.value || !player.value)
        return

    const ctx = canvasRef.value.getContext('2d')
    if (!ctx)
        return

    const frame = player.value.getCurrentFrame() as any
    if (frame) {
        // 设置 canvas 尺寸为当前帧的尺寸
        if (canvasRef.value.width !== frame.displayWidth) {
            canvasRef.value.width = frame.displayWidth
            canvasRef.value.height = frame.displayHeight
        }

        ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
        ctx.drawImage(frame, 0, 0)
    }

    requestAnimationFrame(renderLoop)
}

// 播放/暂停切换
function togglePlay() {
    if (!player.value)
        return

    if (player.value.state.isPlaying)
        player.value.pause()
    else
        player.value.play()
}

onMounted(() => {
    initGifPlayer()
})

onUnmounted(() => {
    unsubscribe?.()
    player.value?.dispose()
})
</script>

<template>
    <div class="container mx-auto p-6 max-w-2xl space-y-6">
        <Card class="p-6">
            <div class="space-y-4">
                <h2 class="text-2xl font-bold">
                    GIF 播放器
                </h2>

                <div class="relative aspect-video bg-black/5 rounded-lg overflow-hidden flex justify-center items-center">
                    <canvas
                        ref="canvasRef"
                        class="max-w-full max-h-full object-contain"
                    />
                </div>

                <div class="space-y-2">
                    <div class="flex items-center gap-4">
                        <Button @click="togglePlay">
                            {{ playerState.isPlaying ? '暂停' : '播放' }}
                        </Button>
                        <Slider
                            :model-value="[playerState.progress]"
                            :min="0"
                            :max="100"
                            :step="0.1"
                            class="flex-1"
                            :disabled="true"
                        />
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>
