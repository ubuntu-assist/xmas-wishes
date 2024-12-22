import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Contact,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Community from '@/components/Community'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { PhoneInput } from '@/components/PhoneInput'
import SEO from '@/lib/seo'
import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'

const contactFormSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine((value) => value && isValidPhoneNumber(value), {
      message: 'Invalid phone number',
    }),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactInfo {
  icon: React.ElementType
  title: string
  details: string | string[]
}

const fireConfetti = () => {
  // Fire multiple confetti bursts for a more spectacular effect
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1000,
  }

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  // Launch confetti in multiple bursts with different colors and angles
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#203F6C', '#F4B714'], // Using your brand colors
  })

  fire(0.2, {
    spread: 60,
    colors: ['#203F6C', '#F4B714'],
  })

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#203F6C', '#F4B714'],
  })

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#203F6C', '#F4B714'],
  })

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#203F6C', '#F4B714'],
  })
}

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = React.useState<boolean>(false)
  // const [submitError, setSubmitError] = React.useState<string>('')

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // setSubmitError('')

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        subject: data.subject,
        message: data.message,
        to_name: 'NND Services',
        reply_to: data.email,
      }

      await emailjs.send(
        'service_z7gd4ts',
        'template_s16jagq',
        templateParams,
        '4s4GLJPhNfpF4AGml'
      )

      setSubmitSuccess(true)
      fireConfetti()
      reset()

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      // setSubmitError('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  React.useEffect(() => {
    emailjs.init('4s4GLJPhNfpF4AGml')
  }, [])

  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 368 889 5240',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@nndservices.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['24 Abberfield Crescent NE', 'Calgary Alberta', 'T2A6N6'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
      ],
    },
  ]

  return (
    <>
      <SEO
        title='Contact NND Services | Get Moving & Delivery Service Quotes'
        description='Contact NND Services for professional moving, delivery, and donation services in Calgary. Get quick quotes, schedule pickups, or learn about our community initiatives. Available 7 days a week.'
        url='https://www.nndservices.com/contact'
        image='https://www.nndservices.com/images/contact-og-image.jpg'
        keywords='contact movers, moving quotes, delivery service contact, donation pickup, Calgary movers, schedule moving service, professional moving company contact'
      />
      <div className='min-h-screen bg-gradient-to-b from-[#203F6C]/5 via-white to-[#203F6C]/5'>
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
                <Contact className='w-12 h-12 sm:w-16 sm:h-16 text-[#203F6C]' />
              </motion.div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8'>
                Contact Us
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
                Connecting for a greater impact—let’s create positive change
                together.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className='overflow-hidden backdrop-blur-sm bg-white/80'>
                <div className='p-6 sm:p-10'>
                  <h2 className='text-2xl font-semibold mb-6 text-[#203F6C]'>
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='grid sm:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label
                          htmlFor='name'
                          className='text-sm font-medium text-[#203F6C]'
                        >
                          Name
                        </label>
                        <Input
                          {...register('name')}
                          placeholder='Your name'
                          id='name'
                          className={`transition-all duration-300 focus:ring-2 focus:ring-[#203F6C] ${
                            errors.name ? 'border-[#D7262F]' : ''
                          }`}
                        />
                        {errors.name && (
                          <p className='text-sm text-[#D7262F]'>
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <label
                          htmlFor='email'
                          className='text-sm font-medium text-[#203F6C]'
                        >
                          Email
                        </label>
                        <Input
                          type='email'
                          id='email'
                          {...register('email')}
                          placeholder='your@email.com'
                          className={`transition-all duration-300 focus:ring-2 focus:ring-[#203F6C] ${
                            errors.email ? 'border-[#D7262F]' : ''
                          }`}
                        />
                        {errors.email && (
                          <p className='text-sm text-[#D7262F]'>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label
                        htmlFor='phone'
                        className='text-sm font-medium text-[#203F6C]'
                      >
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
                            className='w-full border rounded-lg'
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className='text-sm text-[#D7262F]'>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-[#203F6C]'>
                        Subject
                      </label>
                      <Input
                        {...register('subject')}
                        placeholder='How can we help?'
                        className={`transition-all duration-300 focus:ring-2 focus:ring-[#203F6C] ${
                          errors.subject ? 'border-[#D7262F]' : ''
                        }`}
                      />
                      {errors.subject && (
                        <p className='text-sm text-[#D7262F]'>
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <label
                        htmlFor='message'
                        className='text-sm font-medium text-[#203F6C]'
                      >
                        Message
                      </label>
                      <Textarea
                        id='message'
                        {...register('message')}
                        placeholder='Your message'
                        className={`h-32 resize-none transition-all duration-300 focus:ring-2 focus:ring-[#203F6C] ${
                          errors.message ? 'border-[#D7262F]' : ''
                        }`}
                      />
                      {errors.message && (
                        <p className='text-sm text-[#D7262F]'>
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                    <AnimatePresence>
                      {submitSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <Alert className='bg-green-50 border-green-200'>
                            <CheckCircle className='w-4 h-4 text-green-500' />
                            <AlertDescription className='text-green-700'>
                              Message sent successfully! We'll get back to you
                              soon.
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Button
                      type='submit'
                      className='w-full bg-[#203F6C] hover:bg-[#203F6C]/90 text-white transition-all duration-300'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                        />
                      ) : (
                        <>
                          <Send className='w-4 h-4 mr-2' />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='space-y-8'
            >
              <Card className='overflow-hidden backdrop-blur-sm bg-white/80'>
                <div className='p-6 sm:p-10'>
                  <h2 className='text-2xl font-semibold mb-8 text-[#203F6C]'>
                    Contact Information
                  </h2>
                  <div className='space-y-8'>
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className='flex items-start space-x-4'
                      >
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#203F6C] to-[#F4B714] p-0.5 flex-shrink-0'>
                          <div className='w-full h-full rounded-xl bg-white flex items-center justify-center'>
                            <info.icon className='w-6 h-6 text-[#203F6C]' />
                          </div>
                        </div>
                        <div>
                          <h3 className='font-medium text-[#203F6C]'>
                            {info.title}
                          </h3>
                          {Array.isArray(info.details) ? (
                            info.details.map((detail, idx) => (
                              <p key={idx} className='text-gray-600'>
                                {detail}
                              </p>
                            ))
                          ) : (
                            <p className='text-gray-600'>{info.details}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
          <div className='mt-24'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-3xl font-semibold text-center mb-8 text-[#203F6C]'>
                Where to find us
              </h2>
              <Card className='overflow-hidden backdrop-blur-sm bg-white/80'>
                <div className='p-6 sm:p-10'>
                  <div className='w-full h-96 bg-gray-100 rounded-lg relative overflow-hidden'>
                    <div className='absolute inset-0 bg-gray-200 animate-pulse'>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <MapPin className='w-12 h-12 text-[#203F6C]' />
                      </div>
                    </div>
                    <div className='absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg'>
                      <h3 className='font-medium text-[#203F6C]'>
                        NND Services
                      </h3>
                      <p className='text-gray-600 text-sm'>
                        24 Abberfield Crescent NE
                      </p>
                      <p className='text-gray-600 text-sm'>
                        Calgary Alberta, T2A6N6
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Community Section Title */}
          <div className='mt-24'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-3xl font-semibold text-center mb-8 text-[#203F6C]'>
                Connect with us
              </h2>
            </motion.div>
            <Community />
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage
