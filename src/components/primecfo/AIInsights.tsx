import React, { useState } from 'react';
import {
  Brain, AlertTriangle, Eye, TrendingUp, Info, ChevronDown, ChevronUp,
  Sparkles, RefreshCw
} from 'lucide-react';
import { AIInsight, mockMetrics, monthlyChartData } from '@/lib/financialData';
import { supabase } from '@/lib/supabase';

interface AIInsightsProps {
  insights: AIInsight[];
  compact?: boolean;
  onGenerateNew?: () => void;
  onViewAll?: () => void;
}

const urgencyConfig: Record<string, { label: string; icon: React.FC<{ className?: string }>; bg: string; border: string; text: string; dot: string }> = {
  action_required: { label: 'Action Required', icon: AlertTriangle, bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
  watch: { label: 'Watch Closely', icon: Eye, bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  positive: { label: 'Positive Trend', icon: TrendingUp, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  info: { label: 'Information', icon: Info, bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
};

const AIInsights: React.FC<AIInsightsProps> = ({ insights: initialInsights, compact = false, onGenerateNew, onViewAll }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>(initialInsights);
  const [aiError, setAiError] = useState<string | null>(null);

  const filtered = filterUrgency === 'all' ? insights : insights.filter(i => i.urgency === filterUrgency);
  const displayed = compact ? filtered.slice(0, 4) : filtered;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const financialData = {
        metrics: mockMetrics.map(m => ({ title: m.title, value: m.value, previousValue: m.previousValue })),
        monthlyTrend: monthlyChartData,
      };
      const { data, error } = await supabase.functions.invoke('generate-insights', {
        body: { financialData },
      });
      if (error) throw error;
      if (data?.insights && Array.isArray(data.insights) && data.insights.length > 0) {
        const mapped: AIInsight[] = data.insights.map((ins: any, idx: number) => ({
          id: `ai-${Date.now()}-${idx}`,
          title: ins.title || 'Insight',
          description: ins.description || '',
          urgency: ins.urgency || 'info',
          category: ins.category || 'General',
          metric: ins.metric,
          metricValue: ins.metricValue,
          createdAt: new Date().toISOString(),
        }));
        setInsights(mapped);
      }
    } catch (err: any) {
      console.error('AI generation error:', err);
      setAiError('Could not generate new insights. Using cached data.');
    } finally {
      setIsGenerating(false);
      onGenerateNew?.();
    }
  };

  return (
    <div className={compact ? '' : 'bg-slate-800/50 border border-slate-700/50 rounded-xl p-6'}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
            <p className="text-xs text-slate-400">{insights.length} insights generated</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!compact && (
            <div className="flex flex-wrap bg-slate-700/50 rounded-lg p-0.5">
              {['all', 'action_required', 'watch', 'positive', 'info'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterUrgency(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    filterUrgency === f ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'action_required' ? 'Action' : f === 'watch' ? 'Watch' : f === 'positive' ? 'Positive' : 'Info'}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-400 text-xs font-medium rounded-lg hover:from-violet-500/30 hover:to-purple-500/30 transition-all disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            {isGenerating ? 'Analyzing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {aiError && (
        <div className="mb-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-400">
          {aiError}
        </div>
      )}

      <div className="space-y-3">
        {displayed.map((insight) => {
          const config = urgencyConfig[insight.urgency] || urgencyConfig.info;
          const isExpanded = expandedId === insight.id;
          const UrgencyIcon = config.icon;
          return (
            <div key={insight.id} className={`${config.bg} border ${config.border} rounded-xl overflow-hidden transition-all`}>
              <button onClick={() => setExpandedId(isExpanded ? null : insight.id)} className="w-full flex items-start gap-4 p-4 text-left">
                <div className={`w-8 h-8 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <UrgencyIcon className={`w-4 h-4 ${config.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium ${config.text} uppercase tracking-wider`}>{config.label}</span>
                    <span className="text-xs text-slate-500">|</span>
                    <span className="text-xs text-slate-500">{insight.category}</span>
                  </div>
                  <p className="text-sm font-medium text-white">{insight.title}</p>
                  {!isExpanded && <p className="text-xs text-slate-400 mt-1 line-clamp-1">{insight.description}</p>}
                </div>
                {insight.metric && (
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-bold ${config.text}`}>{insight.metric}</p>
                    <p className="text-xs text-slate-500">{insight.metricValue}</p>
                  </div>
                )}
                <div className="flex-shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pl-16">
                  <p className="text-sm text-slate-300 leading-relaxed">{insight.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {compact && filtered.length > 4 && (
        <button onClick={onViewAll} className="mt-4 text-sm text-teal-400 hover:text-teal-300 font-medium">
          View all {filtered.length} insights
        </button>
      )}
    </div>
  );
};

export default AIInsights;
