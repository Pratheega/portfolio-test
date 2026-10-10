import React from 'react';
import { X, Play, CheckCircle2, Layers, Target, BookOpen } from 'lucide-react';

export default function ProjectModal({ project, onClose, onLaunchDemo }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: project.color || 'var(--accent-cyan)'
              }}
            />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Project Case Study</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.8rem',
                fontWeight: '700',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--accent-cyan)',
                marginBottom: '0.5rem'
              }}
            >
              {project.categoryBadge}
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.3' }}>{project.title}</h2>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <BookOpen size={16} style={{ color: 'var(--accent-cyan)' }} /> Overview & Problem Scope
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{project.fullDesc}</p>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Target size={16} style={{ color: 'var(--accent-cyan)' }} /> Key Implementation Objectives
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.objectives.map((obj, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', marginTop: '3px', flexShrink: 0 }} />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Layers size={16} style={{ color: 'var(--accent-cyan)' }} /> Tech Stack & Tools
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.hasLiveDemo && (
            <div
              style={{
                marginTop: '1rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Interactive Demo Available</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Test the algorithm and interactive controls live in the sandbox.
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onLaunchDemo(project.demoType);
                }}
                className="btn btn-primary btn-sm"
              >
                <Play size={14} /> Open Live Simulator
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
