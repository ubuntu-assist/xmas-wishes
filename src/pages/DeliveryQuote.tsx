import { useState } from 'react'
import { motion } from 'framer-motion'
import { Truck, MapPin, Package, Clock } from 'lucide-react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { PhoneInput } from '@/components/PhoneInput'

import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'

interface Address {
  street: string
  city: string
  province: string
  postalCode: string
}

interface QuoteData {
  name: string
  phone: string
  email: string
  deliveryDate: string
  deliveryTime: string
  pickupAddress: Address
  pickupAccessibility: 'Basement' | 'Main floor' | 'Upstairs'
  deliveryAddress: Address
  deliveryAccessibility: 'Basement' | 'Main floor' | 'Upstairs'
  itemDescription: string
  specialInstructions?: string
}

const SuccessDialog = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className='bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-2xl font-bold text-center text-blue-900'>
            Quote Request Submitted!
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center text-gray-600'>
            Thank you for your request. Our team will review your details and
            get back to you shortly.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const fireConfetti = () => {
  // First burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#203F6C', '#F4B714', '#D7262F'],
  })

  // Cannon left
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#203F6C', '#F4B714'],
    })
  }, 200)

  // Cannon right
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#F4B714', '#D7262F'],
    })
  }, 200)

  // Final burst
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#203F6C', '#F4B714', '#D7262F'],
      ticks: 200,
    })
  }, 500)
}

// Define the schema with proper typing
const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine((value) => value && isValidPhoneNumber(value), {
      message: 'Invalid phone number',
    }),
  email: z.string().email('Please enter a valid email address'),
  deliveryDate: z.string().refine((date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    return selectedDate >= today
  }, 'Please select a future date'),
  deliveryTime: z.string().min(1, 'Please select a delivery time'),
  pickupAddress: z.object({
    street: z.string().min(5, 'Please enter a valid street address'),
    city: z.string().min(2, 'Please enter a valid city'),
    province: z.string().min(2, 'Please enter a valid province'),
    postalCode: z
      .string()
      .regex(
        /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
        'Please enter a valid postal code'
      ),
  }),
  pickupAccessibility: z.enum(['Basement', 'Main floor', 'Upstairs']),
  deliveryAddress: z.object({
    street: z.string().min(5, 'Please enter a valid street address'),
    city: z.string().min(2, 'Please enter a valid city'),
    province: z.string().min(2, 'Please enter a valid province'),
    postalCode: z
      .string()
      .regex(
        /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
        'Please enter a valid postal code'
      ),
  }),
  deliveryAccessibility: z.enum(['Basement', 'Main floor', 'Upstairs']),
  itemDescription: z
    .string()
    .min(20, 'Please provide details about size, weight, and type of items'),
  specialInstructions: z.string().optional(),
})

// Infer the type from the schema
type QuoteFormData = z.infer<typeof quoteSchema>

// Define types for component props
interface ErrorMessageProps {
  message: string | undefined
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) =>
  message ? <span className='text-red-500 text-sm mt-1'>{message}</span> : null

// Define accessibility options type
type AccessibilityOption = 'Basement' | 'Main floor' | 'Upstairs'
const accessibilityOptions: AccessibilityOption[] = [
  'Basement',
  'Main floor',
  'Upstairs',
]

const DeliveryQuotePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const formatEmailContent = (data: QuoteData) => {
    return `
      🚚 New Delivery Quote Request

      📋 Contact Information
      ---------------------
      Name: ${data.name}
      Phone: ${data.phone}
      Email: ${data.email}

      📅 Schedule
      ---------------------
      Delivery Date: ${data.deliveryDate}
      Delivery Time: ${data.deliveryTime}

      📍 Pickup Address
      ---------------------
      Street: ${data.pickupAddress.street}
      City: ${data.pickupAddress.city}
      Province: ${data.pickupAddress.province}
      Postal Code: ${data.pickupAddress.postalCode}
      Accessibility: ${data.pickupAccessibility}

      🏠 Delivery Address
      ---------------------
      Street: ${data.deliveryAddress.street}
      City: ${data.deliveryAddress.city}
      Province: ${data.deliveryAddress.province}
      Postal Code: ${data.deliveryAddress.postalCode}
      Accessibility: ${data.deliveryAccessibility}

      📦 Item Details
      ---------------------
      ${data.itemDescription}

      📝 Special Instructions
      ---------------------
      ${data.specialInstructions ?? 'None provided'}
    `
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      deliveryDate: '',
      deliveryTime: '',
      pickupAddress: {
        street: '',
        city: '',
        province: '',
        postalCode: '',
      },
      pickupAccessibility: 'Main floor',
      deliveryAddress: {
        street: '',
        city: '',
        province: '',
        postalCode: '',
      },
      deliveryAccessibility: 'Main floor',
      itemDescription: '',
      specialInstructions: '',
    },
  })

  const onSubmit = async (data: QuoteData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const emailContent = formatEmailContent(data)

      // Replace these with your actual EmailJS credentials
      await emailjs.send(
        'service_z7gd4ts',
        'template_j9fth11',
        {
          title: 'Quote Request Message',
          to_name: 'NND Services',
          from_name: data.name,
          from_email: data.email,
          subject: `New Quote Request from ${data.name}`,
          message: emailContent,
          reply_to: data.email,
        },
        '4s4GLJPhNfpF4AGml'
      )

      setShowSuccess(true)
      fireConfetti()

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      setError('Failed to send quote request. Please try again.')
      console.error('EmailJS Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-white min-h-screen'>
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
              <Truck className='w-12 h-12 sm:w-16 sm:h-16 text-[#203F6C]' />
            </motion.div>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8'>
              Get a Quick Quote
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

      {error && (
        <Alert variant='destructive' className='mb-6'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <SuccessDialog isOpen={showSuccess} />

      <div className='max-w-4xl mx-auto px-4 py-16'>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-8'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Personal Information */}
          <div className='bg-white p-6 rounded-lg shadow-lg space-y-6'>
            <div className='flex items-center space-x-4 mb-6'>
              <div className='w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center'>
                <Clock className='w-6 h-6 text-yellow-400' />
              </div>
              <h2 className='text-2xl font-bold text-blue-900'>
                Contact Details
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  {...register('name')}
                  className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                />
                <ErrorMessage message={errors.name?.message} />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone
                </label>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      id='phone'
                      placeholder='Enter a phone number'
                      className='w-full border rounded-lg py-0.5'
                    />
                  )}
                />
                <ErrorMessage message={errors.phone?.message} />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  {...register('email')}
                  type='email'
                  className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
            </div>
          </div>

          {/* Pickup Details */}
          <div className='bg-white p-6 rounded-lg shadow-lg space-y-6'>
            <div className='flex items-center space-x-4 mb-6'>
              <div className='w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center'>
                <MapPin className='w-6 h-6 text-yellow-400' />
              </div>
              <h2 className='text-2xl font-bold text-blue-900'>
                Pickup Details
              </h2>
            </div>

            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Delivery Date
                  </label>
                  <input
                    {...register('deliveryDate')}
                    type='date'
                    className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  />
                  <ErrorMessage message={errors.deliveryDate?.message} />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Delivery Time
                  </label>
                  <select
                    {...register('deliveryTime')}
                    className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>Select time</option>
                    <option>Morning (9AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 7PM)</option>
                  </select>
                  <ErrorMessage message={errors.deliveryTime?.message} />
                </div>
              </div>

              <div className='space-y-4'>
                <input
                  {...register('pickupAddress.street')}
                  placeholder='Street Address'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                />
                <ErrorMessage message={errors.pickupAddress?.street?.message} />

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <input
                    {...register('pickupAddress.city')}
                    placeholder='City'
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    {...register('pickupAddress.province')}
                    placeholder='Province'
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    {...register('pickupAddress.postalCode')}
                    placeholder='Postal Code'
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Accessibility
                  </label>
                  <div className='flex space-x-4'>
                    {accessibilityOptions.map((option) => (
                      <label
                        key={option}
                        className='flex items-center space-x-2'
                      >
                        <input
                          type='radio'
                          {...register('pickupAccessibility')}
                          value={option}
                          className='text-blue-600'
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage message={errors.pickupAccessibility?.message} />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className='bg-white p-6 rounded-lg shadow-lg space-y-6'>
            <div className='flex items-center space-x-4 mb-6'>
              <div className='w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center'>
                <Package className='w-6 h-6 text-yellow-400' />
              </div>
              <h2 className='text-2xl font-bold text-blue-900'>
                Delivery Details
              </h2>
            </div>

            <div className='space-y-4'>
              <input
                {...register('deliveryAddress.street')}
                placeholder='Street Address'
                className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
              />
              <ErrorMessage message={errors.deliveryAddress?.street?.message} />

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <input
                  {...register('deliveryAddress.city')}
                  placeholder='City'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                />
                <input
                  {...register('deliveryAddress.province')}
                  placeholder='Province'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                />
                <input
                  {...register('deliveryAddress.postalCode')}
                  placeholder='Postal Code'
                  className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Accessibility
                </label>
                <div className='flex space-x-4'>
                  {accessibilityOptions.map((option) => (
                    <label key={option} className='flex items-center space-x-2'>
                      <input
                        type='radio'
                        {...register('deliveryAccessibility')}
                        value={option}
                        className='text-blue-600'
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage message={errors.deliveryAccessibility?.message} />
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className='bg-white p-6 rounded-lg shadow-lg space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Item Description
              </label>
              <textarea
                {...register('itemDescription')}
                className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32'
                placeholder='Please provide details about size, weight, and type of items'
              />
              <ErrorMessage message={errors.itemDescription?.message} />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Special Instructions
              </label>
              <textarea
                {...register('specialInstructions')}
                className='mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32'
                placeholder='Any specific requirements or handling instructions'
              />
              <ErrorMessage message={errors.specialInstructions?.message} />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-yellow-400 text-blue-900 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-300 disabled:text-gray-500'
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSubmitting ? (
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-6 h-6 border-4 border-blue-900 border-t-transparent rounded-full animate-spin' />
                <span>Processing...</span>
              </div>
            ) : (
              'Get Quote'
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

export default DeliveryQuotePage
