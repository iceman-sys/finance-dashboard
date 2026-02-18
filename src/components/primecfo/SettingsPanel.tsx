import React, { useState } from 'react';
import { Settings, User, Bell, Shield, RefreshCw, Save, Check } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'PrimeCFO Admin',
    email: 'admin@primecfo.ai',
    syncFrequency: 'daily',
    emailNotifications: true,
    insightAlerts: true,
    connectionAlerts: true,
    weeklyDigest: false,
    twoFactor: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-500/10 border border-slate-500/20 rounded-xl flex items-center justify-center">
          <Settings className="w-5 h-5 text-slate-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Settings</h3>
          <p className="text-xs text-slate-400">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <User className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-semibold text-white">Profile</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Display Name</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        </div>
      </div>

      {/* Sync Settings */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <RefreshCw className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-semibold text-white">Data Sync</h4>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Sync Frequency</label>
          <select
            value={settings.syncFrequency}
            onChange={(e) => setSettings({ ...settings, syncFrequency: e.target.value })}
            className="w-full sm:w-64 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          >
            <option value="realtime">Real-time</option>
            <option value="hourly">Every Hour</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="manual">Manual Only</option>
          </select>
          <p className="text-xs text-slate-500 mt-2">How often to automatically pull data from QuickBooks.</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <Bell className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-semibold text-white">Notifications</h4>
        </div>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email alerts for important events' },
            { key: 'insightAlerts', label: 'AI Insight Alerts', desc: 'Get notified when new insights are generated' },
            { key: 'connectionAlerts', label: 'Connection Alerts', desc: 'Alert when a QuickBooks connection has issues' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary of all client metrics' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings[item.key as keyof typeof settings] ? 'bg-teal-500' : 'bg-slate-600'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings[item.key as keyof typeof settings] ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <Shield className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-semibold text-white">Security</h4>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Two-Factor Authentication</p>
            <p className="text-xs text-slate-500">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setSettings({ ...settings, twoFactor: !settings.twoFactor })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.twoFactor ? 'bg-teal-500' : 'bg-slate-600'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              settings.twoFactor ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25"
      >
        {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
};

export default SettingsPanel;
