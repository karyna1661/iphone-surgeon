'use client'

import { useEffect, useState } from 'react'

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0
  })

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }))
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }))
      }
    }

    const measureLoadTime = () => {
      if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
        setMetrics(prev => ({
          ...prev,
          loadTime: Math.round(loadTime)
        }))
      }
    }

    measureFPS()
    measureMemory()
    measureLoadTime()

    const memoryInterval = setInterval(measureMemory, 1000)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      clearInterval(memoryInterval)
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-dark-800/90 backdrop-blur-sm border border-dark-600 rounded-xl p-3 text-xs text-light-200 font-mono">
      <div className="flex flex-col gap-1">
        <div>FPS: {metrics.fps}</div>
        <div>Memory: {metrics.memory}MB</div>
        <div>Load: {metrics.loadTime}ms</div>
      </div>
    </div>
  )
}
