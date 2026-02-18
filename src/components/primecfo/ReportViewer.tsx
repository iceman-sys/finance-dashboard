import React, { useState } from 'react';
import { FileText, Download, Calendar, ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ReportLineItem, formatFullCurrency, getPercentChange } from '@/lib/financialData';
import { profitLossData, balanceSheetData, cashFlowData } from '@/lib/financialData';

const ReportViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pnl' | 'balance' | 'cashflow'>('pnl');
  const [period, setPeriod] = useState('ttm');
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);

  const tabs = [
    { id: 'pnl' as const, label: 'Profit & Loss', data: profitLossData },
    { id: 'balance' as const, label: 'Balance Sheet', data: balanceSheetData },
    { id: 'cashflow' as const, label: 'Cash Flow', data: cashFlowData },
  ];

  const periods = [
    { value: 'ttm', label: 'Trailing 12 Months' },
    { value: 'q4', label: 'Q4 2025' },
    { value: 'q3', label: 'Q3 2025' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'annual', label: 'FY 2025' },
  ];

  const currentTab = tabs.find(t => t.id === activeTab)!;
  const selectedPeriod = periods.find(p => p.value === period)!;

  const renderRow = (item: ReportLineItem, index: number) => {
    if (item.isHeader) {
      return (
        <tr key={index} className="border-b border-slate-700/30">
          <td colSpan={4} className="pt-6 pb-2 px-4">
            <p className="text-sm font-bold text-white uppercase tracking-wider">{item.label}</p>
          </td>
        </tr>
      );
    }

    const change = item.previous !== 0 ? getPercentChange(item.current, item.previous) : 0;
    const isPositiveChange = change > 0;

    return (
      <tr
        key={index}
        className={`border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors ${
          item.isTotal ? 'bg-slate-800/30' : ''
        }`}
      >
        <td className={`py-2.5 px-4 text-sm ${item.isTotal ? 'font-semibold text-white' : 'text-slate-300'}`} style={{ paddingLeft: item.indent ? `${item.indent * 24 + 16}px` : '16px' }}>
          {item.label}
        </td>
        <td className={`py-2.5 px-4 text-sm text-right ${item.isTotal ? 'font-semibold text-white' : 'text-slate-300'}`}>
          {item.current !== 0 || item.isTotal ? formatFullCurrency(item.current) : ''}
        </td>
        <td className={`py-2.5 px-4 text-sm text-right ${item.isTotal ? 'font-semibold text-slate-400' : 'text-slate-500'}`}>
          {item.previous !== 0 || item.isTotal ? formatFullCurrency(item.previous) : ''}
        </td>
        <td className="py-2.5 px-4 text-right">
          {(item.current !== 0 || item.isTotal) && item.previous !== 0 && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${
              isPositiveChange ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-slate-500'
            }`}>
              {isPositiveChange ? <ArrowUpRight className="w-3 h-3" /> : change < 0 ? <ArrowDownRight className="w-3 h-3" /> : null}
              {change !== 0 ? `${Math.abs(change).toFixed(1)}%` : '-'}
            </span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Financial Reports</h3>
              <p className="text-xs text-slate-400">GreenLeaf Landscaping</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <div className="relative">
              <button
                onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white hover:bg-slate-600 transition-colors"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                {selectedPeriod.label}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              {periodDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setPeriodDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-slate-700 border border-slate-600 rounded-xl shadow-2xl overflow-hidden z-20">
                    {periods.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => { setPeriod(p.value); setPeriodDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-600 transition-colors ${
                          period === p.value ? 'text-teal-400 bg-slate-600/50' : 'text-slate-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-600 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-5 bg-slate-700/30 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-800/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Current</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Previous</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody>
            {currentTab.data.map((item, i) => renderRow(item, i))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportViewer;
