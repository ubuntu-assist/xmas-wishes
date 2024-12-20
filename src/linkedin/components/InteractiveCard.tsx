import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, User, Calendar, Lock } from 'lucide-react'

import TransactionModal from 'react-modal'
import ProcessingLoader from '@/components/ProcessingLoader'
import ConfettiCelebration from '@/components/ConfettiCelebration'

TransactionModal.setAppElement('#root')

// Processing Loader
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0a0b0d',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}

// Validation utilities (unchanged from previous version)
const validateCardNumber = (number: string) => {
  const cleanedNumber = number.replace(/\s/g, '')
  return /^\d{16}$/.test(cleanedNumber)
}

const validateName = (name: string) => name.trim().length > 0

const validateExpiry = (expiry: string) => {
  const [month, year] = expiry.split('/')
  return (
    month &&
    year &&
    /^\d{2}$/.test(month) &&
    /^\d{2}$/.test(year) &&
    parseInt(month) > 0 &&
    parseInt(month) <= 12
  )
}

const validateCVC = (cvc: string) => /^\d{3,4}$/.test(cvc)

// Card Front Component
const CardFront = ({
  cardNumber = '0000 0000 0000 0000',
  name = 'Demo Name',
  expiry = '00/00',
}) => (
  <motion.div
    initial={{ rotateY: 180 }}
    animate={{ rotateY: 0 }}
    transition={{ duration: 0.6 }}
    className='bg-gradient-to-br from-purple-600 to-blue-500 text-white 
      p-4 sm:p-6 rounded-xl 
      w-[300px] sm:w-[400px] md:w-[450px] 
      h-[180px] sm:h-[220px] md:h-[250px] 
      flex flex-col justify-between shadow-2xl'
  >
    <div className='flex justify-between items-center'>
      <div className='w-12 sm:w-16 h-8 sm:h-12 bg-white/30 rounded-md'></div>
      <CreditCard size={32} className='text-white/80' />
    </div>

    <div>
      <div className='tracking-widest text-xl sm:text-2xl mb-2 sm:mb-4'>
        {cardNumber}
      </div>

      <div className='flex justify-between uppercase text-xs sm:text-sm'>
        <span>{name}</span>
        <span>{expiry}</span>
      </div>
    </div>
  </motion.div>
)

// Card Back Component
const CardBack = ({ cvc = '000' }) => (
  <motion.div
    initial={{ rotateY: -180 }}
    animate={{ rotateY: 0 }}
    transition={{ duration: 0.6 }}
    className='bg-gradient-to-br from-blue-500 to-purple-600 text-white 
      w-[300px] sm:w-[400px] md:w-[450px] 
      h-[180px] sm:h-[220px] md:h-[250px] 
      rounded-xl flex flex-col justify-center relative shadow-2xl'
  >
    <div className='h-8 sm:h-12 bg-black/80 w-full my-4 sm:my-8'></div>

    <div className='bg-white/20 mx-4 sm:mx-8 p-1 sm:p-2 rounded flex justify-end'>
      <span className='text-white text-base sm:text-lg tracking-wider'>
        {cvc}
      </span>
    </div>
  </motion.div>
)

// Main Interactive Card Form
const InteractiveCardForm: React.FC = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvc: '',
  })

  const [isPaying, setIsPaying] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [errors, setErrors] = useState({
    cardNumber: false,
    name: false,
    expiry: false,
    cvc: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Special formatting for card number and expiry
    let formattedValue = value
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19)
    }

    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{2})/, '$1/$2')
        .slice(0, 5)
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))
  }

  const validateForm = () => {
    const newErrors = {
      cardNumber: !validateCardNumber(cardDetails.cardNumber),
      name: !validateName(cardDetails.name),
      expiry: !validateExpiry(cardDetails.expiry),
      cvc: !validateCVC(cardDetails.cvc),
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsPaying(true)
      setTimeout(() => {
        setIsPaying(false)
        setIsSuccess(true)
        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      }, 10000)
    }
  }

  return (
    <>
      <div
        className='min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 
      flex flex-col lg:flex-row 
      justify-center items-center 
      p-4 sm:p-8 
      gap-6 sm:gap-8 lg:gap-12'
      >
        <div
          className='flex flex-col gap-4 sm:gap-6 
        items-center lg:items-end 
        order-2 lg:order-1 
        w-full lg:w-auto'
        >
          <div className='block lg:hidden mb-4 text-center'>
            <h1 className='text-2xl font-bold text-purple-800 mb-2'>
              Interactive Card Form
            </h1>
            <p className='text-gray-600'>Enter your card details below</p>
          </div>
          <div className='relative flex flex-col-reverse sm:flex-col gap-4'>
            <CardBack cvc={cardDetails.cvc || '000'} />
            <CardFront
              cardNumber={cardDetails.cardNumber || '0000 0000 0000 0000'}
              name={cardDetails.name || 'Demo Name'}
              expiry={cardDetails.expiry || '00/00'}
            />
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white p-6 sm:p-8 rounded-xl shadow-xl 
          w-full max-w-md 
          order-1 lg:order-2'
        >
          <div className='hidden lg:block mb-6 text-center'>
            <h1 className='text-3xl font-bold text-purple-800 mb-2'>
              Interactive Card Form
            </h1>
            <p className='text-gray-600'>Enter your card details below</p>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Cardholder Name</label>
            <div className='relative'>
              <User className='absolute left-3 top-3 text-gray-400' />
              <input
                type='text'
                name='name'
                value={cardDetails.name}
                onChange={handleInputChange}
                placeholder='e.g. Demo Name'
                className={`w-full pl-10 p-3 border rounded ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <span className='text-red-500 text-sm'>Can't be blank</span>
              )}
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Card Number</label>
            <div className='relative'>
              <CreditCard className='absolute left-3 top-3 text-gray-400' />
              <input
                type='text'
                name='cardNumber'
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder='e.g. 1234 5678 9123 0000'
                maxLength={19}
                className={`w-full pl-10 p-3 border rounded ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardNumber && (
                <span className='text-red-500 text-sm'>Wrong format</span>
              )}
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='flex-1'>
              <label className='block text-gray-700 mb-2'>Expiry Date</label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='text'
                  name='expiry'
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  placeholder='MM/YY'
                  maxLength={5}
                  className={`w-full pl-10 p-3 border rounded ${
                    errors.expiry ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expiry && (
                  <span className='text-red-500 text-sm'>Invalid date</span>
                )}
              </div>
            </div>

            <div className='flex-1'>
              <label className='block text-gray-700 mb-2'>CVC</label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='text'
                  name='cvc'
                  value={cardDetails.cvc}
                  onChange={handleInputChange}
                  placeholder='e.g. 123'
                  maxLength={4}
                  className={`w-full pl-10 p-3 border rounded ${
                    errors.cvc ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cvc && (
                  <span className='text-red-500 text-sm'>Invalid CVC</span>
                )}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            className='w-full mt-6 bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-colors'
          >
            Confirm
          </motion.button>
        </motion.form>
      </div>
      <TransactionModal isOpen={isPaying} style={customStyles}>
        <ProcessingLoader />
      </TransactionModal>
      {isSuccess && <ConfettiCelebration />}
    </>
  )
}

export default InteractiveCardForm
