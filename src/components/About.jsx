import React from 'react';
import { User, Code2, Cpu, Database, Users, MapPin, Mail, Phone, Calendar, School } from 'lucide-react';
import { personalInfo, strengthsData } from '../data/portfolioData';

export default function About() {
  const strengthIcons = [<Code2 size={22} />, <Cpu size={22} />, <Database size={22} />, <Users size={22} />];

  return (
    <section id="about" className="section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <User size={14} /> About Me
          </div>
          <h2 className="section-title">
            Passionate About Building <span className="gradient-text">Reliable Solutions</span>
          </h2>
          <p className="section-subtitle">
            A glimpse into my academic trajectory, developer mindset, and career aspirations.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Narrative & Strengths */}
          <div className="about-text">
            <p>
              I am an enthusiastic and motivated Information Technology student currently in my 2nd year of B.Tech at{' '}
              <strong>K. Ramakrishnan College of Technology, Samayapuram, Trichy</strong>. My fascination with computing
              began with understanding how algorithms structure complex real-world data and coordinate hardware.
            </p>
            <p>
              Throughout my coursework, I have developed strong fundamentals in <strong>Java, Python, and C</strong>, with
              particular enthusiasm for <strong>Data Structures, CPU Scheduling algorithms, and Data Mining</strong>. I
              believe in learning by doing — from implementing circular linked lists to developing functional e-commerce
              web applications.
            </p>

            {/* Career Objective Box */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(6, 182, 212, 0.08)',
                borderLeft: '4px solid var(--accent-cyan)'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--accent-cyan)' }}>
                Career Objective
              </h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                "{personalInfo.objective}"
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="about-features-grid">
              {strengthsData.map((item, index) => (
                <div key={item.title} className="glass-card about-feature-card">
                  <div className="feature-icon-box">{strengthIcons[index % strengthIcons.length]}</div>
                  <h4 className="feature-title">{item.title}</h4>
                  <p className="feature-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Profile Information Card */}
          <div className="glass-card about-info-card">
            <div className="info-card-header">
              <School size={22} style={{ color: 'var(--accent-cyan)' }} />
              <span>Academic Snapshot</span>
            </div>

            <ul className="info-list">
              <li className="info-row">
                <span className="info-label">Name</span>
                <span className="info-val">{personalInfo.name}</span>
              </li>
              <li className="info-row">
                <span className="info-label">Degree</span>
                <span className="info-val">B.Tech – Information Tech</span>
              </li>
              <li className="info-row">
                <span className="info-label">Institution</span>
                <span className="info-val">KRCT, Samayapuram, Trichy</span>
              </li>
              <li className="info-row">
                <span className="info-label">Academic Duration</span>
                <span className="info-val">2024 – 2028</span>
              </li>
              <li className="info-row">
                <span className="info-label">Current CGPA</span>
                <span className="info-val" style={{ color: 'var(--accent-emerald)', fontWeight: '800' }}>
                  {personalInfo.cgpa} / 10.0
                </span>
              </li>
              <li className="info-row">
                <span className="info-label">Location</span>
                <span className="info-val">{personalInfo.location}</span>
              </li>
              <li className="info-row">
                <span className="info-label">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="info-val" style={{ color: 'var(--accent-cyan)' }}>
                  {personalInfo.email}
                </a>
              </li>
              <li className="info-row">
                <span className="info-label">Phone</span>
                <a href={`tel:${personalInfo.phone}`} className="info-val">
                  {personalInfo.phone}
                </a>
              </li>
              <li className="info-row" style={{ borderBottom: 'none' }}>
                <span className="info-label">Languages</span>
                <span className="info-val">English, Tamil</span>
              </li>
            </ul>

            <div style={{ marginTop: '2rem' }}>
              <a href="#contact" className="btn btn-primary" style={{ width: '100%' }}>
                <span>Connect with Pratheega</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
