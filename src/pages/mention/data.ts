interface User {
    id: number
    name: string
    avatar?: string
}

// 模拟用户数据
const users: User[] = [
    { id: 1, name: 'Alice', avatar: '👩' },
    { id: 2, name: 'Bob', avatar: '👨' },
    { id: 3, name: 'Charlie', avatar: '👨‍🦰' },
    { id: 4, name: 'David', avatar: '👨‍🦱' },
    { id: 5, name: 'Eva', avatar: '👩‍🦰' },
    { id: 6, name: 'Fiona', avatar: '👩‍🦰' },
    { id: 7, name: 'Gina', avatar: '👩‍🦰' },
    { id: 8, name: 'Hannah', avatar: '👩‍🦰' },
    { id: 9, name: 'Ivy', avatar: '👩‍🦰' },
    { id: 10, name: 'Julia', avatar: '👩‍🦰' },
]

export { users }
export type { User }
