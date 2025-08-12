import { useEffect, useState } from 'react'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  return (
    <main className='w-full h-[calc(100vh-100px)] flex flex-col box-border px-[100px] py-[40px] overflow-x-hidden items-center'>
      <div className='w-full max-w-[1000px]'>
        <h1 className='font-ptserif text-4xl mb-6'>projects</h1>
        <p className='text-white/60'>some of my recent works:</p>

        <div className='mt-10 flex flex-col gap-12'>
          {projects.map((p, i) => (
            <div key={p.title + i}>
              {/* Project Image Banner */}
              <div className='w-full h-[300px] bg-gray-800 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-lg mb-2'>
                <img src={p.banner} alt={p.title} className='object-cover w-[1000px] h-[300px] max-w-full' style={{ width: '1000px', height: '300px' }} />
              </div>
              {/* Project Content */}
              <div className='flex flex-col md:flex-row justify-between items-start gap-8 pt-4'>
                <div className='flex-1'>
                  <h2 className='font-dmsans text-2xl mb-2 text-white'>{p.title}</h2>
                  <p className='text-white/70 mb-6'>{p.description}</p>
                </div>
                <div className='flex flex-col gap-3 min-w-[180px]'>
                  <a href={p.github} target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors'>
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