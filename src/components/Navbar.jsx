import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [unread, setUnread] = useState({ projects: true, experience: true })
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Remove local theme effect, now handled by context

  const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? 'text-[color:var(--fg)]' : 'text-[color:var(--fg)]/60 hover:text-[color:var(--fg)]'}`

  const handleNavClick = (key) => {
    setUnread((prev) => ({ ...prev, [key]: false }))
  }

  return (
    <nav className='relative z-50 border-b border-white/15 dark:border-white/15 light:border-black/15'>
      <div className='flex h-[50px] items-center px-4 md:px-[60px]'>

        {/* Mobile: left hamburger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className='md:hidden inline-flex items-center justify-center w-9 h-9 -ml-1'
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} className='text-white dark:text-white light:text-black' /> : <Menu size={20} className='text-white dark:text-white light:text-black' />}
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
          className='ml-auto inline-flex items-center justify-center w-9 h-9 text-white/80 hover:text-white dark:text-white/80 dark:hover:text-white light:text-black/80 light:hover:text-black'
        >
          {theme === 'dark' ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className='md:hidden absolute left-0 top-[50px] w-full border-b border-white/15 dark:border-white/15 light:border-black/15 backdrop-blur-sm'
          style={{ background: 'color-mix(in srgb, var(--bg) 95%, transparent)' }}
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

