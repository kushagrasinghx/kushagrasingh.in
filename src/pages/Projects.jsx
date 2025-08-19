import { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const { theme } = useTheme();

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  return (
    <main className={`w-full min-h-[calc(100vh-100px)] flex flex-col box-border px-4 sm:px-6 md:px-[100px] py-[24px] md:py-[40px] overflow-x-hidden items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}> 
      <div className='w-full max-w-[1000px] mb-10'>
        <h1 className='font-ptserif text-4xl mb-6'>projects</h1>
        <p className='text-white/60 dark:text-white/60 light:text-black/60'>some of my recent works:</p>

        <div className='mt-10 flex flex-col gap-12'>
          {projects.map((p, i) => (
            <div key={p.title + i}>
              {/* Project Image Banner (keeps 10:3 ratio on all screens; exactly 1000x300 on desktop) */}
              <div
                className='w-full max-w-[1000px] aspect-[10/3] bg-gray-800 dark:bg-gray-800 light:bg-gray-200 flex items-center justify-center overflow-hidden rounded-md border border-white/10 dark:border-white/10 light:border-black/10 md:shadow-lg mb-2'
                style={{ aspectRatio: '10 / 3' }} // CSS fallback in case arbitrary aspect classes aren't enabled
              >
                <img
                  src={p.banner}
                  alt={p.title}
                  className='w-full h-full object-cover'
                  draggable={false}
                />
              </div>

              {/* Project Content */}
              <div className='flex flex-col md:flex-row justify-between items-start pt-4 md:gap-8'>
                <div className='flex-1'>
                  <h2 className='font-dmsans text-2xl mb-2 text-white dark:text-white light:text-black'>{p.title}</h2>
                  <p className='text-white/70 dark:text-white/70 light:text-black/70 mb-6'>{p.description}</p>
                </div>
                <div className='flex flex-col gap-3 md:min-w-[180px]'>
                  <a
                    href={p.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center justify-center px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 light:bg-black/10 light:hover:bg-black/20 text-white dark:text-white light:text-black font-medium transition-colors'
                  >
                    view project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

