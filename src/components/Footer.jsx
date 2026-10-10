import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Mail, Phone } from 'lucide-react';
import { GithubIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;

      setScrollProgress(scroll);
      setShowScrollTop(totalScroll > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar at Top */}
      <div className="scroll-progress-bar" style={{ width: scrollProgress }} />

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="content-wrapper">
          <div className="footer-content">
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                {personalInfo.name}
              </div>
              <p className="footer-text" style={{ marginTop: '0.25rem' }}>
                B.Tech Information Technology | K. Ramakrishnan College of Technology
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="social-icon-btn" title="Email">
                <Mail size={18} />
              </a>
              <a href={`tel:${personalInfo.phone}`} className="social-icon-btn" title="Phone">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}
          >
            <div>
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Crafted with</span>
              <Heart size={14} color="#ec4899" fill="#ec4899" />
              <span>using React & Modern Vanilla CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
