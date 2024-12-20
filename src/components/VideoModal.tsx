import { FC, useState, useRef, useEffect } from 'react'
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
}

const VideoModal: FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', // Default test video
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false)
      setCurrentTime(0)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      setDuration(videoRef.current.duration)
    }
  }

  const handleLoadedData = () => {
    setIsLoading(false)
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * duration
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 2000)
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen()
    }
  }

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm'
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl'
          onClick={(e) => e.stopPropagation()}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowControls(true)}
        >
          {/* Video Player */}
          <div className='relative aspect-video bg-black'>
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
              </div>
            )}
            <video
              ref={videoRef}
              className='w-full h-full'
              src={videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedData={handleLoadedData}
              onEnded={() => setIsPlaying(false)}
              muted={isMuted}
            />

            {/* Overlay Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/50 via-transparent to-black/50 p-4'
            >
              {/* Top Bar */}
              <div className='flex justify-end'>
                <button
                  onClick={onClose}
                  className='p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              {/* Center Play Button */}
              {!isPlaying && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='absolute inset-0 m-auto w-20 h-20 flex items-center justify-center rounded-full bg-blue-500 text-white'
                  onClick={handlePlayPause}
                >
                  <Play className='w-8 h-8 ml-1' />
                </motion.button>
              )}

              {/* Bottom Controls */}
              <div className='space-y-2'>
                {/* Progress Bar */}
                <div
                  ref={progressRef}
                  className='h-1 bg-white/30 rounded-full cursor-pointer'
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className='h-full bg-blue-500 rounded-full relative'
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className='absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2' />
                  </motion.div>
                </div>

                {/* Controls Bar */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <button
                      onClick={handlePlayPause}
                      className='p-2 rounded-full hover:bg-white/10 transition-colors'
                    >
                      {isPlaying ? (
                        <Pause className='w-5 h-5 text-white' />
                      ) : (
                        <Play className='w-5 h-5 text-white' />
                      )}
                    </button>
                    <button
                      onClick={handleRestart}
                      className='p-2 rounded-full hover:bg-white/10 transition-colors'
                    >
                      <RotateCcw className='w-5 h-5 text-white' />
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className='p-2 rounded-full hover:bg-white/10 transition-colors'
                    >
                      {isMuted ? (
                        <VolumeX className='w-5 h-5 text-white' />
                      ) : (
                        <Volume2 className='w-5 h-5 text-white' />
                      )}
                    </button>
                    <span className='text-white text-sm'>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <button
                    onClick={handleFullscreen}
                    className='p-2 rounded-full hover:bg-white/10 transition-colors'
                  >
                    <Maximize className='w-5 h-5 text-white' />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default VideoModal
