import React, { useState } from 'react';
import { X, BarChart3, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset' | 'reset-sent'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    // Password reset flow
    if (mode === 'reset') {
      setLoading(true);
      try {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (resetError) throw resetError;
        setMode('reset-sent');
      } catch (err: any) {
        setError(err.message || 'Failed to send reset email');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name || email.split('@')[0] },
          },
        });
        if (signUpError) throw signUpError;

        // If email confirmation is required, Supabase returns a user but no session
        if (data.user && !data.session) {
          setError('');
          setMode('login');
          setPassword('');
          // Show a friendly message - some Supabase configs auto-confirm
          setError('Account created! Please check your email to confirm, then sign in.');
          setLoading(false);
          return;
        }

        // Auto-confirmed - session exists
        if (data.session) {
          onLogin();
          onClose();
          return;
        }
      } else {
        // Login
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;

        if (data.session) {
          onLogin();
          onClose();
          return;
        }
      }
    } catch (err: any) {
      const msg = err.message || 'Authentication failed';
      if (msg.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (msg.includes('User already registered')) {
        setError('An account with this email already exists. Try signing in.');
      } else if (msg.includes('Email not confirmed')) {
        setError('Please confirm your email before signing in.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-8 pb-6 bg-gradient-to-b from-slate-800/50 to-transparent">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Prime<span className="text-teal-400">CFO</span><span className="text-slate-400 text-sm">.ai</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : mode === 'reset' ? 'Reset password' : 'Check your email'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {mode === 'login'
              ? 'Sign in to access your financial dashboard'
              : mode === 'signup'
                ? 'Start your 14-day free trial'
                : mode === 'reset'
                  ? 'Enter your email to receive a reset link'
                  : `We sent a password reset link to ${email}`}
          </p>
        </div>

        {/* Reset Sent Confirmation */}
        {mode === 'reset-sent' ? (
          <div className="px-8 pb-8 space-y-4">
            <div className="flex items-center justify-center py-6">
              <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-teal-400" />
              </div>
            </div>
            <p className="text-sm text-slate-300 text-center">
              If an account exists for <span className="text-white font-medium">{email}</span>, you'll receive a password reset link shortly.
            </p>
            <button
              onClick={() => { setMode('login'); resetForm(); }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {error && (
              <div className={`p-3 rounded-xl text-sm ${
                error.includes('Account created') || error.includes('check your email')
                  ? 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}>
                {error}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50"
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'Min 6 characters' : 'Enter your password'}
                    className="w-full pl-11 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => { setMode('reset'); setError(''); }}
                  className="text-sm text-teal-400 hover:text-teal-300"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {mode === 'reset' ? (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-sm text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 mx-auto"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to Sign In
                </button>
              </div>
            ) : (
              <div className="text-center pt-2">
                <p className="text-sm text-slate-400">
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                    className="text-teal-400 hover:text-teal-300 font-medium"
                  >
                    {mode === 'login' ? 'Sign up free' : 'Sign in'}
                  </button>
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
