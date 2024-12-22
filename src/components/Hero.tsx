import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react'
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

  return (
    <section className='relative min-h-[100dvh] pt-16 sm:pt-20'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: 'url("src/assets/images/background.png")',
            opacity: '0.9',
          }}
        />
        {/* Semi-transparent gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#203F6C]/70 via-[#203F6C]/60 to-[#203F6C]/70' />
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
            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white space-y-2 sm:space-y-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              <span className='block'>{t('hero.heading.primary')}</span>
              <span className='block bg-gradient-to-r from-[#F4B714] to-[#D7262F] bg-clip-text text-transparent'>
                {t('hero.heading.secondary')}
              </span>
            </motion.h1>

            <motion.p
              className='text-base sm:text-lg text-white leading-relaxed max-w-2xl font-medium'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                backgroundColor: 'rgba(32, 63, 108, 0.3)',
                backdropFilter: 'blur(4px)',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}
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
                <div className='relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#F4B714]/20 backdrop-blur-sm'>
                  <Play className='w-4 h-4 sm:w-5 sm:h-5 fill-current' />
                </div>
                <span
                  className='text-sm sm:text-base font-medium'
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                >
                  {t('hero.cta.secondary')}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Rest of the component remains the same */}
          {/* Right Column - Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className='relative lg:block'
          >
            <div className='relative max-w-lg mx-auto lg:max-w-none'>
              <div className='relative rounded-xl sm:rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-1 sm:p-2'>
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
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  )
}

export default HeroSection
