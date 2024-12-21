import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, LinkIcon, Share2 } from 'lucide-react'
import { IconBrandInstagram, IconBrandX } from '@tabler/icons-react'

// Define interfaces for type safety
interface PopularItem {
  href: string
  tokenId: number
  tokenImage: string
}

interface Collection {
  id: number
  href: string
  author: string
  authorImg: string
  authorHref: string
  name: string
  featuredImage: string
  totalItems: string
  popularItems: PopularItem[]
  likes: number
}

const ShareModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  collectionName: string
}> = ({ isOpen, onClose, collectionName }) => {
  const [copied, setCopied] = useState(false)

  const shareLinks = [
    {
      Icon: IconBrandX,
      color: 'text-blue-400',
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=Check out the ${collectionName} NFT collection!`
        ),
    },
    {
      Icon: IconBrandInstagram,
      color: 'text-pink-500',
      onClick: () => alert('Instagram sharing not implemented'),
    },
    {
      Icon: LinkIcon,
      color: 'text-gray-600',
      onClick: () => {
        navigator.clipboard.writeText(
          `https://example.com/collection/${collectionName
            .toLowerCase()
            .replace(' ', '-')}`
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
    },
  ]

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'
      onClick={onClose}
    >
      <motion.div
        className='bg-white rounded-2xl p-6 w-96 shadow-2xl'
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <h3 className='text-xl font-bold mb-4 text-center'>
          Share {collectionName}
        </h3>

        <div className='flex justify-center space-x-6 mb-4'>
          {shareLinks.map(({ Icon, color, onClick }, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClick}
              className={`${color} p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all`}
            >
              <Icon className='w-6 h-6' />
            </motion.button>
          ))}
        </div>

        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex items-center justify-center text-green-600 space-x-2'
          >
            <Check className='w-5 h-5' />
            <span>Link Copied!</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

const Web3FancyCollections: React.FC = () => {
  const [likedCollections, setLikedCollections] = useState<number[]>([])
  const [shareModalOpen, setShareModalOpen] = useState<number | null>(null)

  const collections: Collection[] = [
    {
      id: 1,
      href: '#linkToCollection',
      author: 'Duclair Fopa',
      authorImg:
        'https://media.licdn.com/dms/image/v2/D4E03AQEuUts85qfIZQ/profile-displayphoto-shrink_200_200/B4EZOdI9G4H0AY-/0/1733508196044?e=1740009600&v=beta&t=pOi-P5ox1Ms0zI7_BkujROdzWR5f0Mjb2TfpmZGvrpM',
      authorHref: '#linkToProfile',
      name: 'Ubuntu NFT',
      featuredImage:
        'https://fancytailwind.com/static/nft4-azuki-efbb84320085e477a341102eb2d42e49.png',
      totalItems: '34',
      likes: 1245,
      popularItems: [
        {
          href: '#link',
          tokenId: 8,
          tokenImage:
            'https://fancytailwind.com/static/nft5-azuki-53e23df7b4a528c12c77bede053415fc.png',
        },
        {
          href: '#link',
          tokenId: 29,
          tokenImage:
            'https://fancytailwind.com/static/nft6-azuki-b8ec278b15174bdb9328a5ec539d0fb2.png',
        },
        {
          href: '#link',
          tokenId: 12,
          tokenImage:
            'https://fancytailwind.com/static/nft7-azuki-f029169f9ab43327658b2d3edc5618e9.png',
        },
      ],
    },
    {
      id: 2,
      href: '#linkToCollection',
      author: 'Stael Fouwa',
      authorImg:
        'https://media.licdn.com/dms/image/v2/D4E03AQEuUts85qfIZQ/profile-displayphoto-shrink_200_200/B4EZOdI9G4H0AY-/0/1733508196044?e=1740009600&v=beta&t=pOi-P5ox1Ms0zI7_BkujROdzWR5f0Mjb2TfpmZGvrpM',
      authorHref: '#linkToProfile',
      name: "Mo'ock",
      featuredImage:
        'https://fancytailwind.com/static/nft13-psycho-0ca5ee95cbe2401686f8699027645c2c.png',
      totalItems: '56',
      likes: 1245,
      popularItems: [
        {
          href: '#link',
          tokenId: 1990,
          tokenImage:
            'https://fancytailwind.com/static/nft14-psycho-a639123b157ef50b04d48e39d76dcf2b.png',
        },
        {
          href: '#link',
          tokenId: 65,
          tokenImage:
            'https://fancytailwind.com/static/nft15-psycho-87bb1ce97caee1038b2bf3352d4335a3.png',
        },
        {
          href: '#link',
          tokenId: 8025,
          tokenImage:
            'https://fancytailwind.com/static/nft16-psycho-2c23e271a3a11fd6b1a9769260d29493.png',
        },
      ],
    },
    {
      id: 3,
      href: '#linkToCollection',
      author: 'TalantaChain',
      authorImg:
        'https://media.licdn.com/dms/image/v2/D4E03AQEuUts85qfIZQ/profile-displayphoto-shrink_200_200/B4EZOdI9G4H0AY-/0/1733508196044?e=1740009600&v=beta&t=pOi-P5ox1Ms0zI7_BkujROdzWR5f0Mjb2TfpmZGvrpM',
      authorHref: '#linkToProfile',
      name: 'Talanta NFT',
      featuredImage:
        'https://fancytailwind.com/static/nft1-apemut-72830b0160222c7cab8873401647aeef.png',
      totalItems: '300',
      likes: 1245,
      popularItems: [
        {
          href: '#link',
          tokenId: 9767,
          tokenImage:
            'https://fancytailwind.com/static/nft2-apemut-0f38473dd603ca3aedb08c035ad87df5.png',
        },
        {
          href: '#link',
          tokenId: 24,
          tokenImage:
            'https://fancytailwind.com/static/nft3-apemut-98fea881c2827d0f64b47024fd143f93.png',
        },
        {
          href: '#link',
          tokenId: 7329,
          tokenImage:
            'https://fancytailwind.com/static/nft5-apemut-5956eaae6ce9239aecd71049f33c89a5.png',
        },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const toggleLike = (collectionId: number) => {
    setLikedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    )
  }

  return (
    <div className='relative mx-auto py-12 px-4 w-full max-w-7xl from-gray-50'>
      <div className='mx-auto max-w-2xl lg:max-w-6xl'>
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className='text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold tracking-tight'
        >
          Hot Collections
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              className='bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'
            >
              {/* Collection Images */}
              <div className='relative'>
                {/* Featured Image */}
                <motion.a
                  href={collection.href}
                  className='block relative w-full h-64 overflow-hidden'
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={collection.featuredImage}
                    alt={collection.name}
                    className='absolute inset-0 w-full h-full object-cover filter brightness-90 hover:brightness-100'
                  />
                  <div className='absolute top-4 right-4 flex space-x-2'>
                    <motion.button
                      onClick={() => toggleLike(collection.id)}
                      whileTap={{ scale: 0.9 }}
                      className='bg-white/70 backdrop-blur-sm p-2 rounded-full hover:bg-white/90'
                    >
                      <Heart className='text-red-500 w-5 h-5' />
                    </motion.button>
                    <motion.button
                      onClick={() => setShareModalOpen(collection.id)}
                      whileTap={{ scale: 0.9 }}
                      className='bg-white/70 backdrop-blur-sm p-2 rounded-full hover:bg-white/90'
                    >
                      <Share2 className='text-gray-700 w-5 h-5' />
                    </motion.button>
                  </div>

                  {/* Like Count Animation */}
                  <AnimatePresence>
                    {likedCollections.includes(collection.id) && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='absolute top-16 right-4 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs flex items-center space-x-1'
                      >
                        <Heart className='w-3 h-3 fill-red-500' />
                        <span>Liked!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.a>

                {/* Popular Items Grid */}
                <div className='grid grid-cols-3 gap-1 p-1 bg-white/80 backdrop-blur-sm'>
                  {collection.popularItems.map((item) => (
                    <motion.a
                      href={item.href}
                      key={item.tokenId}
                      className='aspect-square overflow-hidden'
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <img
                        src={item.tokenImage}
                        alt={`Token ${item.tokenId}`}
                        className='w-full h-full object-cover transform transition-all hover:scale-110'
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Collection Details */}
              <div className='p-4 bg-white'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {collection.name}
                  </h3>
                  <span className='px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full'>
                    {collection.totalItems} Items
                  </span>
                </div>

                <div className='mt-3 flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <img
                      src={collection.authorImg}
                      alt={collection.author}
                      className='w-8 h-8 rounded-full border-2 border-white shadow'
                    />
                    <span className='text-sm text-gray-600'>
                      By{' '}
                      <span className='font-semibold text-purple-600'>
                        {collection.author}
                      </span>
                    </span>
                  </div>
                  <div className='flex items-center space-x-1 text-gray-500'>
                    <Heart className='w-4 h-4 text-red-400' />
                    <span className='text-xs'>{collection.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href='#link'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className='mt-8 inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all hover:scale-[1.02] hover:brightness-110'
        >
          Discover More Collections
        </motion.a>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen !== null && (
          <ShareModal
            isOpen={shareModalOpen !== null}
            onClose={() => setShareModalOpen(null)}
            collectionName={
              collections.find((c) => c.id === shareModalOpen)?.name ||
              'Collection'
            }
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Web3FancyCollections
