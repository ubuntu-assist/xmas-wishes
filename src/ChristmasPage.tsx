import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'
import xmasAudio from '@/assets/xmas.mp3'
import ChristmasParticles from './ChristmasParticles'
import Signature from './Signature'

interface Ornament {
  id: number
  x: number
  y: number
  size: number
  color: string
  type: 'ball' | 'light' | 'candy'
}

interface UbuntuMessage {
  text: string
  translation?: string
}

const ChristmasPage: React.FC = () => {
  const [treeLoaded, setTreeLoaded] = useState<boolean>(false)
  const [activeOrnament, setActiveOrnament] = useState<number | null>(null)
  const [lightsTwinkle, setLightsTwinkle] = useState<boolean>(true)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [starPower, setStarPower] = useState<number>(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0)
  const [messageVisible, setMessageVisible] = useState<boolean>(true)

  const ubuntuMessages: UbuntuMessage[] = [
    {
      text: 'Umuntu Ngumuntu Ngabantu',
      translation: 'I am because we are',
    },
    {
      text: 'Unity is our strength, diversity our beauty',
      translation: 'Together we celebrate as one family',
    },
    {
      text: 'Motho ke motho ka batho babang',
      translation: 'A person is a person through others',
    },
    {
      text: 'Ubuntu ngokuhlanganyela',
      translation: 'Humanity through togetherness',
    },
  ]

  useEffect(() => {
    setTreeLoaded(true)
    const interval = setInterval(() => {
      setStarPower((prev) => (prev + 1) % 100)
      setLightsTwinkle((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageVisible(false)
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % ubuntuMessages.length)
        setMessageVisible(true)
      }, 1000)
    }, 5000)

    return () => clearInterval(messageInterval)
  }, [])

  const generateTreeLayers = (): string[] => {
    const layers = []
    for (let i = 0; i < 8; i++) {
      const width = 20 + i * 15
      const height = 30
      const yPos = 50 + i * 25
      layers.push(
        `M100 ${yPos} L${100 - width} ${yPos + height} L${100 + width} ${
          yPos + height
        }Z`
      )
    }
    return layers
  }

  const generateOrnaments = (): Ornament[] => {
    const ornaments: Ornament[] = []
    const colors = ['#FFD700', '#FF0000', '#4CAF50', '#9C27B0', '#2196F3']

    for (let layer = 0; layer < 7; layer++) {
      const y = 80 + layer * 25
      const width = 15 + layer * 12
      const ornamentsInLayer = 3 + layer

      for (let i = 0; i < ornamentsInLayer; i++) {
        const x = 100 - width + (2 * width * i) / (ornamentsInLayer - 1)
        ornaments.push({
          id: ornaments.length,
          x,
          y,
          size: 3 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          type:
            Math.random() > 0.6
              ? 'ball'
              : Math.random() > 0.5
              ? 'light'
              : 'candy',
        })
      }
    }
    return ornaments
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-purple-900 relative overflow-hidden'>
      <ChristmasParticles />
      <div className='absolute inset-0 opacity-10'>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className='absolute animate-pulse'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <svg width='40' height='40' viewBox='0 0 40 40'>
              <path
                d='M20 0L40 20L20 40L0 20Z'
                className='fill-yellow-400/20'
              />
            </svg>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className='absolute top-4 right-4 text-white p-4 rounded-full hover:bg-white/10 transition-colors z-10 focus:outline-none'
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <audio loop autoPlay muted={isMuted} className='hidden' src={xmasAudio} />

      <div className='absolute top-8 left-0 right-0 text-center px-4'>
        <h1 className='text-4xl md:text-6xl font-bold text-white mb-2 transition-all'>
          Merry Christmas
        </h1>
        <div className='relative h-24 overflow-hidden'>
          <div
            className={`transition-all duration-1000 transform ${
              messageVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <p className='text-xl md:text-3xl font-bold text-yellow-400 mb-2'>
              {ubuntuMessages[currentMessageIndex].text}
            </p>
            <p className='text-lg md:text-xl text-white/80 italic'>
              {ubuntuMessages[currentMessageIndex].translation}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`container mx-auto px-4 py-8 relative z-10 transition-all duration-1000 ${
          treeLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='w-full max-w-lg mx-auto relative mt-36 md:mt-40'>
          <svg viewBox='0 0 200 300' className='w-full h-full'>
            <g className='animate-pulse'>
              <path
                d='M100 20L105 35L120 35L110 45L115 60L100 50L85 60L90 45L80 35L95 35Z'
                className='fill-yellow-400'
                style={{
                  filter: `drop-shadow(0 0 ${starPower / 8}px #FCD34D)`,
                }}
              />
            </g>

            {generateTreeLayers().map((path, index) => (
              <path
                key={`branch-${index}`}
                d={path}
                className='transition-all duration-500'
                style={{
                  fill: `rgb(26, ${100 + index * 10}, 26)`,
                  transform: `scaleX(${treeLoaded ? 1 : 0})`,
                  transformOrigin: 'center',
                  transitionDelay: `${index * 100}ms`,
                }}
              />
            ))}

            <path
              d='M90 250L90 280C90 290,110 290,110 280L110 250Z'
              className='fill-yellow-900'
            />

            {generateOrnaments().map((ornament) => (
              <g key={ornament.id}>
                {ornament.type === 'ball' && (
                  <circle
                    cx={ornament.x}
                    cy={ornament.y}
                    r={ornament.size}
                    fill={ornament.color}
                    className='transition-all duration-300'
                    style={{
                      filter:
                        activeOrnament === ornament.id
                          ? 'brightness(1.5)'
                          : 'none',
                    }}
                    onMouseEnter={() => setActiveOrnament(ornament.id)}
                    onMouseLeave={() => setActiveOrnament(null)}
                  />
                )}
                {ornament.type === 'light' && (
                  <circle
                    cx={ornament.x}
                    cy={ornament.y}
                    r={ornament.size * 0.8}
                    fill={lightsTwinkle ? '#FFFFFF' : '#FFE082'}
                    className='transition-all duration-300'
                    style={{
                      filter: `blur(1px) brightness(${
                        lightsTwinkle ? 1.2 : 0.8
                      })`,
                    }}
                  />
                )}
                {ornament.type === 'candy' && (
                  <path
                    d={`M${ornament.x - 3} ${ornament.y} C${ornament.x - 3} ${
                      ornament.y - 5
                    },${ornament.x + 3} ${ornament.y - 5},${ornament.x + 3} ${
                      ornament.y
                    }`}
                    stroke='#FF0000'
                    strokeWidth='2'
                    fill='none'
                    className='candy-cane'
                  />
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className='text-center mt-12 space-y-8'>
          <a
            href='https://github.com/ubuntu-assist/xmas-wishes'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm'
          >
            <IconBrandGithub size={24} />
            View on GitHub
          </a>

          <Signature />
        </div>
      </div>
    </div>
  )
}

export default ChristmasPage
