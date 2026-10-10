import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {}
    }, 700);
  };

  return (
    <section id="contact" className="section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={14} /> Contact & Inquiries
          </div>
          <h2 className="section-title">
            Let's Discuss <span className="gradient-text">Opportunities</span>
          </h2>
          <p className="section-subtitle">
            Whether you have an internship position, software project, or mentorship advice, I'd love to connect!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="contact-channels">
            {/* Email Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-left">
                <div className="contact-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="contact-lbl">Email Address</div>
                  <a href={`mailto:${personalInfo.email}`} className="contact-val">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="copy-btn"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedField === 'email' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-left">
                <div className="contact-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div className="contact-lbl">Phone Number</div>
                  <a href={`tel:${personalInfo.phone}`} className="contact-val">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                className="copy-btn"
                title="Copy Phone"
                aria-label="Copy Phone"
              >
                {copiedField === 'phone' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-left">
                <div className="contact-icon-box" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="contact-lbl">Location</div>
                  <div className="contact-val">{personalInfo.location}</div>
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="glass-card contact-card">
              <div className="contact-card-left">
                <div className="contact-icon-box" style={{ background: 'rgba(236, 72, 153, 0.12)', color: '#ec4899' }}>
                  <GithubIcon size={22} />
                </div>
                <div>
                  <div className="contact-lbl">GitHub Profile</div>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="contact-val">
                    github.com/Pratheega
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="glass-card contact-form-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>Message Dispatched!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Thank you, <strong>{formData.name}</strong>! Your note has been simulated successfully. Feel free to also
                  reach out directly at <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--accent-cyan)' }}>{personalInfo.email}</a>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="btn btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Drop Me a Note
                </h3>

                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Internship Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                  <Send size={16} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
