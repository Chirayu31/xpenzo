'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Plus, Folders, LogOut } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const user = useSession()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (user.status === 'unauthenticated') {
    return null
  }

  const navLinks = [
    { href: '/transaction', label: 'Dashboard', icon: Home },
    { href: '/transaction/add', label: 'Add Transaction', icon: Plus },
    { href: '/category', label: 'Categories', icon: Folders },
    { href: '/logout', label: 'Logout', icon: LogOut },
  ]

  const isActive = (path: string) => {
    if (path === '/transaction') {
      return pathname === '/transaction'
    }
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <nav className='border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/transaction' className='flex items-center'>
              <span className='text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent'>
                Xpenzo
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-1'>
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive(link.href)
                      ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                  <IconComponent className='w-4 h-4 mr-1.5' />
                  {link.label}
                </Link>
              )
            })}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 dark:focus:ring-offset-gray-900'
              aria-expanded={isOpen}>
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black'>
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.href)
                      ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                  <IconComponent className='w-4 h-4 mr-2' />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
