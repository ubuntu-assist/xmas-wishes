const Community = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 mt-10'>
      {/* X (Twitter) Card */}
      <div className='bg-gradient-to-br from-[#203F6C] to-[#F4B714] rounded-xl'>
        <a target='_blank' className='w-full' href='#'>
          <div className='cursor-pointer w-full h-full space-y-2 flex-col flex justify-between rounded-xl border border-white/5 group py-6 px-5 relative overflow-hidden lg:hover:shadow-xl'>
            <div className='absolute opacity-100 inset-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 rounded-xl'></div>
            <div className='z-30 text-white'>
              <div className='flex items-start justify-between mb-6 lg:mb-8'>
                <h3 className='font-semibold text-sm lg:text-base'>
                  X (Twitter)
                </h3>
                <div className='w-6 h-6 lg:group-hover:translate-x-2 lg:group-hover:-translate-y-2 delay-200 duration-300'>
                  <svg
                    width='12'
                    height='10'
                    viewBox='0 0 12 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ transform: 'rotate(136deg)' }}
                  >
                    <path
                      d='M11.3332 5H0.666504M0.666504 5L4.6665 9M0.666504 5L4.6665 1'
                      stroke='currentColor'
                      strokeWidth='1.33333'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>
                </div>
              </div>
              <div className='w-full max-w-[450px] mb-4'>
                <p className='text-xl md:text-3xl font-light producting-tight'>
                  Follow our content on X (Twitter)
                </p>
              </div>
            </div>
            <div className='flex items-end justify-between text-white z-30'>
              <div className='lg:opacity-0 lg:group-hover:opacity-100 text-sm md:text-base lg:group-hover:translate-x-2 duration-200 delay-100'>
                <p>Join</p>
              </div>
              <div className='relative h-8 w-8 md:w-10 md:h-10 duration-500 delay-100 lg:group-hover:scale-150'>
                <div className='scale-150 h-full flex items-center justify-center'>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 1200 1227'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* YouTube Card */}
      <div className='bg-gradient-to-br from-[#203F6C] to-[#F4B714] rounded-xl'>
        <a target='_blank' className='w-full' href='#'>
          <div className='cursor-pointer w-full h-full space-y-2 flex-col flex justify-between rounded-xl border border-white/5 group py-6 px-5 relative overflow-hidden lg:hover:shadow-xl'>
            <div className='absolute opacity-100 inset-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 rounded-xl'></div>
            <div className='z-30 text-white'>
              <div className='flex items-start justify-between mb-6 lg:mb-8'>
                <h3 className='font-semibold text-sm lg:text-base'>Youtube</h3>
                <div className='w-6 h-6 lg:group-hover:translate-x-2 lg:group-hover:-translate-y-2 delay-200 duration-300'>
                  <svg
                    width='12'
                    height='10'
                    viewBox='0 0 12 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ transform: 'rotate(136deg)' }}
                  >
                    <path
                      d='M11.3332 5H0.666504M0.666504 5L4.6665 9M0.666504 5L4.6665 1'
                      stroke='currentColor'
                      strokeWidth='1.33333'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>
                </div>
              </div>
              <div className='w-full max-w-[450px] mb-4'>
                <p className='text-xl md:text-3xl font-light producting-tight'>
                  Watch our content on Youtube
                </p>
              </div>
            </div>
            <div className='flex items-end justify-between text-white z-30'>
              <div className='lg:opacity-0 lg:group-hover:opacity-100 text-sm md:text-base lg:group-hover:translate-x-2 duration-200 delay-100'>
                <p>Join</p>
              </div>
              <div className='relative h-8 w-8 md:w-10 md:h-10 duration-500 delay-100 lg:group-hover:scale-150'>
                <div className='scale-150 h-full flex items-center justify-center'>
                  <svg
                    width='35'
                    height='25'
                    viewBox='0 0 35 25'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M33.6031 20.75C33.2602 22.5 31.8031 23.8336 30.0031 24.0836C27.1742 24.5 22.4594 25 17.1445 25C11.9156 25 7.20078 24.5 4.28594 24.0836C2.48594 23.8336 1.02813 22.5 0.685938 20.75C0.342969 18.8336 0 16 0 12.5C0 9 0.342969 6.16641 0.685938 4.25C1.02891 2.5 2.48594 1.16641 4.28594 0.916407C7.11484 0.5 11.8297 0 17.1445 0C22.4594 0 27.0883 0.5 30.0031 0.916407C31.8031 1.16641 33.2609 2.5 33.6031 4.25C33.9461 6.16641 34.375 9 34.375 12.5C34.2891 16 33.9461 18.8336 33.6031 20.75Z'
                      fill='url(#paint0_linear_314_711)'
                    ></path>
                    <path
                      d='M13.2812 18.4119V6.58764C13.2812 6.00717 13.9281 5.66029 14.4117 5.98295L23.2805 11.8954C23.7125 12.1829 23.7125 12.8173 23.2805 13.1056L14.4117 19.0181C13.9281 19.3392 13.2812 18.9931 13.2812 18.4119Z'
                      fill='white'
                    ></path>
                    <defs>
                      <linearGradient
                        id='paint0_linear_314_711'
                        x1='6.10625'
                        y1='1.46172'
                        x2='30.6609'
                        y2='26.0164'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#D7262F'></stop>
                        <stop offset='0.443' stopColor='#D7262F'></stop>
                        <stop offset='1' stopColor='#D7262F'></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* LinkedIn Card */}
      <div className='bg-gradient-to-br from-[#203F6C] to-[#F4B714] rounded-xl'>
        <a
          target='_blank'
          className='w-full'
          href='https://www.linkedin.com/company/nnd-services'
        >
          <div className='cursor-pointer w-full h-full space-y-2 flex-col flex justify-between rounded-xl border border-white/5 group py-6 px-5 relative overflow-hidden lg:hover:shadow-xl'>
            <div className='absolute opacity-100 inset-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 rounded-xl'></div>
            <div className='z-30 text-white'>
              <div className='flex items-start justify-between mb-6 lg:mb-8'>
                <h3 className='font-semibold text-sm lg:text-base'>LinkedIn</h3>
                <div className='w-6 h-6 lg:group-hover:translate-x-2 lg:group-hover:-translate-y-2 delay-200 duration-300'>
                  <svg
                    width='12'
                    height='10'
                    viewBox='0 0 12 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ transform: 'rotate(136deg)' }}
                  >
                    <path
                      d='M11.3332 5H0.666504M0.666504 5L4.6665 9M0.666504 5L4.6665 1'
                      stroke='currentColor'
                      strokeWidth='1.33333'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>
                </div>
              </div>
              <div className='w-full max-w-[450px] mb-4'>
                <p className='text-xl md:text-3xl font-light producting-tight'>
                  Follow our content on LinkedIn
                </p>
              </div>
            </div>
            <div className='flex items-end justify-between text-white z-30'>
              <div className='lg:opacity-0 lg:group-hover:opacity-100 text-sm md:text-base lg:group-hover:translate-x-2 duration-200 delay-100'>
                <p>Join</p>
              </div>
              <div className='relative h-8 w-8 md:w-10 md:h-10 duration-500 delay-100 lg:group-hover:scale-150'>
                <div className='scale-150 h-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='17'
                    viewBox='0 0 16 17'
                    fill='none'
                    className='w-10 h-10'
                  >
                    <rect
                      x='1'
                      y='1.5'
                      width='14'
                      height='14'
                      rx='7'
                      fill='#203F6C'
                    ></rect>
                    <path
                      d='M6.30928 5.34607C6.30928 5.81335 5.90426 6.19215 5.40464 6.19215C4.90502 6.19215 4.5 5.81335 4.5 5.34607C4.5 4.8788 4.90502 4.5 5.40464 4.5C5.90426 4.5 6.30928 4.8788 6.30928 5.34607Z'
                      fill='white'
                    ></path>
                    <path
                      d='M4.62371 6.81405H6.1701V11.5H4.62371V6.81405Z'
                      fill='white'
                    ></path>
                    <path
                      d='M8.65979 6.81405H7.1134V11.5H8.65979C8.65979 11.5 8.65979 10.0248 8.65979 9.10243C8.65979 8.54881 8.84883 7.99277 9.60309 7.99277C10.4555 7.99277 10.4504 8.71727 10.4464 9.27855C10.4412 10.0122 10.4536 10.7609 10.4536 11.5H12V9.02686C11.9869 7.44769 11.5754 6.72004 10.2216 6.72004C9.4177 6.72004 8.91936 7.08503 8.65979 7.41525V6.81405Z'
                      fill='white'
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div className='bg-gradient-to-br from-[#203F6C] to-[#F4B714] rounded-xl'>
        <a
          target='_blank'
          className='w-full'
          href='https://web.facebook.com/nndservices'
        >
          <div className='cursor-pointer w-full h-full space-y-2 flex-col flex justify-between rounded-xl border border-gray-border/5 group py-6 px-5 relative overflow-hidden lg:hover:shadow-xl'>
            <div className='absolute opacity-100 inset-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 rounded-xl'></div>
            <div className='z-30 text-white'>
              <div className='flex items-start justify-between mb-6 lg:mb-8'>
                <h3 className='font-semibold text-sm lg:text-base'>Facebook</h3>
                <div className='w-6 h-6 lg:group-hover:translate-x-2 lg:group-hover:-translate-y-2 delay-200 duration-300'>
                  <svg
                    width='12'
                    height='10'
                    viewBox='0 0 12 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ transform: 'rotate(136deg)' }}
                  >
                    <path
                      d='M11.3332 5H0.666504M0.666504 5L4.6665 9M0.666504 5L4.6665 1'
                      stroke='currentColor'
                      stroke-width='1.33333'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    ></path>
                  </svg>
                </div>
              </div>
              <div className='w-full max-w-[450px] mb-4'>
                <p className='text-xl md:text-3xl  font-light producting-tight '>
                  Join our Facebook group
                </p>
              </div>
            </div>
            <div className='flex items-end justify-between text-white z-30'>
              <div className='lg:opacity-0 lg:group-hover:opacity-100 text-sm  md:text-base lg:group-hover:translate-x-2 duration-200 delay-100'>
                <p>Join</p>
              </div>
              <div className='relative h-8 w-8 md:w-10 md:h-10 duration-500 delay-100 lg:group-hover:scale-150'>
                <div className='scale-150 h-full flex items-center justify-center'>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 25 25'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-8 h-8'
                  >
                    <path
                      d='M12.5 0C9.18479 0 6.00537 1.31696 3.66116 3.66116C1.31696 6.00537 0 9.18479 0 12.5C0 15.8152 1.31696 18.9946 3.66116 21.3388C6.00537 23.683 9.18479 25 12.5 25C15.8152 25 18.9946 23.683 21.3388 21.3388C23.683 18.9946 25 15.8152 25 12.5C25 9.18479 23.683 6.00537 21.3388 3.66116C18.9946 1.31696 15.8152 0 12.5 0Z'
                      fill='#039BE5'
                    ></path>
                    <path
                      d='M14.1976 15.8142H17.4324L17.9403 12.528H14.1969V10.732C14.1969 9.36685 14.643 8.15633 15.9199 8.15633H17.9719V5.28856C17.6114 5.23988 16.8489 5.1333 15.4081 5.1333C12.3995 5.1333 10.6357 6.72212 10.6357 10.3419V12.528H7.54297V15.8142H10.6357V24.8465C11.2482 24.9386 11.8686 25.0011 12.5055 25.0011C13.0811 25.0011 13.643 24.9484 14.1976 24.8734V15.8142Z'
                      fill='white'
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Community
