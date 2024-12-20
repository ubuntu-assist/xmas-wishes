import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
}

const ConfettiCelebration: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  // Generate random confetti pieces
  useEffect(() => {
    const colors = [
      '#FF69B4',
      '#4169E1',
      '#FFD700',
      '#98FB98',
      '#DDA0DD',
      '#F0E68C',
    ]
    const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setConfetti(pieces)
  }, [])

  return (
    <div className='fixed inset-0 pointer-events-none'>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: `${piece.y}vh`,
            rotate: piece.rotation,
            scale: piece.scale,
          }}
          animate={{
            y: '120vh',
            rotate: piece.rotation + Math.random() * 720,
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            ease: [0.23, 0.87, 0.32, 0.93],
            repeat: Infinity,
          }}
          className='absolute'
        >
          <div
            className='w-4 h-4'
            style={{
              backgroundColor: piece.color,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'
      >
        <div className='bg-white/90 p-6 rounded-2xl shadow-xl'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className='w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center'
          >
            <svg
              className='w-10 h-10 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </motion.div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            Payment Successful!
          </h2>
          <p className='text-gray-600'>Your transaction has been processed</p>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfettiCelebration
