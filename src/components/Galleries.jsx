import { useState } from 'react';
import { Search, Plus, X, Image, Link, Download, Eye, Clock, CheckCircle, Edit3, Send, RefreshCw } from 'lucide-react';
import { galleries } from '../data/demoData';

const statusColors = {
  'Delivered': 'badge-green',
  'Editing': 'badge-amber',
  'Review Requested': 'badge-purple',
  'Expired': 'badge-gray'
};

const statusIcons = {
  'Delivered': CheckCircle,
  'Editing': Edit3,
  'Review Requested': Eye,
  'Expired': Clock
};

export default function Galleries() {
  const [galleryList, setGalleryList] = useState(galleries);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNewGallery, setShowNewGallery] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const statuses = ['All', 'Delivered', 'Editing', 'Review Requested'];

  const filtered = galleryList.filter(g => {
    const matchesFilter = activeFilter === 'All' || g.status === activeFilter;
    const matchesSearch = g.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.session.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalImages = galleryList.reduce((sum, g) => sum + g.imageCount, 0);
  const totalSelections = galleryList.reduce((sum, g) => sum + g.selections, 0);
  const totalDownloads = galleryList.reduce((sum, g) => sum + g.downloads, 0);
  const deliveredCount = galleryList.filter(g => g.status === 'Delivered').length;

  const getDaysUntilExpiry = (expiresDate) => {
    if (!expiresDate) return null;
    const now = new Date();
    const exp = new Date(expiresDate);
    const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const handleNewGallery = (e) => {
    e.preventDefault();
    const form = e.target;
    const newGallery = {
      id: `G-${String(galleryList.length + 1).padStart(3, '0')}`,
      client: form.clientName.value,
      session: form.sessionType.value,
      imageCount: parseInt(form.imageCount.value),
      status: 'Editing',
      deliveredDate: null,
      expiresDate: null,
      link: null,
      selections: 0,
      downloads: 0,
      thumbnails: []
    };
    setGalleryList(prev => [newGallery, ...prev]);
    showToast(`Gallery created for ${newGallery.client}`);
    setShowNewGallery(false);
  };

  const advanceStatus = (gallery) => {
    const flow = { 'Editing': 'Delivered', 'Delivered': 'Review Requested', 'Review Requested': 'Delivered' };
    const nextStatus = flow[gallery.status];
    if (!nextStatus) return;

    setGalleryList(prev => prev.map(g => {
      if (g.id === gallery.id) {
        const updated = { ...g, status: nextStatus };
        if (nextStatus === 'Delivered' && !g.deliveredDate) {
          updated.deliveredDate = new Date().toISOString().split('T')[0];
          updated.expiresDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          updated.link = `https://galleries.luminancestudios.com/${g.client.toLowerCase().replace(/\s+/g, '-')}`;
        }
        return updated;
      }
      return g;
    }));
    showToast(`${gallery.client} → ${nextStatus}`);
    setSelectedGallery(null);
  };

  return (
    <div className="main-content">
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>🖼️ Galleries</h1>
          <p>Manage client galleries, proofing, and delivery</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary" onClick={() => setShowNewGallery(true)}>
            <Plus size={16} /> New Gallery
          </button>
          <button className="btn btn-secondary" onClick={() => { setGalleryList(galleries); setActiveFilter('All'); setSearchTerm(''); showToast('Demo data reset', 'info'); }}>
            Reset Demo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">Total Galleries</div>
          <div className="stat-value">{galleryList.length}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Total Images</div>
          <div className="stat-value">{totalImages.toLocaleString()}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Client Selections</div>
          <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>{totalSelections}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Downloads</div>
          <div className="stat-value" style={{ color: 'var(--accent-green)' }}>{totalDownloads}</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Delivered</div>
          <div className="stat-value">{deliveredCount}</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
        <div className="search-bar" style={{ flex: 1 }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            placeholder="Search by client, session type, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="tabs" style={{ marginBottom: 0, borderBottom: 'none' }}>
          {statuses.map(status => (
            <button
              key={status}
              className={`tab ${activeFilter === status ? 'active' : ''}`}
              onClick={() => setActiveFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
        {filtered.map(gallery => {
          const StatusIcon = statusIcons[gallery.status] || Clock;
          const daysLeft = getDaysUntilExpiry(gallery.expiresDate);
          const hasThumbs = gallery.thumbnails && gallery.thumbnails.length > 0;

          return (
            <div
              key={gallery.id}
              className="glass-card"
              style={{ padding: '0', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setSelectedGallery(gallery)}
            >
              {/* Photo thumbnail mosaic */}
              {hasThumbs ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '2px',
                  height: '140px',
                  position: 'relative'
                }}>
                  {gallery.thumbnails.slice(0, 3).map((url, i) => (
                    <div key={i} style={{
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img
                        src={url}
                        alt=""
                        style={{
                          width: '100%',
                          height: '140px',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                  {/* Image count overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'white'
                  }}>
                    <Image size={12} /> {gallery.imageCount}
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '140px'
                }}>
                  <Image size={28} color="var(--accent-purple)" style={{ opacity: 0.7 }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>{gallery.imageCount}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>images</div>
                  </div>
                </div>
              )}

              {/* Card body */}
              <div style={{ padding: '16px 20px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '2px' }}>{gallery.client}</h3>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{gallery.session}</span>
                  </div>
                  <span className={`badge ${statusColors[gallery.status]}`}>
                    <StatusIcon size={12} /> {gallery.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '13px', marginTop: '12px' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>Selections</div>
                    <div style={{ fontWeight: 600 }}>{gallery.selections}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>Downloads</div>
                    <div style={{ fontWeight: 600 }}>{gallery.downloads}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>Expires</div>
                    <div style={{ fontWeight: 500, color: daysLeft !== null && daysLeft < 7 ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                      {daysLeft !== null ? (daysLeft > 0 ? `${daysLeft}d` : 'Expired') : '—'}
                    </div>
                  </div>
                </div>

                {gallery.link && (
                  <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Link size={12} /> Gallery link active
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          No galleries found matching your filters.
        </div>
      )}

      {/* Gallery Detail Modal */}
      {selectedGallery && (
        <div className="modal-overlay" onClick={() => setSelectedGallery(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <h2>{selectedGallery.client}</h2>
              <button className="modal-close" onClick={() => setSelectedGallery(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Thumbnail strip in modal */}
            {selectedGallery.thumbnails && selectedGallery.thumbnails.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '4px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}>
                {selectedGallery.thumbnails.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span className={`badge ${statusColors[selectedGallery.status]}`}>{selectedGallery.status}</span>
              <span className="badge badge-gray">{selectedGallery.session}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Gallery ID</span>
              <span className="detail-value">{selectedGallery.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Total Images</span>
              <span className="detail-value">{selectedGallery.imageCount}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Client Selections</span>
              <span className="detail-value">{selectedGallery.selections} of {selectedGallery.imageCount}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Downloads</span>
              <span className="detail-value">{selectedGallery.downloads}</span>
            </div>
            {selectedGallery.deliveredDate && (
              <div className="detail-row">
                <span className="detail-label">Delivered</span>
                <span className="detail-value">
                  {new Date(selectedGallery.deliveredDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            )}
            {selectedGallery.expiresDate && (
              <div className="detail-row">
                <span className="detail-label">Expires</span>
                <span className="detail-value" style={{ color: getDaysUntilExpiry(selectedGallery.expiresDate) < 7 ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                  {new Date(selectedGallery.expiresDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  {getDaysUntilExpiry(selectedGallery.expiresDate) !== null && (
                    <span style={{ marginLeft: '8px', fontSize: '12px', opacity: 0.7 }}>
                      ({getDaysUntilExpiry(selectedGallery.expiresDate) > 0 ? `${getDaysUntilExpiry(selectedGallery.expiresDate)} days left` : 'Expired'})
                    </span>
                  )}
                </span>
              </div>
            )}
            {selectedGallery.link && (
              <div className="detail-row">
                <span className="detail-label">Gallery Link</span>
                <span className="detail-value" style={{ color: 'var(--accent-purple)', fontSize: '13px', wordBreak: 'break-all' }}>{selectedGallery.link}</span>
              </div>
            )}

            {/* Progress bar for selections */}
            {selectedGallery.imageCount > 0 && selectedGallery.selections > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>Selection Progress</span>
                  <span>{Math.round((selectedGallery.selections / selectedGallery.imageCount) * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(139,92,246,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(selectedGallery.selections / selectedGallery.imageCount) * 100}%`,
                    background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue))',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
              {selectedGallery.status !== 'Delivered' || selectedGallery.status === 'Review Requested' ? (
                <button className="btn btn-primary" onClick={() => advanceStatus(selectedGallery)}>
                  <Send size={14} /> {selectedGallery.status === 'Editing' ? 'Deliver Gallery' : selectedGallery.status === 'Review Requested' ? 'Mark Delivered' : 'Advance Status'}
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => { showToast(`Reminder sent to ${selectedGallery.client}`); setSelectedGallery(null); }}>
                  <Send size={14} /> Send Reminder
                </button>
              )}
              {selectedGallery.link && (
                <button className="btn btn-secondary" onClick={() => { showToast('Gallery link copied to clipboard'); setSelectedGallery(null); }}>
                  <Link size={14} /> Copy Link
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => {
                setGalleryList(prev => prev.map(g => g.id === selectedGallery.id ? { ...g, expiresDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } : g));
                showToast(`Gallery extended 30 days for ${selectedGallery.client}`);
                setSelectedGallery(null);
              }}>
                <RefreshCw size={14} /> Extend 30 Days
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Gallery Modal */}
      {showNewGallery && (
        <div className="modal-overlay" onClick={() => setShowNewGallery(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Gallery</h2>
              <button className="modal-close" onClick={() => setShowNewGallery(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewGallery}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Client Name *</label>
                  <input name="clientName" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="e.g. Sarah & Tom Wilson" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Session Type *</label>
                    <select name="sessionType" required style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Family">Family</option>
                      <option value="Newborn">Newborn</option>
                      <option value="Headshot">Headshot</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Product Catalog">Product Catalog</option>
                      <option value="Brand Content">Brand Content</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Image Count *</label>
                    <input name="imageCount" type="number" required min="1" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} placeholder="e.g. 120" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button type="submit" className="btn btn-primary">Create Gallery</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowNewGallery(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
