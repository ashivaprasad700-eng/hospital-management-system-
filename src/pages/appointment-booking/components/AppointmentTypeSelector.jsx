import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentTypeSelector = ({ selectedType, onTypeSelect }) => {
  const appointmentTypes = [
    {
      id: 'consultation',
      name: 'In-Person Consultation',
      description: 'Face-to-face consultation at the hospital',
      duration: '30 minutes',
      icon: 'Stethoscope',
      fee: 1500,
      features: ['Physical examination', 'Lab test orders', 'Prescription']
    },
    {
      id: 'telemedicine',
      name: 'Telemedicine',
      description: 'Video consultation from your home',
      duration: '20 minutes',
      icon: 'Video',
      fee: 1000,
      features: ['Video call', 'Digital prescription', 'Follow-up scheduling']
    },
    {
      id: 'followup',
      name: 'Follow-up Visit',
      description: 'Review previous consultation results',
      duration: '15 minutes',
      icon: 'RefreshCw',
      fee: 750,
      features: ['Progress review', 'Treatment adjustment', 'Next steps planning']
    },
    {
      id: 'emergency',
      name: 'Urgent Care',
      description: 'Same-day appointment for urgent issues',
      duration: '45 minutes',
      icon: 'AlertTriangle',
      fee: 2000,
      features: ['Priority scheduling', 'Immediate attention', 'Emergency protocols']
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border healthcare-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Appointment Type</h3>
        <div className="space-y-3">
          {appointmentTypes?.map(type => (
            <button
              key={type?.id}
              onClick={() => onTypeSelect(type)}
              className={`
                w-full p-4 rounded-lg border text-left healthcare-transition
                ${selectedType?.id === type?.id 
                  ? 'bg-primary/5 border-primary text-foreground ring-2 ring-primary/20' 
                  : 'bg-background border-border hover:bg-accent text-foreground'
                }
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${selectedType?.id === type?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  <Icon name={type?.icon} size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{type?.name}</h4>
                    <span className="text-sm font-semibold text-primary">₹{type?.fee}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{type?.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>{type?.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {type?.features?.map((feature, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentTypeSelector;