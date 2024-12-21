import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <section className='relative min-h-[100dvh] bg-white flex items-center justify-center'>
      {/* Decorative Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full mix-blend-multiply filter blur-3xl opacity-10'
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

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className='text-base font-semibold text-[#F4B714]'>404</p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-[#203F6C] sm:text-5xl'>
              Page not found
            </h1>
            <p className='mt-4 text-base text-gray-500'>
              Sorry, we couldn't find the page you're looking for.
            </p>
          </motion.div>

          <motion.div
            className='mt-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => navigate('/')}
              className='group inline-flex items-center gap-2 rounded-full bg-[#203F6C] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#203F6C]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203F6C] transition-all duration-200'
            >
              <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
              Back to home
            </button>
          </motion.div>
        </div>

        {/* Decorative 404 Background */}
        <div className='absolute inset-0 -z-10 opacity-5 flex items-center justify-center pointer-events-none select-none'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className='text-[40rem] font-bold text-gray-900 leading-none'
          >
            404
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
