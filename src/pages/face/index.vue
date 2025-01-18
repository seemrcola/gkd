<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import * as faceapi from 'face-api.js'
import { onMounted, ref } from 'vue'

const videoRef = ref<HTMLVideoElement>()
const canvasRef = ref<HTMLCanvasElement>()
const svgRef = ref<SVGSVGElement>()
const isStreaming = ref(false)

// 初始化 face-api 模型
async function loadModels() {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        await faceapi.nets.faceExpressionNet.loadFromUri('/models')
    }
    catch (error) {
        console.error('Error loading models:', error)
    }
}

// 开启摄像头
async function startVideo() {
    if (!videoRef.value)
        return

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user',
            },
        })
        videoRef.value.srcObject = stream
        isStreaming.value = true
    }
    catch (error) {
        console.error('Error accessing camera:', error)
    }
}

// 停止摄像头
function stopVideo() {
    if (!videoRef.value?.srcObject)
        return

    const stream = videoRef.value.srcObject as MediaStream
    const tracks = stream.getTracks()
    tracks.forEach(track => track.stop())
    videoRef.value.srcObject = null
    isStreaming.value = false

    const canvas = canvasRef.value
    if (canvas) {
        const context = canvas.getContext('2d')
        if (context)
            context.clearRect(0, 0, canvas.width, canvas.height)
    }
}

// 处理视频播放
async function onPlay() {
    if (!videoRef.value || !canvasRef.value || !svgRef.value)
        return

    const video = videoRef.value
    const canvas = canvasRef.value
    const svg = svgRef.value
    // context
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    // 设置 canvas 尺寸与视频一致
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    svg.setAttribute('width', video.videoWidth.toString())
    svg.setAttribute('height', video.videoHeight.toString())

    const detectionLoop = async () => {
        if (!isStreaming.value)
            return

        // 将视频帧绘制到 canvas 上
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // 从 Canvas 检测人脸
        const detections = await faceapi
            .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()

        if (detections.length === 0) {
            svg.innerHTML = ''
        }

        // 绘制人脸检测框
        for (const detection of detections) {
            svg.innerHTML = ''
            // 定位到人脸处
            const box = detection.detection.box
            const { x, y, width, height } = box
            drawRect(x, y, width, height)
        }

        requestAnimationFrame(detectionLoop)
    }

    // 开始检测循环
    detectionLoop()
}

function drawRect(x: number, y: number, width: number, height: number) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    // transform
    rect.setAttribute('transform', `translate(${x}, ${y})`)
    rect.setAttribute('width', width.toString())
    rect.setAttribute('height', height.toString())
    rect.setAttribute('fill', 'rgba(0, 0, 0, 0)')
    rect.setAttribute('stroke', 'yellow')
    rect.setAttribute('stroke-width', '2')
    // 添加到svg
    svgRef.value?.appendChild(rect)
}

onMounted(async () => {
    await loadModels()
})
</script>

<template>
    <div class="container mx-auto p-6 max-w-4xl space-y-6">
        <Card class="p-6">
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold">
                        人脸识别演示
                    </h2>
                    <div class="space-x-2">
                        <Button
                            v-if="!isStreaming"
                            @click="startVideo"
                        >
                            开启摄像头
                        </Button>
                        <Button
                            v-else
                            variant="destructive"
                            @click="stopVideo"
                        >
                            关闭摄像头
                        </Button>
                    </div>
                </div>

                <div class="relative flex justify-center items-center my-4 bg-black/5 rounded-lg h-[500px]">
                    <video
                        ref="videoRef"
                        class="opacity-0"
                        autoplay
                        muted
                        playsinline
                        @play="onPlay"
                    />
                    <canvas ref="canvasRef" class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] scale-x-[-1]" />
                    <svg ref="svgRef" class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] scale-x-[-1]" />
                </div>
            </div>
        </Card>
    </div>
</template>
