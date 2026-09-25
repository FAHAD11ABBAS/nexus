// src/pages/Auth.jsx
// Futuristic cyberpunk glassmorphic authentication & onboarding screen

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Lock, Mail, Phone, ArrowRight, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import CountrySelector from '@/components/ui/CountrySelector';

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, signup, guestLogin, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [privacyAgreed, setPrivacyAgreed] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    if (mode === 'signup' && !privacyAgreed) {
      toast.error('Please accept the privacy terms');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login({ email, password });
        toast.success('Authenticated to NEXUS node');
      } else {
        await signup({
          email,
          password,
          username: username || email.split('@')[0],
          phone,
          country,
        });
        toast.success('NEXUS Decentralized ID generated');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuest = async () => {
    setSubmitting(true);
    try {
      await guestLogin('Cybernaut');
      toast.success('Connected via Guest Session');
      navigate('/');
    } catch (e) {
      toast.error('Could not start guest session');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await loginWithGoogle();
      toast.success('Google Authentication successful');
      navigate('/');
    } catch (e) {
      toast.error(e.message || 'Google Sign-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-4 py-8">
      {/* Background neon glows */}
      <div className="absolute top-1/4 -start-20 w-72 h-72 rounded-full bg-nexus-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -end-20 w-72 h-72 rounded-full bg-nexus-cyan/15 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md glass-card border border-nexus-primary/30 p-7 sm:p-8 shadow-2xl rounded-3xl z-10 animate-fade-in">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-nexus-gradient shadow-nexus mb-3 animate-float">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider">
            {t('app.name')}
          </h1>
          <p className="text-xs text-nexus-muted mt-1">
            {t('auth.tagline')}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-nexus-bg/70 p-1 border border-nexus-border/60 mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            {t('auth.signIn')}
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-nexus-gradient text-white shadow-nexus-sm'
                : 'text-nexus-muted hover:text-white'
            }`}
          >
            {t('auth.signUp')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-nexus-muted mb-1.5">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="cyber_pioneer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border/80 focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary text-nexus-text text-sm outline-none transition-all placeholder:text-nexus-dim"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-nexus-muted mb-1.5">
              {t('auth.emailLabel')}
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                className="w-full ps-10 pe-3.5 py-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border/80 focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary text-nexus-text text-sm outline-none transition-all placeholder:text-nexus-dim"
              />
              <Mail size={16} className="absolute start-3 text-nexus-muted pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-nexus-muted mb-1.5">
              {t('auth.passwordLabel')}
            </label>
            <div className="relative flex items-center">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                className="w-full ps-10 pe-3.5 py-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border/80 focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary text-nexus-text text-sm outline-none transition-all placeholder:text-nexus-dim"
              />
              <Lock size={16} className="absolute start-3 text-nexus-muted pointer-events-none" />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              {/* Optional Phone Number */}
              <div>
                <label className="block text-xs font-medium text-nexus-muted mb-1.5">
                  {t('auth.phoneLabel')}
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('auth.phonePlaceholder')}
                    className="w-full ps-10 pe-3.5 py-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border/80 focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary text-nexus-text text-sm outline-none transition-all placeholder:text-nexus-dim"
                  />
                  <Phone size={16} className="absolute start-3 text-nexus-muted pointer-events-none" />
                </div>
              </div>

              {/* Dynamic Location / Country Selector */}
              <div>
                <label className="block text-xs font-medium text-nexus-muted mb-1.5">
                  {t('auth.countryLabel')}
                </label>
                <CountrySelector
                  value={country}
                  onChange={(cName, cCode) => {
                    setCountry(cName);
                    setCountryCode(cCode);
                  }}
                  showDialCode
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-nexus-border text-nexus-primary focus:ring-0 focus:ring-offset-0 bg-nexus-surface"
                />
                <span className="text-[11px] text-nexus-muted leading-tight">
                  {t('auth.privacyConsent')}
                </span>
              </label>
            </>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-nexus-gradient hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-nexus flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? t('auth.signIn') : t('auth.signUp')}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-nexus-border/60" />
          </div>
          <span className="relative px-3 bg-nexus-card text-[11px] uppercase tracking-wider text-nexus-dim">
            {t('auth.or')}
          </span>
        </div>

        {/* Instant Guest & Google Sign-in Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            className="w-full py-2.5 px-4 rounded-xl bg-nexus-surface/80 hover:bg-nexus-surface border border-white/10 hover:border-nexus-primary/50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group"
          >
            <span className="font-bold text-nexus-secondary">G</span>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleGuest}
            disabled={submitting}
            className="w-full py-2.5 px-4 rounded-xl bg-nexus-surface/80 hover:bg-nexus-surface border border-nexus-cyan/40 hover:border-nexus-cyan text-nexus-cyan hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group"
          >
            <UserCheck size={16} className="text-nexus-cyan group-hover:scale-110 transition-transform" />
            <span>{t('auth.guestLogin')} (Instant Demo)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
