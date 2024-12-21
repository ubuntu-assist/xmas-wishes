import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Review {
  id: number
  name: string
  role: string
  avatar: string
  review: string
}

const REVIEWS: Review[] = [
  {
    id: 6,
    name: 'Duclair Fopa',
    role: 'Smart Contract Engineer',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQEuUts85qfIZQ/profile-displayphoto-shrink_100_100/B4EZOdI9G4H0AU-/0/1733508196044?e=1740009600&v=beta&t=t9YKDp3WXyVNP14rKhbCRqro8y0NQvSfgcBWwu_ODY8',
    review: `Absolutely mind-blowing! From graphics to gameplay, it's a virtual masterpiece. I lost track of time in the immersive experience.`,
  },
  {
    id: 0,
    name: 'Leonel Kelias',
    role: 'Frontend Developer',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQEvg8gZ7rhS9g/profile-displayphoto-shrink_100_100/B4EZOdKYfAHsAc-/0/1733508566667?e=1740009600&v=beta&t=bQYiGhtmyyUs_8vhGm7qQQR_ff1tIY---lbXAWRcMsI',
    review: `A hidden gem for tech enthusiasts. The selection is vast, and the ease of discovering new tech is addictively delightful!`,
  },
  {
    id: 2,
    name: 'Chu Princewill',
    role: 'Software Engineer',
    avatar:
      'https://z-p3-scontent.fdla2-1.fna.fbcdn.net/v/t39.30808-1/347234690_237470148921180_7558084709399997729_n.jpg?stp=c0.0.1080.1080a_dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeG_FyeApGP6Oz9n5H3zgAf446LhvQe3jc_jouG9B7eNz4otGOJMEOzcQnEeyGBY2smnhuvv8xMc6A9dHEE5boke&_nc_ohc=KOAPmA1cQ1sQ7kNvgHw7AXS&_nc_zt=24&_nc_ht=z-p3-scontent.fdla2-1.fna&_nc_gid=ArhsVotlXb6_Zvenz0IDlGs&oh=00_AYCyWVQ8XVSn7lBelMnI5Tk_A1e_P0zi-9DNT-tYDVeNjw&oe=6768FF34',
    review: `Results speak louder than words. I've never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos!`,
  },
  {
    id: 3,
    name: 'Software Developer',
    role: 'Sinclair Fotso',
    avatar:
      'https://media.licdn.com/dms/image/v2/D5603AQEGAH6yAUUS7g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1704785899572?e=1740009600&v=beta&t=qY7bhtuEeRJZ5XOew2lCanUPY4VnzegyYRbee0fEeG8',
    review: `It's very easy to customize and categorize lists for new projects/task categories.`,
  },
  {
    id: 13,
    name: 'Daina Mfendem',
    role: 'Machine Learning Engineer',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQGv0nUCizXEbw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1692363088027?e=1740009600&v=beta&t=ehSjMUm_tsbCBxT1XRxYTQ2k6Z-7tu8Q_W-XrWlBXYE',
    review: `An adventure for the curious mind. Every click led to a new discovery. It's like a digital journey through the wonders of the internet.`,
  },
  {
    id: 4,
    name: 'Stael Fouwa',
    role: 'Computer Science Teacher',
    avatar:
      'data:image/jpeg;base64,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',
    review: `Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on.`,
  },
]

const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const totalSlides = REVIEWS.length

  const handleSlide = (direction: 'prev' | 'next') => {
    if (isAnimating) return

    setIsAnimating(true)

    // Animate arrows
    if (prevButtonRef.current && nextButtonRef.current) {
      prevButtonRef.current.classList.add('translate-x-20')
      nextButtonRef.current.classList.add('-translate-x-20')
    }

    // Slide out current card
    const currentCard = document.querySelectorAll('.card')[currentIndex]
    const blockquote = currentCard.querySelector('blockquote')
    const details = currentCard.querySelector('.details')

    blockquote?.classList.add('scale-0', 'before:-translate-y-full')
    details?.classList.add('scale-0', 'translate-y-[150px]')

    // Move index
    const newIndex =
      direction === 'prev'
        ? (totalSlides + currentIndex - 1) % totalSlides
        : (totalSlides + currentIndex + 1) % totalSlides

    // Slide in new card after delay
    setTimeout(() => {
      const nextCard = document.querySelectorAll('.card')[newIndex]
      const nextBlockquote = nextCard.querySelector('blockquote')
      const nextDetails = nextCard.querySelector('.details')

      nextCard.classList.remove('opacity-0')
      nextBlockquote?.classList.remove('scale-0', 'before:-translate-y-full')
      nextDetails?.classList.remove('scale-0', 'translate-y-[150px]')

      // Reset arrow positions
      if (prevButtonRef.current && nextButtonRef.current) {
        prevButtonRef.current.classList.remove('translate-x-20')
        nextButtonRef.current.classList.remove('-translate-x-20')
      }

      setCurrentIndex(newIndex)
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className='bg-gradient-to-tr from-yellow-200 to-yellow-50 text-black flex flex-col justify-center items-center min-h-screen relative px-4'>
      <main className='bg-white my-4 w-full max-w-2xl rounded-3xl text-center p-8 sm:p-16 [&_*]:ease-in-out'>
        <h1 className='text-xl font-bold text-yellow-700'>
          Hear What Our Customers Are Saying
        </h1>
        <p className='text-sm text-yellow-900'>
          Empowering businesses to reach their full potential since 2023
        </p>

        <div
          className="mt-6 grid grid-cols-1 sm:grid-cols-[60px_auto_60px] 
          [grid-template-areas:'slider_slider'_'nav-left_nav-right'] 
          sm:[grid-template-areas:'nav-left_slider_nav-right'] 
          gap-2 sm:gap-6
          [&>button]:rounded-full
          [&>button]:w-10
          [&>button]:h-10
          [&>button]:shrink-0
          [&>button]:text-yellow-900
          [&>button]:transition-all 
          [&>button]:duration-500
          [&>button]:flex 
          [&>button]:items-center 
          [&>button]:justify-center
          [&_button]:relative
          [&_button]:isolate
          [&_button]:bg-yellow-500
          sm:[&>button]:mt-8
          before:[&>button]:absolute
          before:[&>button]:inset-px
          before:[&>button]:transition-all
          before:[&>button]:duration-300
          before:[&>button]:-z-10 
          before:[&>button]:rounded-full
          hover:before:[&>button]:inset-full
          before:[&>button]:bg-white
          hover:[&>button]:text-white
          hover:[&>button]:bg-yellow-700
          hover:[&>button]:border-yellow-700"
        >
          <button
            ref={prevButtonRef}
            data-slide='prev'
            onClick={() => handleSlide('prev')}
            className='[grid-area:nav-left]'
          >
            <ChevronLeft />
          </button>

          <div id='slider' className='[grid-area:slider]'>
            <div className="grid [grid-template-areas:'stack'] overflow-hidden">
              {REVIEWS.map((review, idx) => (
                <div
                  key={review.id}
                  className={`card [grid-area:stack] transition-all duration-500 ${
                    idx === 0 ? '' : 'opacity-0'
                  }`}
                >
                  <blockquote
                    className={`bg-yellow-500 text-black rounded-md p-6 text-sm transition-all duration-500 relative isolate
                      ${idx === 0 ? '' : 'scale-0'}
                      before:absolute
                      before:bg-yellow-500
                      before:w-4
                      before:h-4
                      before:rotate-45
                      before:-bottom-2
                      before:left-2/4
                      before:-translate-x-2/4
                      before:-z-10
                      before:transition
                      before:duration-500
                      before:delay-500
                      ${idx === 0 ? 'before:-translate-y-full' : ''}`}
                  >
                    "{review.review}"
                  </blockquote>

                  <div
                    className={`details text-sm transition-all duration-500 flex flex-col items-center gap-2 mt-6
                      ${idx === 0 ? '' : 'scale-0 translate-y-[150px]'}`}
                  >
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className='w-16 h-16 object-cover rounded-full border-2 border-yellow-500'
                    />
                    <div>
                      <p className='text-sm font-bold text-yellow-700'>
                        {review.name}
                      </p>
                      <p className='text-xs text-yellow-900'>{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            ref={nextButtonRef}
            data-slide='next'
            onClick={() => handleSlide('next')}
            className='[grid-area:nav-right]'
          >
            <ChevronRight />
          </button>
        </div>
      </main>
    </div>
  )
}

export default ReviewsSlider
