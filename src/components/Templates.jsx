import { useState } from 'react';
import { Search, X, Mail, FileText, ClipboardList, Shield, Megaphone, Settings, RotateCcw, Plus, Copy, Edit3, Trash2, Eye, CheckCircle } from 'lucide-react';
import { templates } from '../data/demoData';

const categoryColors = { 'Client Onboarding': 'badge-blue', 'Session Prep': 'badge-amber', 'Post-Session': 'badge-green', 'Legal': 'badge-red', 'Finance': 'badge-purple', 'Marketing': 'badge-pink', 'Operations': 'badge-gray' };
const typeIcons = { 'Email': Mail, 'Form': ClipboardList, 'Checklist': CheckCircle, 'Contract': Shield, 'Document': FileText, 'SOP': Settings };

const templatePreviews = {
  'T-001': { subject: 'Welcome to Luminance Studios! 🎉', body: "Hi {client_name},\n\nWe're so excited to work with you! Your {session_type} session is booked for {session_date}.\n\nHere's what to expect:\n• You'll receive a prep guide 5 days before your session\n• A questionnaire to help us plan your perfect shoot\n• A reminder 48 hours before\n\nIf you have any questions, don't hesitate to reach out!\n\nWarm regards,\nMaya Chen\nLuminance Studios" },
  'T-002': { subject: 'Your Session Prep Guide — {session_type}', body: "Hi {client_name},\n\nYour session is coming up on {session_date}! Here are a few tips to help you prepare:\n\n📍 Location: {location}\n⏰ Time: {session_time}\n👗 What to wear: Solid colors work best. Avoid busy patterns.\n🧴 Grooming: Natural makeup photographs beautifully.\n📱 Bring: Any props or personal items you'd like in your photos.\n\nSee you soon!\nLuminance Studios" },
  'T-004': { subject: 'Reminder: Your Session is in 48 Hours!', body: "Hi {client_name},\n\nJust a friendly reminder that your {session_type} session is in 2 days!\n\n📅 Date: {session_date}\n📍 Location: {location}\n⏰ Arrival: Please arrive 10 minutes early\n\nIf you need to reschedule, please let us know ASAP.\n\nSee you there!\nLuminance Studios" },
  'T-008': { subject: 'Your Gallery is Ready! ✨', body: "Hi {client_name},\n\nGreat news — your {session_type} gallery is ready to view!\n\n🔗 Gallery Link: {gallery_link}\n📅 Available until: {expiration_date}\n📸 {photo_count} photos to browse\n\nYou can download, share, and select your favorites directly from the gallery.\n\nWe hope you love them!\nLuminance Studios" },
  'T-010': { subject: 'Photography Services Agreement', body: "PHOTOGRAPHY SERVICES AGREEMENT\n\nThis agreement is between Luminance Studios (\"Photographer\") and {client_name} (\"Client\").\n\nSession Type: {session_type}\nDate: {session_date}\nLocation: {location}\nPackage: {package_name}\nTotal Fee: {total_fee}\n\nTERMS:\n1. A 30% non-refundable retainer is required to secure your date.\n2. Remaining balance is due 7 days before the session.\n3. Gallery delivery within 2-4 weeks.\n4. Full usage rights granted to client for personal use.\n\nSignature: _______________\nDate: _______________" },
  'T-014': { subject: '📸 Mini Sessions Are Here — Limited Spots!', body: "Hi {client_name},\n\nWe're offering exclusive mini sessions this season!\n\n✨ 20-minute session\n✨ 15 edited digital images\n✨ Online gallery with download access\n✨ Special rate: $250 (regularly $400)\n\nSpots are limited — book yours today!\n\n{booking_link}\n\nLuminance Studios" }
};

export default function Templates() {
  const [templateList, setTemplateList] = useState(templates);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const categories = ['All', 'Client Onboarding', 'Session Prep', 'Post-Session', 'Legal', 'Finance', 'Marketing', 'Operations'];
  const filtered = templateList.filter(t => {
    const matchesFilter = activeFilter === 'All' || t.category === activeFilter;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase()) || t.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalUsage = templateList.reduce((sum, t) => sum + t.usageCount, 0);
  const mostUsed = [...templateList].sort((a, b) => b.usageCount - a.usageCount)[0];
  const categoryCount = [...new Set(templateList.map(t => t.category))].length;

  const handleDuplicate = (t) => {
    const newTemplate = { ...t, id: `T-${String(templateList.length + 1).padStart(3, '0')}`, name: `${t.name} (Copy)`, usageCount: 0, lastUsed: 'Never' };
    setTemplateList(prev => [...prev, newTemplate]);
    showToast(`Duplicated: ${t.name}`);
  };

  const handleDelete = (t) => {
    setTemplateList(prev => prev.filter(item => item.id !== t.id));
    setSelectedTemplate(null);
    showToast(`Deleted: ${t.name}`, 'warning');
  };

  const TypeIcon = ({ type }) => {
    const Icon = typeIcons[type] || FileText;
    return <Icon size={16} />;
  };

  return (
    <div className="main-content">
      {/* Toasts */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: t.type === 'success' ? '#065f46' : t.type === 'warning' ? '#92400e' : '#991b1b', color: 'white', padding: '12px 20px', borderRadius: 8, fontSize: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', animation: 'fadeIn 0.3s ease' }}>
            {t.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Templates</h1>
          <p style={{ color: '#94a3b8', marginTop: 4 }}>{templateList.length} templates · {totalUsage.toLocaleString()} total uses</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-primary" onClick={() => showToast('New template created (demo)')}>
            <Plus size={16} /> New Template
          </button>
          <button className="btn-ghost" onClick={() => { setTemplateList(templates); showToast('Demo data reset'); }}>
            <RotateCcw size={16} /> Reset Demo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Templates', value: templateList.length, icon: FileText, color: '#a78bfa' },
          { label: 'Total Uses', value: totalUsage.toLocaleString(), icon: Copy, color: '#34d399' },
          { label: 'Most Used', value: mostUsed?.name || '—', icon: CheckCircle, color: '#fbbf24', small: true },
          { label: 'Categories', value: categoryCount, icon: ClipboardList, color: '#60a5fa' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{stat.label}</span>
              <stat.icon size={18} color={stat.color} />
            </div>
            <div style={{ fontSize: stat.small ? 16 : 24, fontWeight: 700, color: 'white' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Search & Category Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input type="text" placeholder="Search templates..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} className={`filter-btn ${activeFilter === c ? 'active' : ''}`} onClick={() => setActiveFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Template Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(t => (
          <div key={t.id} className="glass-card" style={{ padding: 20, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setSelectedTemplate(t)} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                  <TypeIcon type={t.type} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 2 }}>{t.name}</h3>
                  <p style={{ fontSize: 12, color: '#64748b' }}>{t.id}</p>
                </div>
              </div>
              <span className={`badge ${categoryColors[t.category]}`}>{t.category}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>Type: <span style={{ color: 'white' }}>{t.type}</span></span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>Used: <span style={{ color: '#a78bfa', fontWeight: 600 }}>{t.usageCount}×</span></span>
              </div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Last: {t.lastUsed}</span>
            </div>
            {/* Actions */}
            <div style={{ display: 'flex', gap: 6, marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }} onClick={e => e.stopPropagation()}>
              <button className="btn-ghost-sm" onClick={() => handleDuplicate(t)} title="Duplicate"><Copy size={13} /></button>
              <button className="btn-ghost-sm" onClick={() => showToast(`Editing ${t.name} (demo)`)} title="Edit"><Edit3 size={13} /></button>
              <button className="btn-ghost-sm" style={{ color: '#f87171' }} onClick={() => handleDelete(t)} title="Delete"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>No templates found matching your criteria.</div>
      )}

      {/* Detail Modal with Preview */}
      {selectedTemplate && (
        <div className="modal-overlay" onClick={() => setSelectedTemplate(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 620 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                  <TypeIcon type={selectedTemplate.type} />
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 4 }}>{selectedTemplate.name}</h2>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`badge ${categoryColors[selectedTemplate.category]}`}>{selectedTemplate.category}</span>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{selectedTemplate.type}</span>
                  </div>
                </div>
              </div>
              <button className="btn-ghost-sm" onClick={() => setSelectedTemplate(null)}><X size={18} /></button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Times Used', value: selectedTemplate.usageCount },
                { label: 'Last Used', value: selectedTemplate.lastUsed },
                { label: 'Status', value: selectedTemplate.status }
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <p style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Template Preview */}
            {templatePreviews[selectedTemplate.id] ? (
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preview</p>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  {templatePreviews[selectedTemplate.id].subject && (
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 13 }}>
                      <span style={{ color: '#64748b' }}>Subject: </span>
                      <span style={{ color: 'white', fontWeight: 500 }}>{templatePreviews[selectedTemplate.id].subject}</span>
                    </div>
                  )}
                  <div style={{ padding: 16, fontSize: 13, color: '#cbd5e1', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit', maxHeight: 300, overflowY: 'auto' }}>
                    {templatePreviews[selectedTemplate.id].body}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: 32, textAlign: 'center', marginBottom: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
                <Eye size={24} color="#64748b" style={{ marginBottom: 8 }} />
                <p style={{ color: '#64748b', fontSize: 13 }}>Template preview not available in demo</p>
              </div>
            )}

            {/* Variable Tags */}
            {templatePreviews[selectedTemplate.id] && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Merge Variables</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {[...new Set((templatePreviews[selectedTemplate.id].body + (templatePreviews[selectedTemplate.id].subject || '')).match(/\{[^}]+\}/g) || [])].map((v, i) => (
                    <span key={i} style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontFamily: 'monospace' }}>{v}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => showToast(`Editing ${selectedTemplate.name} (demo)`)}>
                <Edit3 size={14} /> Edit Template
              </button>
              <button className="btn-secondary" onClick={() => handleDuplicate(selectedTemplate)}>
                <Copy size={14} /> Duplicate
              </button>
              <button className="btn-ghost" onClick={() => showToast(`Sent test of ${selectedTemplate.name} (demo)`)}>
                <Mail size={14} /> Send Test
              </button>
              <button className="btn-ghost" style={{ color: '#f87171' }} onClick={() => handleDelete(selectedTemplate)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
