import { useState } from 'react';
import { Camera, Search, Filter, Plus, X, ArrowUpRight } from 'lucide-react';
import { recentSessions } from '../data/demoData';

const statusColors = {
  'Booked': 'badge-blue',
  'Prep Sent': 'badge-purple',
  'Shot': 'badge-amber',
  'Editing': 'badge-pink',
  'Delivered': 'badge-green',
  'Review Requested': 'badge-gray'
};

const allStatuses = ['All', 'Booked', 'Prep Sent', 'Shot', 'Editing', 'Delivered', 'Review Requested'];

export default function Sessions() {
  const [sessions, setSessions] = useState(recentSessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSession, setShowNewSession] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const filtered = sessions.filter(s => {
    const matchesFilter = activeFilter === 'All' || s.status === activeFilter;
    const matchesSearch = s.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.photographer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const advanceStatus = (session) => {
    const flow = ['Booked', 'Prep Sent', 'Shot', 'Editing', 'Delivered', 'Review Requested'];
    const currentIndex = flow.indexOf(session.status);
    if (currentIndex < flow.length - 1) {
      const newStatus = flow[currentIndex + 1];
      setSessions(prev => prev.map(s => s.id === session.id ? { ...s, status: newStatus } : s));
      showToast(`${session.client} moved to "${newStatus}"`);
      setSelectedSession(null);
    } else {
      showToast(`${session.client} is already at final stage`, 'info');
    }
  };

  const handleNewSession = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSession = {
      id: `LS-${1009 + sessions.length}`,
      client: form.client.value,
      type: form.sessionType.value,
      date: form.date.value,
      time: form.time.value,
      photographer: form.photographer.value,
      location: form.location.value,
      status: 'Booked',
      package: form.package.value,
      value: parseInt(form.value.value) || 0
    };
    setSessions(prev => [newSession, ...prev]);
    showToast(`New session created for ${newSession.client}`);
    setShowNewSession(false);
  };

  const resetDemo = () => {
    setSessions(recentSessions);
    setActiveFilter('All');
    setSearchTerm('');
    showToast('Demo data reset to defaults', 'info');
  };

  return (
    <div className="main-content">
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>{toast.message}</div>
        ))}
      </div>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>📷 Sessions</h1>
          <p>Manage photo sessions across all stages</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary" onClick={() => setShowNewSession(true)}>
            <Plus size={16} /> New Session
          </button>
          <button className="btn btn-secondary" onClick={resetDemo}>Reset Demo</button>
        </div>
      </div>

      <div className="stats-grid">
        {allStatuses.filter(s => s !== 'All').map(status => {
          const count = sessions.filter(s => s.status === status).length;
          return (
            <div key={status} className="glass-card stat-card" style={{ cursor: 'pointer' }} onClick={() => setActiveFilter(status === activeFilter ? 'All' : status)}>
              <div className="stat-label">{status}</div>
              <div className="stat-value">{count}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
        <div className="search-bar" style={{ flex: 1 }}>
          <Search size={16} color="var(--text-muted)" />
          <input placeholder="Search by client, type, or photographer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="tabs" style={{ marginBottom: 0, borderBottom: 'none' }}>
          {allStatuses.map(status => (
            <button key={status} className={`tab ${activeFilter === status ? 'active' : ''}`} onClick={() => setActiveFilter(status)}>{status}</button>
          ))}
        </div>
      </div>

      <div className="glass-card-static" style={{ padding: '24px' }}>
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Client</th><th>Type</th><th>Date</th><th>Time</th><th>Photographer</th><th>Location</th><th>Status</th><th>Value</th></tr>
          </thead>
          <tbody>
            {filtered.map(session => (
              <tr key={session.id} onClick={() => setSelectedSession(session)}>
                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{session.id}</td>
                <td style={{ fontWeight: 500 }}>{session.client}</td>
                <td>{session.type}</td>
                <td>{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                <td>{session.time}</td>
                <td>{session.photographer}</td>
                <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{session.location}</td>
                <td><span className={`badge ${statusColors[session.status]}`}>{session.status}</span></td>
                <td style={{ color: 'var(--accent-green)' }}>${session.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No sessions found matching your filters.</div>
        )}
      </div>

      {selectedSession && (
        <div className="modal-overlay" onClick={() => setSelectedSession(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedSession.client}</h2>
              <button className="modal-close" onClick={() => setSelectedSession(null)}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: '16px' }}><span className={`badge ${statusColors[selectedSession.status]}`}>{selectedSession.status}</span></div>
            <div className="detail-row"><span className="detail-label">Session ID</span><span className="detail-value">{selectedSession.id}</span></div>
            <div className="detail-row"><span className="detail-label">Type</span><span className="detail-value">{selectedSession.type}</span></div>
            <div className="detail-row"><span className="detail-label">Date & Time</span><span className="detail-value">{new Date(selectedSession.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedSession.time}</span></div>
            <div className="detail-row"><span className="detail-label">Photographer</span><span className="detail-value">{selectedSession.photographer}</span></div>
            <div className="detail-row"><span className="detail-label">Location</span><span className="detail-value">{selectedSession.location}</span></div>
            <div className="detail-row"><span className="detail-label">Package</span><span className="detail-value">{selectedSession.package}</span></div>
            <div className="detail-row"><span className="detail-label">Value</span><span className="detail-value" style={{ color: 'var(--accent-green)' }}>${selectedSession.value.toLocaleString()}</span></div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => advanceStatus(selectedSession)}><ArrowUpRight size={14} /> Advance Status</button>
              <button className="btn btn-secondary" onClick={() => { showToast(`Prep guide sent to ${selectedSession.client}`); setSelectedSession(null); }}>Send Prep Guide</button>
              <button className="btn btn-secondary" onClick={() => { showToast(`Reminder sent to ${selectedSession.client}`); setSelectedSession(null); }}>Send Reminder</button>
              <button className="btn btn-secondary" onClick={() => { showToast(`Invoice created for $${selectedSession.value.toLocaleString()}`); setSelectedSession(null); }}>Create Invoice</button>
            </div>
          </div>
        </div>
      )}

      {showNewSession && (
        <div className="modal-overlay" onClick={() => setShowNewSession(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Session</h2>
              <button className="modal-close" onClick={() => setShowNewSession(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleNewSession}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Client Name *</label>
                  <input name="client" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="e.g. Sarah & Tom Wilson" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Session Type *</label>
                    <select name="sessionType" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}>
                      <option value="Wedding">Wedding</option><option value="Portrait">Portrait</option><option value="Family Portrait">Family Portrait</option><option value="Commercial">Commercial</option><option value="Event">Event</option><option value="Headshot">Headshot</option><option value="Newborn">Newborn</option><option value="Engagement">Engagement</option><option value="Product">Product</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Photographer *</label>
                    <select name="photographer" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}>
                      <option value="Maya Chen">Maya Chen</option><option value="Ethan Ruiz">Ethan Ruiz</option><option value="Sofia Nakamura">Sofia Nakamura</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Date *</label>
                    <input name="date" type="date" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Time *</label>
                    <input name="time" type="time" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Location *</label>
                  <input name="location" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="e.g. Luminance Main Studio" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Package</label>
                    <input name="package" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="e.g. Luxe Wedding Collection" />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Value ($)</label>
                    <input name="value" type="number" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="0" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button type="submit" className="btn btn-primary">Create Session</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowNewSession(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
