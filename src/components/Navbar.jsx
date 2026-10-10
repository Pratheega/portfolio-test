import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Download, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ theme, toggleTheme, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'skills', 'projects', 'demos', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = (e) => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.1, x: 0.85 }
      });
    } catch {}
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Live Demos', href: '#demos' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand Logo */}
          <a href="#home" className="nav-brand">
            <img src="/profile.jpg" alt="Pratheega M" className="brand-avatar" />
            <span>
              Pratheega<span className="brand-tag">.dev</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Nav Right Actions */}
          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Quick Resume Button */}
            <button onClick={onOpenResume} className="btn btn-secondary btn-sm" title="Preview Resume Document">
              <FileText size={15} />
              <span className="hide-mobile">Resume</span>
            </button>

            {/* Direct Download CV Button */}
            <a
              href="/resume.pdf"
              download="Pratheega_M_Resume.pdf"
              onClick={handleDownload}
              className="btn btn-primary btn-sm"
              title="Download Resume PDF"
            >
              <Download size={15} />
              <span>CV</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}
          >
            {item.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
          >
            <FileText size={16} /> View Resume
          </button>
          <a
            href="/resume.pdf"
            download="Pratheega_M_Resume.pdf"
            onClick={() => {
              setMobileMenuOpen(false);
              handleDownload();
            }}
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
          >
            <Download size={16} /> Download CV
          </a>
        </div>
      </div>
    </>
  );
}
