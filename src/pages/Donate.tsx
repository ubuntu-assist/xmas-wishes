import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  ChevronDown,
  ChevronUp,
  MapPin,
  GiftIcon,
  User,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Validation schema using Zod
const donationSchema = z.object({
  // Personal Information
  name: z.string().min(2, 'Name must be at least 2 characters'),
  telephone: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),

  // Pickup Details
  donationDate: z.string().refine((date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    return selectedDate >= today
  }, 'Please select a future date'),
  preferredTime: z.enum(
    ['Morning (9AM - 12PM)', 'Afternoon (12PM - 4PM)', 'Evening (4PM - 7PM)'],
    {
      errorMap: () => ({ message: 'Please select a preferred time' }),
    }
  ),
  address: z.object({
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

  // Donation Details
  itemDescription: z
    .string()
    .min(20, 'Please provide a detailed description of at least 20 characters'),
  condition: z.enum(
    ['Like New', 'Gently Used', 'Good', 'Fair', 'Needs Minor Repair'],
    {
      errorMap: () => ({
        message: 'Please select the condition of your items',
      }),
    }
  ),
  handlingInstructions: z.string().optional(),
  additionalNotes: z.string().optional(),

  // Terms acceptance
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

type DonationFormData = z.infer<typeof donationSchema>

const DonatePage = () => {
  const [showTerms, setShowTerms] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      // Personal Information
      name: '',
      telephone: '',
      email: '',

      // Pickup Details
      donationDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Morning (9AM - 12PM)',
      address: {
        street: '',
        city: '',
        province: '',
        postalCode: '',
      },

      // Donation Details
      itemDescription: '',
      condition: 'Like New',
      handlingInstructions: '',
      additionalNotes: '',

      // Terms
      acceptedTerms: false,
    },
  })

  const acceptedTerms = watch('acceptedTerms')

  const onSubmit = async (data: DonationFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Form submitted:', data)
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error (e.g., show error message)
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const terms = [
    {
      title: 'Acceptance of Donations',
      content:
        'NND SERVICES reserves the right to accept or decline any donated items based on their condition, suitability, and the needs of the recipients. Items must be in gently used or good condition, free from significant damage, stains, or excessive wear.',
    },
    {
      title: 'Pick-up Fees',
      content:
        'Donors are required to cover the cost of pick-up services. The fee for pick-up will be communicated in advance based on the location, size, and quantity of the items.',
    },
    {
      title: 'Scheduling and Cancellations',
      content:
        'Pick-up appointments must be scheduled in advance and are subject to availability. Donors must notify NND SERVICES at least 24 hours in advance for cancellations.',
    },
    {
      title: 'Condition of Items',
      content:
        'Donors are required to provide accurate descriptions and, if possible, photos of the items they wish to donate. Items that are heavily damaged, broken, or in need of significant repair may not be accepted.',
    },
    {
      title: 'Privacy and Data Protection',
      content:
        'NND SERVICES respects the privacy of all donors and will not share personal information with third parties without consent, except as necessary to facilitate the donation process.',
    },
  ]

  const ErrorMessage = ({ message }: { message: string | undefined }) => {
    return message ? (
      <span className='text-red-500 text-sm mt-1'>{message}</span>
    ) : null
  }

  return (
    <div className='bg-[#FFFFFF]'>
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
              <Heart className='w-12 h-12 sm:w-16 sm:h-16 text-[#203F6C]' />
            </motion.div>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8'>
              Make a Difference
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

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative'>
        <div className='absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none' />

        <motion.form
          {...fadeIn}
          className='space-y-12 relative'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Personal Information */}
          <div className='space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-[#203F6C] flex items-center justify-center'>
                <User className='w-6 h-6 text-[#F4B714]' />
              </div>
              <h2 className='text-3xl font-bold text-[#203F6C]'>
                Personal Information
              </h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Name
                </label>
                <input
                  {...register('name')}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B714] focus:border-[#F4B714] transition-all duration-200'
                />
                <ErrorMessage message={errors.name?.message} />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Telephone
                </label>
                <input
                  {...register('telephone')}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B714] focus:border-[#F4B714] transition-all duration-200'
                />
                <ErrorMessage message={errors.telephone?.message} />
              </div>
              <div className='sm:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email
                </label>
                <input
                  {...register('email')}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B714] focus:border-[#F4B714] transition-all duration-200'
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
            </div>
          </div>

          {/* Pickup Details */}
          <div className='space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-[#203F6C] flex items-center justify-center'>
                <MapPin className='w-6 h-6 text-[#F4B714]' />
              </div>
              <h2 className='text-3xl font-bold text-[#203F6C]'>
                Pickup Details
              </h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Donation Date
                </label>
                <input
                  type='date'
                  {...register('donationDate')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
                <ErrorMessage message={errors.donationDate?.message} />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Preferred Time
                </label>
                <select
                  {...register('preferredTime')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Select a time</option>
                  <option>Morning (9AM - 12PM)</option>
                  <option>Afternoon (12PM - 4PM)</option>
                  <option>Evening (4PM - 7PM)</option>
                </select>
                <ErrorMessage message={errors.preferredTime?.message} />
              </div>
            </div>

            <div className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Pickup Address
              </label>
              <input
                {...register('address.street')}
                placeholder='Street Address'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
              <ErrorMessage message={errors.address?.street?.message} />

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div>
                  <input
                    {...register('address.city')}
                    placeholder='City'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                  <ErrorMessage message={errors.address?.city?.message} />
                </div>
                <div>
                  <input
                    {...register('address.province')}
                    placeholder='Province'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                  <ErrorMessage message={errors.address?.province?.message} />
                </div>
                <div>
                  <input
                    {...register('address.postalCode')}
                    placeholder='Postal Code'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                  <ErrorMessage message={errors.address?.postalCode?.message} />
                </div>
              </div>
            </div>
          </div>

          {/* Donation Details */}
          <div className='space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-[#203F6C] flex items-center justify-center'>
                <GiftIcon className='w-6 h-6 text-[#F4B714]' />
              </div>
              <h2 className='text-3xl font-bold text-[#203F6C]'>
                Donation Details
              </h2>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Item Description
                </label>
                <textarea
                  {...register('itemDescription')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32'
                  placeholder='Please provide a detailed description of each item (type, size, material, color)'
                />
                <ErrorMessage message={errors.itemDescription?.message} />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Condition
                </label>
                <select
                  {...register('condition')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Select condition</option>
                  <option>Like New</option>
                  <option>Gently Used</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Needs Minor Repair</option>
                </select>
                <ErrorMessage message={errors.condition?.message} />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Handling Instructions
                </label>
                <textarea
                  {...register('handlingInstructions')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24'
                  placeholder='Any special care needed when handling the items'
                />
                <ErrorMessage message={errors.handlingInstructions?.message} />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Additional Notes
                </label>
                <textarea
                  {...register('additionalNotes')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24'
                  placeholder='Any other relevant information or specific requests'
                />
                <ErrorMessage message={errors.additionalNotes?.message} />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className='space-y-4'>
            <button
              type='button'
              onClick={() => setShowTerms(!showTerms)}
              className='flex items-center justify-between w-full px-6 py-4 bg-[#203F6C]/5 rounded-xl hover:bg-[#203F6C]/10 transition-colors'
            >
              <span className='font-semibold text-[#203F6C]'>
                Terms and Conditions
              </span>
              {showTerms ? (
                <ChevronUp className='w-5 h-5 text-[#203F6C]' />
              ) : (
                <ChevronDown className='w-5 h-5 text-[#203F6C]' />
              )}
            </button>

            {showTerms && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='bg-white p-6 rounded-xl border border-gray-200 space-y-6'
              >
                {terms.map((term, index) => (
                  <div key={index} className='space-y-2'>
                    <h3 className='font-semibold text-[#203F6C]'>
                      {term.title}
                    </h3>
                    <p className='text-gray-600'>{term.content}</p>
                  </div>
                ))}
              </motion.div>
            )}

            <div className='flex items-center space-x-3'>
              <input
                type='checkbox'
                id='accept-terms'
                {...register('acceptedTerms')}
                className='w-5 h-5 text-[#F4B714] border-gray-300 rounded focus:ring-[#F4B714]'
              />
              <label htmlFor='accept-terms' className='text-gray-700'>
                I have read and accept the terms and conditions
              </label>
            </div>
            <ErrorMessage message={errors.acceptedTerms?.message} />
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <button
              type='submit'
              disabled={!acceptedTerms || isSubmitting}
              className={`w-full px-8 py-4 text-xl font-semibold rounded-xl shadow-lg transition-all duration-200 relative ${
                acceptedTerms && !isSubmitting
                  ? 'bg-[#F4B714] hover:bg-[#F4B714]/90 text-[#203F6C]'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className='opacity-0'>Submit Donation Request</span>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-6 h-6 border-2 border-[#203F6C] border-t-transparent rounded-full animate-spin'></div>
                  </div>
                </>
              ) : (
                'Submit Donation Request'
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}

export default DonatePage
