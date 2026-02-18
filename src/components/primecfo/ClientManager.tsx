import React, { useState } from 'react';
import {
  Users, Plus, Search, MoreVertical, Link2, RefreshCw, Trash2, Edit2, X,
  Building2, Mail, Phone, Globe, CheckCircle, AlertCircle, Clock, XCircle
} from 'lucide-react';
import { Client, timeAgo } from '@/lib/financialData';

interface ClientManagerProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onAddClient: (client: Omit<Client, 'id' | 'qbStatus' | 'lastSync' | 'createdAt'>) => void;
  onDeleteClient: (id: string) => void;
  onNavigate: (view: string) => void;
}

const statusBadge: Record<string, { icon: React.FC<{ className?: string }>; label: string; className: string }> = {
  connected: { icon: CheckCircle, label: 'Connected', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  disconnected: { icon: XCircle, label: 'Disconnected', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
  expired: { icon: AlertCircle, label: 'Expired', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  error: { icon: XCircle, label: 'Error', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

const ClientManager: React.FC<ClientManagerProps> = ({ clients, onSelectClient, onAddClient, onDeleteClient, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [newClient, setNewClient] = useState({ name: '', email: '', companyName: '', industry: '', phone: '', status: 'active' as const });

  const filtered = clients.filter(c =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClient(newClient);
    setNewClient({ name: '', email: '', companyName: '', industry: '', phone: '', status: 'active' });
    setShowAddModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Client Management</h3>
            <p className="text-xs text-slate-400">{clients.length} clients total</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search clients by name, company, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50"
        />
      </div>

      {/* Client Cards */}
      <div className="grid gap-4">
        {filtered.map((client) => {
          const badge = statusBadge[client.qbStatus];
          const BadgeIcon = badge.icon;

          return (
            <div
              key={client.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-0.5">{client.companyName}</h4>
                    <p className="text-sm text-slate-400 mb-3">{client.name}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> {client.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> {client.phone}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> {client.industry}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${badge.className}`}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    {badge.label}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === client.id ? null : client.id)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeMenu === client.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                        <div className="absolute right-0 mt-1 w-48 bg-slate-700 border border-slate-600 rounded-xl shadow-2xl overflow-hidden z-20">
                          <button
                            onClick={() => { onSelectClient(client); onNavigate('dashboard'); setActiveMenu(null); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-600"
                          >
                            <Building2 className="w-4 h-4" /> View Dashboard
                          </button>
                          <button
                            onClick={() => { onSelectClient(client); onNavigate('connect'); setActiveMenu(null); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-600"
                          >
                            <Link2 className="w-4 h-4" /> Manage Connection
                          </button>
                          <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-600"
                          >
                            <RefreshCw className="w-4 h-4" /> Sync Data
                          </button>
                          <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-600"
                          >
                            <Edit2 className="w-4 h-4" /> Edit Client
                          </button>
                          <button
                            onClick={() => { onDeleteClient(client.id); setActiveMenu(null); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-600"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {client.qbStatus === 'connected' && client.lastSync && (
                <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  Last synced {timeAgo(client.lastSync)}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No clients found</p>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">Add New Client</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Company Name</label>
                <input
                  type="text"
                  required
                  value={newClient.companyName}
                  onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="Acme Corporation"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Industry</label>
                  <select
                    value={newClient.industry}
                    onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="">Select...</option>
                    <option value="Technology">Technology</option>
                    <option value="Services">Services</option>
                    <option value="Retail">Retail</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Construction">Construction</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 bg-slate-700 text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-600 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25">
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManager;
