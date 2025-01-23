<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { defineAsyncComponent } from 'vue'

const props = defineProps<{
    demo: string
}>()

const DemoComponent = defineAsyncComponent(() => {
    return import(`../../${props.demo}/index.vue`)
})
</script>

<template>
    <div class="p-4 min-h-full">
        <Suspense>
            <DemoComponent />
            <template #fallback>
                <div class="flex items-center justify-center h-[200px]">
                    <Loader2 class="animate-spin h-8 w-8 text-muted-foreground" />
                </div>
            </template>
        </Suspense>
    </div>
</template>
