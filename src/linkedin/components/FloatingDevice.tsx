import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Battery,
  Wifi,
  Moon,
  Sun,
  Mail,
  Calendar,
  Camera,
  Music2,
  LucideIcon,
} from 'lucide-react'

interface HeaderBarProps {
  isNightMode: boolean
  onToggleMode: () => void
}

interface AppIconProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  isActive: boolean
}

interface ScreenProps {
  isNightMode: boolean
  currentApp: string
  setCurrentApp: (app: string) => void
}

interface App {
  id: string
  icon: LucideIcon
  label: string
}

export const FloatingDevice: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState<boolean>(false)
  const [currentApp, setCurrentApp] = useState<string>('home')

  return (
    <section className='grid place-content-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12'>
      <div className='relative'>
        <motion.div
          animate={{
            rotate: [0, -2, 0, 2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
          }}
          className='absolute -inset-4 bg-white/20 rounded-3xl blur-xl'
        />
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-30deg) rotateX(15deg)',
          }}
          className='rounded-[24px] bg-gradient-to-r from-violet-600 to-indigo-600'
        >
          <motion.div
            initial={{
              transform: 'translateZ(8px) translateY(-2px)',
            }}
            animate={{
              transform: 'translateZ(32px) translateY(-8px)',
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 2,
              ease: 'easeInOut',
            }}
            className='relative h-96 w-56 rounded-[24px] border-2 border-b-4 border-r-4 border-white/50 border-l-white/10 border-t-white/10 bg-neutral-900 p-1 pl-[3px] pt-[3px]'
          >
            <HeaderBar
              isNightMode={isNightMode}
              onToggleMode={() => setIsNightMode(!isNightMode)}
            />
            <Screen
              isNightMode={isNightMode}
              currentApp={currentApp}
              setCurrentApp={setCurrentApp}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const HeaderBar: React.FC<HeaderBarProps> = ({ isNightMode, onToggleMode }) => {
  return (
    <>
      <div className='absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-800'></div>
      <div className='absolute right-3 top-2 z-10 flex gap-2 items-center'>
        <motion.button
          onClick={onToggleMode}
          whileTap={{ scale: 0.9 }}
          className='text-neutral-400 hover:text-neutral-200'
        >
          {isNightMode ? <Moon size={12} /> : <Sun size={12} />}
        </motion.button>
        <Wifi size={12} className='text-neutral-400' />
        <Battery size={12} className='text-neutral-400' />
      </div>
    </>
  )
}

const AppIcon: React.FC<AppIconProps> = ({
  icon: Icon,
  label,
  onClick,
  isActive,
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
      isActive ? 'bg-white/10' : 'hover:bg-white/5'
    }`}
  >
    <Icon size={24} className='text-white' />
    <span className='text-xs text-white/80'>{label}</span>
  </motion.button>
)

const Screen: React.FC<ScreenProps> = ({
  isNightMode,
  currentApp,
  setCurrentApp,
}) => {
  const apps: App[] = [
    { id: 'mail', icon: Mail, label: 'Mail' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'camera', icon: Camera, label: 'Camera' },
    { id: 'music', icon: Music2, label: 'Music' },
  ]

  return (
    <div
      className={`relative z-0 h-full w-full overflow-hidden rounded-[20px] transition-colors duration-500 ${
        isNightMode ? 'bg-neutral-900' : 'bg-white'
      }`}
    >
      <motion.div
        initial={false}
        animate={{
          background: isNightMode
            ? 'radial-gradient(circle at 50% 0%, #4f46e5 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 0%, #818cf8 0%, transparent 50%)',
        }}
        className='absolute inset-0'
      />

      {currentApp === 'home' && (
        <div className='relative h-full w-full p-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='grid grid-cols-2 gap-4 mt-12'
          >
            {apps.map((app) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                label={app.label}
                onClick={() => setCurrentApp(app.id)}
                isActive={currentApp === app.id}
              />
            ))}
          </motion.div>
        </div>
      )}

      {currentApp !== 'home' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='h-full w-full flex items-center justify-center'
        >
          <div className='text-center'>
            {(() => {
              const CurrentAppIcon = apps.find(
                (app) => app.id === currentApp
              )?.icon
              return CurrentAppIcon ? (
                <CurrentAppIcon
                  size={48}
                  className={`mx-auto mb-4 ${
                    isNightMode ? 'text-white' : 'text-neutral-900'
                  }`}
                />
              ) : null
            })()}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentApp('home')}
              className='px-4 py-2 rounded-lg bg-white/10 text-white text-sm backdrop-blur'
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
