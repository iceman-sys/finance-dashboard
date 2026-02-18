import React, { useState } from 'react';
import { RefreshCw, Calendar, ChevronDown, Download, Loader2 } from 'lucide-react';
import MetricCards from './MetricCards';
import RevenueChart from './RevenueChart';
import CashFlowChart from './CashFlowChart';
import AIInsights from './AIInsights';
import { MetricCard, ChartDataPoint, AIInsight, Client, timeAgo } from '@/lib/financialData';

interface DashboardViewProps {
  metrics: MetricCard[];
  chartData: ChartDataPoint[];
  insights: AIInsight[];
  client: Client | null;
  onNavigate: (view: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ metrics, chartData, insights, client, onNavigate }) => {
  const [syncing, setSyncing] = useState(false);
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Trailing 12 Months');

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2500);
  };

  const periods = ['Trailing 12 Months', 'This Quarter', 'Last Quarter', 'Year to Date', 'Last Year'];

  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Financial Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">
            {client?.companyName || 'Select a client'} — {selectedPeriod}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="relative">
            <button
              onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white hover:bg-slate-600 transition-colors"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">{selectedPeriod}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            {periodDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setPeriodDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-slate-700 border border-slate-600 rounded-xl shadow-2xl overflow-hidden z-20">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => { setSelectedPeriod(p); setPeriodDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-600 transition-colors ${
                        selectedPeriod === p ? 'text-teal-400 bg-slate-600/50' : 'text-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 disabled:opacity-50"
          >
            {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {syncing ? 'Syncing...' : 'Sync'}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-600 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncing && (
        <div className="mb-6 bg-teal-500/10 border border-teal-500/20 rounded-xl p-4 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
          <div>
            <p className="text-sm font-medium text-teal-400">Syncing financial data from QuickBooks...</p>
            <p className="text-xs text-slate-400">Pulling latest reports and calculating metrics</p>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="mb-6">
        <MetricCards metrics={metrics} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <RevenueChart data={chartData} />
        <CashFlowChart data={chartData} />
      </div>

      {/* AI Insights */}
      <div className="mb-6">
        <AIInsights insights={insights} compact />
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('reports')}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-teal-500/30 hover:bg-slate-800 transition-all text-left group"
        >
          <p className="text-sm font-semibold text-white mb-1 group-hover:text-teal-400 transition-colors">View Full Reports</p>
          <p className="text-xs text-slate-400">P&L, Balance Sheet, Cash Flow</p>
        </button>
        <button
          onClick={() => onNavigate('insights')}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-violet-500/30 hover:bg-slate-800 transition-all text-left group"
        >
          <p className="text-sm font-semibold text-white mb-1 group-hover:text-violet-400 transition-colors">All AI Insights</p>
          <p className="text-xs text-slate-400">{insights.length} insights available</p>
        </button>
        <button
          onClick={() => onNavigate('connect')}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-emerald-500/30 hover:bg-slate-800 transition-all text-left group"
        >
          <p className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">Connection Status</p>
          <p className="text-xs text-slate-400">
            {client?.qbStatus === 'connected' ? `Last sync ${timeAgo(client.lastSync)}` : 'Not connected'}
          </p>
        </button>
      </div>
    </div>
  );
};

export default DashboardView;
