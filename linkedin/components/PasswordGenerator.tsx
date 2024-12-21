import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  Clipboard,
  RefreshCcw,
  Settings,
  CheckCircle2,
  Copy,
  ShieldCheck,
  Star,
  AlertTriangle,
  Info,
  Database,
  Eye,
  EyeOff,
} from 'lucide-react'

// Password strength levels
type StrengthLevel = 'Weak' | 'Medium' | 'Strong' | 'Very Strong'

// Password history item type
type PasswordHistoryItem = {
  password: string
  timestamp: Date
  strength: StrengthLevel
}

const PasswordGenerator: React.FC = () => {
  // State management
  const [password, setPassword] = useState<string>('')
  const [passwordLength, setPasswordLength] = useState<number>(12)
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true)
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true)
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [strength, setStrength] = useState<StrengthLevel>('Medium')

  // New state additions
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistoryItem[]>(
    []
  )
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [savedPasswords, setSavedPasswords] = useState<string[]>([])
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false)
  const [excludeAmbiguousChars, setExcludeAmbiguousChars] =
    useState<boolean>(false)

  // Character sets with ambiguous character removal
  const UPPERCASE = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const LOWERCASE = 'abcdefghijkmnpqrstuvwxyz'
  const NUMBERS = '23456789'
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  // Password generation logic
  const generatePassword = () => {
    let characterPool = ''
    if (includeUppercase)
      characterPool += excludeAmbiguousChars
        ? UPPERCASE
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase)
      characterPool += excludeAmbiguousChars
        ? LOWERCASE
        : 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers)
      characterPool += excludeAmbiguousChars ? NUMBERS : '0123456789'
    if (includeSymbols) characterPool += SYMBOLS

    if (characterPool.length === 0) {
      setPassword('')
      return
    }

    let generatedPassword = Array.from(
      crypto.getRandomValues(new Uint32Array(passwordLength))
    )
      .map((x) => characterPool[x % characterPool.length])
      .join('')

    setPassword(generatedPassword)
    calculateStrength(generatedPassword)

    // Add to password history
    const newHistoryItem: PasswordHistoryItem = {
      password: generatedPassword,
      timestamp: new Date(),
      strength: strength,
    }
    setPasswordHistory((prev) => [newHistoryItem, ...prev].slice(0, 5)) // Keep last 5 passwords
  }

  // Save password to favorites
  const savePassword = () => {
    if (password && !savedPasswords.includes(password)) {
      setSavedPasswords((prev) => [password, ...prev].slice(0, 10)) // Keep last 10 saved passwords
    }
  }

  // Strength calculation logic
  const calculateStrength = (pwd: string) => {
    let score = 0
    score += includeUppercase ? 1 : 0
    score += includeLowercase ? 1 : 0
    score += includeNumbers ? 1 : 0
    score += includeSymbols ? 1 : 0

    if (pwd.length >= 12) score += 2
    else if (pwd.length >= 8) score += 1

    if (score <= 2) setStrength('Weak')
    else if (score <= 4) setStrength('Medium')
    else if (score <= 6) setStrength('Strong')
    else setStrength('Very Strong')
  }

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Initial password generation
  useEffect(() => {
    generatePassword()
  }, [
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeAmbiguousChars,
  ])

  // Strength details
  const strengthDetails = {
    Weak: {
      color: 'text-red-500 bg-red-100',
      progress: 'w-1/4',
      description: 'Easily guessable. Add more character types.',
      icon: <AlertTriangle className='text-red-500' />,
    },
    Medium: {
      color: 'text-yellow-500 bg-yellow-100',
      progress: 'w-1/2',
      description: 'Moderate complexity. Can be improved.',
      icon: <Info className='text-yellow-500' />,
    },
    Strong: {
      color: 'text-green-500 bg-green-100',
      progress: 'w-3/4',
      description: 'Good password with solid complexity.',
      icon: <ShieldCheck className='text-green-500' />,
    },
    'Very Strong': {
      color: 'text-blue-600 bg-blue-100',
      progress: 'w-full',
      description: 'Exceptional password security.',
      icon: <Star className='text-blue-600' />,
    },
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='relative z-10 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md border border-purple-100/50'
      >
        {/* Main Password Generation Section */}
        <div className='space-y-6'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>
              SecurePass Pro
            </h1>
            <motion.button
              whileHover={{ rotate: 180 }}
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className='bg-purple-100 p-2 rounded-full'
            >
              <Settings className='text-purple-600' />
            </motion.button>
          </div>

          {/* Password Display */}
          <div className='relative group'>
            <input
              type={showPassword ? 'text' : 'password'}
              readOnly
              value={password}
              className='w-full p-3 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-lg text-lg font-mono tracking-wider text-gray-800'
            />
            <div className='absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className='text-purple-600 hover:text-purple-800 bg-purple-100 p-2 rounded-full'
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyToClipboard}
                className='text-purple-600 hover:text-purple-800 bg-purple-100 p-2 rounded-full'
              >
                {isCopied ? <CheckCircle2 /> : <Copy />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={savePassword}
                className='text-pink-600 hover:text-pink-800 bg-pink-100 p-2 rounded-full'
              >
                <Star />
              </motion.button>
            </div>
          </div>

          {/* Strength Indicator */}
          <div>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center space-x-2'>
                {strengthDetails[strength].icon}
                <span
                  className={`font-bold ${strengthDetails[strength].color}`}
                >
                  {strength} Password
                </span>
              </div>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <motion.div
                className={`${strengthDetails[strength].progress} ${strengthDetails[strength].color} h-2.5 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <p className='mt-2 text-xs text-gray-500 text-center'>
              {strengthDetails[strength].description}
            </p>
          </div>

          {/* Advanced Options (Expandable) */}
          {showAdvancedOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className='space-y-4'
            >
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  checked={excludeAmbiguousChars}
                  onChange={() =>
                    setExcludeAmbiguousChars(!excludeAmbiguousChars)
                  }
                  className='h-4 w-4 text-purple-600'
                />
                <label className='text-sm text-gray-700'>
                  Exclude Ambiguous Characters (I, l, 1, O, 0)
                </label>
              </div>
            </motion.div>
          )}

          {/* Password Generation Controls */}
          <div className='space-y-4'>
            {/* Length Slider */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password Length:
                <span className='ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>
                  {passwordLength}
                </span>
              </label>
              <input
                type='range'
                min={4}
                max={32}
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className='w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer'
              />
            </div>

            {/* Character Type Toggles */}
            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  label: 'Uppercase',
                  state: includeUppercase,
                  setter: setIncludeUppercase,
                  icon: () => <span className='text-lg font-bold'>AB</span>,
                },
                {
                  label: 'Lowercase',
                  state: includeLowercase,
                  setter: setIncludeLowercase,
                  icon: () => <span className='text-lg font-bold'>ab</span>,
                },
                {
                  label: 'Numbers',
                  state: includeNumbers,
                  setter: setIncludeNumbers,
                  icon: () => <span className='text-lg font-bold'>12</span>,
                },
                {
                  label: 'Symbols',
                  state: includeSymbols,
                  setter: setIncludeSymbols,
                  icon: () => <span className='text-lg font-bold'>!@</span>,
                },
              ].map(({ label, state, setter, icon: Icon }) => (
                <motion.label
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center justify-center p-3 rounded-xl cursor-pointer 
                    ${
                      state
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }
                    transition duration-300 ease-in-out
                  `}
                >
                  <input
                    type='checkbox'
                    checked={state}
                    onChange={() => setter(!state)}
                    className='hidden'
                  />
                  <div className='flex items-center space-x-2'>
                    <Icon />
                    <span className='text-sm font-medium'>{label}</span>
                  </div>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Password History and Saved Passwords */}
          <div className='space-y-4'>
            {passwordHistory.length > 0 && (
              <div>
                <h3 className='text-sm font-medium text-gray-700 mb-2 flex items-center'>
                  <Database className='mr-2 text-purple-600' size={16} />
                  Recent Passwords
                </h3>
                <div className='space-y-2'>
                  {passwordHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className='bg-purple-50 p-2 rounded-lg flex justify-between items-center'
                    >
                      <span className='font-mono text-sm truncate max-w-[200px]'>
                        {item.password}
                      </span>
                      <span
                        className={`text-xs ${
                          strengthDetails[item.strength].color
                        }`}
                      >
                        {item.strength}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ... previous code remains the same ... */}

            {savedPasswords.length > 0 && (
              <div>
                <h3 className='text-sm font-medium text-gray-700 mb-2 flex items-center'>
                  <Star className='mr-2 text-yellow-600' size={16} />
                  Saved Passwords
                </h3>
                <div className='space-y-2'>
                  {savedPasswords.map((savedPassword, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className='bg-pink-50 p-2 rounded-lg flex justify-between items-center'
                    >
                      <span className='font-mono text-sm truncate max-w-[200px]'>
                        {savedPassword}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          navigator.clipboard.writeText(savedPassword)
                          // Optional: Add a toast or notification
                        }}
                        className='text-purple-600 hover:text-purple-800 bg-purple-100 p-1 rounded-full'
                      >
                        <Copy size={16} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Regenerate Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generatePassword}
            className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2'
          >
            <RefreshCcw />
            <span>Generate New Password</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default PasswordGenerator
