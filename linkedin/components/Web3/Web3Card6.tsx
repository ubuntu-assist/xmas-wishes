import React from 'react'
import { motion, Variants } from 'framer-motion'
import { LucideTimer, Flame, Sparkles } from 'lucide-react'

// TypeScript Interfaces
interface NFT {
  id: number
  href: string
  name: string
  author: string
  authorImg: string
  bannerImg: string
  currentBid: string
  timeLeft: string
  etherealColor: string
}

const FullPageDreamyWeb3Cards: React.FC = () => {
  const nfts: NFT[] = [
    {
      id: 1,
      href: '#link',
      name: 'Stargazer #245',
      author: 'Duclair Fopa',
      authorImg:
        'https://media.licdn.com/dms/image/v2/D4E03AQEuUts85qfIZQ/profile-displayphoto-shrink_100_100/B4EZOdI9G4H0AU-/0/1733508196044?e=1740009600&v=beta&t=t9YKDp3WXyVNP14rKhbCRqro8y0NQvSfgcBWwu_ODY8',
      bannerImg:
        'https://fancytailwind.com/static/nft5-apemut-5956eaae6ce9239aecd71049f33c89a5.png',
      currentBid: '0.85 ETH',
      timeLeft: '2h:35m:36s',
      etherealColor: 'from-purple-500 to-indigo-400',
    },
    {
      id: 2,
      href: '#link',
      name: 'Binkies #96',
      author: 'Stael Fouwa',
      authorImg:
        'https://media.licdn.com/dms/image/v2/D4E03AQEuUts85qfIZQ/profile-displayphoto-shrink_100_100/B4EZOdI9G4H0AU-/0/1733508196044?e=1740009600&v=beta&t=t9YKDp3WXyVNP14rKhbCRqro8y0NQvSfgcBWwu_ODY8',
      bannerImg:
        'https://fancytailwind.com/static/nft2-apemut-0f38473dd603ca3aedb08c035ad87df5.png',
      currentBid: '4.10 ETH',
      timeLeft: '10h:20m:05s',
      etherealColor: 'from-teal-400 to-blue-600',
    },
    {
      id: 3,
      href: '#link',
      name: 'Wka Doo #17',
      author: 'TalantaChain',
      authorImg:
        'https://media.licdn.com/dms/image/v2/D4E03AQEuUts85qfIZQ/profile-displayphoto-shrink_100_100/B4EZOdI9G4H0AU-/0/1733508196044?e=1740009600&v=beta&t=t9YKDp3WXyVNP14rKhbCRqro8y0NQvSfgcBWwu_ODY8',
      bannerImg:
        'https://fancytailwind.com/static/nft3-apemut-98fea881c2827d0f64b47024fd143f93.png',
      currentBid: '11 ETH',
      timeLeft: '8h:48m:23s',
      etherealColor: 'from-pink-500 to-rose-400',
    },
  ]

  // Dreamy Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 10,
        duration: 0.7,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 20px 50px rgba(124,58,237,0.3)',
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      className='min-h-screen w-full flex items-center justify-center 
        bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F] 
        px-4 py-8'
    >
      <div className='w-full max-w-5xl'>
        {/* Dreamy Title Container */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className='flex items-end justify-between mb-8'
        >
          <h2 className='text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold flex items-center'>
            <Sparkles className='mr-3 text-purple-300 animate-pulse' />
            Talanta NFT Collection
          </h2>
          <motion.a
            href='#link'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='text-base text-white text-opacity-60 font-semibold hover:text-opacity-100 transition-all duration-300'
          >
            Explore More
          </motion.a>
        </motion.div>

        {/* NFTs Grid with Dreamy Animation */}
        <motion.div
          variants={containerVariants}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'
        >
          {nfts.map((nft) => (
            <motion.a
              key={nft.id}
              href={nft.href}
              variants={cardVariants}
              whileHover='hover'
              className={`
                relative p-4 rounded-2xl overflow-hidden 
                bg-gradient-to-br ${nft.etherealColor} 
                bg-opacity-20 backdrop-filter backdrop-blur-lg 
                shadow-2xl border border-white border-opacity-10
                transform transition-all duration-500 hover:-translate-y-2
              `}
            >
              {/* Glowing Background Effect */}
              <div
                className='absolute inset-0 bg-gradient-to-br opacity-20 
                blur-3xl transform -rotate-45 animate-pulse'
              ></div>

              {/* Image Container */}
              <div className='relative mb-4 rounded-xl overflow-hidden shadow-lg'>
                <motion.img
                  src={nft.bannerImg}
                  alt={nft.name}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                  className='w-full h-64 object-cover filter brightness-90'
                />
                {/* Time Left with Dreamy Effect */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='absolute top-3 right-3 
                    py-1.5 px-4 rounded-full 
                    bg-black bg-opacity-40 
                    backdrop-blur-sm 
                    text-sm text-white 
                    flex items-center 
                    animate-pulse'
                >
                  <LucideTimer className='mr-2 w-5 h-5 text-purple-300' />
                  {nft.timeLeft}
                </motion.span>
              </div>

              {/* Details with Soft Typography */}
              <div className='relative z-10 space-y-2 text-white'>
                <p className='text-2xl font-bold text-opacity-90 tracking-wide'>
                  {nft.name}
                </p>

                {/* Author with Soft Hover Effect */}
                <div className='flex items-center space-x-3'>
                  <motion.img
                    src={nft.authorImg}
                    alt={nft.author}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className='w-10 h-10 rounded-full border-2 border-white border-opacity-30'
                  />
                  <span className='text-sm text-white text-opacity-70'>
                    {nft.author}
                  </span>
                </div>

                {/* Bid Info with Gradient Button */}
                <div className='flex justify-between items-center mt-4'>
                  <span className='text-lg font-semibold text-white text-opacity-80'>
                    {`Current Bid: ${nft.currentBid}`}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='px-4 py-2 rounded-full 
                      bg-gradient-to-tr from-purple-600 to-pink-400 
                      text-white font-bold 
                      shadow-lg hover:shadow-xl 
                      transition-all duration-300'
                  >
                    Bid Now
                  </motion.button>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FullPageDreamyWeb3Cards
