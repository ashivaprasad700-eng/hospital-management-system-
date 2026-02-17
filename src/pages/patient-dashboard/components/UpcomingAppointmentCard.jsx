import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UpcomingAppointmentCard = ({ appointment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'cancelled': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01 ${timeString}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 healthcare-shadow">
      <div className="flex items-start gap-4">
        <Image
          src={appointment?.doctorImage}
          alt={appointment?.doctorName}
          className="w-12 h-12 rounded-full object-cover"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-foreground">{appointment?.doctorName}</h4>
              <p className="text-sm text-muted-foreground">{appointment?.specialty}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment?.status)}`}>
              {appointment?.status?.charAt(0)?.toUpperCase() + appointment?.status?.slice(1)}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>{appointment?.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{formatTime(appointment?.time)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{appointment?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Timer" size={14} />
              <span>~{appointment?.waitTime} min wait</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" iconName="Edit" iconPosition="left" iconSize={14}>
              Reschedule
            </Button>
            <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left" iconSize={14}>
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointmentCard;