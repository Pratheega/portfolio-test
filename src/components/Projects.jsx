import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Play, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export default function Projects({ onSelectProject, onLaunchDemo }) {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'core', label: 'Data Structures & OS' },
    { id: 'data', label: 'Data Mining' },
    { id: 'web', label: 'Web Development' }
  ];

  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} /> Academic Portfolio
          </div>
          <h2 className="section-title">
            Featured Projects & <span className="gradient-text">Practical Implementations</span>
          </h2>
          <p className="section-subtitle">
            Hands-on projects bridging theoretical data structures, algorithms, and practical application development.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="skills-filter-nav">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab ${filter === tab.id ? 'active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card">
              {/* Graphic Banner */}
              <div
                className="project-preview-banner"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), ${project.color}22)`
                }}
              >
                <div className="banner-graphic">
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: `rgba(255, 255, 255, 0.05)`,
                      border: `1px solid ${project.color}55`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: project.color,
                      boxShadow: `0 8px 25px ${project.color}33`
                    }}
                  >
                    <FolderGit2 size={32} />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    Academic Project
                  </span>
                </div>
                <span className="banner-badge">{project.categoryBadge}</span>
              </div>

              {/* Body */}
              <div className="project-body">
                <div className="project-tags">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-summary">{project.shortDesc}</p>

                <div className="project-actions">
                  <button onClick={() => onSelectProject(project)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                    <ExternalLink size={15} /> Case Study
                  </button>

                  {project.hasLiveDemo && (
                    <button
                      onClick={() => onLaunchDemo(project.demoType)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <Play size={15} /> Try Demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
