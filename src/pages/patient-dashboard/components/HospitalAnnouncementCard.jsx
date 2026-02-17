import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HospitalAnnouncementCard = ({ announcement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error bg-error/10 border-error/20';
      case 'important': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return 'AlertTriangle';
      case 'important': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 healthcare-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${getPriorityColor(announcement?.priority)}`}>
          <Icon name={getPriorityIcon(announcement?.priority)} size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-foreground pr-2">{announcement?.title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDate(announcement?.date)}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {isExpanded ? announcement?.content : `${announcement?.content?.substring(0, 120)}${announcement?.content?.length > 120 ? '...' : ''}`}
          </p>
          
          {announcement?.content?.length > 120 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              iconSize={14}
              className="text-primary hover:bg-primary/10 p-0 h-auto"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>
          )}
          
          {announcement?.actionRequired && (
            <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-warning">
                <Icon name="Clock" size={14} />
                <span>Action Required by: {announcement?.deadline}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalAnnouncementCard;