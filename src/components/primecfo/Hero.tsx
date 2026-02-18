import React from 'react';
import { BarChart3, Shield, Zap, ArrowRight, CheckCircle, TrendingUp, DollarSign, PieChart } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-sm text-teal-400 font-medium">AI-Powered Financial Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Connect Your Books.{' '}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Unlock Your Insights.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
              PrimeCFO.ai connects to your QuickBooks account and translates your financial data into clear, 
              actionable insights — so you can make smarter business decisions without being an accountant.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 flex items-center justify-center gap-2"
              >
                Connect QuickBooks
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                See How It Works
              </button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center gap-6">
              {[
                { icon: Shield, text: 'Bank-Level Security' },
                { icon: Zap, text: 'Real-Time Sync' },
                { icon: CheckCircle, text: 'SOC 2 Compliant' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-slate-500">
                  <item.icon className="w-4 h-4 text-teal-500" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative lg:pl-8">
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Financial Overview</p>
                  <p className="text-lg font-semibold text-white">GreenLeaf Landscaping</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-xs text-emerald-400 font-medium">QB Connected</span>
                </div>
              </div>

              {/* Mini Metric Cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: 'Revenue', value: '$487.3K', change: '+11.8%', icon: DollarSign, positive: true },
                  { label: 'Net Profit', value: '$145.1K', change: '+23.7%', icon: TrendingUp, positive: true },
                  { label: 'Cash Position', value: '$128.5K', change: '+34.9%', icon: BarChart3, positive: true },
                  { label: 'Profit Margin', value: '29.8%', change: '+2.9pp', icon: PieChart, positive: true },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <m.icon className="w-4 h-4 text-slate-500" />
                      <span className={`text-xs font-medium ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {m.change}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">{m.value}</p>
                    <p className="text-xs text-slate-500">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Mini Chart */}
              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-slate-400 font-medium">Revenue vs Expenses (12mo)</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                      <span className="text-[10px] text-slate-500">Revenue</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-500 rounded-full" />
                      <span className="text-[10px] text-slate-500">Expenses</span>
                    </div>
                  </div>
                </div>
                {/* SVG Mini Chart */}
                <svg viewBox="0 0 300 80" className="w-full h-20">
                  {/* Revenue line */}
                  <polyline
                    fill="none"
                    stroke="url(#tealGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="10,55 35,48 60,40 85,32 110,27 135,30 160,36 185,42 210,47 235,52 260,44 285,41"
                  />
                  {/* Revenue area */}
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                  </linearGradient>
                  <polygon
                    fill="url(#tealFill)"
                    points="10,55 35,48 60,40 85,32 110,27 135,30 160,36 185,42 210,47 235,52 260,44 285,41 285,75 10,75"
                  />
                  {/* Expense line */}
                  <polyline
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="4,3"
                    points="10,60 35,55 60,50 85,45 110,43 135,44 160,48 185,52 210,55 235,57 260,53 285,51"
                  />
                </svg>
              </div>

              {/* AI Insight Preview */}
              <div className="mt-4 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-xl p-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-teal-400 mb-0.5">AI Insight</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Revenue grew 11.8% YoY, outpacing industry average. Profit margins improved 2.9 percentage points.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Logos Section */}
      <div className="relative border-t border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs text-slate-600 uppercase tracking-widest mb-6">Trusted Integrations</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-40">
            {['QuickBooks Online', 'Intuit', 'Stripe', 'Plaid', 'Xero'].map((name) => (
              <span key={name} className="text-sm font-semibold text-slate-400 tracking-wider">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
