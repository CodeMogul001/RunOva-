import { AgentInfo } from '../types';

export const AGENTS_DATA: AgentInfo[] = [
  {
    id: 'growth',
    name: 'Growth Agent',
    tagline: 'Customer Acquisition & Pipeline',
    description: 'Finds opportunities, manages leads and supports customer acquisition.',
    iconName: 'TrendingUp',
    defaultPermissions: [
      'Read CRM prospects and lead scoring',
      'Draft and schedule outbound outreach sequences',
      'Ad campaign budget management (capped at $200/wk)'
    ],
    maxAutonomyBudget: '$800 / month',
    sampleAction: 'Identified 28 qualified inbound leads and scheduled 7 discovery briefs.',
    metrics: {
      label: 'Acquisition velocity',
      value: '+34%'
    }
  },
  {
    id: 'customer',
    name: 'Customer Agent',
    tagline: 'Support & Order Management',
    description: 'Handles enquiries, customer interactions and order management.',
    iconName: 'MessageSquareText',
    defaultPermissions: [
      'Respond to first-tier support inquiries',
      'Process verified returns within $100 threshold',
      'Update customer account shipping status'
    ],
    maxAutonomyBudget: '$500 / month',
    sampleAction: 'Resolved order routing exception #4829 within 4 minutes.',
    metrics: {
      label: 'Median response time',
      value: '< 45s'
    }
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    tagline: 'Treasury & Expense Verification',
    description: 'Tracks income, expenses, payments and treasury activity.',
    iconName: 'Landmark',
    defaultPermissions: [
      'Generate monthly reconciled accounts report',
      'Initiate verified vendor payouts under $1,000 threshold',
      'Monitor multi-sig NEAR treasury reserves'
    ],
    maxAutonomyBudget: '$5,000 / batch',
    sampleAction: 'Audited 42 recurring cloud infrastructure invoices against usage records.',
    metrics: {
      label: 'Audit accuracy',
      value: '100%'
    }
  },
  {
    id: 'procurement',
    name: 'Procurement Agent',
    tagline: 'Inventory & Supplier Routing',
    description: 'Monitors inventory, evaluates suppliers and prepares purchasing requests.',
    iconName: 'PackageCheck',
    defaultPermissions: [
      'Monitor real-time inventory reorder triggers',
      'Compare 3-way supplier price quotes',
      'Prepare purchase requisitions for owner sign-off'
    ],
    maxAutonomyBudget: '$1,200 / PO',
    sampleAction: 'Negotiated 8.5% volume discount for Q4 packaging supplies.',
    metrics: {
      label: 'Stockout prevention',
      value: '99.8%'
    }
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    tagline: 'Insights & Trend Discovery',
    description: 'Analyses performance, identifies trends and generates business insights.',
    iconName: 'BarChart3',
    defaultPermissions: [
      'Ingest sales and operating margin metrics',
      'Generate daily executive summary briefings',
      'Flag unit economics anomalies across product lines'
    ],
    maxAutonomyBudget: '$0 (Read-only intelligence)',
    sampleAction: 'Discovered 14% margin optimization opportunity in regional delivery lanes.',
    metrics: {
      label: 'Weekly reports delivered',
      value: '12 / 12'
    }
  },
  {
    id: 'operations',
    name: 'Operations Agent',
    tagline: 'Workflow & Cross-Agent Coordination',
    description: 'Coordinates workflows, manages tasks and monitors daily activities.',
    iconName: 'Cpu',
    defaultPermissions: [
      'Dispatch tasks across agent workforce',
      'Track deadline adherence and SLA escalations',
      'Maintain immutable operations log on NEAR Protocol'
    ],
    maxAutonomyBudget: 'Supervisor protocol',
    sampleAction: 'Routed customer fulfillment escalation between Customer and Logistics agents.',
    metrics: {
      label: 'Workflows orchestrated',
      value: '1,420+'
    }
  }
];
