import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from '@tabler/icons-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, ArrowRight, ArrowUp, PhoneCall } from 'lucide-react'
import { useState, useEffect } from 'react'
import logo from '@/assets/images/logo.png'
import { Link } from 'react-router'

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true)
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false)
      }
    }

    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [showScroll])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const quickLinks = [
    { label: 'Moving Services', href: '/services' },
    { label: 'Delivery Services', href: '/services' },
    { label: 'Junk Removal Services', href: '/services' },
    { label: 'Donation Program', href: '/services' },
  ]

  const socialLinks = [
    {
      Icon: IconBrandWhatsapp,
      href: 'https://api.whatsapp.com/send/?phone=13688895240&text&type=phone_number&app_absent=0',
      label: 'WhatsApp',
    },
    {
      Icon: IconBrandFacebook,
      href: 'https://web.facebook.com/nndservices',
      label: 'Facebook',
    },
    {
      Icon: IconBrandLinkedin,
      href: 'https://www.linkedin.com/company/nnd-services',
      label: 'LinkedIn',
    },
  ]

  return (
    <footer className='relative bg-[#203F6C] text-gray-300'>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className='fixed bottom-8 right-8 z-50 bg-[#D7262F] text-white p-4 rounded-full shadow-lg hover:bg-[#b81f27] transition-colors'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className='h-6 w-6' />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16'>
        <div className='grid gap-8 md:gap-16 md:grid-cols-2'>
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='space-y-6 sm:space-y-8'
          >
            <img src={logo} alt='Company Logo' className='h-14 sm:h-20' />
            <p className='text-base sm:text-lg text-[#F4B714] leading-relaxed'>
              Professional moving services with a commitment to excellence and
              customer satisfaction.
            </p>
            <div className='space-y-4'>
              <motion.div
                whileHover={{ x: 5 }}
                className='flex items-center space-x-3 text-white hover:text-[#F4B714] transition-colors cursor-pointer text-sm sm:text-base'
              >
                <MapPin className='h-5 w-5 flex-shrink-0' />
                <span>24 Abberfield Crescent NE Calgary Alberta, T2A6N6</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className='flex items-center space-x-3 text-white hover:text-[#F4B714] transition-colors cursor-pointer text-sm sm:text-base'
              >
                <PhoneCall className='h-5 w-5 flex-shrink-0' />
                <span className='break-all'>+1 368 889 5240</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className='flex items-center space-x-3 text-white hover:text-[#F4B714] transition-colors cursor-pointer text-sm sm:text-base'
              >
                <Mail className='h-5 w-5 flex-shrink-0' />
                <span className='break-all'>info@nndservices.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className='text-xl sm:text-2xl font-bold text-[#F4B714] mb-6 sm:mb-8'>
              Our Services
            </h4>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      to={link.href}
                      className='group flex items-center text-white hover:text-[#F4B714] transition-colors text-sm sm:text-base'
                    >
                      <ArrowRight className='h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity' />
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-[#F4B714]/20'
        >
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
            <div className='text-white text-sm sm:text-base text-center sm:text-left'>
              © {new Date().getFullYear()} NND Services
            </div>
            <div className='flex items-center space-x-3 sm:space-x-4'>
              {socialLinks.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  aria-label={label}
                  target='_blank'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className='bg-[#F4B714]/10 p-2 rounded-full hover:bg-[#D7262F] transition-colors'
                >
                  <Icon className='h-4 w-4 sm:h-5 sm:w-5 text-[#F4B714] hover:text-white transition-colors' />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
