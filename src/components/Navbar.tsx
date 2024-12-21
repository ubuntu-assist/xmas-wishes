import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { Link } from 'react-router'
import logo from '@/assets/images/logo.png'
import { useTranslation } from 'react-i18next'

interface NavLink {
  title: string
  href: string
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
        ${
          isMobile
            ? 'w-full justify-center bg-[#203F6C]/20'
            : 'hover:bg-[#203F6C]/20'
        } 
        transition-colors duration-200`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className='w-4 h-4 text-white' />
        <span className='text-white text-sm sm:text-base'>
          {i18n.language.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white transition-transform duration-200 
        ${isLangOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute z-50 mt-2 bg-[#203F6C] rounded-lg shadow-lg border border-[#F4B714]/10 backdrop-blur-lg
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
                      ? 'bg-[#F4B714]/20 text-[#F4B714]'
                      : 'text-white hover:bg-white/5'
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
                      className='w-2 h-2 rounded-full bg-[#F4B714]'
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

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation(['common'])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const navLinks: NavLink[] = [
    { title: t('navbar.home'), href: '/' },
    { title: t('navbar.about'), href: '/about' },
    { title: t('navbar.donate'), href: '/donate' },
    { title: t('navbar.contact'), href: '/contact' },
  ]

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
      if (!target.closest('.language-selector')) {
        setIsLangOpen(false)
      }
      if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [i18n, i18n.language])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-[#203F6C]/95 shadow-lg' : 'bg-[#203F6C]/80'} 
      backdrop-blur-sm`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16 sm:h-20'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex-shrink-0'
          >
            <Link to='/' className='flex items-center'>
              <img
                src={logo}
                alt='Move Together Logo'
                className='h-14 sm:h-20'
              />
            </Link>
          </motion.div>

          <div className='hidden md:flex md:items-center md:space-x-3 lg:space-x-6'>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='flex items-center space-x-3 lg:space-x-6'
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  className='text-sm lg:text-base text-white hover:text-[#F4B714] transition-colors duration-200'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={link.href}>{link.title}</Link>
                </motion.div>
              ))}
              <div className='language-selector'>
                <LanguageSelector
                  isMobile={false}
                  currentLang={i18n.language}
                  setCurrentLang={changeLanguage}
                  languages={languages}
                  isLangOpen={isLangOpen}
                  setIsLangOpen={setIsLangOpen}
                />
              </div>
            </motion.div>
          </div>

          <div className='flex md:hidden'>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(!isOpen)}
              className='menu-button inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#F4B714] hover:bg-[#203F6C] focus:outline-none'
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='mobile-menu md:hidden'
          >
            <div className='px-4 pt-2 pb-6 space-y-3 bg-[#203F6C]/95 backdrop-blur-sm border-t border-[#F4B714]/10'>
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  className='block text-white hover:text-[#F4B714] transition-colors duration-200 py-2 text-sm'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </motion.a>
              ))}
              <div className='py-2'>
                <LanguageSelector
                  isMobile={true}
                  currentLang={i18n.language}
                  setCurrentLang={changeLanguage}
                  languages={languages}
                  isLangOpen={isLangOpen}
                  setIsLangOpen={setIsLangOpen}
                />
              </div>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className='w-full bg-[#F4B714] text-[#203F6C] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#F4B714]/90 transition-all'
                onClick={() => setIsOpen(false)}
              >
                Get Quote
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
