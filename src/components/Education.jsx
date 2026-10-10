import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={14} /> Education & Credentials
          </div>
          <h2 className="section-title">
            Academic Background & <span className="gradient-text">Milestones</span>
          </h2>
          <p className="section-subtitle">
            Solid foundations in technology and foundational sciences shaping my technical discipline.
          </p>
        </div>

        <div className="timeline-container">
          {educationData.map((edu, idx) => (
            <div key={edu.degree} className="timeline-item">
              <div className="timeline-dot" />

              <div className="glass-card timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-degree">{edu.degree}</h3>
                    <div className="timeline-institution">{edu.institution}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <MapPin size={14} />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className="timeline-year-badge">{edu.period}</span>
                    <div className="timeline-score" style={{ marginTop: '0.4rem' }}>
                      {edu.score}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {edu.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          style={{ color: 'var(--accent-cyan)', marginTop: '3px', flexShrink: 0 }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
