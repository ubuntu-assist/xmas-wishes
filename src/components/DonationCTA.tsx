import { motion } from 'framer-motion'
import {
  Heart,
  ArrowRight,
  Gift,
  Truck,
  Users,
  CheckCircle,
  Calendar,
  Phone,
} from 'lucide-react'

const DonationCTA = () => {
  const impactStats = [
    {
      icon: Gift,
      number: '5,000+',
      label: 'Items Donated',
      description: 'Direct community impact',
    },
    {
      icon: Users,
      number: '1,000+',
      label: 'Families Helped',
      description: 'Lives transformed',
    },
    {
      icon: Truck,
      number: '100+',
      label: 'Monthly Pickups',
      description: 'Convenient service',
    },
  ]

  const donationFeatures = [
    {
      icon: CheckCircle,
      title: 'Tax Deductible',
      description: 'Receive full documentation for tax purposes',
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Choose a pickup time that works for you',
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Always here to assist you',
    },
  ]

  return (
    <div className='relative bg-[#203F6C] py-16 sm:py-20 lg:py-32 overflow-hidden overflow-x-hidden'>
      {/* Decorative elements */}
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
          className='absolute w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] top-1/4 right-1/4 bg-[#F4B714]/10 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className='absolute w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bottom-1/4 left-1/4 bg-[#F4B714]/10 rounded-full blur-3xl'
        />
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center'>
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-white'
          >
            <motion.div
              className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8'
              whileHover={{ scale: 1.05 }}
            >
              <Heart className='h-4 w-4 sm:h-5 sm:w-5 text-[#F4B714]' />
              <span className='text-xs sm:text-sm font-medium tracking-wide text-[#F4B714]'>
                Join Our Mission
              </span>
            </motion.div>

            <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight text-white'>
              Transform Lives Through
              <span className='block text-[#F4B714] mt-2'>
                Meaningful Donations
              </span>
            </h2>

            <p className='text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-8 sm:mb-12'>
              Your generosity creates lasting change in our community. Every
              donation contributes to building stronger neighborhoods and
              brighter futures for families in need.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16'>
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className='relative group'
                >
                  <div className='absolute inset-0 bg-white/5 rounded-xl sm:rounded-2xl blur-xl group-hover:opacity-70 transition-opacity' />
                  <div className='relative bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10'>
                    <div className='bg-[#F4B714] rounded-lg sm:rounded-xl p-2 sm:p-3 mb-3 sm:mb-4 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center'>
                      <stat.icon className='h-4 w-4 sm:h-6 sm:w-6 text-[#203F6C]' />
                    </div>
                    <div className='text-xl sm:text-2xl lg:text-3xl font-bold mb-1 text-white'>
                      {stat.number}
                    </div>
                    <div className='text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-[#F4B714]'>
                      {stat.label}
                    </div>
                    <div className='text-xs text-white/80'>
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='group relative overflow-hidden bg-[#D7262F] text-white px-6 sm:px-10 py-3 sm:py-5 rounded-full text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all hover:bg-[#b81f27]'
              >
                <div className='relative flex items-center justify-center space-x-2'>
                  <span>Schedule a Free Pickup</span>
                  <ArrowRight className='h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform' />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='group relative overflow-hidden bg-[#F4B714] text-[#203F6C] px-6 sm:px-10 py-3 sm:py-5 rounded-full text-sm sm:text-base font-semibold hover:bg-[#dba412] transition-all'
              >
                <span>Learn About Impact</span>
              </motion.button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16'>
              {donationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className='flex items-center space-x-3'
                >
                  <feature.icon className='h-4 w-4 sm:h-5 sm:w-5 text-[#F4B714] flex-shrink-0' />
                  <div>
                    <div className='text-xs sm:text-sm font-medium text-white'>
                      {feature.title}
                    </div>
                    <div className='text-xs text-[#F4B714] mt-0.5'>
                      {feature.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Enhanced Card Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative h-[500px] sm:h-[600px] lg:h-[700px] hidden md:block'
          >
            {/* Floating cards effect */}
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 1,
                }}
                className={`absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10
                  ${
                    index === 0
                      ? 'transform translate-y-4 sm:translate-y-6 translate-x-4 sm:translate-x-6'
                      : ''
                  }
                  ${
                    index === 2
                      ? 'transform -translate-y-4 sm:-translate-y-6 -translate-x-4 sm:-translate-x-6'
                      : ''
                  }`}
              >
                <div className='h-full rounded-xl sm:rounded-2xl bg-white/5 border border-white/5' />
              </motion.div>
            ))}

            {/* Main impact card */}
            <div className='absolute inset-0 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl'>
              <div className='h-full bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8'>
                <div className='space-y-4 sm:space-y-6 lg:space-y-8'>
                  <div className='flex items-center space-x-3 sm:space-x-4'>
                    <div className='h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 bg-[#203F6C] rounded-full flex items-center justify-center'>
                      <Heart className='h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-[#F4B714]' />
                    </div>
                    <div>
                      <div className='text-lg sm:text-xl lg:text-2xl font-semibold text-[#203F6C]'>
                        Latest Impact
                      </div>
                      <div className='text-xs sm:text-sm text-gray-600'>
                        Updated Monthly
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4 sm:space-y-6'>
                    <div className='bg-[#203F6C]/5 rounded-lg sm:rounded-xl p-4 sm:p-6'>
                      <div className='text-base sm:text-lg font-medium text-[#203F6C] mb-2'>
                        Furniture Program
                      </div>
                      <p className='text-sm sm:text-base text-gray-700'>
                        "Thanks to generous donors like you, we furnished 12
                        apartments for families transitioning from homeless
                        shelters last month, creating comfortable homes and new
                        beginnings."
                      </p>
                    </div>

                    <div className='bg-[#203F6C]/5 rounded-lg sm:rounded-xl p-4 sm:p-6'>
                      <div className='text-base sm:text-lg font-medium text-[#203F6C] mb-2'>
                        Community Impact
                      </div>
                      <p className='text-sm sm:text-base text-gray-700'>
                        "Your donations have helped create stable environments
                        for 45 children, improving their academic performance
                        and emotional well-being."
                      </p>
                    </div>
                  </div>

                  <div className='border-t border-gray-100 pt-4 sm:pt-6'>
                    <div className='flex justify-between items-center'>
                      <div className='text-xs sm:text-sm text-gray-600'>
                        Impact Report
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className='text-xs sm:text-sm text-[#D7262F] font-medium hover:text-[#b81f27] transition-colors'
                      >
                        View Full Report →
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DonationCTA
