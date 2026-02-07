import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  Users,
  Image,
  FileText,
  Mail,
  GitBranch,
  BarChart3,
  UsersRound,
  Settings,
  Aperture
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/sessions', icon: Camera, label: 'Sessions' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/galleries', icon: Image, label: 'Galleries' },
  { to: '/invoices', icon: FileText, label: 'Invoices' },
  { to: '/templates', icon: Mail, label: 'Templates' },
  { to: '/workflows', icon: GitBranch, label: 'Workflows' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/team', icon: UsersRound, label: 'Team' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div style={{ marginBottom: '32px', padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <Aperture size={24} color="#8b5cf6" />
          <span style={{ fontSize: '18px', fontWeight: '700' }}>Aura Studios Demo</span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Luminance Studios
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div style={{ marginTop: 'auto', padding: '16px 14px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Enterprise Studio Plan
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
          demophoto@coreauralogix.com
        </div>
      </div>
    </nav>
  );
}
