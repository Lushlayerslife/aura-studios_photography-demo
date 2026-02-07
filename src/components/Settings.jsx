import { useState } from 'react';
import { Save, RotateCcw, Building2, Palette, Bell, CreditCard, Shield, Globe, Camera, Mail, Phone, MapPin, Clock, CheckCircle, X } from 'lucide-react';

const defaultSettings = {
  studio: { name: 'Luminance Studios', email: 'hello@luminancestudios.com', phone: '(512) 555-0100', address: '2847 South Congress Ave, Austin, TX 78704', website: 'www.luminancestudios.com', timezone: 'America/Chicago (CST)' },
  branding: { primaryColor: '#a78bfa', accentColor: '#7c3aed', logo: 'Luminance Studios', tagline: 'Capturing Light, Creating Memories', galleryTheme: 'Dark Minimal', emailSignature: true },
  notifications: { emailBooking: true, emailReminder: true, emailDelivery: true, emailPayment: true, smsReminder: true, smsDelivery: false, digestFrequency: 'Daily' },
  billing: { currency: 'USD', taxRate: '8.25', paymentMethods: ['Stripe', 'Bank Transfer', 'Net 30'], autoReminders: true, reminderDays: '3', lateFeePercent: '0' },
  gallery: { defaultExpiry: '30', watermark: true, downloadEnabled: true, maxSelections: 'Unlimited', proofingEnabled: true, slideshow: true },
  integrations: { googleCalendar: true, stripe: true, mailchimp: false, zapier: false, quickbooks: true, cloudStorage: 'Google Drive' }
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState('studio');
  const [hasChanges, setHasChanges] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    showToast('Settings saved successfully');
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setHasChanges(false);
    showToast('Settings reset to defaults');
  };

  const tabs = [
    { id: 'studio', label: 'Studio Info', icon: Building2 },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];

  const Toggle = ({ value, onChange, label }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ fontSize: 14, color: 'white' }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative',
        background: value ? '#7c3aed' : 'rgba(255,255,255,0.1)', transition: 'background 0.2s'
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3,
          left: value ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
        }} />
      </button>
    </div>
  );

  const InputField = ({ label, value, onChange, type = 'text', icon: Icon }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {Icon && <Icon size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="search-input"
          style={{ paddingLeft: Icon ? 36 : 12, width: '100%' }}
        />
      </div>
    </div>
  );

  const SelectField = ({ label, value, onChange, options }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 14, cursor: 'pointer', outline: 'none'
      }}>
        {options.map(o => <option key={o} value={o} style={{ background: '#1a1a2e' }}>{o}</option>)}
      </select>
    </div>
  );

  const renderSection = () => {
    switch (activeTab) {
      case 'studio':
        return (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>Studio Information</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Basic details about your photography studio</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <InputField label="Studio Name" value={settings.studio.name} onChange={v => updateSetting('studio', 'name', v)} icon={Building2} />
              <InputField label="Email" value={settings.studio.email} onChange={v => updateSetting('studio', 'email', v)} icon={Mail} />
              <InputField label="Phone" value={settings.studio.phone} onChange={v => updateSetting('studio', 'phone', v)} icon={Phone} />
              <InputField label="Website" value={settings.studio.website} onChange={v => updateSetting('studio', 'website', v)} icon={Globe} />
            </div>
            <InputField label="Address" value={settings.studio.address} onChange={v => updateSetting('studio', 'address', v)} icon={MapPin} />
            <SelectField label="Timezone" value={settings.studio.timezone} onChange={v => updateSetting('studio', 'timezone', v)} options={['America/Chicago (CST)', 'America/New_York (EST)', 'America/Denver (MST)', 'America/Los_Angeles (PST)']} />
          </div>
        );

      case 'branding':
        return (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>Branding & Appearance</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Customize your studio's look and feel</p>
            <InputField label="Studio Display Name" value={settings.branding.logo} onChange={v => updateSetting('branding', 'logo', v)} />
            <InputField label="Tagline" value={settings.branding.tagline} onChange={v => updateSetting('branding', 'tagline', v)} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Primary Color</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="color" value={settings.branding.primaryColor} onChange={e => updateSetting('branding', 'primaryColor', e.target.value)} style={{ width: 40, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'transparent' }} />
                  <span style={{ fontSize: 14, color: 'white', fontFamily: 'monospace' }}>{settings.branding.primaryColor}</span>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Accent Color</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="color" value={settings.branding.accentColor} onChange={e => updateSetting('branding', 'accentColor', e.target.value)} style={{ width: 40, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'transparent' }} />
                  <span style={{ fontSize: 14, color: 'white', fontFamily: 'monospace' }}>{settings.branding.accentColor}</span>
                </div>
              </div>
            </div>
            <SelectField label="Gallery Theme" value={settings.branding.galleryTheme} onChange={v => updateSetting('branding', 'galleryTheme', v)} options={['Dark Minimal', 'Light Clean', 'Classic White', 'Modern Slate']} />
            <Toggle label="Include email signature in templates" value={settings.branding.emailSignature} onChange={v => updateSetting('branding', 'emailSignature', v)} />
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>Notification Preferences</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Control how and when you receive alerts</p>
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#a78bfa', marginBottom: 8 }}>Email Notifications</h4>
              <Toggle label="New booking confirmation" value={settings.notifications.emailBooking} onChange={v => updateSetting('notifications', 'emailBooking', v)} />
              <Toggle label="Session reminders" value={settings.notifications.emailReminder} onChange={v => updateSetting('notifications', 'emailReminder', v)} />
              <Toggle label="Gallery delivery confirmation" value={settings.notifications.emailDelivery} onChange={v => updateSetting('notifications', 'emailDelivery', v)} />
              <Toggle label="Payment received" value={settings.notifications.emailPayment} onChange={v => updateSetting('notifications', 'emailPayment', v)} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#a78bfa', marginBottom: 8 }}>SMS Notifications</h4>
              <Toggle label="Session reminders (SMS)" value={settings.notifications.smsReminder} onChange={v => updateSetting('notifications', 'smsReminder', v)} />
              <Toggle label="Gallery delivery (SMS)" value={settings.notifications.smsDelivery} onChange={v => updateSetting('notifications', 'smsDelivery', v)} />
            </div>
            <SelectField label="Email Digest Frequency" value={settings.notifications.digestFrequency} onChange={v => updateSetting('notifications', 'digestFrequency', v)} options={['Real-time', 'Daily', 'Weekly', 'Off']} />
          </div>
        );

      case 'billing':
        return (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>Billing & Payments</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Configure your payment and invoicing preferences</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <SelectField label="Currency" value={settings.billing.currency} onChange={v => updateSetting('billing', 'currency', v)} options={['USD', 'EUR', 'GBP', 'CAD', 'AUD']} />
              <InputField label="Tax Rate (%)" value={settings.billing.taxRate} onChange={v => updateSetting('billing', 'taxRate', v)} type="number" />
              <InputField label="Payment Reminder (days before due)" value={settings.billing.reminderDays} onChange={v => updateSetting('billing', 'reminderDays', v)} type="number" />
              <InputField label="Late Fee (%)" value={settings.billing.lateFeePercent} onChange={v => updateSetting('billing', 'lateFeePercent', v)} type="number" />
            </div>
            <Toggle label="Automatic payment reminders" value={settings.billing.autoReminders} onChange={v => updateSetting('billing', 'autoReminders', v)} />
            <div style={{ marginTop: 16 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 8, fontWeight: 500 }}>Accepted Payment Methods</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Stripe', 'Bank Transfer', 'Net 30', 'PayPal', 'Check'].map(method => {
                  const isActive = settings.billing.paymentMethods.includes(method);
                  return (
                    <button key={method} onClick={() => {
                      const updated = isActive ? settings.billing.paymentMethods.filter(m => m !== method) : [...settings.billing.paymentMethods, method];
                      updateSetting('billing', 'paymentMethods', updated);
                    }} style={{
                      padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: `1px solid ${isActive ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
                      background: isActive ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)', color: isActive ? '#a78bfa' : '#94a3b8', transition: 'all 0.2s'
                    }}>
                      {isActive && <span style={{ marginRight: 4 }}>✓</span>}{method}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>Gallery Settings</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Configure client gallery defaults</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <InputField label="Default Expiry (days)" value={settings.gallery.defaultExpiry} onChange={v => updateSetting('gallery', 'defaultExpiry', v)} type="number" icon={Clock} />
              <SelectField label="Max Selections" value={settings.gallery.maxSelections} onChange={v => updateSetting('gallery', 'maxSelections', v)} options={['Unlimited', '10', '20', '30', '50', '100']} />
            </div>
            <Toggle label="Watermark preview images" value={settings.gallery.watermark} onChange={v => updateSetting('gallery', 'watermark', v)} />
            <Toggle label="Allow downloads" value={settings.gallery.downloadEnabled} onChange={v => updateSetting('gallery', 'downloadEnabled', v)} />
            <Toggle label="Enable proofing mode" value={settings.gallery.proofingEnabled} onChange={v => updateSetting('gallery', 'proofingEnabled', v)} />
            <Toggle label="Enable slideshow view" value={settings.gallery.slideshow} onChange={v => updateSetting('gallery', 'slideshow', v)} />
          </div>
        );

      case 'integrations':
        return (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>Integrations</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Connect your favorite tools</p>
            {[
              { name: 'Google Calendar', key: 'googleCalendar', desc: 'Sync sessions with your calendar', connected: settings.integrations.googleCalendar },
              { name: 'Stripe', key: 'stripe', desc: 'Accept online payments', connected: settings.integrations.stripe },
              { name: 'Mailchimp', key: 'mailchimp', desc: 'Email marketing campaigns', connected: settings.integrations.mailchimp },
              { name: 'Zapier', key: 'zapier', desc: 'Connect to 5,000+ apps', connected: settings.integrations.zapier },
              { name: 'QuickBooks', key: 'quickbooks', desc: 'Accounting & bookkeeping', connected: settings.integrations.quickbooks }
            ].map(integration => (
              <div key={integration.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, marginBottom: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <p style={{ fontSize: 14, color: 'white', fontWeight: 500, marginBottom: 2 }}>{integration.name}</p>
                  <p style={{ fontSize: 12, color: '#64748b' }}>{integration.desc}</p>
                </div>
                <button onClick={() => updateSetting('integrations', integration.key, !integration.connected)} style={{
                  padding: '6px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: 'none',
                  background: integration.connected ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
                  color: integration.connected ? '#34d399' : '#94a3b8', fontWeight: 500, transition: 'all 0.2s'
                }}>
                  {integration.connected ? '✓ Connected' : 'Connect'}
                </button>
              </div>
            ))}
            <SelectField label="Cloud Storage Provider" value={settings.integrations.cloudStorage} onChange={v => updateSetting('integrations', 'cloudStorage', v)} options={['Google Drive', 'Dropbox', 'OneDrive', 'Amazon S3']} />
          </div>
        );

      default:
        return null;
    }
  };

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
          <h1>Settings</h1>
          <p style={{ color: '#94a3b8', marginTop: 4 }}>Manage your studio configuration</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {hasChanges && (
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Changes
            </button>
          )}
          <button className="btn-ghost" onClick={handleReset}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Layout: Tabs + Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Tab Navigation */}
        <div className="glass-card" style={{ padding: 8, height: 'fit-content' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 14px',
              borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
              background: activeTab === tab.id ? 'rgba(167,139,250,0.15)' : 'transparent',
              color: activeTab === tab.id ? '#a78bfa' : '#94a3b8',
              transition: 'all 0.15s', textAlign: 'left', marginBottom: 2
            }}>
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="glass-card" style={{ padding: 28 }}>
          {renderSection()}
        </div>
      </div>

      {/* Unsaved Changes Bar */}
      {hasChanges && (
        <div style={{
          position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(124,58,237,0.95)', backdropFilter: 'blur(12px)', padding: '12px 24px',
          borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          border: '1px solid rgba(167,139,250,0.3)', zIndex: 100
        }}>
          <span style={{ color: 'white', fontSize: 14 }}>You have unsaved changes</span>
          <button onClick={handleSave} style={{ background: 'white', color: '#7c3aed', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Save Changes
          </button>
          <button onClick={() => { setSettings(defaultSettings); setHasChanges(false); }} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
            Discard
          </button>
        </div>
      )}
    </div>
  );
}
