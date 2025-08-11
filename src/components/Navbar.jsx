import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`

  return (
    <nav className='relative flex h-[50px] p-4 border-b border-white/15 px-[60px]'>
      <div className='flex w-full justify-center items-center gap-18 text-sm'>
        <NavLink to='/' className={linkClass}>Home</NavLink>
        <NavLink to='/projects' className={linkClass}>Projects</NavLink>
        <NavLink to='/experience' className={({ isActive }) => `${linkClass({ isActive })} flex items-center`}>
          Experience
          <span className='ml-1 inline-block w-1 h-1 rounded-full bg-red-500'></span>
        </NavLink>
        <NavLink to='/contact' className={linkClass}>Contact</NavLink>
      </div>

      <button
        aria-label='Toggle theme'
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        className='absolute right-[60px] top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 transition-colors'
      >
        {theme === 'dark' ? (
          <Sun size={16} className='text-white' />
        ) : (
          <Moon size={16} className='text-[#111]' />
        )}
      </button>
    </nav>
  )
} 