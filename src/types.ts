export interface AgentInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  defaultPermissions: string[];
  maxAutonomyBudget: string;
  sampleAction: string;
  metrics: {
    label: string;
    value: string;
  };
}

export interface OperationalActivity {
  id: string;
  agent: string;
  action: string;
  status: 'completed' | 'pending' | 'verified';
  timestamp: string;
  amount?: string;
  hash?: string;
}

export interface PendingApproval {
  id: string;
  agent: string;
  title: string;
  description: string;
  amount: string;
  currency: string;
  recipient: string;
  policyReason: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'declined';
}
