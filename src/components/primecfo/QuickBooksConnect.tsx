import React, { useState } from 'react';
import {
  Link2, CheckCircle, Shield, RefreshCw, ArrowRight, AlertTriangle,
  Clock, Zap, XCircle, Loader2, ExternalLink
} from 'lucide-react';
import { Client, timeAgo } from '@/lib/financialData';

interface QuickBooksConnectProps {
  client: Client | null;
  onConnect: () => void;
  onDisconnect: () => void;
  onSync: () => void;
}

const QuickBooksConnect: React.FC<QuickBooksConnectProps> = ({ client, onConnect, onDisconnect, onSync }) => {
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [step, setStep] = useState(0);

  const handleConnect = () => {
    setConnecting(true);
    setStep(1);
    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 3000);
    setTimeout(() => {
      setConnecting(false);
      setStep(0);
      onConnect();
    }, 4500);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      onSync();
    }, 3000);
  };

  const isConnected = client?.qbStatus === 'connected';
  const isExpired = client?.qbStatus === 'expired';

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
          <Link2 className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">QuickBooks Connection</h3>
          <p className="text-xs text-slate-400">{client?.companyName || 'No client selected'}</p>
        </div>
      </div>

      {/* Connection Status Card */}
      <div className={`rounded-2xl border p-8 mb-8 ${
        isConnected
          ? 'bg-emerald-500/5 border-emerald-500/20'
          : isExpired
            ? 'bg-amber-500/5 border-amber-500/20'
            : 'bg-slate-800/50 border-slate-700/50'
      }`}>
        <div className="text-center">
          {/* QB Logo placeholder */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border border-slate-700 rounded-2xl mb-6">
            <span className="text-2xl font-bold text-green-400">QB</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            {isConnected ? 'QuickBooks Connected' : isExpired ? 'Connection Expired' : 'Connect QuickBooks Online'}
          </h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            {isConnected
              ? `Your QuickBooks account is securely connected. Last synced ${timeAgo(client?.lastSync || '')}.`
              : isExpired
                ? 'Your connection has expired. Please reconnect to continue syncing data.'
                : 'Securely connect your QuickBooks Online account to start pulling financial data automatically.'
            }
          </p>

          {/* Status indicator */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 ${
            isConnected
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : isExpired
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                : 'bg-slate-700/50 border-slate-600 text-slate-400'
          }`}>
            {isConnected ? (
              <><CheckCircle className="w-4 h-4" /> Connected & Active</>
            ) : isExpired ? (
              <><AlertTriangle className="w-4 h-4" /> Token Expired</>
            ) : (
              <><XCircle className="w-4 h-4" /> Not Connected</>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {isConnected ? (
              <>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 disabled:opacity-50"
                >
                  {syncing ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                  {syncing ? 'Syncing Data...' : 'Sync Now'}
                </button>
                <button
                  onClick={onDisconnect}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-slate-300 font-medium rounded-xl hover:bg-slate-600 transition-colors border border-slate-600"
                >
                  <XCircle className="w-5 h-5" />
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={handleConnect}
                disabled={connecting}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all shadow-xl shadow-green-500/25 disabled:opacity-50"
              >
                {connecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ExternalLink className="w-5 h-5" />}
                {connecting ? 'Connecting...' : 'Connect to QuickBooks'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Connection Progress (when connecting) */}
      {connecting && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
          <h4 className="text-sm font-semibold text-white mb-4">Connection Progress</h4>
          <div className="space-y-4">
            {[
              { label: 'Initiating OAuth Authorization', stepNum: 1 },
              { label: 'Authenticating with Intuit', stepNum: 2 },
              { label: 'Storing Secure Tokens', stepNum: 3 },
            ].map((s) => (
              <div key={s.stepNum} className="flex items-center gap-3">
                {step >= s.stepNum ? (
                  step > s.stepNum ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
                  )
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                )}
                <span className={`text-sm ${step >= s.stepNum ? 'text-white' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sync Progress */}
      {syncing && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
          <h4 className="text-sm font-semibold text-white mb-4">Syncing Financial Data</h4>
          <div className="space-y-3">
            {['Profit & Loss Report', 'Balance Sheet', 'Cash Flow Statement', 'Chart of Accounts'].map((report, i) => (
              <div key={report} className="flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                <span className="text-sm text-slate-300">{report}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection Details */}
      {isConnected && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
          <h4 className="text-sm font-semibold text-white mb-4">Connection Details</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Status', value: 'Active', icon: CheckCircle, color: 'text-emerald-400' },
              { label: 'Last Sync', value: timeAgo(client?.lastSync || ''), icon: Clock, color: 'text-slate-300' },
              { label: 'Auto-Refresh', value: 'Enabled', icon: RefreshCw, color: 'text-teal-400' },
              { label: 'Data Encryption', value: 'AES-256', icon: Shield, color: 'text-blue-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Info */}
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Security & Privacy</h4>
            <ul className="space-y-2">
              {[
                'OAuth 2.0 authentication — your QuickBooks credentials never touch our servers',
                'Access tokens are encrypted at rest using AES-256',
                'Automatic token refresh ensures uninterrupted access',
                'You can disconnect at any time to revoke access',
                'Read-only access — we never modify your QuickBooks data',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBooksConnect;
