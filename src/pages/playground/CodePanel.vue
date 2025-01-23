<script setup lang="ts">
import hljs from 'highlight.js'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import { Code2 } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import CodeView from './components/CodeView.vue'
import 'highlight.js/styles/atom-one-light.css'

const props = defineProps<{
    demo: string
}>()
// 注册语言
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

// 状态
const code = ref('')
const isLoading = ref(false)
const currentFile = ref('index.vue')
const availableFiles = ref<string[]>([])

// 导入所有 Vue 和 TS 文件
const vueFiles = import.meta.glob('../*/index.vue', { as: 'raw', eager: true })
const tsFiles = import.meta.glob('../*/*.ts', { as: 'raw', eager: true })

// 处理文件切换
function handleFileChange(file: string) {
    currentFile.value = file
}

watchEffect(() => {
    if (!props.demo)
        return

    isLoading.value = true
    try {
        // 获取当前 demo 的所有可用文件
        const files = new Set<string>()

        // 检查并添加 Vue 文件
        if (vueFiles[`../${props.demo}/index.vue`])
            files.add('index.vue')

        // 检查并添加 TS 文件
        Object.keys(tsFiles)
            .filter(path => path.startsWith(`../${props.demo}/`))
            .forEach((path) => {
                const fileName = path.split('/').pop() || ''
                if (fileName)
                    files.add(fileName)
            })

        availableFiles.value = Array.from(files)

        // 获取当前文件的源码
        let sourceCode: string | undefined
        const currentPath = `../${props.demo}/${currentFile.value}`

        if (currentFile.value.endsWith('.vue'))
            sourceCode = vueFiles[currentPath]
        else if (currentFile.value.endsWith('.ts'))
            sourceCode = tsFiles[currentPath]

        if (sourceCode) {
            const lang = currentFile.value.endsWith('.vue') ? 'typescript' : 'typescript'
            code.value = hljs.highlight(sourceCode, {
                language: lang,
            }).value
        }
        else {
            code.value = '未找到源代码'
        }
    }
    catch (error) {
        console.error('Failed to load demo code:', error)
        code.value = '加载代码失败...'
    }
    finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="w-1/2 flex flex-col rounded-xl border shadow-sm">
        <div class="px-4 h-12 flex items-center gap-2 border-b">
            <Code2 class="h-4 w-4 text-muted-foreground" />
            <h2 class="font-medium">
                源代码
            </h2>
            <div class="ml-auto flex gap-2">
                <template v-for="file in availableFiles" :key="file">
                    <button
                        v-if="!file.includes('route.ts')"
                        class="px-2 py-1 text-sm rounded hover:bg-accent"
                        :class="{ 'bg-accent': currentFile === file }"
                        @click="handleFileChange(file)"
                    >
                        {{ file }}
                    </button>
                </template>
            </div>
        </div>
        <div class="flex-1 overflow-auto gutter">
            <CodeView
                :key="`code-${props.demo}-${currentFile}`"
                :code="code"
                :is-loading="isLoading"
            />
        </div>
    </div>
</template>

<style scoped>
.gutter {
    scrollbar-gutter: stable;
}
</style>
