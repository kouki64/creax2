'use client'

import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface AudioWaveformProps {
  audioUrl: string
  height?: number
}

export default function AudioWaveform({ audioUrl, height = 128 }: AudioWaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    // WaveSurfer初期化
    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ff6232',
      progressColor: '#e5562c',
      cursorColor: '#ff6232',
      barWidth: 3,
      barRadius: 3,
      responsive: true,
      height: height,
      normalize: true,
      backend: 'WebAudio'
    })

    wavesurfer.load(audioUrl)

    wavesurfer.on('ready', () => {
      setDuration(wavesurfer.getDuration())
    })

    wavesurfer.on('audioprocess', () => {
      setCurrentTime(wavesurfer.getCurrentTime())
    })

    wavesurfer.on('play', () => setIsPlaying(true))
    wavesurfer.on('pause', () => setIsPlaying(false))

    wavesurferRef.current = wavesurfer

    return () => {
      wavesurfer.destroy()
    }
  }, [audioUrl, height])

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div ref={containerRef} className="mb-4" />
      
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlayPause}
          className="p-3 bg-[#ff6232] text-white rounded-full hover:bg-[#e5562c] transition"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex items-center gap-2 text-white text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}