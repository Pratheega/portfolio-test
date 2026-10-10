import React, { useState } from 'react';
import { Code, Terminal, Layers, Database, Wrench, Sparkles, CheckCircle } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Technical Skills' },
    { id: 'languages', label: 'Programming Languages' },
    { id: 'core', label: 'Core CS & Algorithms' },
    { id: 'web_data', label: 'Web & Data Mining' },
    { id: 'tools', label: 'Tools & Workflow' }
  ];

  const filteredSkills = filter === 'all' ? skillsData : skillsData.filter((s) => s.category === filter);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'languages':
        return <Code size={22} />;
      case 'core':
        return <Terminal size={22} />;
      case 'web_data':
        return <Database size={22} />;
      default:
        return <Wrench size={22} />;
    }
  };

  return (
    <section id="skills" className="section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} /> Skills & Proficiencies
          </div>
          <h2 className="section-title">
            Technical Tooling & <span className="gradient-text">Core Competencies</span>
          </h2>
          <p className="section-subtitle">
            A balanced mix of foundational computer science principles, practical programming languages, and modern tools.
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

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="glass-card skill-card">
              <div className="skill-header">
                <div className="skill-icon-bubble">{getCategoryIcon(skill.category)}</div>
                <span className="skill-badge">{skill.badge}</span>
              </div>

              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-desc">{skill.description}</p>

              <div className="skill-meter-wrap">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Familiarity & Lab Practice</span>
                  <span style={{ fontWeight: '700', color: 'var(--accent-cyan)' }}>{skill.level}%</span>
                </div>
                <div className="skill-meter-bg">
                  <div className="skill-meter-fill" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
