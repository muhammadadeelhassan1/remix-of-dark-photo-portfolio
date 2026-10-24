import { useState, useEffect } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollVisibility } from '@/hooks/useScrollVisibility'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'Mail', href: 'mailto:naeembscs786@gmail.com' },
  { label: 'WhatsApp', href: 'https://wa.me/923260983142' },
  { label: 'Call', href: 'tel:03260983142' },
]

export function Navigation() {
  const activeSection = useActiveSection()
  const isVisible = useScrollVisibility()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Header - Only visible on mobile, transparent at top, shows on scroll */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-start md:hidden transition-all duration-300',
          isScrolled ? 'bg-black/45 backdrop-blur-md' : 'bg-transparent',
          mobileMenuOpen && 'bg-black/85 backdrop-blur-md pb-6'
        )}
      >
        {/* Menu Button - Left */}
        <div className="relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-sm font-medium tracking-wider uppercase text-white hover:text-gray-300 transition-colors"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>

          {/* Mobile Menu Dropdown */}
          <div
            className={cn(
              'flex flex-col items-start gap-3 mt-5 transition-all duration-300',
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'
            )}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'text-base text-gray-200 transition-all duration-200 relative py-1 text-left',
                  'hover:text-white',
                  activeSection === item.id && 'text-white font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social Links - Right (Mobile) */}
        <div className="flex items-center gap-4 pt-0.5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-wider uppercase text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Social Links - Fixed Top Right (hidden on mobile) */}
      <div className="hidden md:block fixed top-0 right-0 z-50 p-6 md:p-10">
        <div className="flex items-center gap-6 justify-end">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white mix-blend-difference hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Navigation Items - Fixed Bottom Right (hidden on mobile) */}
      <nav
        className={cn(
          'hidden md:block fixed bottom-0 right-0 z-50 p-6 md:p-10 transition-all duration-500',
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-end gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-sm text-white mix-blend-difference transition-all duration-300 relative py-1',
                'hover:opacity-60',
                activeSection === item.id && 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
