
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navLinkBase = 'text-sm tracking-wide px-3 py-1.5 rounded-full transition-colors duration-200'
const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `${navLinkBase} ${
    isActive
      ? 'bg-slate-900 text-slate-50 shadow-sm'
      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700'
  }`

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('um-theme') : null
    if (stored === 'dark') return true
    if (stored === 'light') return false
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return true
    }
    return false
  })

  // Sync DOM + storage with initial state once on mount
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('um-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('um-theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('um-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('um-theme', 'light')
      }
      return next
    })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            User Manager
          </span>
        </Link>

        <div className="flex items-center gap-3">
        {/* Primary Nav */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/users" className={navLinkClasses}>
            Users
          </NavLink>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative inline-flex h-7 w-12 items-center rounded-full border border-slate-300 bg-white px-1 text-[10px] font-medium text-slate-600 shadow-sm transition-all
                       hover:border-emerald-400 hover:text-emerald-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            <span
              className={`absolute inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-emerald-500 text-[8px] font-semibold text-white shadow-sm transition-transform
                ${isDark ? 'translate-x-5' : 'translate-x-0'}`}
            >
              {isDark ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
