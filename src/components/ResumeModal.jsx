import React, { useState } from 'react';
import { X, Download, FileText, ExternalLink, CheckCircle2, GraduationCap, Briefcase, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, educationData, skillsData, projectsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const [viewTab, setViewTab] = useState('digital');

  if (!isOpen) return null;

  const handleDownload = () => {
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    } catch {}
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Curriculum Vitae — {personalInfo.name}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="/resume.pdf"
              download="Pratheega_M_Resume.pdf"
              onClick={handleDownload}
              className="btn btn-primary btn-sm"
            >
              <Download size={14} /> Download PDF
            </a>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.75rem 1.75rem',
            background: 'var(--bg-glass)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <button
            onClick={() => setViewTab('digital')}
            className={`btn btn-sm ${viewTab === 'digital' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Digital Structured CV
          </button>
          <button
            onClick={() => setViewTab('pdf')}
            className={`btn btn-sm ${viewTab === 'pdf' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Embedded PDF File
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {viewTab === 'digital' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Header Box */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{personalInfo.name}</h2>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>
                  {personalInfo.role} | {personalInfo.subRole}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Email: {personalInfo.email} | Phone: {personalInfo.phone} | Location: {personalInfo.location}
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Professional Summary
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{personalInfo.summary}</p>
              </div>

              {/* Education */}
              <div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Education
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {educationData.map((edu) => (
                    <div
                      key={edu.degree}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                        <span>{edu.degree}</span>
                        <span style={{ color: 'var(--accent-emerald)' }}>{edu.score}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {edu.institution} ({edu.period})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Technical Skills
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skillsData.map((s) => (
                    <span
                      key={s.name}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.25)',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Academic Projects
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {projectsData.map((proj) => (
                    <div
                      key={proj.id}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ fontWeight: '700', marginBottom: '0.25rem' }}>{proj.title}</div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        {proj.shortDesc}
                      </p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {proj.techStack.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.06)'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '550px', width: '100%' }}>
              <object
                data="/resume.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    Your browser does not support inline PDF viewing.
                  </p>
                  <a href="/resume.pdf" download="Pratheega_M_Resume.pdf" className="btn btn-primary">
                    <Download size={16} /> Download Resume PDF
                  </a>
                </div>
              </object>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
