<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight } from 'lucide-vue-next'

interface Project {
    id: number
    title: string
    description: string
    path: string
    icon?: string
    tags?: string[]
}

const projects: Project[] = [
    {
        id: 1,
        title: 'picture-in-picture',
        description: '画中画出基础案例',
        path: '/pip',
        tags: ['picture-in-picture', 'documentPictureInPicture API'],
    },
    {
        id: 2,
        title: 'mention',
        description: '一个基础的 提及 组件（尚不完善）',
        path: '/mention',
        tags: ['mention', '可编辑div', 'range'],
    },
    {
        id: 3,
        title: 'face',
        description: '人脸识别基础案例',
        path: '/face',
        tags: ['face', 'face-api', 'canvas', 'svg'],
    },
    {
        id: 4,
        title: 'gif-player',
        description: '一个基础的 gif 播放器 可控制暂停/播放/进度条',
        path: '/gif',
        tags: ['gif', 'canvas', 'imageDecoder'],
    },
]
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/50">
        <div class="container mx-auto p-6">
            <div class="max-w-3xl mx-auto space-y-8">
                <div class="space-y-4">
                    <Card
                        v-for="project in projects"
                        :key="project.id"
                        class="group transition-all hover:shadow-lg backdrop-blur-sm bg-white/80 border-slate-200/60"
                    >
                        <CardHeader>
                            <CardTitle class="flex items-center justify-between">
                                {{ project.title }}
                                <ChevronRight
                                    class="w-5 h-5 transition-transform group-hover:translate-x-1"
                                />
                            </CardTitle>
                            <CardDescription>
                                {{ project.description }}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="flex gap-2 flex-wrap">
                                <Button
                                    v-for="tag in project.tags"
                                    :key="tag"
                                    variant="secondary"
                                    size="sm"
                                    class="text-xs"
                                >
                                    {{ tag }}
                                </Button>
                            </div>
                        </CardContent>
                        <router-link
                            :to="project.path"
                            class="absolute inset-0"
                        >
                            <span class="sr-only">查看{{ project.title }}</span>
                        </router-link>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>
