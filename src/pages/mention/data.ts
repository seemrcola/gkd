interface User {
    id: number
    name: string
    avatar?: string
}

// 模拟用户数据
const users: User[] = [
    { id: 1, name: '猪儿虫', avatar: '🐷' },
    { id: 2, name: '熊猫哥', avatar: '🐼' },
    { id: 3, name: '米斯特', avatar: '👨‍🦰' },
    { id: 4, name: '科比哥', avatar: '👨‍🦱' },
    { id: 5, name: '拖泥带水', avatar: '👩‍🦰' },
    { id: 6, name: '熊猫嫂', avatar: '👩‍🦰' },
    { id: 7, name: '卫生班长', avatar: '👩‍🦰' },
    { id: 8, name: '纪律委员', avatar: '👩‍🦰' },
]

export { users }

export type { User }
