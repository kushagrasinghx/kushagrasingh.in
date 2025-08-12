import { useState } from 'react'
import squarePfp from '../assets/square-pfp.png'

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const cards = [
    { image: '/someone.png', href: '#' },
    { image: '/socialsense.png', href: '#' },
    { image: '/comingsoon.png', href: '#' },
    { image: '/suite.png', href: '#' },
    { image: '/figma.png', href: '#' },
    { image: '/framer.png', href: '#' },
    { image: '/github.png', href: '' },
    { image: '/linkedin.png', href: 'https://linkedin.com/in/kushagra-singh-varanasi' },
    { image: '/contact.png', href: '/contact' },
    { image: '/resume.png', href: '#' },
  ]

  const randomRotations = cards.map(() => (Math.random() - 0.5) * 8 - 2)

  return (
    <main className='w-full h-[calc(100vh-100px)] flex flex-col box-border px-[100px] py-[40px] overflow-x-hidden items-center'>
      <div className='w-full max-w-[1500px]'>
        <div className='w-full flex mb-5'>
          <img src={squarePfp} alt='Profile' className='w-[90px] h-[90px] object-cover rounded-full' />
        </div>
        <div className='w-full font-ptserif text-7xl'>
          hey there, I am Kushagra, a product designer polishing ideas until they shine
          <span className='inline-block align-middle ml-3'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-[0.9em] h-[0.9em]' aria-hidden='true'>
              <path fill='currentColor' d='M12 2 L15.535 8.465 L22 12 L15.535 15.535 L12 22 L8.465 15.535 L2 12 L8.465 8.465 Z' />
            </svg>
          </span>
        </div>

        <div className='w-full flex flex-col gap-6'>
          <div className='w-full flex gap-10'>
            <div className='font-ptserif text-5xl mt-10 text-white/50'>
              <a href='mailto:contact@kushagrasingh.in' className='hover:text-white transition-colors'>hello@kushagrasingh.in</a>
            </div>
            <div className='font-ptserif text-5xl mt-10 text-white/50'>
              <a href='https://linkedin.com/in/kushagra-singh-varanasi' target='_blank' rel='noopener noreferrer' className='hover:text-white transition-colors'>connect on linkedin</a>
            </div>
          </div>

          <div className='flex items-center text-lg text-white/50'>
            <span className='inline-block w-3 h-3 rounded-full bg-green-400 mr-3'></span>
            <span className='font-medium'>working at</span>
            <span className='font-medium text-green-400 ml-2'>NextFront Technologies</span>
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div className='relative mt-20 px-[60px] overflow-visible flex justify-center'>
        <div className='flex items-end'>
          {cards.map((card, i) => (
            <div
              key={card.image + i}
              className={`group relative h-[360px] w-[240px] rounded-2xl border-2 border-white/20 overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${i !== 0 ? '-ml-24' : ''} hover:z-50 ${hoveredIndex !== null && hoveredIndex !== i ? 'blur-sm opacity-60' : ''}`}
              style={{ '--hover-rotate': `${randomRotations[i]}deg` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a href={card.href} target={card.href?.startsWith('http') ? '_blank' : undefined} rel={card.href?.startsWith('http') ? 'noopener noreferrer' : undefined} className='absolute inset-0 block'>
                <img src={card.image} alt='' className={`h-full w-full object-cover transition duration-300 ${hoveredIndex !== null && hoveredIndex !== i ? 'blur-sm opacity-60' : ''}`} />
                <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10' />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='mt-10 w-full flex justify-center'>
        ©2025 Kushagra Singh
      </div>
    </main>
  )
} 