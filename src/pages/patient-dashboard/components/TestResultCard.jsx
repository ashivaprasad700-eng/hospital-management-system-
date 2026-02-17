import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestResultCard = ({ testResult }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success bg-success/10 border-success/20';
      case 'abnormal': return 'text-error bg-error/10 border-error/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'review': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTestIcon = (type) => {
    switch (type) {
      case 'blood': return 'Droplet';
      case 'xray': return 'Scan';
      case 'mri': return 'Brain';
      case 'ecg': return 'Activity';
      default: return 'FileText';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 healthcare-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Icon name={getTestIcon(testResult?.type)} size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{testResult?.testName}</h4>
            <p className="text-sm text-muted-foreground">{testResult?.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(testResult?.status)}`}>
          {testResult?.status?.charAt(0)?.toUpperCase() + testResult?.status?.slice(1)}
        </span>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>Conducted: {testResult?.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="User" size={14} />
          <span>Ordered by: {testResult?.orderedBy}</span>
        </div>
        {testResult?.criticalValues && (
          <div className="flex items-center gap-2 text-sm text-error">
            <Icon name="AlertTriangle" size={14} />
            <span>Critical values detected</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" iconName="Eye" iconPosition="left" iconSize={14}>
          View Results
        </Button>
        <Button variant="ghost" size="sm" iconName="Download" iconPosition="left" iconSize={14}>
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default TestResultCard;