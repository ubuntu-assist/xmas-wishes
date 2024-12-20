import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import './style.css'
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from '@tabler/icons-react'

type TeamMember = {
  id: number
  imageUrl: string
  alt?: string
  name: string
  title: string
  bio?: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
    instagram?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 0,
    imageUrl:
      'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=',
    alt: 'Team Member 1',
    name: 'Emily Johnson',
    title: 'Chief Design Officer',
    bio: 'Passionate design leader with over 10 years of experience in creating intuitive and beautiful user experiences.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emilyjohnson',
      twitter: 'https://twitter.com/emilyjohnson',
      instagram: 'https://instagram.com/emily_design',
    },
  },
  {
    id: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPeNwAEBjTrD6Boco_MimnuGKh67lekNnPHrKevt9ibtiZTx8NReceXyRPNlyPkRa3V2o&usqp=CAU',
    alt: 'Team Member 2',
    name: 'Michael Chen',
    title: 'Lead Software Engineer',
    bio: 'Tech innovator specializing in scalable software architectures and cutting-edge web technologies.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/michaelchen',
      twitter: 'https://twitter.com/mike_code',
    },
  },
  {
    id: 2,
    imageUrl:
      'https://www.shutterstock.com/image-photo/handsome-curly-black-man-tshirt-600nw-1308959878.jpg',
    alt: 'Team Member 3',
    name: 'Sarah Rodriguez',
    title: 'Marketing Director',
    bio: 'Creative marketing strategist with a knack for building compelling brand narratives and digital campaigns.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sararodriguez',
      instagram: 'https://instagram.com/sarah_markets',
    },
  },
  {
    id: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOs_hmy1b1rDK7rHMkbZ8YDQgWR33Yx44i_UJ9002lkgzBb_sHx4VD_KmPbuH-s2ro4A&usqp=CAU',
    alt: 'Team Member 4',
    name: 'David Kim',
    title: 'Product Manager',
    bio: 'Experienced product leader focused on delivering user-centric solutions and driving product innovation.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/david_pm',
    },
  },
  {
    id: 4,
    imageUrl:
      'https://cafdn.org/wp-content/uploads/2022/07/Raquel-young-people-in-profile-header-e1658334755391-640x640.webp',
    alt: 'Team Member 5',
    name: 'Rachel Patel',
    title: 'Data Science Lead',
    bio: 'Innovative data scientist transforming complex data into actionable insights and intelligent solutions.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rachelpatel',
      github: 'https://github.com/rachel-data',
    },
  },
  {
    id: 5,
    imageUrl:
      'https://cafdn.org/wp-content/uploads/2022/07/Brittany-young-people-in-profile-header-e1658332503816-640x640.webp',
    alt: 'Team Member 6',
    name: 'Alex Thompson',
    title: 'UX Research Manager',
    bio: 'User experience expert dedicated to understanding human behavior and designing empathetic interfaces.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexthompson',
      twitter: 'https://twitter.com/alex_ux',
    },
  },
  {
    id: 6,
    imageUrl:
      'https://cafdn.org/wp-content/uploads/2022/06/educational-support-thumbnail_.webp',
    alt: 'Team Member 7',
    name: 'Maria Garcia',
    title: 'Customer Success Lead',
    bio: 'Customer-focused leader committed to delivering exceptional support and building long-lasting relationships.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mariagarcia',
      instagram: 'https://instagram.com/maria_success',
    },
  },
  {
    id: 7,
    imageUrl:
      'https://cafdn.org/wp-content/uploads/2022/07/Troy-young-people-in-profile-header-e1658331064154-640x640.webp',
    alt: 'Team Member 8',
    name: 'John Anderson',
    title: 'Chief Technology Officer',
    bio: 'Visionary technology leader driving digital transformation and innovative technological solutions.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johnanderson',
      github: 'https://github.com/john-tech',
      twitter: 'https://twitter.com/john_cto',
    },
  },
  {
    id: 8,
    imageUrl:
      'https://cafdn.org/wp-content/uploads/2022/07/Jemal-young-people-in-profile-header-e1658335318855-640x640.webp',
    alt: 'Team Member 9',
    name: 'Emma Wilson',
    title: 'Content Strategy Manager',
    bio: 'Creative storyteller crafting compelling content strategies that engage and inspire audiences.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emmawilson',
      instagram: 'https://instagram.com/emma_content',
    },
  },
  {
    id: 9,
    imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    alt: 'Team Member 10',
    name: 'Carlos Mendez',
    title: 'Operations Director',
    bio: 'Strategic operations expert optimizing processes and driving organizational efficiency.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/carlosmendez',
      twitter: 'https://twitter.com/carlos_ops',
    },
  },
]

// Social icon mapping
const SocialIcons = {
  linkedin: IconBrandLinkedin,
  twitter: IconBrandX,
  github: IconBrandGithub,
  instagram: IconBrandInstagram,
}

const Community: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const closeModal = () => {
    setSelectedMember(null)
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className='community-container'>
      <motion.h1
        className='community-title'
        initial='hidden'
        animate='visible'
        variants={titleVariants}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='title-highlight'
        >
          Meet
        </motion.span>{' '}
        Our Incredible Team
      </motion.h1>

      <ul
        className='team'
        style={
          {
            '--member-count': teamMembers.length,
          } as React.CSSProperties
        }
      >
        {teamMembers.map((member) => (
          <motion.li
            key={member.id}
            style={
              {
                '--member-idx': member.id,
              } as React.CSSProperties
            }
            className='team-member'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMemberClick(member)}
          >
            <img
              src={member.imageUrl}
              alt={member.alt || `Team Member ${member.id + 1}`}
            />
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className='modal-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className='modal-content'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className='modal-close' onClick={closeModal}>
                <X size={24} />
              </button>
              <div className='modal-header'>
                <img
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  className='modal-image'
                />
                <div className='modal-header-text'>
                  <h2>{selectedMember.name}</h2>
                  <p>{selectedMember.title}</p>
                </div>
              </div>
              <div className='modal-body'>
                <p>{selectedMember.bio}</p>
                <div className='modal-social-links'>
                  {Object.entries(selectedMember.socialLinks).map(
                    ([platform, link]) => {
                      const Icon =
                        SocialIcons[platform as keyof typeof SocialIcons]
                      return (
                        <motion.a
                          key={platform}
                          href={link}
                          target='_blank'
                          rel='noopener noreferrer'
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon size={24} />
                        </motion.a>
                      )
                    }
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Community
