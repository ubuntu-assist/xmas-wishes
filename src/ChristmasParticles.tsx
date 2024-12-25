import React, { useEffect, useState } from 'react'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  speed: number
  wobble: number
  type: 'star' | 'snowflake' | 'sparkle'
  rotation: number
  color: string
  opacity: number
}

const ChristmasParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const createParticle = (): Particle => {
      const colors = ['#FF0000', '#FFFFFF']
      return {
        id: Math.random(),
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 1.5 + 0.5,
        wobble: Math.random() * 2 - 1,
        type:
          Math.random() > 0.7
            ? 'star'
            : Math.random() > 0.5
            ? 'snowflake'
            : 'sparkle',
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.6,
      }
    }

    const initialParticles = Array.from({ length: 40 }, createParticle)
    setParticles(initialParticles)

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          if (particle.y > 100) {
            return createParticle()
          }
          return {
            ...particle,
            y: particle.y + particle.speed,
            x: particle.x + Math.sin(particle.y / 20) * particle.wobble,
            rotation: particle.rotation + 2,
            opacity: particle.opacity + Math.sin(particle.y / 10) * 0.1,
          }
        })
      )
    }, 40)

    return () => clearInterval(interval)
  }, [])

  const renderParticle = (particle: Particle) => {
    switch (particle.type) {
      case 'star':
        return (
          <svg
            width={particle.size * 4}
            height={particle.size * 4}
            viewBox='0 0 24 24'
            className='drop-shadow-lg'
          >
            <path
              d='M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z'
              fill={particle.color}
              style={{ opacity: particle.opacity }}
            />
          </svg>
        )
      case 'snowflake':
        return (
          <svg
            width={particle.size * 4}
            height={particle.size * 4}
            viewBox='0 0 24 24'
            className='drop-shadow-md'
          >
            <path
              d='M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8Z'
              fill={particle.color}
              style={{ opacity: particle.opacity }}
            />
          </svg>
        )
      case 'sparkle':
        return (
          <svg
            width={particle.size * 3}
            height={particle.size * 3}
            viewBox='0 0 24 24'
            className='drop-shadow-xl'
          >
            <circle
              cx='12'
              cy='12'
              r='6'
              fill={particle.color}
              style={{ opacity: particle.opacity }}
            />
          </svg>
        )
    }
  }

  return (
    <div className='fixed inset-0 pointer-events-none bg-gradient-to-b from-gray-900 to-gray-800'>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className='absolute transform transition-all duration-200 ease-in-out'
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg) scale(${
              1 + Math.sin(particle.y / 10) * 0.1
            })`,
          }}
        >
          {renderParticle(particle)}
        </div>
      ))}
    </div>
  )
}

export default ChristmasParticles
