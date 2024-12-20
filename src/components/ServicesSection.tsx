import { motion } from 'framer-motion'
import { Truck, Package, Trash2, Gift, ArrowRight, Check } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: 'Moving Services',
      description:
        'Professional and reliable moving services for homes and businesses. We handle your belongings with care and ensure a smooth transition to your new location.',
      features: [
        'Local & Long Distance',
        'Packing & Unpacking',
        'Furniture Assembly',
        'Storage Solutions',
      ],
      highlight: 'Most Popular',
    },
    {
      icon: Package,
      title: 'Delivery Solutions',
      description:
        "Fast and efficient delivery services for items of all sizes. Whether it's local or long-distance, we ensure your items arrive safely and on time.",
      features: [
        'Same-Day Delivery',
        'Real-Time Tracking',
        'Secure Handling',
        'Insurance Coverage',
      ],
      highlight: 'Best Value',
    },
    {
      icon: Trash2,
      title: 'Junk Removal',
      description:
        'Comprehensive junk removal services to help declutter your space. We handle the heavy lifting and ensure proper disposal of unwanted items.',
      features: [
        'Eco-Friendly Disposal',
        'Same-Day Service',
        'Free Estimates',
        'Recycling Services',
      ],
      highlight: 'Eco-Friendly',
    },
    {
      icon: Gift,
      title: 'Donation Program',
      description:
        'Give back to the community through our donation program. We collect and distribute your gently used items to those in need, making a positive impact.',
      features: [
        'Tax Deductible',
        'Community Support',
        'Scheduled Pickup',
        'Impact Reports',
      ],
      highlight: 'Community Choice',
    },
  ]

  return (
    <div className='relative bg-gray-50 py-32 overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0'>
        <div className='absolute w-96 h-96 -top-48 -left-48 bg-[#F4B714]/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob' />
        <div className='absolute w-96 h-96 -bottom-48 -right-48 bg-[#203F6C]/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000' />
        <div className='absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D7262F]/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000' />
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-24'
        >
          <h2 className='text-5xl font-bold text-[#203F6C] mb-6'>
            Professional Services{' '}
            <span className='block text-[#F4B714] text-3xl mt-3'>
              Exceeding Expectations
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Experience excellence through our comprehensive suite of services,
            each designed to deliver exceptional results with unmatched
            professionalism and care.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className='group relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500'
            >
              {/* Highlight badge */}
              <div className='absolute -top-4 right-8 bg-gradient-to-r from-[#203F6C] to-[#D7262F] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg'>
                {service.highlight}
              </div>

              {/* Fancy background gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-[#F4B714]/5 via-[#203F6C]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              <div className='relative'>
                <div className='flex items-center mb-8'>
                  <div className='relative'>
                    <div className='absolute inset-0 bg-[#F4B714]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500' />
                    <div className='relative h-20 w-20 bg-gradient-to-br from-[#203F6C] to-[#D7262F] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500'>
                      <service.icon className='h-10 w-10 text-white' />
                    </div>
                  </div>
                  <h3 className='text-3xl font-bold text-[#203F6C] ml-6'>
                    {service.title}
                  </h3>
                </div>

                <p className='text-lg text-gray-600 leading-relaxed mb-8'>
                  {service.description}
                </p>

                <div className='space-y-4'>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className='flex items-center text-gray-700'>
                      <div className='h-6 w-6 rounded-full bg-[#F4B714]/10 flex items-center justify-center mr-3'>
                        <Check className='h-4 w-4 text-[#F4B714]' />
                      </div>
                      <span className='text-lg'>{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className='mt-10 flex items-center space-x-2 text-[#203F6C] font-semibold text-lg group/button'
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className='h-5 w-5 group-hover/button:translate-x-1 transition-transform' />
                </motion.button>
              </div>

              {/* Decorative corner elements */}
              <div className='absolute h-20 w-20 border-t-2 border-l-2 border-[#F4B714]/20 top-6 left-6 rounded-tl-3xl' />
              <div className='absolute h-20 w-20 border-b-2 border-r-2 border-[#F4B714]/20 bottom-6 right-6 rounded-br-3xl' />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesSection
