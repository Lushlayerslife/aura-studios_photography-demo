import { useState } from 'react';
import { Camera, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL;
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD;

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        onLogin();
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 40%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Background decoration */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)' }} />
      </div>

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20, margin: '0 auto 20px',
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(124,58,237,0.3)'
          }}>
            <Camera size={36} color="white" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 6, letterSpacing: '-0.5px' }}>
            Luminance Studios
          </h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>Photography Studio Management</p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 32,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 4 }}>Sign in</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Enter your credentials to access the demo</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="demophoto@coreauralogix.com"
                  required
                  style={{
                    width: '100%', padding: '12px 12px 12px 40px', borderRadius: 10,
                    border: `1px solid ${error ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 14,
                    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(167,139,250,0.5)'}
                  onBlur={e => e.target.style.borderColor = error ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter password"
                  required
                  style={{
                    width: '100%', padding: '12px 44px 12px 40px', borderRadius: 10,
                    border: `1px solid ${error ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 14,
                    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(167,139,250,0.5)'}
                  onBlur={e => e.target.style.borderColor = error ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                background: 'rgba(248,113,113,0.1)', borderRadius: 8, marginBottom: 16,
                border: '1px solid rgba(248,113,113,0.2)'
              }}>
                <AlertCircle size={16} color="#f87171" />
                <span style={{ fontSize: 13, color: '#f87171' }}>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', padding: '12px 0', borderRadius: 10, border: 'none',
                background: isLoading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: 'white', fontSize: 15, fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
              }}
              onMouseEnter={e => { if (!isLoading) e.target.style.boxShadow = '0 6px 20px rgba(124,58,237,0.5)'; }}
              onMouseLeave={e => { e.target.style.boxShadow = '0 4px 12px rgba(124,58,237,0.3)'; }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: 12, color: '#475569' }}>
            Powered by <span style={{ color: '#a78bfa', fontWeight: 600 }}>CoreAuraLogix</span>
          </p>
          <p style={{ fontSize: 11, color: '#334155', marginTop: 4 }}>
            Photography Studio Management Platform
          </p>
        </div>
      </div>
    </div>
  );
}
