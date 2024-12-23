import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Heart,
  Phone,
  Star,
  Settings,
  Home,
} from 'lucide-react'
import { Link, useLocation } from 'react-router'
import logo from '@/assets/images/logo.png'
import { useTranslation } from 'react-i18next'

interface NavLink {
  title: string
  href: string
  icon: React.ReactNode
}

interface Language {
  name: string
  flag: string
  label: string
}

interface Languages {
  [key: string]: Language
}

interface LanguageSelectorProps {
  isMobile: boolean
  currentLang: string
  setCurrentLang: (code: string) => void
  languages: Languages
  isLangOpen: boolean
  setIsLangOpen: (isOpen: boolean) => void
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isMobile,
  currentLang,
  setCurrentLang,
  languages,
  isLangOpen,
  setIsLangOpen,
}) => {
  const { i18n } = useTranslation()

  return (
    <div className='relative language-selector'>
      <motion.button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className={`flex items-center space-x-1 px-3 py-2 rounded-full 
        ${isMobile ? 'w-full justify-center bg-gray-100' : 'hover:bg-gray-100'} 
        transition-colors duration-200`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className='w-4 h-4 text-gray-600' />
        <span className='text-gray-600 text-sm sm:text-base'>
          {i18n.language.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 
        ${isLangOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200
            ${isMobile ? 'w-full left-0' : 'w-48 right-0'}`}
          >
            <div className='p-2'>
              {Object.entries(languages).map(([code, lang]) => (
                <motion.button
                  key={code}
                  onClick={() => {
                    setCurrentLang(code)
                    setIsLangOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                  ${
                    currentLang === code
                      ? 'bg-[#203F6C]/10 text-[#203F6C]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                  transition-colors duration-200`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className='text-xl'>{lang.flag}</span>
                  <span className='flex-1 text-left text-sm sm:text-base'>
                    {lang.name}
                  </span>
                  {currentLang === code && (
                    <motion.div
                      layoutId='activeLang'
                      className='w-2 h-2 rounded-full bg-[#203F6C]'
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const NavLinks = ({ isMobile = false, onLinkClick = () => {} }) => {
  const location = useLocation()
  const { t } = useTranslation(['common'])
  const [activeLink, setActiveLink] = useState('/')

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])

  const navLinks: NavLink[] = [
    {
      title: 'Home',
      href: '/',
      icon: <Home className='w-5 h-5' />,
    },
    {
      title: 'Services',
      href: '/services',
      icon: <Settings className='w-5 h-5' />,
    },
    {
      title: t('navbar.about'),
      href: '/about',
      icon: <Star className='w-5 h-5' />,
    },
    {
      title: t('navbar.donate'),
      href: '/donate',
      icon: <Heart className='w-5 h-5' />,
    },
    {
      title: t('navbar.contact'),
      href: '/contact',
      icon: <Phone className='w-5 h-5' />,
    },
  ]

  const LinkComponent = ({ link, index }: { link: NavLink; index: number }) => {
    const isActive = activeLink === link.href

    return (
      <Link
        key={link.href}
        to={link.href}
        onClick={() => onLinkClick()}
        className={`w-full ${isMobile ? 'block' : ''}`}
      >
        <motion.div
          className={`relative group flex items-center gap-2 px-4 py-2 rounded-full
            ${isMobile ? 'w-full' : ''}
            ${isActive ? 'text-white' : 'text-gray-600 hover:text-[#203F6C]'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {isActive && (
            <motion.div
              layoutId={`activeBackground${isMobile ? 'Mobile' : ''}`}
              className='absolute inset-0 bg-gradient-to-r from-[#203F6C] to-[#2C5495] rounded-full'
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}

          <motion.div
            className={`relative flex items-center gap-2 ${
              isActive ? 'text-white' : 'group-hover:text-[#203F6C]'
            }`}
            animate={{ scale: isActive ? 1.05 : 1 }}
          >
            <motion.div
              animate={{
                rotate: isActive ? [0, 15, -15, 0] : 0,
                scale: isActive ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8],
              }}
            >
              {link.icon}
            </motion.div>
            <span className='font-medium tracking-wide whitespace-nowrap'>
              {link.title}
            </span>
          </motion.div>

          {!isActive && (
            <motion.div
              className='absolute inset-0 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 -z-10'
              initial={false}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>
      </Link>
    )
  }

  return (
    <div
      className={`${
        isMobile
          ? 'flex flex-col space-y-2'
          : 'hidden md:flex items-center space-x-4'
      }`}
    >
      {navLinks.map((link, index) => (
        <LinkComponent key={link.href} link={link} index={index} />
      ))}
    </div>
  )
}

const Navbar: React.FC = () => {
  const { i18n } = useTranslation(['common'])
  const [isOpen, setIsOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const languages: Languages = {
    en: {
      name: 'English',
      flag: '🇬🇧',
      label: 'en',
    },
    fr: {
      name: 'Français',
      flag: '🇫🇷',
      label: 'fr',
    },
  }

  useEffect(() => {
    document.body.dir = i18n.dir()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const languageSelector = target.closest('.language-selector')
      const mobileMenu = target.closest('.mobile-menu')
      const menuButton = target.closest('.menu-button')

      if (!languageSelector) {
        setIsLangOpen(false)
      }
      if (!mobileMenu && !menuButton) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [i18n])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white shadow-lg' : 'bg-white'}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16 sm:h-20'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex-shrink-0'
          >
            <Link to='/' className='flex items-center'>
              <img src={logo} alt='Logo' className='h-14 sm:h-16 w-auto' />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-6'>
            <NavLinks />
            <div className='pl-6 border-l border-gray-200'>
              <LanguageSelector
                isMobile={false}
                currentLang={i18n.language}
                setCurrentLang={changeLanguage}
                languages={languages}
                isLangOpen={isLangOpen}
                setIsLangOpen={setIsLangOpen}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex md:hidden'>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
              }}
              className='menu-button inline-flex items-center justify-center p-2 rounded-md text-[#203F6C] hover:text-[#F4B714] hover:bg-gray-100 focus:outline-none'
              aria-label='Main menu'
              aria-expanded='false'
            >
              {isOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='mobile-menu md:hidden'
          >
            <div className='px-4 pt-2 pb-6 space-y-4 bg-white border-t border-gray-200'>
              <NavLinks isMobile={true} onLinkClick={() => setIsOpen(false)} />
              <div className='pt-2'>
                <LanguageSelector
                  isMobile={true}
                  currentLang={i18n.language}
                  setCurrentLang={changeLanguage}
                  languages={languages}
                  isLangOpen={isLangOpen}
                  setIsLangOpen={setIsLangOpen}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
