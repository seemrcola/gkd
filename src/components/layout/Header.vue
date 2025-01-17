<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
// 这里假设用户信息从状态管理中获取
const user = {
    name: '张三',
    avatar: '',
    initials: '张',
    role: '管理员',
}

function handleLogout() {
    // 实现登出逻辑
    router.push('/login')
}

function goToProfile() {
    router.push('/profile')
}

function goToSettings() {
    router.push('/home/settings')
}
</script>

<template>
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-16 items-center px-4">
            <div class="flex items-center space-x-2">
                <!-- Logo 可以替换成您的应用 logo -->
                <div class="h-6 w-6 rounded-lg bg-primary" />
                <h2 class="text-lg font-semibold">
                    我的应用
                </h2>
            </div>

            <!-- 右侧工具栏 -->
            <div class="ml-auto flex items-center space-x-4">
                <!-- 通知按钮 -->
                <Button variant="ghost" size="icon" class="relative">
                    <Bell class="h-5 w-5" />
                    <span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        3
                    </span>
                </Button>

                <!-- 用户信息下拉菜单 -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button
                            variant="ghost"
                            class="relative h-8 w-auto space-x-2 rounded-full px-2 hover:bg-accent"
                        >
                            <Avatar class="h-8 w-8">
                                <AvatarImage :src="user.avatar" alt="用户头像" />
                                <AvatarFallback class="bg-primary/10 text-primary">
                                    {{ user.initials }}
                                </AvatarFallback>
                            </Avatar>
                            <div class="flex items-center gap-2">
                                <div class="hidden flex-col items-start md:flex">
                                    <span class="text-sm font-medium">
                                        {{ user.name }}
                                    </span>
                                    <span class="text-xs text-muted-foreground">
                                        {{ user.role }}
                                    </span>
                                </div>
                                <ChevronDown class="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-56">
                        <DropdownMenuItem @click="goToProfile">
                            <User class="mr-2 h-4 w-4" />
                            <span>个人信息</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="goToSettings">
                            <Settings class="mr-2 h-4 w-4" />
                            <span>系统设置</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-red-600" @click="handleLogout">
                            <LogOut class="mr-2 h-4 w-4" />
                            <span>退出登录</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* 添加过渡动画 */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
