import { useState } from 'react';
import { Search, Plus, X, Mail, Phone, Calendar, DollarSign, Star, UserPlus } from 'lucide-react';
import { clients } from '../data/demoData';

const statusColors = { 'Active': 'badge-green', 'VIP': 'badge-purple', 'Corporate': 'badge-blue', 'Inactive': 'badge-gray' };
const typeColors = { 'Wedding': 'badge-pink', 'Family': 'badge-amber', 'Commercial': 'badge-blue', 'Headshot': 'badge-gray', 'Engagement': 'badge-purple', 'Newborn': 'badge-green', 'Event': 'badge-amber' };

export default function Clients() {
  const [clientList, setClientList] = useState(clients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNewClient, setShowNewClient] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const statuses = ['All', 'Active', 'VIP', 'Corporate', 'Inactive'];
  const filtered = clientList.filter(c => {
    const matchesFilter = activeFilter === 'All' || c.status === activeFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = clientList.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpend = Math.round(totalRevenue / clientList.length);
  const vipCount = clientList.filter(c => c.status === 'VIP').length;
  const totalSessions = clientList.reduce((sum, c) => sum + c.sessions, 0);

  const handleNewClient = (e) => {
    e.preventDefault();
    const form = e.target;
    const newClient = { id: `C-${String(clientList.length + 1).padStart(3, '0')}`, name: form.clientName.value, email: form.email.value, phone: form.phone.value, sessions: 0, totalSpent: 0, lastSession: 'No sessions yet', status: 'Active', type: form.clientType.value, notes: form.notes.value };
    setClientList(prev => [newClient, ...prev]);
    showToast(`${newClient.name} added to client list`);
    setShowNewClient(false);
  };

  return (
    <div className="main-content">
      <div className="toast-container">{toasts.map(toast => (<div key={toast.id} className={`toast toast-${toast.type}`}>{toast.message}</div>))}</div>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>👥 Clients</h1><p>Manage your client relationships and history</p></div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary" onClick={() => setShowNewClient(true)}><UserPlus size={16} /> New Client</button>
          <button className="btn btn-secondary" onClick={() => { setClientList(clients); setActiveFilter('All'); setSearchTerm(''); showToast('Demo data reset', 'info'); }}>Reset Demo</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card"><div className="stat-label">Total Clients</div><div className="stat-value">{clientList.length}</div></div>
        <div className="glass-card stat-card"><div className="stat-label">Total Revenue</div><div className="stat-value" style={{ color: 'var(--accent-green)' }}>${totalRevenue.toLocaleString()}</div></div>
        <div className="glass-card stat-card"><div className="stat-label">Avg Spend / Client</div><div className="stat-value">${avgSpend.toLocaleString()}</div></div>
        <div className="glass-card stat-card"><div className="stat-label">VIP Clients</div><div className="stat-value" style={{ color: 'var(--accent-purple)' }}>{vipCount}</div></div>
        <div className="glass-card stat-card"><div className="stat-label">Total Sessions</div><div className="stat-value">{totalSessions}</div></div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
        <div className="search-bar" style={{ flex: 1 }}><Search size={16} color="var(--text-muted)" /><input placeholder="Search by name, email, or type..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="tabs" style={{ marginBottom: 0, borderBottom: 'none' }}>{statuses.map(status => (<button key={status} className={`tab ${activeFilter === status ? 'active' : ''}`} onClick={() => setActiveFilter(status)}>{status}</button>))}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
        {filtered.map(client => (
          <div key={client.id} className="glass-card" style={{ padding: '20px', cursor: 'pointer' }} onClick={() => setSelectedClient(client)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div><h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>{client.name}</h3><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{client.email}</span></div>
              <span className={`badge ${statusColors[client.status]}`}>{client.status}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}><span className={`badge ${typeColors[client.type] || 'badge-gray'}`}>{client.type}</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '13px' }}>
              <div><div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>Sessions</div><div style={{ fontWeight: 600 }}>{client.sessions}</div></div>
              <div><div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>Revenue</div><div style={{ fontWeight: 600, color: 'var(--accent-green)' }}>${client.totalSpent.toLocaleString()}</div></div>
              <div><div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>Last Session</div><div style={{ fontWeight: 500 }}>{client.lastSession === 'No sessions yet' ? '—' : new Date(client.lastSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div></div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (<div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>No clients found matching your filters.</div>)}

      {selectedClient && (
        <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>{selectedClient.name}</h2><button className="modal-close" onClick={() => setSelectedClient(null)}><X size={20} /></button></div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><span className={`badge ${statusColors[selectedClient.status]}`}>{selectedClient.status}</span><span className={`badge ${typeColors[selectedClient.type] || 'badge-gray'}`}>{selectedClient.type}</span></div>
            <div className="detail-row"><span className="detail-label">Client ID</span><span className="detail-value">{selectedClient.id}</span></div>
            <div className="detail-row"><span className="detail-label">Email</span><span className="detail-value">{selectedClient.email}</span></div>
            <div className="detail-row"><span className="detail-label">Phone</span><span className="detail-value">{selectedClient.phone}</span></div>
            <div className="detail-row"><span className="detail-label">Total Sessions</span><span className="detail-value">{selectedClient.sessions}</span></div>
            <div className="detail-row"><span className="detail-label">Total Revenue</span><span className="detail-value" style={{ color: 'var(--accent-green)' }}>${selectedClient.totalSpent.toLocaleString()}</span></div>
            <div className="detail-row"><span className="detail-label">Last Session</span><span className="detail-value">{selectedClient.lastSession === 'No sessions yet' ? '—' : new Date(selectedClient.lastSession).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
            {selectedClient.notes && (<div style={{ marginTop: '16px', padding: '12px', background: 'rgba(139,92,246,0.08)', borderRadius: '8px', border: '1px solid rgba(139,92,246,0.15)' }}><div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Notes</div><div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{selectedClient.notes}</div></div>)}
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => { showToast(`New session started for ${selectedClient.name}`); setSelectedClient(null); }}><Calendar size={14} /> Book Session</button>
              <button className="btn btn-secondary" onClick={() => { showToast(`Email sent to ${selectedClient.email}`); setSelectedClient(null); }}><Mail size={14} /> Send Email</button>
              <button className="btn btn-secondary" onClick={() => { showToast(`Invoice created for ${selectedClient.name}`); setSelectedClient(null); }}><DollarSign size={14} /> Create Invoice</button>
              {selectedClient.status !== 'VIP' && (<button className="btn btn-secondary" onClick={() => { setClientList(prev => prev.map(c => c.id === selectedClient.id ? { ...c, status: 'VIP' } : c)); showToast(`${selectedClient.name} upgraded to VIP!`); setSelectedClient(null); }}><Star size={14} /> Upgrade to VIP</button>)}
            </div>
          </div>
        </div>
      )}

      {showNewClient && (
        <div className="modal-overlay" onClick={() => setShowNewClient(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>New Client</h2><button className="modal-close" onClick={() => setShowNewClient(false)}><X size={20} /></button></div>
            <form onSubmit={handleNewClient}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Client Name *</label><input name="clientName" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="e.g. Sarah & Tom Wilson" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email *</label><input name="email" type="email" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="email@example.com" /></div>
                  <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Phone</label><input name="phone" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="(512) 555-0000" /></div>
                </div>
                <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Client Type *</label><select name="clientType" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}><option value="Wedding">Wedding</option><option value="Family">Family</option><option value="Commercial">Commercial</option><option value="Headshot">Headshot</option><option value="Engagement">Engagement</option><option value="Newborn">Newborn</option><option value="Event">Event</option></select></div>
                <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Notes</label><textarea name="notes" rows={3} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Any relevant notes about the client..." /></div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}><button type="submit" className="btn btn-primary">Add Client</button><button type="button" className="btn btn-secondary" onClick={() => setShowNewClient(false)}>Cancel</button></div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
