import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') || 'dark'
  })

  const [unread, setUnread] = useState({ projects: true, experience: true })
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Light/dark mode root class
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.classList.add('light')
    else root.classList.remove('light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`

  const handleNavClick = (key) => {
    setUnread((prev) => ({ ...prev, [key]: false }))
  }

  return (
    <nav className='relative z-50 border-b border-white/15'>
      <div className='flex h-[50px] items-center px-4 md:px-[60px]'>

        {/* Mobile: left hamburger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className='md:hidden inline-flex items-center justify-center w-9 h-9 -ml-1'
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} className='text-white' /> : <Menu size={20} className='text-white' />}
        </button>

        {/* Desktop: centered links */}
        <div className='hidden md:flex w-full justify-center items-center gap-18 text-sm'>
          <NavLink to='/' className={linkClass}>home</NavLink>

          <NavLink
            to='/projects'
            className={({ isActive }) => `${linkClass({ isActive })} flex items-center`}
            onClick={() => handleNavClick('projects')}
          >
            projects
            {unread.projects && <span className='ml-1 inline-block w-1 h-1 rounded-full bg-red-500'></span>}
          </NavLink>

          <NavLink
            to='/experience'
            className={({ isActive }) => `${linkClass({ isActive })} flex items-center`}
            onClick={() => handleNavClick('experience')}
          >
            experience
            {unread.experience && <span className='ml-1 inline-block w-1 h-1 rounded-full bg-red-500'></span>}
          </NavLink>

          <NavLink to='/contact' className={linkClass}>contact</NavLink>
        </div>

        {/* Theme toggle (right, icon-only; no gray circle) */}
        <button
          aria-label='Toggle theme'
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className='ml-auto inline-flex items-center justify-center w-9 h-9 text-white/80 hover:text-white'
        >
          {theme === 'dark' ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} className='text-[#111]' />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className='md:hidden absolute left-0 top-[50px] w-full border-b border-white/15 bg-[#0b0b0b]/95 backdrop-blur-sm'
          role='menu'
          aria-label='Mobile navigation'
        >
          <div className='flex flex-col px-4 py-3 text-sm'>
            <NavLink
              to='/'
              className={({ isActive }) => `${linkClass({ isActive })} py-2`}
            >
              home
            </NavLink>

            <NavLink
              to='/projects'
              className={({ isActive }) => `${linkClass({ isActive })} py-2 flex items-center`}
              onClick={() => handleNavClick('projects')}
            >
              projects
              {unread.projects && <span className='ml-1 inline-block w-1 h-1 rounded-full bg-red-500'></span>}
            </NavLink>

            <NavLink
              to='/experience'
              className={({ isActive }) => `${linkClass({ isActive })} py-2 flex items-center`}
              onClick={() => handleNavClick('experience')}
            >
              experience
              {unread.experience && <span className='ml-1 inline-block w-1 h-1 rounded-full bg-red-500'></span>}
            </NavLink>

            <NavLink
              to='/contact'
              className={({ isActive }) => `${linkClass({ isActive })} py-2`}
            >
              contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}
