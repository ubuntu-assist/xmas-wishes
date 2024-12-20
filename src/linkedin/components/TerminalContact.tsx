import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const ContactSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
})

type FormData = z.infer<typeof ContactSchema>

const Confetti: React.FC = () => {
  const confettiCount = 50
  const colors = ['#FF69B4', '#4B0082', '#9400D3', '#FFD700', '#00FF00']

  return (
    <div className='fixed inset-0 pointer-events-none'>
      {[...Array(confettiCount)].map((_, index) => {
        const randomX = Math.random() * 100
        const randomDelay = Math.random() * 0.5
        const randomDuration = 1 + Math.random() * 2
        const randomColor = colors[Math.floor(Math.random() * colors.length)]

        return (
          <motion.div
            key={index}
            initial={{
              x: `${randomX}vw`,
              y: -20,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              y: '100vh',
              scale: 1,
              rotate: 360,
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: [0.23, 0.83, 0.68, 0.99],
            }}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              backgroundColor: randomColor,
              borderRadius: Math.random() > 0.5 ? '50%' : '0px',
              zIndex: 50,
            }}
          />
        )
      })}
    </div>
  )
}

const TerminalContact: React.FC = () => {
  const [step, setStep] = useState<number>(0)
  const [showSummary, setShowSummary] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ContactSchema),
    mode: 'onChange',
  })

  const formValues = watch()

  const moveToNextStep = async () => {
    const fields = ['email', 'name', 'description'] as const
    const currentField = fields[step]

    const result = await trigger(currentField)

    if (result) {
      if (step < 2) {
        setStep((prevStep) => prevStep + 1)
      } else {
        setShowSummary(true)
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowConfetti(true)
    setSubmitted(true)

    // Remove confetti after 4 seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 4000)
  }

  const handleRestart = () => {
    reset()
    setStep(0)
    setShowSummary(false)
    setSubmitted(false)
  }

  const renderInput = () => {
    const inputs = [
      {
        label: 'To start, could you give us your email?',
        name: 'email',
        type: 'email',
        placeholder: 'Enter email:',
      },
      {
        label: "Awesome! And what's your name?",
        name: 'name',
        type: 'text',
        placeholder: 'Enter name:',
      },
      {
        label: 'Perfect, and how can we help you?',
        name: 'description',
        type: 'text',
        placeholder: 'Enter description:',
      },
    ]

    return inputs.map((input, index) => (
      <AnimatePresence key={input.name} mode='wait'>
        {step >= index && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='mb-4'
          >
            <p className='text-gray-300 mb-2'>{input.label}</p>
            {step === index ? (
              <div className='flex items-center'>
                <span className='text-green-400 mr-2'>→ ~</span>
                <Controller
                  name={input.name as keyof FormData}
                  control={control}
                  render={({ field }) => (
                    <div className='flex-1'>
                      <input
                        {...field}
                        type={input.type}
                        onKeyDown={(e) => e.key === 'Enter' && moveToNextStep()}
                        className='bg-transparent border-none outline-none flex-1 text-gray-100 placeholder-gray-500 w-full'
                        placeholder={input.placeholder}
                        autoFocus
                      />
                      {errors[input.name as keyof FormData] && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors[input.name as keyof FormData]?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            ) : (
              <div className='flex items-center'>
                <span className='text-green-400 mr-2'>✓</span>
                <span className='text-green-400'>
                  {formValues[input.name as keyof FormData]}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    ))
  }

  return (
    <div className='w-full h-full min-h-screen bg-gradient-to-br from-pink-400 to-purple-600 p-4 flex items-center justify-center'>
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl overflow-hidden'
      >
        {/* Terminal Header */}
        <div className='px-4 py-2 bg-gray-800 flex items-center'>
          <div className='flex space-x-2'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <div className='flex-1 text-center text-gray-400 text-sm'>
            contact@moock.io
          </div>
        </div>

        {/* Terminal Content */}
        <div className='p-6 text-gray-100'>
          {!showSummary ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className='mb-4'>
                  Hey there! We're excited to link
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className='ml-2 inline-block'
                  >
                    ⚡
                  </motion.span>
                </p>
              </motion.div>

              <div className='w-full border-t border-gray-700 my-4'></div>
              <div className='space-y-4'>{renderInput()}</div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='space-y-4'
            >
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className='text-gray-300'>
                    Beautiful! Here's what we've got:
                  </p>
                  <div className='space-y-2 text-gray-400'>
                    <p>
                      Email:{' '}
                      <span className='text-gray-200'>{formValues.email}</span>
                    </p>
                    <p>
                      Name:{' '}
                      <span className='text-gray-200'>{formValues.name}</span>
                    </p>
                    <p>
                      Description:{' '}
                      <span className='text-gray-200'>
                        {formValues.description}
                      </span>
                    </p>
                  </div>
                  <p className='text-gray-300 mt-4'>Look good?</p>
                  <div className='flex space-x-4 mt-4'>
                    <button
                      type='button'
                      onClick={handleRestart}
                      className='px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors'
                      disabled={isSubmitting}
                    >
                      Restart
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors flex items-center space-x-2'
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className='animate-spin -ml-1 mr-2 h-4 w-4' />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send it!</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-center'
                >
                  <p className='text-3xl mb-4'>🎉</p>
                  <p className='text-xl text-green-400 mb-4'>
                    Message sent successfully!
                  </p>
                  <p className='text-gray-300 mb-6'>
                    We'll get back to you soon.
                  </p>
                  <button
                    onClick={handleRestart}
                    className='px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors'
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default TerminalContact
