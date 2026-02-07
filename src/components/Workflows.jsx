import { useState } from 'react';
import { Search, X, Play, Pause, RotateCcw, Plus, Zap, Clock, CheckCircle, ArrowRight, GitBranch, Activity, Settings, Trash2, Copy, Edit3 } from 'lucide-react';
import { workflows } from '../data/demoData';

const statusColors = { 'Active': 'badge-green', 'Paused': 'badge-amber', 'Draft': 'badge-gray' };
const triggerIcons = { 'New client created': Zap, '5 days before session': Clock, 'Session status → Editing Complete': CheckCircle, 'Invoice overdue by 3 days': Activity, '14 days after gallery delivery': GitBranch, '11 months after session': Clock };

export default function Workflows() {
  const [workflowList, setWorkflowList] = useState(workflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [runningDemo, setRunningDemo] = useState(null);
  const [demoStep, setDemoStep] = useState(-1);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const statuses = ['All', 'Active', 'Paused', 'Draft'];
  const filtered = workflowList.filter(wf => {
    const matchesFilter = activeFilter === 'All' || wf.status === activeFilter;
    const matchesSearch = wf.name.toLowerCase().includes(searchTerm.toLowerCase()) || wf.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRuns = workflowList.reduce((sum, wf) => sum + wf.timesRun, 0);
  const activeCount = workflowList.filter(wf => wf.status === 'Active').length;
  const totalSteps = workflowList.reduce((sum, wf) => sum + wf.steps.length, 0);

  const handleToggleStatus = (wf) => {
    const newStatus = wf.status === 'Active' ? 'Paused' : 'Active';
    setWorkflowList(prev => prev.map(w => w.id === wf.id ? { ...w, status: newStatus } : w));
    if (selectedWorkflow?.id === wf.id) setSelectedWorkflow({ ...wf, status: newStatus });
    showToast(`${wf.name} ${newStatus === 'Active' ? 'activated' : 'paused'}`);
  };

  const handleDuplicate = (wf) => {
    const newWf = { ...wf, id: `WF-${String(workflowList.length + 1).padStart(3, '0')}`, name: `${wf.name} (Copy)`, timesRun: 0, status: 'Draft' };
    setWorkflowList(prev => [...prev, newWf]);
    showToast(`Duplicated: ${wf.name}`);
  };

  const handleDelete = (wf) => {
    setWorkflowList(prev => prev.filter(w => w.id !== wf.id));
    setSelectedWorkflow(null);
    showToast(`Deleted: ${wf.name}`, 'warning');
  };

  const handleRunDemo = (wf) => {
    setRunningDemo(wf.id);
    setDemoStep(0);
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= wf.steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setRunningDemo(null);
            setDemoStep(-1);
            setWorkflowList(list => list.map(w => w.id === wf.id ? { ...w, timesRun: w.timesRun + 1 } : w));
            showToast(`✓ ${wf.name} completed successfully`);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const TriggerIcon = ({ trigger }) => {
    const Icon = triggerIcons[trigger] || Zap;
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
          <h1>Workflows</h1>
          <p style={{ color: '#94a3b8', marginTop: 4 }}>{workflowList.length} workflows · {totalRuns.toLocaleString()} total runs</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-primary" onClick={() => showToast('New workflow created (demo)')}>
            <Plus size={16} /> New Workflow
          </button>
          <button className="btn-ghost" onClick={() => { setWorkflowList(workflows); setRunningDemo(null); setDemoStep(-1); showToast('Demo data reset'); }}>
            <RotateCcw size={16} /> Reset Demo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Active Workflows', value: activeCount, icon: Play, color: '#34d399' },
          { label: 'Total Runs', value: totalRuns.toLocaleString(), icon: Activity, color: '#a78bfa' },
          { label: 'Automation Steps', value: totalSteps, icon: GitBranch, color: '#60a5fa' },
          { label: 'Time Saved (est.)', value: `${Math.round(totalRuns * 12)} min`, icon: Clock, color: '#fbbf24' }
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
          <input type="text" placeholder="Search workflows..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {statuses.map(s => (
            <button key={s} className={`filter-btn ${activeFilter === s ? 'active' : ''}`} onClick={() => setActiveFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Workflow Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(wf => {
          const isRunning = runningDemo === wf.id;
          return (
            <div key={wf.id} className="glass-card" style={{ padding: 24, cursor: 'pointer', transition: 'all 0.2s', borderColor: isRunning ? 'rgba(52,211,153,0.4)' : undefined }} onClick={() => !isRunning && setSelectedWorkflow(wf)} onMouseEnter={e => { if (!isRunning) { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}} onMouseLeave={e => { if (!isRunning) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: isRunning ? 'rgba(52,211,153,0.15)' : 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isRunning ? '#34d399' : '#a78bfa', transition: 'all 0.3s' }}>
                    {isRunning ? <Activity size={20} className="pulse-animation" /> : <GitBranch size={20} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 4 }}>{wf.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: 13 }}>
                      <TriggerIcon trigger={wf.trigger} />
                      <span>{wf.trigger}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge ${statusColors[wf.status]}`}>{isRunning ? 'Running...' : wf.status}</span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{wf.timesRun} runs</span>
                </div>
              </div>

              {/* Step Pipeline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
                {wf.steps.map((step, i) => {
                  let stepStatus = 'pending';
                  if (isRunning) {
                    if (i < demoStep) stepStatus = 'complete';
                    else if (i === demoStep) stepStatus = 'active';
                  }
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 500,
                        background: stepStatus === 'complete' ? 'rgba(52,211,153,0.15)' : stepStatus === 'active' ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.04)',
                        color: stepStatus === 'complete' ? '#34d399' : stepStatus === 'active' ? '#a78bfa' : '#94a3b8',
                        border: `1px solid ${stepStatus === 'complete' ? 'rgba(52,211,153,0.3)' : stepStatus === 'active' ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        transition: 'all 0.3s',
                        whiteSpace: 'nowrap'
                      }}>
                        {stepStatus === 'complete' && <span style={{ marginRight: 4 }}>✓</span>}
                        {stepStatus === 'active' && <span style={{ marginRight: 4 }}>●</span>}
                        {step}
                      </div>
                      {i < wf.steps.length - 1 && <ArrowRight size={12} color="#4a5568" />}
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }} onClick={e => e.stopPropagation()}>
                <button className="btn-ghost-sm" onClick={() => handleRunDemo(wf)} disabled={isRunning} style={{ color: isRunning ? '#64748b' : '#34d399' }} title="Run Demo">
                  <Play size={13} /> <span style={{ fontSize: 12, marginLeft: 4 }}>{isRunning ? 'Running...' : 'Test Run'}</span>
                </button>
                <button className="btn-ghost-sm" onClick={() => handleToggleStatus(wf)} title={wf.status === 'Active' ? 'Pause' : 'Activate'}>
                  {wf.status === 'Active' ? <Pause size={13} /> : <Play size={13} />}
                  <span style={{ fontSize: 12, marginLeft: 4 }}>{wf.status === 'Active' ? 'Pause' : 'Activate'}</span>
                </button>
                <button className="btn-ghost-sm" onClick={() => handleDuplicate(wf)} title="Duplicate"><Copy size={13} /></button>
                <button className="btn-ghost-sm" style={{ color: '#f87171' }} onClick={() => handleDelete(wf)} title="Delete"><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>No workflows found matching your criteria.</div>
      )}

      {/* Detail Modal */}
      {selectedWorkflow && (
        <div className="modal-overlay" onClick={() => setSelectedWorkflow(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{selectedWorkflow.name}</h2>
                  <span className={`badge ${statusColors[selectedWorkflow.status]}`}>{selectedWorkflow.status}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14 }}>{selectedWorkflow.id}</p>
              </div>
              <button className="btn-ghost-sm" onClick={() => setSelectedWorkflow(null)}><X size={18} /></button>
            </div>

            {/* Trigger */}
            <div style={{ background: 'rgba(167,139,250,0.08)', borderRadius: 10, padding: 16, marginBottom: 20, border: '1px solid rgba(167,139,250,0.2)' }}>
              <p style={{ color: '#64748b', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Trigger</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a78bfa', fontSize: 15, fontWeight: 600 }}>
                <Zap size={18} />
                {selectedWorkflow.trigger}
              </div>
            </div>

            {/* Steps Timeline */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Steps ({selectedWorkflow.steps.length})</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {selectedWorkflow.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(167,139,250,0.15)', border: '2px solid #a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      {i < selectedWorkflow.steps.length - 1 && (
                        <div style={{ width: 2, height: 24, background: 'rgba(167,139,250,0.2)' }} />
                      )}
                    </div>
                    <div style={{ paddingTop: 4, paddingBottom: i < selectedWorkflow.steps.length - 1 ? 12 : 0 }}>
                      <p style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12 }}>
                <p style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Times Run</p>
                <p style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>{selectedWorkflow.timesRun}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12 }}>
                <p style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Est. Time Saved</p>
                <p style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>{selectedWorkflow.timesRun * 12} min</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => showToast(`Editing ${selectedWorkflow.name} (demo)`)}>
                <Edit3 size={14} /> Edit Workflow
              </button>
              <button className="btn-secondary" onClick={() => handleToggleStatus(selectedWorkflow)}>
                {selectedWorkflow.status === 'Active' ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Activate</>}
              </button>
              <button className="btn-ghost" onClick={() => handleDuplicate(selectedWorkflow)}>
                <Copy size={14} /> Duplicate
              </button>
              <button className="btn-ghost" style={{ color: '#f87171' }} onClick={() => handleDelete(selectedWorkflow)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
