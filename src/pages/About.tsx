import SEO from '@/lib/seo'
import { motion } from 'framer-motion'
import { Heart, Box, Truck, Recycle, CheckCircle, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  const { t } = useTranslation(['about'])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  return (
    <>
      <SEO
        title='About NND Services | Professional Moving & Delivery Solutions'
        description='Learn about NND Services - your trusted partner for professional moving, delivery, junk removal, and donation services. With 15K+ satisfied customers and a 99% satisfaction rate.'
        url='https://www.nndservices.com/about'
        image='https://www.nndservices.com/images/about-og-image.jpg'
        keywords='moving services, delivery solutions, junk removal, donation program, professional movers, community service'
      />
      <div className='bg-white'>
        <div className='relative bg-gradient-to-b from-[#203F6C] to-[#FFFFFF]'>
          <div className='absolute inset-0'>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute rounded-full mix-blend-soft-light filter blur-xl'
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 40, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 10,
                  delay: i * 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  width: ['20rem', '25rem', '30rem'][i],
                  height: ['20rem', '25rem', '30rem'][i],
                  left: `${i * 25}%`,
                  top: `${i * 10}%`,
                  backgroundColor: ['#F4B714', '#203F6C', '#D7262F'][i],
                  opacity: 0.1,
                }}
              />
            ))}
          </div>

          <div className='relative mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32'>
            <motion.div
              className='text-center'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className='w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full bg-[#F4B714] flex items-center justify-center shadow-lg'
              >
                <Star className='w-12 h-12 sm:w-16 sm:h-16 text-[#203F6C]' />
              </motion.div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8'>
                About NND Services
              </h1>
              <div className='relative'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className='h-1 max-w-md mx-auto bg-gradient-to-r from-transparent via-[#F4B714] to-transparent'
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className='mt-6 text-lg sm:text-xl text-black max-w-2xl mx-auto'
              >
                Your generous donations help us create positive change in our
                community
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
          <div className='grid gap-12 sm:gap-16 lg:gap-24'>
            {/* Our Story Section */}
            <motion.section
              {...fadeIn}
              className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center'
            >
              <div className='space-y-6 sm:space-y-8'>
                <div className='inline-flex items-center space-x-2 text-[#203F6C] font-medium'>
                  <div className='w-6 sm:w-8 h-px bg-[#203F6C]' />
                  <span>{t('aboutUs.sections.ourJourney.title')}</span>
                </div>
                <h2 className='text-3xl sm:text-4xl font-bold text-[#203F6C]'>
                  {t('aboutUs.sections.ourJourney.subtitle')}
                </h2>
                <p className='text-lg sm:text-xl text-black leading-relaxed'>
                  {t('aboutUs.sections.ourJourney.content')}
                </p>
                <motion.p
                  className='text-lg sm:text-xl text-black leading-relaxed'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Our team is committed to providing high-quality service,
                  ensuring that every job is done right the first time.
                </motion.p>
              </div>
              <div className='relative aspect-square max-w-lg mx-auto lg:mx-0'>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-[#203F6C]/20 to-[#F4B714]/20 rounded-3xl filter blur-3xl'
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
                <div className='relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#203F6C]/10 to-[#F4B714]/10 p-2'>
                  <div className='absolute inset-0 bg-gradient-to-br from-[#203F6C]/10 to-[#F4B714]/10 backdrop-blur-sm' />
                  <div className='relative h-full w-full rounded-2xl bg-white/90 flex items-center justify-center'>
                    <Truck className='w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-[#203F6C]' />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
              {...fadeIn}
              className='relative rounded-3xl p-6 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-[#203F6C]/5 to-[#F4B714]/5'
            >
              <div className='relative'>
                <div className='text-center mb-8 sm:mb-12 lg:mb-16 space-y-4'>
                  <div className='inline-flex items-center space-x-2 text-[#203F6C] font-medium'>
                    <div className='w-6 sm:w-8 h-px bg-[#203F6C]' />
                    <span>{t('aboutUs.sections.ourValues.title')}</span>
                    <div className='w-6 sm:w-8 h-px bg-[#203F6C]' />
                  </div>
                  <h2 className='text-3xl sm:text-4xl font-bold text-[#203F6C]'>
                    {t('aboutUs.sections.ourValues.subtitle')}
                  </h2>
                </div>

                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
                  {[
                    {
                      icon: <Heart className='w-6 h-6 sm:w-8 sm:h-8' />,
                      title: 'Integrity',
                      description: t(
                        'aboutUs.sections.ourValues.values.integrity'
                      ),
                    },
                    {
                      icon: <CheckCircle className='w-6 h-6 sm:w-8 sm:h-8' />,
                      title: 'Professionalism',
                      description: t(
                        'aboutUs.sections.ourValues.values.professionalism'
                      ),
                    },
                    {
                      icon: <Box className='w-6 h-6 sm:w-8 sm:h-8' />,
                      title: 'Community',
                      description: t(
                        'aboutUs.sections.ourValues.values.community'
                      ),
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className='relative group'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className='absolute inset-0 bg-gradient-to-br from-[#203F6C]/5 to-[#F4B714]/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300' />
                      <div className='relative p-6 sm:p-8 text-center space-y-3 sm:space-y-4'>
                        <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#203F6C] to-[#F4B714] text-white transform group-hover:scale-110 transition-transform duration-300'>
                          {value.icon}
                        </div>
                        <h3 className='text-xl sm:text-2xl font-semibold text-[#203F6C]'>
                          {value.title}
                        </h3>
                        <p className='text-sm sm:text-base text-black leading-relaxed'>
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Services Section */}
            <motion.section {...fadeIn} className='relative'>
              <div className='text-center mb-8 sm:mb-12 lg:mb-16 space-y-4'>
                <div className='inline-flex items-center space-x-2 text-[#203F6C] font-medium'>
                  <div className='w-6 sm:w-8 h-px bg-[#203F6C]' />
                  <span>{t('aboutUs.sections.ourServices.title')}</span>
                  <div className='w-6 sm:w-8 h-px bg-[#203F6C]' />
                </div>
                <h2 className='text-3xl sm:text-4xl font-bold text-[#203F6C]'>
                  {t('aboutUs.sections.ourServices.subtitle')}
                </h2>
              </div>

              <div className='grid sm:grid-cols-2 gap-6 sm:gap-8'>
                {[
                  {
                    title: 'Moving Services',
                    description:
                      'Professional and efficient relocation solutions',
                  },
                  {
                    title: 'Delivery Solutions',
                    description: 'Reliable and timely delivery services',
                  },
                  {
                    title: 'Junk Removal',
                    description: 'Responsible disposal and cleaning services',
                  },
                  {
                    title: 'Donation Program',
                    description: 'Community-focused redistribution initiative',
                  },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className='group relative'
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-[#203F6C]/5 to-[#F4B714]/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300' />
                    <div className='relative p-6 sm:p-8 rounded-2xl border border-[#203F6C]/20 hover:border-[#F4B714] hover:shadow-lg transition-all duration-300'>
                      <h3 className='text-xl sm:text-2xl font-semibold text-[#203F6C] mb-2'>
                        {service.title}
                      </h3>
                      <p className='text-sm sm:text-base text-black'>
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Community Section */}
            <motion.section
              {...fadeIn}
              className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#203F6C]/5 to-[#F4B714]/5'
            >
              <div className='relative p-6 sm:p-12 lg:p-16 text-center'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-full bg-[#F4B714]/20 flex items-center justify-center'
                >
                  <Recycle className='w-8 h-8 sm:w-10 sm:h-10 text-[#F4B714]' />
                </motion.div>

                <div className='max-w-3xl mx-auto space-y-4 sm:space-y-6'>
                  <h2 className='text-3xl sm:text-4xl font-bold text-[#203F6C]'>
                    {t('aboutUs.sections.commitmentToCommunity.title')}
                  </h2>
                  <p className='text-lg sm:text-xl text-black leading-relaxed'>
                    {t('aboutUs.sections.commitmentToCommunity.content')}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Why Choose Us Section */}
            <motion.section {...fadeIn} className='relative'>
              <div className='text-center mb-8 sm:mb-12 lg:mb-16 space-y-4'>
                <div className='inline-flex items-center space-x-2 text-[#203F6C] font-medium'>
                  <div className='w-6 sm:w-8 h-px bg-[#203F6C]' />
                  <span>Why Us</span>
                  <div className='w-6 sm:w-8 h-px bg-[#203F6C]' />
                </div>
                <h2 className='text-3xl sm:text-4xl font-bold text-[#203F6C]'>
                  Why Choose Us?
                </h2>
              </div>

              <p className='text-lg sm:text-xl text-black leading-relaxed text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16'>
                Choosing NND SERVICES means choosing a partner who values your
                time, your belongings, and your trust. With a team of
                experienced professionals, a commitment to excellence, and a
                strong focus on customer care, we strive to exceed your
                expectations with every service.
              </p>

              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                {[
                  { number: '15K+', label: 'Satisfied Customers' },
                  { number: '99%', label: 'Satisfaction Rate' },
                  { number: '24/7', label: 'Customer Support' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className='group relative'
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-[#203F6C]/5 to-[#F4B714]/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300' />
                    <div className='relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow text-center'>
                      <h3 className='text-3xl font-bold text-[#F4B714] mb-3'>
                        {stat.number}
                      </h3>
                      <p className='text-[#203F6C] font-medium'>{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
