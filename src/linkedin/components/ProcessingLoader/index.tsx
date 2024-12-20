import { useState, useEffect } from 'react'
import { HashLoader, BarLoader } from 'react-spinners'

const PaymentProcessor = () => {
  const [processingStep, setProcessingStep] = useState(0)
  const successColor = '#10B981' // Tailwind emerald-500

  const steps = [
    'Processing payment',
    'Verifying transaction',
    'Confirming details',
    'Almost done',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center w-72 h-64 bg-gradient-to-b from-emerald-50 to-white rounded-lg shadow-lg p-8'>
      {/* Main spinner */}
      <div className='mb-6'>
        <HashLoader color={successColor} size={50} speedMultiplier={0.9} />
      </div>

      {/* Processing step text */}
      <div className='text-lg font-semibold text-gray-700 mb-4 h-7 text-center'>
        {steps[processingStep]}...
      </div>

      {/* Secure transaction badge */}
      <div className='flex items-center gap-2 mb-4 text-sm text-gray-600'>
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
          />
        </svg>
        <span>Secure transaction</span>
      </div>

      {/* Progress bar */}
      <div className='w-full'>
        <BarLoader color={successColor} width='100%' speedMultiplier={0.8} />
      </div>
    </div>
  )
}

export default PaymentProcessor
