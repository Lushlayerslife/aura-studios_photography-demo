import { useState } from 'react';
import { Search, X, DollarSign, Clock, CheckCircle, AlertTriangle, Send, CreditCard, FileText, RotateCcw, Plus, ChevronDown } from 'lucide-react';
import { invoices } from '../data/demoData';

const statusColors = { 'Paid': 'badge-green', 'Partial': 'badge-amber', 'Pending': 'badge-blue', 'Overdue': 'badge-red' };

export default function Invoices() {
  const [invoiceList, setInvoiceList] = useState(invoices);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const statuses = ['All', 'Paid', 'Partial', 'Pending', 'Overdue'];
  const filtered = invoiceList.filter(inv => {
    const matchesFilter = activeFilter === 'All' || inv.status === activeFilter;
    const matchesSearch = inv.client.toLowerCase().includes(searchTerm.toLowerCase()) || inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || inv.package.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = invoiceList.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCollected = invoiceList.reduce((sum, inv) => sum + inv.paid, 0);
  const totalOutstanding = totalRevenue - totalCollected;
  const paidCount = invoiceList.filter(inv => inv.status === 'Paid').length;

  const handleMarkPaid = (inv) => {
    setInvoiceList(prev => prev.map(i => i.id === inv.id ? { ...i, status: 'Paid', paid: i.amount } : i));
    if (selectedInvoice?.id === inv.id) setSelectedInvoice({ ...inv, status: 'Paid', paid: inv.amount });
    showToast(`${inv.id} marked as paid`);
  };

  const handleSendReminder = (inv) => {
    showToast(`Payment reminder sent to ${inv.client}`);
  };

  const handleVoidInvoice = (inv) => {
    setInvoiceList(prev => prev.filter(i => i.id !== inv.id));
    setSelectedInvoice(null);
    showToast(`${inv.id} voided`, 'warning');
  };

  const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
  const formatDate = (dateStr) => new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate + 'T00:00:00');
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
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
          <h1>Invoices</h1>
          <p style={{ color: '#94a3b8', marginTop: 4 }}>{invoiceList.length} invoices · {formatCurrency(totalCollected)} collected</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-primary" onClick={() => showToast('New invoice created (demo)')}>
            <Plus size={16} /> New Invoice
          </button>
          <button className="btn-ghost" onClick={() => { setInvoiceList(invoices); showToast('Demo data reset'); }}>
            <RotateCcw size={16} /> Reset Demo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: '#a78bfa' },
          { label: 'Collected', value: formatCurrency(totalCollected), icon: CheckCircle, color: '#34d399' },
          { label: 'Outstanding', value: formatCurrency(totalOutstanding), icon: Clock, color: '#fbbf24' },
          { label: 'Paid Invoices', value: `${paidCount} of ${invoiceList.length}`, icon: FileText, color: '#60a5fa' }
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
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ paddingLeft: 36 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {statuses.map(s => (
            <button key={s} className={`filter-btn ${activeFilter === s ? 'active' : ''}`} onClick={() => setActiveFilter(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Invoice', 'Client', 'Package', 'Amount', 'Paid', 'Balance', 'Status', 'Due Date', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => {
              const balance = inv.amount - inv.paid;
              const daysUntilDue = getDaysUntilDue(inv.due);
              return (
                <tr key={inv.id} onClick={() => setSelectedInvoice(inv)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#a78bfa' }}>{inv.id}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, color: 'white' }}>{inv.client}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#94a3b8' }}>{inv.package}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: 'white' }}>{formatCurrency(inv.amount)}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, color: '#34d399' }}>{formatCurrency(inv.paid)}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: balance > 0 ? '#fbbf24' : '#34d399' }}>{formatCurrency(balance)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={`badge ${statusColors[inv.status]}`}>{inv.status}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: inv.status !== 'Paid' && daysUntilDue < 0 ? '#f87171' : inv.status !== 'Paid' && daysUntilDue <= 3 ? '#fbbf24' : '#94a3b8' }}>
                    {formatDate(inv.due)}
                    {inv.status !== 'Paid' && daysUntilDue < 0 && <span style={{ fontSize: 11, marginLeft: 6, color: '#f87171' }}>({Math.abs(daysUntilDue)}d overdue)</span>}
                    {inv.status !== 'Paid' && daysUntilDue >= 0 && daysUntilDue <= 3 && <span style={{ fontSize: 11, marginLeft: 6, color: '#fbbf24' }}>({daysUntilDue}d left)</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                      {inv.status !== 'Paid' && (
                        <>
                          <button className="btn-ghost-sm" onClick={() => handleMarkPaid(inv)} title="Mark as Paid">
                            <CheckCircle size={14} />
                          </button>
                          <button className="btn-ghost-sm" onClick={() => handleSendReminder(inv)} title="Send Reminder">
                            <Send size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>No invoices found matching your criteria.</div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>{selectedInvoice.id}</h2>
                  <span className={`badge ${statusColors[selectedInvoice.status]}`}>{selectedInvoice.status}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14 }}>{selectedInvoice.client}</p>
              </div>
              <button className="btn-ghost-sm" onClick={() => setSelectedInvoice(null)}><X size={18} /></button>
            </div>

            {/* Payment Progress */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>Payment Progress</span>
                <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{formatCurrency(selectedInvoice.paid)} of {formatCurrency(selectedInvoice.amount)}</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(selectedInvoice.paid / selectedInvoice.amount) * 100}%`, background: selectedInvoice.status === 'Paid' ? '#34d399' : '#a78bfa', borderRadius: 4, transition: 'width 0.3s ease' }} />
              </div>
              {selectedInvoice.installments && (
                <p style={{ color: '#a78bfa', fontSize: 12, marginTop: 6 }}>Installment: {selectedInvoice.installments}</p>
              )}
            </div>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Package', value: selectedInvoice.package },
                { label: 'Payment Method', value: selectedInvoice.method },
                { label: 'Invoice Date', value: formatDate(selectedInvoice.date) },
                { label: 'Due Date', value: formatDate(selectedInvoice.due) },
                { label: 'Balance Due', value: formatCurrency(selectedInvoice.amount - selectedInvoice.paid) },
                { label: 'Status', value: selectedInvoice.status }
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {selectedInvoice.status !== 'Paid' && (
                <>
                  <button className="btn-primary" onClick={() => handleMarkPaid(selectedInvoice)}>
                    <CheckCircle size={14} /> Mark as Paid
                  </button>
                  <button className="btn-secondary" onClick={() => handleSendReminder(selectedInvoice)}>
                    <Send size={14} /> Send Reminder
                  </button>
                </>
              )}
              <button className="btn-ghost" onClick={() => showToast('Invoice PDF downloaded (demo)')}>
                <FileText size={14} /> Download PDF
              </button>
              <button className="btn-ghost" style={{ color: '#f87171' }} onClick={() => handleVoidInvoice(selectedInvoice)}>
                <X size={14} /> Void Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
