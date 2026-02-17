import React from 'react';
import Icon from '../../../components/AppIcon';

const PrescriptionStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Active Prescriptions',
      value: stats?.active,
      icon: 'CheckCircle',
      color: 'text-success bg-success/10 border-success/20',
      trend: stats?.activeTrend
    },
    {
      title: 'Pending Refills',
      value: stats?.pendingRefills,
      icon: 'RefreshCw',
      color: 'text-warning bg-warning/10 border-warning/20',
      trend: stats?.refillTrend
    },
    {
      title: 'Total Medications',
      value: stats?.total,
      icon: 'Pill',
      color: 'text-primary bg-primary/10 border-primary/20',
      trend: stats?.totalTrend
    },
    {
      title: 'Monthly Cost',
      value: `₹${stats?.monthlyCost}`,
      icon: 'DollarSign',
      color: 'text-secondary bg-secondary/10 border-secondary/20',
      trend: stats?.costTrend
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 healthcare-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            {stat?.trend !== undefined && (
              <div className={`flex items-center gap-1 text-xs ${getTrendColor(stat?.trend)}`}>
                <Icon name={getTrendIcon(stat?.trend)} size={12} />
                <span>{Math.abs(stat?.trend)}%</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-card-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionStats;