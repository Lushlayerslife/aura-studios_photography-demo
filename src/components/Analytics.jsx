import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Camera, Users, Star, Calendar, Clock, ArrowUpRight, ArrowDownRight, BarChart3, PieChart, RotateCcw } from 'lucide-react';
import { monthlyRevenue, sessionsByType, recentSessions, clients, invoices, galleries, teamMembers } from '../data/demoData';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6mo');
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // Computed metrics
  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
  const avgMonthly = Math.round(totalRevenue / monthlyRevenue.length);
  const lastMonth = monthlyRevenue[monthlyRevenue.length - 1]?.revenue || 0;
  const prevMonth = monthlyRevenue[monthlyRevenue.length - 2]?.revenue || 0;
  const revenueGrowth = prevMonth > 0 ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100) : 0;

  const totalSessions = recentSessions.length;
  const completedSessions = recentSessions.filter(s => s.status === 'Delivered' || s.status === 'Review').length;
  const avgSessionValue = Math.round(invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length);
  const collectionRate = Math.round((invoices.reduce((sum, inv) => sum + inv.paid, 0) / invoices.reduce((sum, inv) => sum + inv.amount, 0)) * 100);

  const totalClients = clients.length;
  const vipClients = clients.filter(c => c.status === 'VIP').length;
  const avgRating = (teamMembers.filter(t => t.rating).reduce((sum, t) => sum + t.rating, 0) / teamMembers.filter(t => t.rating).length).toFixed(1);

  const galleriesDelivered = galleries.filter(g => g.status === 'Delivered' || g.status === 'Completed').length;
  const avgSelectionRate = Math.round(galleries.reduce((sum, g) => sum + (g.selected / g.total) * 100, 0) / galleries.length);

  // Revenue chart - bar chart using divs
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  // Session type breakdown
  const typeCounts = {};
  recentSessions.forEach(s => { typeCounts[s.type] = (typeCounts[s.type] || 0) + 1; });
  const typeData = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const typeColors = ['#a78bfa', '#34d399', '#60a5fa', '#fbbf24', '#f472b6', '#fb923c', '#818cf8'];

  // Session status breakdown
  const statusCounts = {};
  recentSessions.forEach(s => { statusCounts[s.status] = (statusCounts[s.status] || 0) + 1; });
  const statusData = Object.entries(statusCounts).sort((a, b) => b[1] - a[1]);
  const statusChartColors = { 'Booked': '#60a5fa', 'Prep': '#a78bfa', 'Shot': '#f472b6', 'Editing': '#fbbf24', 'Delivered': '#34d399', 'Review': '#818cf8' };

  // Top clients by revenue
  const topClients = [...clients].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

  // Photographer stats
  const photographerStats = teamMembers.filter(t => t.completedSessions > 0).sort((a, b) => b.completedSessions - a.completedSessions);

  const MetricCard = ({ label, value, icon: Icon, color, change, changeLabel }) => (
    <div className="glass-card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ color: '#94a3b8', fontSize: 13 }}>{label}</span>
        <Icon size={18} color={color} />
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: 'white', marginBottom: 4 }}>{value}</div>
      {change !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
          {change >= 0 ? <ArrowUpRight size={14} color="#34d399" /> : <ArrowDownRight size={14} color="#f87171" />}
          <span style={{ color: change >= 0 ? '#34d399' : '#f87171', fontWeight: 600 }}>{change >= 0 ? '+' : ''}{change}%</span>
          <span style={{ color: '#64748b' }}>{changeLabel}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="main-content">
      {/* Toasts */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: '#065f46', color: 'white', padding: '12px 20px', borderRadius: 8, fontSize: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>{t.message}</div>
        ))}
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p style={{ color: '#94a3b8', marginTop: 4 }}>Studio performance overview</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['30d', '6mo', '1yr'].map(range => (
            <button key={range} className={`filter-btn ${timeRange === range ? 'active' : ''}`} onClick={() => { setTimeRange(range); showToast(`Showing ${range} data`); }}>
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <MetricCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} color="#a78bfa" change={revenueGrowth} changeLabel="vs last month" />
        <MetricCard label="Avg Session Value" value={`$${avgSessionValue.toLocaleString()}`} icon={TrendingUp} color="#34d399" change={12} changeLabel="vs avg" />
        <MetricCard label="Collection Rate" value={`${collectionRate}%`} icon={BarChart3} color="#60a5fa" change={3} changeLabel="vs last month" />
        <MetricCard label="Client Rating" value={avgRating} icon={Star} color="#fbbf24" />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Revenue Bar Chart */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 2 }}>Monthly Revenue</h3>
              <p style={{ fontSize: 12, color: '#64748b' }}>Last 6 months</p>
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#a78bfa' }}>${avgMonthly.toLocaleString()}/mo avg</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180 }}>
            {monthlyRevenue.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>${(m.revenue / 1000).toFixed(1)}k</span>
                <div style={{
                  width: '100%',
                  height: `${(m.revenue / maxRevenue) * 140}px`,
                  background: i === monthlyRevenue.length - 1 ? 'linear-gradient(to top, #7c3aed, #a78bfa)' : 'linear-gradient(to top, rgba(167,139,250,0.3), rgba(167,139,250,0.5))',
                  borderRadius: '6px 6px 2px 2px',
                  transition: 'height 0.5s ease',
                  minHeight: 20
                }} />
                <span style={{ fontSize: 12, color: '#64748b' }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session Types Donut-ish */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 4 }}>Session Types</h3>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>{totalSessions} total sessions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {typeData.map(([type, count], i) => (
              <div key={type}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: 'white' }}>{type}</span>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>{count} ({Math.round((count / totalSessions) * 100)}%)</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(count / totalSessions) * 100}%`, background: typeColors[i % typeColors.length], borderRadius: 3, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Pipeline Status */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 4 }}>Session Pipeline</h3>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>Current status breakdown</p>
          <div style={{ display: 'flex', gap: 4, height: 32, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
            {statusData.map(([status, count], i) => (
              <div key={status} style={{
                flex: count,
                background: statusChartColors[status] || '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, color: 'white',
                minWidth: count > 0 ? 30 : 0,
                transition: 'flex 0.5s ease'
              }}>
                {count}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {statusData.map(([status, count]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: statusChartColors[status] || '#64748b' }} />
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{status}: {count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Performance */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 4 }}>Gallery Performance</h3>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>Delivery & selection metrics</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ textAlign: 'center', padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#34d399', marginBottom: 4 }}>{galleriesDelivered}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Galleries Delivered</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#a78bfa', marginBottom: 4 }}>{avgSelectionRate}%</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Avg Selection Rate</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#60a5fa', marginBottom: 4 }}>{galleries.length}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Total Galleries</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>2.3w</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Avg Turnaround</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Top Clients */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 16 }}>Top Clients by Revenue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topClients.map((client, i) => (
              <div key={client.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: i === 0 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : i === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' : i === 2 ? 'linear-gradient(135deg, #d97706, #b45309)' : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: i < 3 ? '#1a1a2e' : '#94a3b8', flexShrink: 0
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>{client.name}</p>
                  <p style={{ fontSize: 12, color: '#64748b' }}>{client.type} · {client.sessions} sessions</p>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#a78bfa' }}>${client.totalSpent.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 16 }}>Team Performance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {photographerStats.map(member => (
              <div key={member.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>{member.name}</span>
                    <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>{member.role}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {member.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Star size={12} color="#fbbf24" fill="#fbbf24" />
                        <span style={{ fontSize: 12, color: '#fbbf24' }}>{member.rating}</span>
                      </div>
                    )}
                    <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{member.completedSessions} sessions</span>
                  </div>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(member.completedSessions / photographerStats[0].completedSessions) * 100}%`, background: 'linear-gradient(to right, #a78bfa, #7c3aed)', borderRadius: 3, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
