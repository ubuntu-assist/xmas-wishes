import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import VideoModal from './VideoModal'
import { useTranslation } from 'react-i18next'

const HeroSection = () => {
  const { t } = useTranslation(['home'])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      url: 'https://movingsolutionsus.com/wp-content/uploads/2021/06/header-image-home.jpg',
      alt: 'Professional Moving Services',
    },
    {
      url: 'https://www.homeadvisor.com/r/wp-content/uploads/2018/06/movers_at_van.jpeg',
      alt: 'Careful Packing Services',
    },
    {
      url: 'https://www.assureshift.in/sites/default/files/images/blog/additional-services-by-moving-companies.jpg',
      alt: 'Local Moving Experts',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className='relative min-h-[100dvh] pt-16 sm:pt-20'>
      {/* Dynamic Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#203F6C] via-[#203F6C]/90 to-[#203F6C]'>
        <div className='absolute inset-0'>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute rounded-full mix-blend-overlay filter blur-3xl opacity-20'
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 10,
                delay: i * 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                width: ['20rem', '30rem', '40rem'][i],
                height: ['20rem', '30rem', '40rem'][i],
                left: `${i * 25}%`,
                top: `${i * 15}%`,
                backgroundColor:
                  i === 0 ? '#F4B714' : i === 1 ? '#D7262F' : '#203F6C',
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col justify-center'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='space-y-6 sm:space-y-8 py-8 sm:py-12'
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F4B714]/10 text-[#F4B714] text-xs sm:text-sm font-medium'
            >
              {t('hero.tagline')}
            </motion.span>

            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white space-y-2 sm:space-y-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className='block'>{t('hero.heading.primary')}</span>
              <span className='block bg-gradient-to-r from-[#F4B714] to-[#D7262F] bg-clip-text text-transparent'>
                {t('hero.heading.secondary')}
              </span>
            </motion.h1>

            <motion.p
              className='text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              className='flex flex-col sm:flex-row gap-4 sm:gap-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className='group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#F4B714] px-6 sm:px-8 py-3 sm:py-4 font-medium text-[#203F6C] transition duration-300 ease-out hover:bg-gradient-to-r hover:from-[#F4B714] hover:to-[#D7262F]'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/about')}
              >
                <span className='relative flex items-center gap-2 text-sm sm:text-base'>
                  {t('hero.cta.primary')}
                  <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
                </span>
              </motion.button>

              <motion.button
                className='group inline-flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 text-white transition-colors hover:text-[#F4B714]'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsVideoModalOpen(true)}
              >
                <div className='relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#F4B714]/10 backdrop-blur-sm'>
                  <Play className='w-4 h-4 sm:w-5 sm:h-5 fill-current' />
                </div>
                <span className='text-sm sm:text-base'>
                  {t('hero.cta.secondary')}
                </span>
              </motion.button>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className='grid grid-cols-2 gap-3 sm:gap-4 pt-6 sm:pt-8'
            >
              {[
                { number: '15K+', label: t('hero.stats.successfulMoves') },
                { number: '99%', label: t('hero.stats.satisfactionRate') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className='relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#203F6C]/50 backdrop-blur-xl p-3 sm:p-4 group hover:bg-[#203F6C]/70 transition-colors duration-300'
                  whileHover={{ scale: 1.02 }}
                >
                  <div className='relative z-10'>
                    <h3 className='text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1'>
                      {stat.number}
                    </h3>
                    <p className='text-[#F4B714] text-xs sm:text-sm'>
                      {stat.label}
                    </p>
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-br from-[#F4B714]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className='relative lg:block'
          >
            <div className='relative max-w-lg mx-auto lg:max-w-none'>
              {/* Animated Glow Effect */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-[#F4B714]/20 to-[#D7262F]/20 rounded-xl sm:rounded-2xl filter blur-3xl'
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Carousel Container */}
              <div className='relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#F4B714]/10 to-[#D7262F]/10 p-1 sm:p-2'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#F4B714]/10 to-[#D7262F]/10 backdrop-blur-sm' />

                {/* Image */}
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className='relative'
                >
                  <img
                    src={images[currentImageIndex].url}
                    alt={images[currentImageIndex].alt}
                    className='relative w-full h-auto rounded-lg sm:rounded-xl object-cover shadow-2xl'
                  />
                </motion.div>

                {/* Navigation Buttons */}
                <div className='absolute inset-0 flex items-center justify-between px-4'>
                  <motion.button
                    onClick={previousImage}
                    className='p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className='w-6 h-6' />
                  </motion.button>
                  <motion.button
                    onClick={nextImage}
                    className='p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className='w-6 h-6' />
                  </motion.button>
                </div>

                {/* Dots Indicator */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          className='absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 hover:text-[#F4B714] transition-colors'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className='text-xs sm:text-sm mb-1 sm:mb-2'>
            {t('hero.scrollHint')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className='w-5 h-5 sm:w-6 sm:h-6' />
          </motion.div>
        </motion.button>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  )
}

export default HeroSection
