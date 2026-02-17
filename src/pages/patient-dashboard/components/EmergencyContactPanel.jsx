import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactPanel = () => {
  const emergencyContacts = [
    {
      id: 1,
      type: "Emergency Services",
      number: "911",
      description: "Life-threatening emergencies",
      icon: "Phone",
      color: "error"
    },
    {
      id: 2,
      type: "Hospital Emergency",
      number: "(555) 123-4567",
      description: "HospitalConnect Emergency Dept",
      icon: "Building2",
      color: "primary"
    },
    {
      id: 3,
      type: "Nurse Hotline",
      number: "(555) 123-4568",
      description: "24/7 Medical advice",
      icon: "UserCheck",
      color: "secondary"
    },
    {
      id: 4,
      type: "Poison Control",
      number: "1-800-222-1222",
      description: "Poison emergencies",
      icon: "AlertTriangle",
      color: "warning"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'error': return 'bg-error text-error-foreground hover:bg-error/90';
      case 'primary': return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'secondary': return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
      case 'warning': return 'bg-warning text-warning-foreground hover:bg-warning/90';
      default: return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 healthcare-shadow">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-error/10 text-error rounded-lg">
          <Icon name="Phone" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
      </div>
      <div className="space-y-3">
        {emergencyContacts?.map((contact) => (
          <div key={contact?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${contact?.color === 'error' ? 'bg-error/10 text-error' : 
                contact?.color === 'primary' ? 'bg-primary/10 text-primary' :
                contact?.color === 'secondary'? 'bg-secondary/10 text-secondary' : 'bg-warning/10 text-warning'}`}>
                <Icon name={contact?.icon} size={16} />
              </div>
              <div>
                <p className="font-medium text-foreground">{contact?.type}</p>
                <p className="text-sm text-muted-foreground">{contact?.description}</p>
              </div>
            </div>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => handleCall(contact?.number)}
              iconName="Phone"
              iconPosition="left"
              iconSize={14}
              className={getColorClasses(contact?.color)}
            >
              {contact?.number}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-primary font-medium mb-1">Quick Access</p>
            <p className="text-muted-foreground">
              Save these numbers in your phone for quick access during emergencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactPanel;