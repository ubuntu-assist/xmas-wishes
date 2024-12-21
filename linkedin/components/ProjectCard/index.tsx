import { motion } from 'framer-motion'
import './style.scss'

const ProjectCard = () => {
  // Variant for card animations
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Variant for progress bar animations
  const progressVariants = {
    hidden: { width: 0 },
    visible: (progress: number) => ({
      width: `${progress}%`,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    }),
  }

  // Project card data
  const projects = [
    {
      color: 'green',
      date: 'Feb 2, 2024',
      title: 'web designing',
      type: 'Prototyping',
      progress: 90,
      images: [
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      timeLeft: '2 days left',
    },
    {
      color: 'orange',
      date: 'Feb 05, 2024',
      title: 'mobile app',
      type: 'Shopping',
      progress: 30,
      images: [
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      timeLeft: '3 weeks left',
    },
    {
      color: 'red',
      date: 'March 03, 2024',
      title: 'dashboard',
      type: 'Medical',
      progress: 50,
      images: [
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      timeLeft: '3 weeks left',
    },
    {
      color: 'blue',
      date: 'March 08, 2024',
      title: 'web designing',
      type: 'Wireframing',
      progress: 20,
      images: [
        'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      timeLeft: '3 weeks left',
    },
  ]

  return (
    <motion.section
      className='w-full flex justify-center flex-wrap max-w-[50em] mx-auto gap-[3.25rem] relative z-10 items-center py-20'
      initial='hidden'
      animate='visible'
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className={`card ${project.color}`}
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          whileHover='hover'
        >
          <div className='card-header'>
            <div className='date'>{project.date}</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path
                fillRule='evenodd'
                d='M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='card-body'>
            <h3>{project.title}</h3>
            <p>{project.type}</p>
            <div className='progress'>
              <span>Progress</span>
              <motion.div
                className='progress-bar'
                variants={progressVariants}
                custom={project.progress}
                initial='hidden'
                animate='visible'
              />
              <span>{project.progress}%</span>
            </div>
          </div>
          <div className='card-footer'>
            <ul>
              {project.images.map((img, imgIndex) => (
                <motion.li
                  key={imgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + imgIndex * 0.2 }}
                >
                  <img src={img} alt='' />
                </motion.li>
              ))}
              <motion.a
                href='#'
                className='btn-add'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </motion.a>
            </ul>

            <motion.a
              href='#'
              className='btn-countdown'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {project.timeLeft}
            </motion.a>
          </div>
        </motion.div>
      ))}
    </motion.section>
  )
}

export default ProjectCard
