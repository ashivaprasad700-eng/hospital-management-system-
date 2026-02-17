import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentConsultationCard = ({ consultation }) => {
  const getConsultationTypeIcon = (type) => {
    switch (type) {
      case 'in-person': return 'User';
      case 'video': return 'Video';
      case 'phone': return 'Phone';
      default: return 'MessageCircle';
    }
  };

  const getConsultationTypeColor = (type) => {
    switch (type) {
      case 'in-person': return 'text-primary bg-primary/10';
      case 'video': return 'text-secondary bg-secondary/10';
      case 'phone': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 healthcare-shadow hover:shadow-md healthcare-transition">
      <div className="flex items-start gap-3 mb-3">
        <Image
          src={consultation?.doctorImage}
          alt={consultation?.doctorName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-foreground">{consultation?.doctorName}</h4>
              <p className="text-sm text-muted-foreground">{consultation?.specialty}</p>
            </div>
            <div className={`p-1.5 rounded-lg ${getConsultationTypeColor(consultation?.type)}`}>
              <Icon name={getConsultationTypeIcon(consultation?.type)} size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>{consultation?.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="FileText" size={14} />
          <span>{consultation?.diagnosis}</span>
        </div>
        {consultation?.followUp && (
          <div className="flex items-center gap-2 text-sm text-warning">
            <Icon name="Clock" size={14} />
            <span>Follow-up: {consultation?.followUp}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" iconName="FileText" iconPosition="left" iconSize={14}>
          View Report
        </Button>
        <Button variant="ghost" size="sm" iconName="Download" iconPosition="left" iconSize={14}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default RecentConsultationCard;