import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrescriptionReminderCard = ({ prescription }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getDaysUntilRefill = (refillDate) => {
    const today = new Date();
    const refill = new Date(refillDate);
    const diffTime = refill - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilRefill(prescription?.refillDate);

  return (
    <div className="bg-card border border-border rounded-lg p-4 healthcare-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Icon name="Pill" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{prescription?.medication}</h4>
            <p className="text-sm text-muted-foreground">{prescription?.dosage}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(prescription?.priority)}`}>
          {prescription?.priority?.charAt(0)?.toUpperCase() + prescription?.priority?.slice(1)}
        </span>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Take {prescription?.frequency}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>Refill due: {prescription?.refillDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="AlertCircle" size={14} />
          <span className={daysLeft <= 3 ? 'text-error' : daysLeft <= 7 ? 'text-warning' : 'text-success'}>
            {daysLeft > 0 ? `${daysLeft} days left` : 'Refill overdue'}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left" iconSize={14}>
          Request Refill
        </Button>
        <Button variant="ghost" size="sm" iconName="Download" iconPosition="left" iconSize={14}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionReminderCard;