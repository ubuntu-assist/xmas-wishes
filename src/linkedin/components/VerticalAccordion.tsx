import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DollarSign,
  Play,
  Bell,
  BarChart,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

// Define a type for the accordion items
interface AccordionItem {
  id: number
  title: string
  Icon: LucideIcon
  imgSrc: string
  description: string
}

const EnhancedVerticalAccordion: React.FC = () => {
  const [open, setOpen] = useState<number>(items[0].id)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const handleNavigation = (type: 'next' | 'prev') => {
    const currentIndex = items.findIndex((item) => item.id === open)
    let newIndex: number

    if (type === 'next') {
      newIndex = (currentIndex + 1) % items.length
      setDirection('forward')
    } else {
      newIndex = (currentIndex - 1 + items.length) % items.length
      setDirection('backward')
    }

    setOpen(items[newIndex].id)
  }

  const renderPanelContent = (item: AccordionItem) => (
    <div
      className='h-full w-full bg-cover bg-center'
      style={{ backgroundImage: `url(${item.imgSrc})` }}
    >
      <div className='absolute inset-0 bg-black/50 flex items-end p-8'>
        <div className='text-white max-w-xl'>
          <h2 className='text-3xl font-bold mb-4'>{item.title}</h2>
          <p className='text-lg mb-6'>{item.description}</p>
          <button
            className='
            bg-white text-indigo-600 px-6 py-3 rounded-full 
            flex items-center gap-2 hover:bg-indigo-50 transition-all
          '
          >
            Learn More <ArrowUpRight />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='relative bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex items-center justify-center p-4'>
      <div className='relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden'>
        {/* Navigation Buttons */}
        <div className='absolute z-50 top-1/2 -translate-y-1/2 w-full flex justify-between px-4'>
          <button
            onClick={() => handleNavigation('prev')}
            className='bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all'
            aria-label='Previous Panel'
          >
            <ChevronLeft className='text-white text-2xl' />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className='bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all'
            aria-label='Next Panel'
          >
            <ChevronRight className='text-white text-2xl' />
          </button>
        </div>

        <div className='flex flex-col lg:flex-row h-[500px] relative'>
          {/* Sidebar Navigation */}
          <div className='lg:w-1/4 bg-white border-r border-slate-200 flex lg:flex-col overflow-x-auto'>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setOpen(item.id)}
                className={`
                  flex items-center p-4 border-b border-slate-100 
                  ${
                    open === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-slate-50'
                  }
                  transition-all group
                `}
                aria-label={`View ${item.title} panel`}
              >
                <div
                  className={`
                  w-10 h-10 mr-3 rounded-full 
                  ${open === item.id ? 'bg-indigo-100' : 'bg-slate-100'}
                  flex items-center justify-center
                `}
                >
                  <item.Icon
                    className={`
                    ${open === item.id ? 'text-indigo-600' : 'text-slate-500'}
                    transition-colors
                  `}
                  />
                </div>
                <span className='font-medium hidden lg:block'>
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className='flex-grow relative overflow-hidden'>
            <AnimatePresence>
              {items.map(
                (item) =>
                  open === item.id && (
                    <motion.div
                      key={`panel-${item.id}`}
                      initial={{
                        opacity: 0,
                        x: direction === 'forward' ? 50 : -50,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: direction === 'forward' ? -50 : 50,
                      }}
                      transition={{ duration: 0.3 }}
                      className='absolute inset-0'
                    >
                      {renderPanelContent(item)}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

const items: AccordionItem[] = [
  {
    id: 1,
    title: 'Maximize Earnings',
    Icon: DollarSign,
    imgSrc:
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    description:
      'Unlock powerful strategies to boost your income and financial potential with our comprehensive earning optimization tools.',
  },
  {
    id: 2,
    title: 'Unlock Experiences',
    Icon: Play,
    imgSrc:
      'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    description:
      'Dive into a world of extraordinary experiences, from adventure to relaxation, tailored to your unique interests and lifestyle.',
  },
  {
    id: 3,
    title: 'Stay Informed',
    Icon: Bell,
    imgSrc:
      'https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    description:
      'Receive real-time notifications and insights, keeping you ahead of the curve with personalized, timely information.',
  },
  {
    id: 4,
    title: 'Accelerate Growth',
    Icon: BarChart,
    imgSrc:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    description:
      'Leverage cutting-edge analytics and growth strategies to propel your personal and professional development forward.',
  },
]

export default EnhancedVerticalAccordion
