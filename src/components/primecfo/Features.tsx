import React, { useState } from 'react';
import { Link2, BarChart3, Brain, Shield, RefreshCw, Users, ArrowRight, Check, Zap, FileText, TrendingUp } from 'lucide-react';

interface FeaturesProps {
  onGetStarted: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onGetStarted }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const features = [
    { icon: Link2, title: 'QuickBooks Integration', description: 'One-click secure connection to your QuickBooks Online account. OAuth 2.0 authentication with automatic token refresh.', color: 'from-teal-500 to-emerald-500' },
    { icon: BarChart3, title: 'Financial Dashboard', description: 'Real-time metrics, trend charts, and period comparisons. See your revenue, expenses, profit, and cash position at a glance.', color: 'from-blue-500 to-cyan-500' },
    { icon: Brain, title: 'AI-Powered Insights', description: 'Plain-English analysis of your financial data. Understand trends, risks, and opportunities without being an accountant.', color: 'from-violet-500 to-purple-500' },
    { icon: FileText, title: 'Automated Reports', description: 'Profit & Loss, Balance Sheet, and Cash Flow statements pulled and organized automatically from QuickBooks.', color: 'from-amber-500 to-orange-500' },
    { icon: TrendingUp, title: 'Trend Analysis', description: 'Track month-over-month and year-over-year performance. Identify seasonal patterns and growth trajectories.', color: 'from-pink-500 to-rose-500' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption, SOC 2 compliance, and secure data isolation. Your financial data is always protected.', color: 'from-slate-500 to-slate-600' },
    { icon: RefreshCw, title: 'Auto-Sync', description: 'Financial data syncs automatically on a schedule. Always see the latest numbers without manual refreshes.', color: 'from-green-500 to-emerald-500' },
    { icon: Users, title: 'Multi-Client Support', description: 'Manage multiple businesses from a single dashboard. Perfect for consultants and multi-entity owners.', color: 'from-indigo-500 to-blue-500' },
  ];

  const steps = [
    { step: '01', title: 'Connect QuickBooks', description: 'Securely link your QuickBooks Online account with one click. We use Intuit\'s official OAuth flow — your credentials never touch our servers.' },
    { step: '02', title: 'We Pull Your Data', description: 'PrimeCFO.ai automatically retrieves your Profit & Loss, Balance Sheet, Cash Flow, and other key reports from QuickBooks.' },
    { step: '03', title: 'AI Analyzes Everything', description: 'Our AI engine processes your financial data, calculates key metrics, identifies trends, and generates plain-English insights.' },
    { step: '04', title: 'You Make Better Decisions', description: 'View your financial dashboard, read actionable insights, and understand exactly where your business stands — no accounting degree needed.' },
  ];

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 49 : 39,
      description: 'Perfect for solo businesses',
      features: ['1 QuickBooks Connection', 'Financial Dashboard', 'Monthly Reports', '5 AI Insights/month', 'Email Support'],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 99 : 79,
      description: 'For growing businesses',
      features: ['3 QuickBooks Connections', 'Advanced Dashboard', 'Weekly Reports', 'Unlimited AI Insights', 'Trend Analysis', 'Priority Support', 'Custom Date Ranges'],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 249 : 199,
      description: 'For multi-entity operations',
      features: ['Unlimited Connections', 'White-Label Dashboard', 'Daily Reports', 'Unlimited AI Insights', 'Advanced Analytics', 'Dedicated Support', 'API Access', 'Custom Integrations'],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div>
      {/* Features Section */}
      <section id="features" className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Understand Your Finances
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From automated data retrieval to AI-powered analysis, PrimeCFO.ai gives you a complete financial intelligence toolkit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              From QuickBooks to Insights in Minutes
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Four simple steps to transform your raw financial data into actionable business intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-teal-500/50 to-transparent" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-2xl mb-5">
                    <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Start with a 14-day free trial. No credit card required.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  billingCycle === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                  billingCycle === 'annual' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual
                <span className="text-xs text-teal-400 font-semibold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-teal-500/50 shadow-xl shadow-teal-500/10 scale-105'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-400">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all mb-8 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-400 hover:to-emerald-400 shadow-lg shadow-teal-500/25'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
            <Zap className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-400 font-medium">14-Day Free Trial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Understand Your Finances?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of business owners who use PrimeCFO.ai to make smarter financial decisions every day.
          </p>
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 inline-flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Features;
