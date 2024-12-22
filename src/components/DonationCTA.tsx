import { Heart, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const DonationCTA = () => {
  const navigate = useNavigate()

  return (
    <div className='relative bg-[#203F6C] py-16 overflow-hidden'>
      {/* Decorative background */}
      <div className='absolute inset-0'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute w-[600px] h-[600px] -top-1/2 -right-1/4 bg-[#F4B714]/10 rounded-full blur-3xl'
        />
      </div>

      <div className='relative max-w-4xl mx-auto px-4'>
        <div className='text-center mb-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6'
          >
            <Heart className='h-4 w-4 text-[#F4B714]' />
            <span className='text-sm font-medium text-[#F4B714]'>
              Support Your Community
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-3xl font-bold mb-4 text-white'
          >
            Connect Through
            <span className='block text-[#F4B714]'>Meaningful Donations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-lg text-white/90 mb-8 max-w-2xl mx-auto'
          >
            Through our donation service, NND SERVICES connects people who want
            to give away gently used furniture or other items with those in
            need. We collect your donated items and ensure they are delivered to
            families or organizations that can make good use of them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='flex flex-col sm:flex-row justify-center gap-4'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/donate')}
              className='group bg-[#D7262F] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#b81f27] transition-all flex items-center justify-center space-x-2'
            >
              <span>Donate Now</span>
              <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DonationCTA
