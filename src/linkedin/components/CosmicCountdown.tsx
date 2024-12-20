import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimate } from 'framer-motion'

const COUNTDOWN_FROM = '2024-12-19'
const SECOND: number = 1000
const MINUTE: number = SECOND * 60
const HOUR: number = MINUTE * 60
const DAY: number = HOUR * 24

interface Particle {
  x: number
  y: number
  size: number
  duration: number
}

interface CountdownItemProps {
  unit: TimeUnit
  text: string
}

type TimeUnit = 'Day' | 'Hour' | 'Minute' | 'Second'

interface TimerHookResult {
  ref: React.RefObject<HTMLSpanElement>
  time: number
}

const CosmicCountdown: React.FC = () => {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }))
  )

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-indigo-950 to-slate-900 p-8 overflow-hidden'>
      {/* Particle System */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className='absolute rounded-full bg-white'
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [`${particle.x}%`, `${particle.x + 5}%`, `${particle.x}%`],
            y: [`${particle.y}%`, `${particle.y - 5}%`, `${particle.y}%`],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Orbital Rings */}
      <div className='absolute inset-0 flex items-center justify-center'>
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className='absolute border border-blue-500/20 rounded-full'
            style={{
              width: `${70 + ring * 10}%`,
              height: `${70 + ring * 10}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.02, 1],
            }}
            transition={{
              rotate: {
                duration: 20 + ring * 5,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </div>

      {/* Main Countdown Container */}
      <div className='relative mx-auto flex max-w-5xl items-center justify-center gap-4 p-8'>
        <CountdownItem unit='Day' text='days' />
        <Divider />
        <CountdownItem unit='Hour' text='hours' />
        <Divider />
        <CountdownItem unit='Minute' text='minutes' />
        <Divider />
        <CountdownItem unit='Second' text='seconds' />
      </div>
    </div>
  )
}

const Divider: React.FC = () => (
  <motion.div
    className='h-32 w-0.5 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent'
    animate={{
      opacity: [0.3, 0.6, 0.3],
      height: ['60%', '70%', '60%'],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }}
  />
)

const CountdownItem: React.FC<CountdownItemProps> = ({ unit, text }) => {
  const { ref, time } = useTimer(unit)

  return (
    <motion.div
      className='relative flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm'
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Glow Effect */}
      <motion.div
        className='absolute inset-0 rounded-xl bg-blue-500/20'
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className='relative overflow-hidden'>
        <motion.span
          ref={ref}
          className='block font-mono text-6xl font-bold bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent'
        >
          {time.toString().padStart(2, '0')}
        </motion.span>
      </div>

      <motion.span
        className='mt-2 text-sm text-blue-200/80'
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {text}
      </motion.span>

      {/* Decorative Elements */}
      <motion.div
        className='absolute -z-10 w-full h-full'
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-blue-400 rounded-full'
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 90}deg) translateX(${
                50 + Math.random() * 20
              }px)`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

const useTimer = (unit: TimeUnit): TimerHookResult => {
  const [ref, animate] = useAnimate()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeRef = useRef<number>(0)
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleCountdown = async (): Promise<void> => {
    const end = new Date(COUNTDOWN_FROM)
    const now = new Date()
    const distance = +end - +now
    let newTime = 0

    if (unit === 'Day') {
      newTime = Math.floor(distance / DAY)
    } else if (unit === 'Hour') {
      newTime = Math.floor((distance % DAY) / HOUR)
    } else if (unit === 'Minute') {
      newTime = Math.floor((distance % HOUR) / MINUTE)
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND)
    }

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        {
          y: ['0%', '-100%'],
          opacity: [1, 0],
          scale: [1, 0.8],
        },
        { duration: 0.4, ease: 'easeInOut' }
      )

      timeRef.current = newTime
      setTime(newTime)

      await animate(
        ref.current,
        {
          y: ['100%', '0%'],
          opacity: [0, 1],
          scale: [0.8, 1],
        },
        { duration: 0.4, ease: 'easeOut' }
      )
    }
  }

  return { ref, time }
}

export default CosmicCountdown
