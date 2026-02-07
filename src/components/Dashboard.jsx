import { useState } from 'react';
import {
  DollarSign, Camera, Users, Image, TrendingUp, Calendar, Clock, Star,
  ArrowUpRight, ArrowDownRight, X
} from 'lucide-react';
import { studioStats, recentSessions, monthlyRevenue, sessionsByType } from '../data/demoData';

const statusColors = {
  'Booked': 'badge-blue',
  'Prep Sent': 'badge-purple',
  'Shot': 'badge-amber',
  'Editing': 'badge-pink',
  'Delivered': 'badge-green',
  'Review Requested': 'badge-gray'
};

export default function Dashboard() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  return (
    <div className="main-content">
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>{toast.message}</div>
        ))}
      </div>

      <div className="page-header">
        <h1>📸 Photography Command Center</h1>
        <p>Luminance Studios — Enterprise Studio Overview</p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">Monthly Revenue</div>
          <div className="stat-value" style={{ color: 'var(--accent-green)' }}>${studioStats.monthlyRevenue.toLocaleString()}</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +12.4% vs last month</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Total Sessions</div>
          <div className="stat-value">{studioStats.totalSessions}</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +8 this week</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Active Clients</div>
          <div className="stat-value">{studioStats.activeClients}</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> +5 new this month</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Galleries Delivered</div>
          <div className="stat-value">{studioStats.galleriesDelivered}</div>
          <div className="stat-change positive"><ArrowUpRight size={12} /> 98% on-time</div>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="glass-card stat-card">
          <div className="stat-label">Avg Session Value</div>
          <div className="stat-value">${studioStats.avgSessionValue.toLocaleString()}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Booking Rate</div>
          <div className="stat-value">{studioStats.bookingRate}%</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Client Retention</div>
          <div className="stat-value">{studioStats.clientRetention}%</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Team Utilization</div>
          <div className="stat-value">{studioStats.teamUtilization}%</div>
        </div>
      </div>

      <div className="glass-card-static" style={{ padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '16px' }}>Revenue Trend (6 Months)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
          {monthlyRevenue.map((m, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>${(m.revenue / 1000).toFixed(1)}k</span>
              <div style={{
                width: '100%', maxWidth: '60px',
                height: `${(m.revenue / maxRevenue) * 120}px`,
                background: i === monthlyRevenue.length - 1
                  ? 'linear-gradient(to top, #8b5cf6, #a78bfa)'
                  : 'linear-gradient(to top, rgba(139,92,246,0.3), rgba(139,92,246,0.5))',
                borderRadius: '6px 6px 0 0', transition: 'height 0.3s ease'
              }} />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div className="glass-card-static" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Recent Sessions</h3>
          <table className="data-table">
            <thead>
              <tr><th>Client</th><th>Type</th><th>Date</th><th>Photographer</th><th>Status</th><th>Value</th></tr>
            </thead>
            <tbody>
              {recentSessions.map(session => (
                <tr key={session.id} onClick={() => setSelectedSession(session)}>
                  <td style={{ fontWeight: 500 }}>{session.client}</td>
                  <td>{session.type}</td>
                  <td>{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td>{session.photographer}</td>
                  <td><span className={`badge ${statusColors[session.status]}`}>{session.status}</span></td>
                  <td>${session.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card-static" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Sessions by Type</h3>
          {sessionsByType.map((s, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px' }}>{s.type}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.count} sessions</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(s.count / Math.max(...sessionsByType.map(x => x.count))) * 100}%`, background: 'var(--accent-purple)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSession && (
        <div className="modal-overlay" onClick={() => setSelectedSession(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedSession.client}</h2>
              <button className="modal-close" onClick={() => setSelectedSession(null)}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <span className={`badge ${statusColors[selectedSession.status]}`}>{selectedSession.status}</span>
            </div>
            <div className="detail-row"><span className="detail-label">Session ID</span><span className="detail-value">{selectedSession.id}</span></div>
            <div className="detail-row"><span className="detail-label">Type</span><span className="detail-value">{selectedSession.type}</span></div>
            <div className="detail-row"><span className="detail-label">Date & Time</span><span className="detail-value">{new Date(selectedSession.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedSession.time}</span></div>
            <div className="detail-row"><span className="detail-label">Photographer</span><span className="detail-value">{selectedSession.photographer}</span></div>
            <div className="detail-row"><span className="detail-label">Location</span><span className="detail-value">{selectedSession.location}</span></div>
            <div className="detail-row"><span className="detail-label">Package</span><span className="detail-value">{selectedSession.package}</span></div>
            <div className="detail-row"><span className="detail-label">Value</span><span className="detail-value" style={{ color: 'var(--accent-green)' }}>${selectedSession.value.toLocaleString()}</span></div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={() => { showToast(`Prep guide sent to ${selectedSession.client}`); setSelectedSession(null); }}>Send Prep Guide</button>
              <button className="btn btn-secondary" onClick={() => { showToast(`Session ${selectedSession.id} updated`); setSelectedSession(null); }}>Update Status</button>
              <button className="btn btn-secondary" onClick={() => { showToast(`Invoice created for ${selectedSession.client}`); setSelectedSession(null); }}>Create Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
