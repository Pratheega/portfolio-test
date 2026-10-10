import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Phone, Award, Sparkles, GraduationCap, Code } from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const roles = [
    'Aspiring Software Developer',
    'B.Tech IT Student @ KRCT',
    'Data Structures & Algorithm Enthusiast',
    'Java & Python Developer'
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
          setTypingSpeed(50);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(120);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  const handleDownloadConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <section id="home" className="section hero-section">
      <div className="content-wrapper">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-info">
            <div className="hero-badge-wrap">
              <div className="status-badge">
                <span className="pulse-dot" />
                <span>Open to Internships & Software Roles (2024–2028)</span>
              </div>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            <div className="hero-role-wrapper">
              <span>I am an</span>
              <span className="hero-role-text">{displayText || ' '}</span>
            </div>

            <p className="hero-bio">{personalInfo.summary}</p>

            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary btn-lg">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              <a
                href={personalInfo.resumePath}
                download="Pratheega_M_Resume.pdf"
                onClick={handleDownloadConfetti}
                className="btn btn-secondary btn-lg"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>

              <button onClick={onOpenResume} className="btn btn-ghost">
                Preview CV
              </button>
            </div>

            <div className="hero-social-links">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                title="GitHub Profile"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="social-icon-btn"
                title={`Email: ${personalInfo.email}`}
              >
                <Mail size={20} />
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="social-icon-btn"
                title={`Phone: ${personalInfo.phone}`}
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Right Visual / Profile Image Card */}
          <div className="hero-visual-card">
            <div className="photo-glow-wrapper">
              <div className="photo-gradient-border" />
              <div className="photo-inner-container">
                <img
                  src={personalInfo.profileImg}
                  alt={personalInfo.name}
                  className="hero-profile-img"
                  loading="eager"
                />
              </div>

              {/* Floating Stat Badge 1 (Top Right) */}
              <div className="floating-badge badge-top">
                <div className="badge-icon-box">
                  <Award size={18} />
                </div>
                <div>
                  <div className="badge-title">Academics</div>
                  <div className="badge-value">7.0 CGPA</div>
                </div>
              </div>

              {/* Floating Stat Badge 2 (Bottom Left) */}
              <div className="floating-badge badge-bottom">
                <div className="badge-icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div className="badge-title">KRCT Trichy</div>
                  <div className="badge-value">B.Tech IT '28</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="glass-card hero-stats-bar">
          <div className="stat-item">
            <div className="stat-number gradient-text">2024–28</div>
            <div className="stat-label">B.Tech Academic Journey</div>
          </div>
          <div className="stat-item">
            <div className="stat-number gradient-text-alt">7.0</div>
            <div className="stat-label">Current College CGPA</div>
          </div>
          <div className="stat-item">
            <div className="stat-number gradient-text">3+</div>
            <div className="stat-label">Core Technical Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number gradient-text-alt">100%</div>
            <div className="stat-label">Commitment to Growth</div>
          </div>
        </div>
      </div>
    </section>
  );
}
