import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const DeleteConfirmation: React.FC = () => {
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const yesButtonRef = useRef<HTMLButtonElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const trashHeadRef = useRef<SVGSVGElement>(null)
  const trashRef = useRef<HTMLDivElement>(null)

  const primaryDuration = 0.3

  useEffect(() => {
    const deleteBtn = deleteButtonRef.current
    const yesBtn = yesButtonRef.current
    const noBtn = noButtonRef.current
    const container = containerRef.current
    const top = topRef.current
    const trashHead = trashHeadRef.current
    const trash = trashRef.current

    if (
      !deleteBtn ||
      !yesBtn ||
      !noBtn ||
      !container ||
      !top ||
      !trashHead ||
      !trash
    )
      return

    const animationYes = gsap.to(trashHead, {
      duration: primaryDuration,
      rotate: -100,
      paused: true,
    })

    const handleYesMouseOver = () => animationYes.play()
    const handleYesMouseOut = () => animationYes.reverse()

    const handleYesClick = () => {
      gsap.to(top, { rotate: -40, transformOrigin: 'right' })
      gsap.to(deleteBtn, {
        y: -80,
        onComplete: () => {
          gsap.to(trashHead, {
            rotate: 0,
            onComplete: () => {
              gsap.to(container, { duration: primaryDuration, opacity: 0 })
              gsap.to('.bottom span, .yes button, .no button', {
                duration: primaryDuration,
                y: 30,
              })
              gsap.to(top, {
                duration: primaryDuration,
                opacity: 0,
                rotate: 0,
              })
              gsap.to(trash, {
                duration: primaryDuration,
                scale: 0.8,
                opacity: 0,
              })
              gsap.to('.delete-span', {
                duration: primaryDuration,
                opacity: 1,
              })
              gsap.to(deleteBtn, {
                duration: primaryDuration,
                scale: 1,
                width: '150px',
                height: '50px',
                borderRadius: '8px',
              })
              deleteBtn.disabled = false
            },
          })
        },
      })
    }

    const handleDeleteClick = () => {
      deleteBtn.disabled = true
      gsap.to(deleteBtn, {
        duration: primaryDuration,
        scale: 1.2,
        onComplete: () => {
          gsap.to('.delete-span', {
            duration: primaryDuration,
            opacity: 0,
          })
          gsap.to(deleteBtn, {
            duration: primaryDuration,
            y: 15,
            scale: 1,
            width: 30,
            height: 30,
            borderRadius: '50%',
            onComplete: () => {
              gsap.to(container, {
                duration: primaryDuration,
                opacity: 1,
              })
              gsap.to(deleteBtn, {
                duration: primaryDuration,
                y: -195,
              })
              gsap.to('.bottom span, .yes button, .no button', {
                duration: primaryDuration,
                y: 0,
              })
              gsap.to(top, {
                duration: primaryDuration,
                x: 10,
                opacity: 1,
              })
              gsap.to(trash, {
                duration: primaryDuration,
                scale: 1,
                opacity: 1,
              })
            },
          })
        },
      })
    }

    const handleNoClick = () => {
      gsap.to(container, {
        duration: primaryDuration,
        opacity: 0,
      })
      gsap.to(top, {
        duration: primaryDuration,
        rotate: -40,
      })
      gsap.to(deleteBtn, {
        y: 2,
        onComplete: () => {
          gsap.to(deleteBtn, {
            width: '150px',
            height: '50px',
            borderRadius: '8px',
          })
          gsap.to('.delete-span', {
            duration: primaryDuration,
            opacity: 1,
          })
          gsap.to(top, {
            duration: primaryDuration,
            opacity: 0,
            rotate: 0,
          })
          deleteBtn.disabled = false
        },
      })
    }

    // Event Listeners
    yesBtn.addEventListener('mouseover', handleYesMouseOver)
    yesBtn.addEventListener('mouseout', handleYesMouseOut)
    yesBtn.addEventListener('click', handleYesClick)
    deleteBtn.addEventListener('click', handleDeleteClick)
    noBtn.addEventListener('click', handleNoClick)

    // Cleanup
    return () => {
      yesBtn.removeEventListener('mouseover', handleYesMouseOver)
      yesBtn.removeEventListener('mouseout', handleYesMouseOut)
      yesBtn.removeEventListener('click', handleYesClick)
      deleteBtn.removeEventListener('click', handleDeleteClick)
      noBtn.removeEventListener('click', handleNoClick)
    }
  }, [])

  return (
    <main className='relative w-full px-2 flex flex-col justify-center items-center'>
      <div
        ref={containerRef}
        className='flex flex-col justify-center items-center opacity-0'
      >
        <div
          ref={topRef}
          className='flex justify-center items-center z-[3] opacity-0 translate-x-[50px]'
        >
          <svg
            width='39'
            height='23'
            viewBox='0 0 39 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M28.9551 19.4916L36.6536 13.0762V2.05H28.2373C26.5662 2.05 24.9636 2.71382 23.782 3.89542L20.1144 7.56308C18.8095 8.86799 18.8095 10.9837 20.1144 12.2886C20.4785 12.6527 20.9058 12.9153 21.361 13.0762L7.25053 13.0762C4.35073 13.0762 1.99997 15.4269 1.99997 18.3267C1.99997 19.7766 3.17535 20.952 4.62525 20.952L24.9215 20.952C26.3954 20.952 27.8227 20.4352 28.9551 19.4916Z'
              fill='white'
            />
            <path
              d='M36.6536 13.0762L28.9551 19.4916C27.8227 20.4352 26.3954 20.952 24.9215 20.952L4.62525 20.952C3.17535 20.952 1.99997 19.7766 1.99997 18.3267C1.99997 15.4269 4.35073 13.0762 7.25053 13.0762H21.361'
              stroke='#020308'
              strokeWidth='3.15033'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M27.2026 9.92583L24.8399 12.2886C23.535 13.5935 21.4193 13.5935 20.1144 12.2886C18.8095 10.9837 18.8095 8.86799 20.1144 7.56308L23.782 3.89542C24.9636 2.71382 26.5662 2.05 28.2373 2.05H36.6536'
              stroke='#020308'
              strokeWidth='3.15033'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div className='my-12 flex justify-center items-center gap-12 z-[999]'>
          <div className='no'>
            <button
              ref={noButtonRef}
              className='flex justify-center items-center rounded-full bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold px-6 py-3 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:from-gray-700 hover:to-gray-900 active:scale-95'
            >
              No
            </button>
          </div>
          <div
            ref={trashRef}
            className='trash flex flex-col items-center gap-0 opacity-100 scale-80'
          >
            <svg
              ref={trashHeadRef}
              className='trash-head origin-left'
              width='62'
              height='8'
              viewBox='0 0 62 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 7H61'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M15 1V7H47V1H15Z'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
            <svg
              className='trash-body overflow-hidden bg-white'
              width='55'
              height='55'
              viewBox='0 0 55 55'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 5.21136e-07L0.233743 1.2236L9.94281 52.0486C10.1987 53.3883 11.364 54.3331 12.7603 54.3331H42.3824C43.9137 54.3331 45.2607 53.2019 45.516 51.7014L54.1245 1.10786L54.313 2.41968e-07L53.1824 0L1.27532 5.36473e-07L0 5.21136e-07ZM2.44823 1.9851L51.9494 1.9851L43.5293 51.4708C43.4442 51.9709 42.9952 52.348 42.4848 52.348H12.8627C12.3973 52.348 12.0089 52.0331 11.9236 51.5865L2.44823 1.9851Z'
                fill='black'
              />
            </svg>
          </div>
          <div className='yes'>
            <button
              ref={yesButtonRef}
              className='flex justify-center items-center rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-3 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:from-green-700 hover:to-green-900 active:scale-95'
            >
              Yes
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <span className='block translate-y-[20px] font-medium'>
            Are you sure ?
          </span>
        </div>
      </div>
      <button
        ref={deleteButtonRef}
        className='absolute bottom-0 flex justify-center items-center bg-red-500 border-none outline-none rounded-lg w-[150px] h-[50px] z-[1] cursor-pointer'
      >
        <span className='delete-span block text-white text-base'>Delete</span>
      </button>
    </main>
  )
}

export default DeleteConfirmation
