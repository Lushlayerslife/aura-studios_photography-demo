import { useState } from 'react';
import { Search, X, Mail, Phone, Camera, Star, Calendar, RotateCcw, Plus, Edit3, UserCheck, UserX, Clock, Award, ChevronRight } from 'lucide-react';
import { teamMembers } from '../data/demoData';

const statusColors = { 'Active': 'badge-green', 'On Leave': 'badge-amber', 'Inactive': 'badge-gray' };
const specialtyColors = { 'Wedding': '#f472b6', 'Commercial': '#60a5fa', 'Product': '#a78bfa', 'Event': '#fbbf24', 'Engagement': '#f472b6', 'Family': '#34d399', 'Newborn': '#fb923c', 'Headshot': '#94a3b8', 'Portrait': '#818cf8', 'Color Grading': '#a78bfa', 'Retouching': '#60a5fa', 'Album Design': '#f472b6', 'Scheduling': '#34d399', 'Client Relations': '#fbbf24', 'Operations': '#94a3b8' };

export default function Team() {
  const [memberList, setMemberList] = useState(teamMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const roles = ['All', ...new Set(memberList.map(m => m.role))];
  const filtered = memberList.filter(m => {
    const matchesFilter = activeFilter === 'All' || m.role === activeFilter;
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase()) || m.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const totalCompleted = memberList.reduce((sum, m) => sum + m.completedSessions, 0);
  const totalActive = memberList.reduce((sum, m) => sum + m.activeSessions, 0);
  const avgRating = (memberList.filter(m => m.rating).reduce((sum, m) => sum + m.rating, 0) / memberList.filter(m => m.rating).length).toFixed(1);

  const handleToggleStatus = (member) => {
    const newStatus = member.status === 'Active' ? 'On Leave' : 'Active';
    setMemberList(prev => prev.map(m => m.id === member.id ? { ...m, status: newStatus } : m));
    if (selectedMember?.id === member.id) setSelectedMember({ ...member, status: newStatus });
    showToast(`${member.name} marked as ${newStatus}`);
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');
  const initialsColors = ['#7c3aed', '#059669', '#dc2626', '#d97706', '#2563eb'];

  return (
    <div className="main-content">
      {/* Toasts */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: t.type === 'success' ? '#065f46' : '#92400e', color: 'white', padding: '12px 20px', borderRadius: 8, fontSize: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>{t.message}</div>
        ))}
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Team</h1>
          <p style={{ color: '#94a3b8', marginTop: 4 }}>{memberList.length} team members · {totalActive} active sessions</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-primary" onClick={() => showToast('New team member added (demo)')}>
            <Plus size={16} /> Add Member
          </button>
          <button className="btn-ghost" onClick={() => { setMemberList(teamMembers); showToast('Demo data reset'); }}>
            <RotateCcw size={16} /> Reset Demo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Team Size', value: memberList.length, icon: UserCheck, color: '#a78bfa' },
          { label: 'Active Sessions', value: totalActive, icon: Camera, color: '#60a5fa' },
          { label: 'Completed Sessions', value: totalCompleted, icon: Award, color: '#34d399' },
          { label: 'Avg Rating', value: `${avgRating} ★`, icon: Star, color: '#fbbf24' }
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{stat.label}</span>
              <stat.icon size={18} color={stat.color} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input type="text" placeholder="Search team members..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['All', 'Active', 'On Leave'].map(s => (
            <button key={s} className={`filter-btn ${activeFilter === s ? 'active' : ''}`} onClick={() => setActiveFilter(s === activeFilter ? 'All' : s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Team Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {filtered.map((member, idx) => (
          <div key={member.id} className="glass-card" style={{ padding: 24, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setSelectedMember(member)} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            {/* Top section */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${initialsColors[idx % initialsColors.length]}, ${initialsColors[(idx + 2) % initialsColors.length]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700, color: 'white', letterSpacing: 1
              }}>
                {getInitials(member.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'white' }}>{member.name}</h3>
                  <span className={`badge ${statusColors[member.status]}`}>{member.status}</span>
                </div>
                <p style={{ fontSize: 13, color: '#a78bfa', fontWeight: 500 }}>{member.role}</p>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{member.availability}</p>
              </div>
              {member.rating && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#fbbf24' }}>{member.rating}</span>
                </div>
              )}
            </div>

            {/* Specialties */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {member.specialties.map(s => (
                <span key={s} style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500, background: `${specialtyColors[s] || '#64748b'}20`, color: specialtyColors[s] || '#94a3b8', border: `1px solid ${specialtyColors[s] || '#64748b'}30` }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#60a5fa' }}>{member.activeSessions}</p>
                <p style={{ fontSize: 11, color: '#64748b' }}>Active</p>
              </div>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#34d399' }}>{member.completedSessions}</p>
                <p style={{ fontSize: 11, color: '#64748b' }}>Completed</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: 12 }}>
                <span>View profile</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: `linear-gradient(135deg, ${initialsColors[memberList.indexOf(selectedMember) % initialsColors.length]}, ${initialsColors[(memberList.indexOf(selectedMember) + 2) % initialsColors.length]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 700, color: 'white', letterSpacing: 1
                }}>
                  {getInitials(selectedMember.name)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>{selectedMember.name}</h2>
                    <span className={`badge ${statusColors[selectedMember.status]}`}>{selectedMember.status}</span>
                  </div>
                  <p style={{ color: '#a78bfa', fontSize: 14, fontWeight: 500 }}>{selectedMember.role}</p>
                </div>
              </div>
              <button className="btn-ghost-sm" onClick={() => setSelectedMember(null)}><X size={18} /></button>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={16} color="#64748b" />
                <div>
                  <p style={{ fontSize: 11, color: '#64748b' }}>Email</p>
                  <p style={{ fontSize: 13, color: '#60a5fa' }}>{selectedMember.email}</p>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={16} color="#64748b" />
                <div>
                  <p style={{ fontSize: 11, color: '#64748b' }}>Phone</p>
                  <p style={{ fontSize: 13, color: 'white' }}>{selectedMember.phone}</p>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Active', value: selectedMember.activeSessions, color: '#60a5fa' },
                { label: 'Completed', value: selectedMember.completedSessions, color: '#34d399' },
                { label: 'Rating', value: selectedMember.rating ? `${selectedMember.rating} ★` : 'N/A', color: '#fbbf24' }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Specialties</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {selectedMember.specialties.map(s => (
                  <span key={s} style={{ padding: '5px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500, background: `${specialtyColors[s] || '#64748b'}20`, color: specialtyColors[s] || '#94a3b8', border: `1px solid ${specialtyColors[s] || '#64748b'}30` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Availability</p>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Clock size={16} color="#64748b" />
                <span style={{ color: 'white', fontSize: 14 }}>{selectedMember.availability}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => showToast(`Editing ${selectedMember.name}'s profile (demo)`)}>
                <Edit3 size={14} /> Edit Profile
              </button>
              <button className="btn-secondary" onClick={() => showToast(`Assigned session to ${selectedMember.name} (demo)`)}>
                <Calendar size={14} /> Assign Session
              </button>
              <button className="btn-ghost" onClick={() => handleToggleStatus(selectedMember)}>
                {selectedMember.status === 'Active' ? <><UserX size={14} /> Set On Leave</> : <><UserCheck size={14} /> Set Active</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
