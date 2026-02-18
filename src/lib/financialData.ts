// PrimeCFO.ai - Financial Data Types & Mock Data

export interface Client {
  id: string;
  name: string;
  email: string;
  companyName: string;
  industry: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  qbStatus: 'connected' | 'disconnected' | 'expired' | 'error';
  lastSync: string;
  createdAt: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  format: 'currency' | 'percentage' | 'number' | 'days';
  trend: 'up' | 'down' | 'flat';
  trendIsGood: boolean;
  icon: string;
  color: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  urgency: 'action_required' | 'watch' | 'positive' | 'info';
  category: string;
  metric?: string;
  metricValue?: string;
  createdAt: string;
}

export interface ReportLineItem {
  label: string;
  current: number;
  previous: number;
  isHeader?: boolean;
  isTotal?: boolean;
  indent?: number;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cash: number;
}

// Mock Clients
export const mockClients: Client[] = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@greenleaf.com', companyName: 'GreenLeaf Landscaping', industry: 'Services', phone: '(555) 123-4567', status: 'active', qbStatus: 'connected', lastSync: '2026-02-16T06:30:00Z', createdAt: '2025-09-15' },
  { id: '2', name: 'James Rodriguez', email: 'james@techpulse.io', companyName: 'TechPulse Solutions', industry: 'Technology', phone: '(555) 234-5678', status: 'active', qbStatus: 'connected', lastSync: '2026-02-16T05:45:00Z', createdAt: '2025-10-01' },
  { id: '3', name: 'Emily Chen', email: 'emily@blossomcafe.com', companyName: 'Blossom Café & Bakery', industry: 'Food & Beverage', phone: '(555) 345-6789', status: 'active', qbStatus: 'expired', lastSync: '2026-02-10T12:00:00Z', createdAt: '2025-11-20' },
  { id: '4', name: 'Michael Torres', email: 'mike@precisionauto.com', companyName: 'Precision Auto Works', industry: 'Automotive', phone: '(555) 456-7890', status: 'active', qbStatus: 'connected', lastSync: '2026-02-16T04:15:00Z', createdAt: '2025-08-10' },
  { id: '5', name: 'Lisa Park', email: 'lisa@urbanfit.com', companyName: 'UrbanFit Studios', industry: 'Health & Fitness', phone: '(555) 567-8901', status: 'pending', qbStatus: 'disconnected', lastSync: '', createdAt: '2026-01-05' },
  { id: '6', name: 'David Okafor', email: 'david@brightpath.edu', companyName: 'BrightPath Tutoring', industry: 'Education', phone: '(555) 678-9012', status: 'active', qbStatus: 'connected', lastSync: '2026-02-15T22:00:00Z', createdAt: '2025-12-01' },
];

// Mock Metric Cards (for GreenLeaf Landscaping - default client)
export const mockMetrics: MetricCard[] = [
  { id: '1', title: 'Total Revenue', value: 487250, previousValue: 435800, format: 'currency', trend: 'up', trendIsGood: true, icon: 'DollarSign', color: 'emerald' },
  { id: '2', title: 'Total Expenses', value: 342180, previousValue: 318500, format: 'currency', trend: 'up', trendIsGood: false, icon: 'CreditCard', color: 'red' },
  { id: '3', title: 'Net Profit', value: 145070, previousValue: 117300, format: 'currency', trend: 'up', trendIsGood: true, icon: 'TrendingUp', color: 'blue' },
  { id: '4', title: 'Profit Margin', value: 29.8, previousValue: 26.9, format: 'percentage', trend: 'up', trendIsGood: true, icon: 'PieChart', color: 'violet' },
  { id: '5', title: 'Cash Position', value: 128450, previousValue: 95200, format: 'currency', trend: 'up', trendIsGood: true, icon: 'Wallet', color: 'teal' },
  { id: '6', title: 'Accounts Receivable', value: 67800, previousValue: 54200, format: 'currency', trend: 'up', trendIsGood: false, icon: 'FileText', color: 'amber' },
];

// Monthly Chart Data
export const monthlyChartData: ChartDataPoint[] = [
  { month: 'Mar', revenue: 35200, expenses: 28100, profit: 7100, cash: 62000 },
  { month: 'Apr', revenue: 38500, expenses: 29800, profit: 8700, cash: 68500 },
  { month: 'May', revenue: 42100, expenses: 31200, profit: 10900, cash: 75200 },
  { month: 'Jun', revenue: 45800, expenses: 33500, profit: 12300, cash: 82100 },
  { month: 'Jul', revenue: 48200, expenses: 34100, profit: 14100, cash: 89500 },
  { month: 'Aug', revenue: 46500, expenses: 33800, profit: 12700, cash: 95800 },
  { month: 'Sep', revenue: 43200, expenses: 32200, profit: 11000, cash: 101200 },
  { month: 'Oct', revenue: 39800, expenses: 30500, profit: 9300, cash: 105800 },
  { month: 'Nov', revenue: 36500, expenses: 28900, profit: 7600, cash: 110200 },
  { month: 'Dec', revenue: 34200, expenses: 27500, profit: 6700, cash: 115400 },
  { month: 'Jan', revenue: 37800, expenses: 29200, profit: 8600, cash: 121800 },
  { month: 'Feb', revenue: 39450, expenses: 30380, profit: 9070, cash: 128450 },
];

// AI Insights
export const mockInsights: AIInsight[] = [
  {
    id: '1',
    title: 'Revenue Growth Accelerating',
    description: 'Your revenue increased 11.8% compared to the same period last year, outpacing industry average of 7.2%. The strongest growth came from commercial landscaping contracts, which grew 18.3% year-over-year.',
    urgency: 'positive',
    category: 'Revenue',
    metric: '+11.8%',
    metricValue: 'YoY Growth',
    createdAt: '2026-02-16T06:30:00Z',
  },
  {
    id: '2',
    title: 'Operating Expenses Rising Faster Than Revenue',
    description: 'Operating expenses grew 7.4% this quarter while revenue grew 5.2%. Primary drivers are labor costs (+12.1%) and fuel expenses (+8.7%). Consider reviewing staffing efficiency and fuel procurement strategies.',
    urgency: 'action_required',
    category: 'Expenses',
    metric: '+7.4%',
    metricValue: 'Expense Growth',
    createdAt: '2026-02-16T06:30:00Z',
  },
  {
    id: '3',
    title: 'Cash Runway Healthy at 6.4 Months',
    description: 'Based on current burn rate of $20,070/month and cash reserves of $128,450, your estimated cash runway is 6.4 months. This is above the recommended 3-month minimum but below the 9-month ideal buffer.',
    urgency: 'info',
    category: 'Cash Flow',
    metric: '6.4 mo',
    metricValue: 'Cash Runway',
    createdAt: '2026-02-16T06:30:00Z',
  },
  {
    id: '4',
    title: 'Accounts Receivable Aging Concern',
    description: 'A/R increased 25.1% ($13,600) this quarter. 32% of outstanding invoices are over 60 days past due, up from 18% last quarter. Recommend implementing stricter collection procedures for accounts over 45 days.',
    urgency: 'action_required',
    category: 'Collections',
    metric: '32%',
    metricValue: 'Over 60 Days',
    createdAt: '2026-02-16T06:30:00Z',
  },
  {
    id: '5',
    title: 'Profit Margins Improving',
    description: 'Net profit margin improved from 26.9% to 29.8% over the trailing 12 months. Gross margin expansion was driven by better material procurement pricing and improved project estimation accuracy.',
    urgency: 'positive',
    category: 'Profitability',
    metric: '29.8%',
    metricValue: 'Net Margin',
    createdAt: '2026-02-16T06:30:00Z',
  },
  {
    id: '6',
    title: 'Seasonal Revenue Pattern Detected',
    description: 'Revenue follows a predictable seasonal curve peaking in June-August. Consider building a 2-month cash reserve before the November-February slow period to maintain operations without stress.',
    urgency: 'watch',
    category: 'Planning',
    metric: 'Jun-Aug',
    metricValue: 'Peak Season',
    createdAt: '2026-02-16T06:30:00Z',
  },
  {
    id: '7',
    title: 'Equipment Depreciation Impact',
    description: 'Equipment depreciation accounts for 8.2% of total expenses. Two major assets will be fully depreciated by Q3 2026, which will reduce reported expenses but may require replacement capital planning.',
    urgency: 'watch',
    category: 'Assets',
    metric: '8.2%',
    metricValue: 'Of Expenses',
    createdAt: '2026-02-16T06:30:00Z',
  },
  {
    id: '8',
    title: 'Tax Liability Estimate Available',
    description: 'Based on current YTD income of $145,070 and applicable deductions, estimated quarterly tax liability is approximately $14,200. Ensure adequate reserves are set aside before the April 15 deadline.',
    urgency: 'info',
    category: 'Tax',
    metric: '$14.2K',
    metricValue: 'Est. Quarterly',
    createdAt: '2026-02-16T06:30:00Z',
  },
];

// Profit & Loss Report
export const profitLossData: ReportLineItem[] = [
  { label: 'Income', current: 0, previous: 0, isHeader: true },
  { label: 'Landscaping Services', current: 312500, previous: 285200, indent: 1 },
  { label: 'Maintenance Contracts', current: 98750, previous: 87600, indent: 1 },
  { label: 'Design Consulting', current: 45200, previous: 38400, indent: 1 },
  { label: 'Hardscape Installation', current: 28300, previous: 22100, indent: 1 },
  { label: 'Other Income', current: 2500, previous: 2500, indent: 1 },
  { label: 'Total Income', current: 487250, previous: 435800, isTotal: true },
  { label: 'Cost of Goods Sold', current: 0, previous: 0, isHeader: true },
  { label: 'Materials & Supplies', current: 89200, previous: 82100, indent: 1 },
  { label: 'Subcontractor Costs', current: 45600, previous: 38900, indent: 1 },
  { label: 'Equipment Rental', current: 12800, previous: 11200, indent: 1 },
  { label: 'Total COGS', current: 147600, previous: 132200, isTotal: true },
  { label: 'Gross Profit', current: 339650, previous: 303600, isTotal: true },
  { label: 'Operating Expenses', current: 0, previous: 0, isHeader: true },
  { label: 'Payroll & Benefits', current: 118500, previous: 105600, indent: 1 },
  { label: 'Vehicle & Fuel', current: 24800, previous: 22800, indent: 1 },
  { label: 'Insurance', current: 15200, previous: 14800, indent: 1 },
  { label: 'Rent & Utilities', current: 12600, previous: 12200, indent: 1 },
  { label: 'Marketing & Advertising', current: 8500, previous: 7200, indent: 1 },
  { label: 'Office & Admin', current: 6200, previous: 5800, indent: 1 },
  { label: 'Depreciation', current: 5780, previous: 5400, indent: 1 },
  { label: 'Professional Services', current: 3000, previous: 2500, indent: 1 },
  { label: 'Total Operating Expenses', current: 194580, previous: 176300, isTotal: true },
  { label: 'Net Operating Income', current: 145070, previous: 127300, isTotal: true },
  { label: 'Other Income/Expense', current: 0, previous: 0, isHeader: true },
  { label: 'Interest Income', current: 1200, previous: 800, indent: 1 },
  { label: 'Interest Expense', current: -1200, previous: -1500, indent: 1 },
  { label: 'Net Other Income', current: 0, previous: -700, isTotal: true },
  { label: 'Net Income', current: 145070, previous: 126600, isTotal: true },
];

// Balance Sheet
export const balanceSheetData: ReportLineItem[] = [
  { label: 'Assets', current: 0, previous: 0, isHeader: true },
  { label: 'Current Assets', current: 0, previous: 0, isHeader: true },
  { label: 'Checking Account', current: 98450, previous: 72800, indent: 1 },
  { label: 'Savings Account', current: 30000, previous: 22400, indent: 1 },
  { label: 'Accounts Receivable', current: 67800, previous: 54200, indent: 1 },
  { label: 'Inventory', current: 12500, previous: 10800, indent: 1 },
  { label: 'Prepaid Expenses', current: 4200, previous: 3800, indent: 1 },
  { label: 'Total Current Assets', current: 212950, previous: 164000, isTotal: true },
  { label: 'Fixed Assets', current: 0, previous: 0, isHeader: true },
  { label: 'Vehicles', current: 85000, previous: 85000, indent: 1 },
  { label: 'Equipment', current: 42000, previous: 42000, indent: 1 },
  { label: 'Less: Accumulated Depreciation', current: -28500, previous: -22720, indent: 1 },
  { label: 'Total Fixed Assets', current: 98500, previous: 104280, isTotal: true },
  { label: 'Total Assets', current: 311450, previous: 268280, isTotal: true },
  { label: 'Liabilities', current: 0, previous: 0, isHeader: true },
  { label: 'Current Liabilities', current: 0, previous: 0, isHeader: true },
  { label: 'Accounts Payable', current: 28500, previous: 24200, indent: 1 },
  { label: 'Credit Card Payable', current: 8200, previous: 6800, indent: 1 },
  { label: 'Payroll Liabilities', current: 12400, previous: 11200, indent: 1 },
  { label: 'Sales Tax Payable', current: 3200, previous: 2800, indent: 1 },
  { label: 'Total Current Liabilities', current: 52300, previous: 45000, isTotal: true },
  { label: 'Long-Term Liabilities', current: 0, previous: 0, isHeader: true },
  { label: 'Vehicle Loan', current: 32000, previous: 38000, indent: 1 },
  { label: 'Equipment Loan', current: 15000, previous: 20000, indent: 1 },
  { label: 'Total Long-Term Liabilities', current: 47000, previous: 58000, isTotal: true },
  { label: 'Total Liabilities', current: 99300, previous: 103000, isTotal: true },
  { label: 'Equity', current: 0, previous: 0, isHeader: true },
  { label: "Owner's Equity", current: 67080, previous: 38680, indent: 1 },
  { label: 'Retained Earnings', current: 145070, previous: 126600, indent: 1 },
  { label: 'Total Equity', current: 212150, previous: 165280, isTotal: true },
  { label: 'Total Liabilities & Equity', current: 311450, previous: 268280, isTotal: true },
];

// Cash Flow Statement
export const cashFlowData: ReportLineItem[] = [
  { label: 'Operating Activities', current: 0, previous: 0, isHeader: true },
  { label: 'Net Income', current: 145070, previous: 126600, indent: 1 },
  { label: 'Depreciation & Amortization', current: 5780, previous: 5400, indent: 1 },
  { label: 'Change in Accounts Receivable', current: -13600, previous: -8200, indent: 1 },
  { label: 'Change in Inventory', current: -1700, previous: -1200, indent: 1 },
  { label: 'Change in Accounts Payable', current: 4300, previous: 3100, indent: 1 },
  { label: 'Change in Other Liabilities', current: 4800, previous: 2800, indent: 1 },
  { label: 'Net Cash from Operations', current: 144650, previous: 128500, isTotal: true },
  { label: 'Investing Activities', current: 0, previous: 0, isHeader: true },
  { label: 'Equipment Purchases', current: 0, previous: -15000, indent: 1 },
  { label: 'Vehicle Purchases', current: 0, previous: 0, indent: 1 },
  { label: 'Net Cash from Investing', current: 0, previous: -15000, isTotal: true },
  { label: 'Financing Activities', current: 0, previous: 0, isHeader: true },
  { label: 'Loan Payments', current: -11000, previous: -11000, indent: 1 },
  { label: "Owner's Draws", current: -100400, previous: -85000, indent: 1 },
  { label: 'Net Cash from Financing', current: -111400, previous: -96000, isTotal: true },
  { label: 'Net Change in Cash', current: 33250, previous: 17500, isTotal: true },
  { label: 'Beginning Cash Balance', current: 95200, previous: 77700, indent: 1 },
  { label: 'Ending Cash Balance', current: 128450, previous: 95200, isTotal: true },
];

// Helper functions
export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
}

export function formatFullCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
}

export function formatPercentChange(current: number, previous: number): string {
  if (previous === 0) return 'N/A';
  const change = ((current - previous) / Math.abs(previous)) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}

export function getPercentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function timeAgo(dateStr: string): string {
  if (!dateStr) return 'Never';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
