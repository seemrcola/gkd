// 使用imageDecoder 解码gif 实现一个可以暂停/播放/进度条的gif播放器
// 这里由于是要写框架无关的函数 所以没有使用vue的响应式 额外使用了setState来通知订阅者state状态的改变

interface GifFrame {
    image: ImageBitmap
    duration: number
}

interface GifPlayerState {
    isPlaying: boolean
    progress: number
    currentFrameIndex: number
}

interface GifPlayer {
    state: GifPlayerState
    init: () => Promise<void>
    play: () => void
    pause: () => void
    getCurrentFrame: () => ImageBitmap | undefined
    setProgress: (value: number) => void
    dispose: () => void
    subscribe: (callback: (state: GifPlayerState) => void) => () => void
}

// 创建 GIF 播放器
export function createGifPlayer(gifData: ArrayBuffer): GifPlayer {
    // 内部状态
    const frames: GifFrame[] = []
    const state: GifPlayerState = {
        isPlaying: false,
        progress: 0,
        currentFrameIndex: 0,
    }
    let animationFrameId: number | null = null
    let lastFrameTime = 0

    // 订阅者列表
    const subscribers = new Set<(state: GifPlayerState) => void>()

    // 通知所有订阅者
    function notifySubscribers() {
        subscribers.forEach(callback => callback({ ...state }))
    }

    // 更新状态
    function setState(newState: Partial<GifPlayerState>) {
        Object.assign(state, newState)
        notifySubscribers()
    }

    // 等待轨道信息初始化
    async function waitForTrack(decoder: any, maxRetries = 50) {
        let track = decoder.tracks.selectedTrack
        let retryCount = 0

        while (!track && retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 100))
            track = decoder.tracks.selectedTrack
            retryCount++
            console.log('Waiting for track, attempt:', retryCount)
        }

        if (!track)
            throw new Error('Failed to get track after retries')

        console.log('Track initialized:', track, 'Frame count:', track.frameCount)
        return track
    }

    // 动画循环
    function animate() {
        // 获取当前时间
        const now = performance.now()
        // 获取当前帧
        const frame = frames[state.currentFrameIndex]
        // 计算帧与上一帧的时间差
        const elapsed = now - lastFrameTime
        // 如果时间差大于帧的持续时间，则切换到下一帧
        if (elapsed >= frame.duration) {
            setState({
                currentFrameIndex: (state.currentFrameIndex + 1) % frames.length,
                progress: ((state.currentFrameIndex + 1) / frames.length) * 100,
            })
            lastFrameTime = now
        }

        // 如果正在播放，则继续动画
        if (state.isPlaying)
            animationFrameId = requestAnimationFrame(animate)
    }

    // 初始化
    async function init() {
        try {
            // 1. 创建解码器
            const decoder = new (window as any).ImageDecoder({
                data: gifData,
                type: 'image/gif',
            })
            // 2. 等待解码器完成 获取轨道
            await decoder.completed
            const track = await waitForTrack(decoder)
            // 3. 获取帧数
            const frameCount = track.frameCount
            // 4. 解码每一帧
            for (let i = 0; i < frameCount; i++) {
                const result = await decoder.decode({ frameIndex: i })
                frames.push({
                    image: result.image,
                    duration: result.duration || 100,
                })
            }
            // 5. 初始化完成
            console.log('GIF 解码完成:', frames.length)
        }
        catch (error) {
            console.error('GIF 解码错误:', error)
        }
    }

    // 播放
    function play() {
        if (state.isPlaying || frames.length === 0)
            return

        setState({ isPlaying: true })
        lastFrameTime = performance.now()
        animate()
    }

    // 暂停
    function pause() {
        setState({ isPlaying: false })
        if (animationFrameId)
            cancelAnimationFrame(animationFrameId)
    }

    // 获取当前帧
    function getCurrentFrame() {
        return frames[state.currentFrameIndex]?.image
    }

    // 设置进度
    function setProgress(value: number) {
        const frameIndex = Math.floor((value / 100) * frames.length)
        setState({
            currentFrameIndex: Math.min(Math.max(frameIndex, 0), frames.length - 1),
            progress: value,
        })
    }

    // 清理资源
    function dispose() {
        pause()
        frames.forEach(frame => frame.image.close())
        frames.length = 0
    }

    return {
        state,
        init,
        play,
        pause,
        getCurrentFrame,
        setProgress,
        dispose,
        subscribe(callback: (state: GifPlayerState) => void) {
            subscribers.add(callback)
            // 返回取消订阅的函数
            return () => subscribers.delete(callback)
        },
    }
}
