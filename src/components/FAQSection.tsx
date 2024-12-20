import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const FAQSection = () => {
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What types of donations do you accept?',
      answer:
        'We accept a wide range of gently used items including furniture, household goods, appliances, and clothing. All items should be in good, working condition and free from significant damage or stains.',
      category: 'Donations',
      icon: '📦',
    },
    {
      question: 'How does the pickup process work?',
      answer:
        "Once you schedule a pickup, our team will arrive at your location during the selected time window. We handle all the heavy lifting and loading. You'll receive a tax receipt via email immediately after the pickup is complete.",
      category: 'Process',
      icon: '🚚',
    },
    {
      question: 'Are my donations tax-deductible?',
      answer:
        "Yes! We are a registered 501(c)(3) nonprofit organization. You'll receive an official tax receipt for your donation that can be used for tax deduction purposes.",
      category: 'Tax Benefits',
      icon: '📄',
    },
    {
      question: 'How are donated items distributed?',
      answer:
        'Donated items are distributed directly to families in need through our network of social service partners. We work closely with local shelters, housing programs, and community organizations to ensure items reach those who need them most.',
      category: 'Impact',
      icon: '🤝',
    },
    {
      question: 'What areas do you serve?',
      answer:
        'We currently serve the greater metropolitan area and surrounding counties within a 50-mile radius. Contact us to confirm if your location is within our service area.',
      category: 'Service Area',
      icon: '🗺️',
    },
    {
      question: 'How quickly can I schedule a pickup?',
      answer:
        'We typically can schedule pickups within 2-3 business days. For urgent situations, we offer expedited pickup services when available.',
      category: 'Scheduling',
      icon: '📅',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className='bg-gradient-to-b from-white to-gray-50 py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='inline-flex items-center space-x-2 bg-[#F4B714]/10 rounded-full px-6 py-3 mb-8'
          >
            <HelpCircle className='h-5 w-5 text-[#203F6C]' />
            <span className='text-sm font-medium tracking-wide text-[#203F6C]'>
              Frequently Asked Questions
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-4xl font-bold text-[#203F6C] mb-6'
          >
            Everything You Need to Know
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='text-xl text-gray-600 max-w-3xl mx-auto'
          >
            Find answers to common questions about our donation process, impact,
            and services. Can't find what you're looking for? Reach out to our
            support team.
          </motion.p>
        </div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid md:grid-cols-2 gap-8 mb-16'
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='relative group'
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full text-left'
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100'>
                  <div className='flex items-start justify-between'>
                    <div>
                      <div className='flex items-center space-x-2 mb-2'>
                        <span className='text-2xl'>{faq.icon}</span>
                        <span className='text-sm font-medium text-[#203F6C] bg-[#F4B714]/10 px-3 py-1 rounded-full'>
                          {faq.category}
                        </span>
                      </div>
                      <h3 className='text-xl font-semibold text-[#203F6C] mb-2 pr-8'>
                        {faq.question}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{
                          height: openIndex === index ? 'auto' : 0,
                          opacity: openIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                      >
                        <p className='text-gray-600 mt-4 leading-relaxed'>
                          {faq.answer}
                        </p>
                      </motion.div>
                    </div>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 180 : 0,
                        backgroundColor:
                          openIndex === index
                            ? '#203F6C'
                            : 'rgb(229, 231, 235)',
                      }}
                      className='flex-shrink-0 ml-4 p-2 rounded-full transition-colors duration-300'
                    >
                      <ChevronDown
                        className={`h-6 w-6 ${
                          openIndex === index ? 'text-white' : 'text-gray-400'
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='bg-[#203F6C] rounded-3xl p-8 md:p-12 shadow-xl'
        >
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='flex items-center space-x-4 mb-6 md:mb-0'>
              <div className='bg-white/20 backdrop-blur-sm rounded-full p-3'>
                <MessageCircle className='h-6 w-6 text-[#F4B714]' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-white'>
                  Still have questions?
                </h3>
                <p className='text-[#F4B714]'>
                  Our support team is here to help.
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className='bg-[#D7262F] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b81f27] transition-colors shadow-md'
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQSection
