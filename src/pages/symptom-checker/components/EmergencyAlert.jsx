import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyAlert = ({ symptoms, className = '' }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [emergencyLevel, setEmergencyLevel] = useState('none');

  const emergencySymptoms = {
    critical: [
      'chest pain', 'difficulty breathing', 'shortness of breath', 'severe headache',
      'loss of consciousness', 'severe bleeding', 'stroke symptoms', 'heart attack'
    ],
    urgent: [
      'high fever', 'severe pain', 'persistent vomiting', 'severe dizziness',
      'difficulty swallowing', 'severe allergic reaction'
    ]
  };

  useEffect(() => {
    if (symptoms?.length === 0) {
      setShowAlert(false);
      setEmergencyLevel('none');
      return;
    }

    const symptomNames = symptoms?.map(s => s?.name?.toLowerCase());
    const hasCritical = symptomNames?.some(name => 
      emergencySymptoms?.critical?.some(emergency => 
        name?.includes(emergency) || emergency?.includes(name)
      )
    );
    
    const hasUrgent = symptomNames?.some(name => 
      emergencySymptoms?.urgent?.some(emergency => 
        name?.includes(emergency) || emergency?.includes(name)
      )
    );

    const hasHighSeverity = symptoms?.some(s => s?.severity >= 8);

    if (hasCritical || (hasUrgent && hasHighSeverity)) {
      setEmergencyLevel('critical');
      setShowAlert(true);
    } else if (hasUrgent || hasHighSeverity) {
      setEmergencyLevel('urgent');
      setShowAlert(true);
    } else {
      setEmergencyLevel('none');
      setShowAlert(false);
    }
  }, [symptoms]);

  const handleEmergencyCall = () => {
    window.open('tel:911', '_self');
  };

  const handleUrgentCare = () => {
    window.open('tel:5551234567', '_self');
  };

  if (!showAlert) return null;

  const alertConfig = {
    critical: {
      bgColor: 'bg-destructive',
      textColor: 'text-destructive-foreground',
      borderColor: 'border-destructive',
      icon: 'AlertTriangle',
      title: 'Seek Immediate Emergency Care',
      message: 'Your symptoms may indicate a serious medical emergency. Please call 911 or go to the nearest emergency room immediately.',
      actions: [
        { label: 'Call 911', action: handleEmergencyCall, variant: 'destructive', icon: 'Phone' },
        { label: 'Find ER', action: () => window.open('https://maps.google.com/?q=emergency+room+near+me', '_blank'), variant: 'outline', icon: 'MapPin' }
      ]
    },
    urgent: {
      bgColor: 'bg-warning',
      textColor: 'text-warning-foreground',
      borderColor: 'border-warning',
      icon: 'Clock',
      title: 'Consider Urgent Medical Attention',
      message: 'Your symptoms suggest you may need prompt medical care. Consider visiting urgent care or contacting a healthcare provider soon.',
      actions: [
        { label: 'Call Urgent Care', action: handleUrgentCare, variant: 'warning', icon: 'Phone' },
        { label: 'Find Urgent Care', action: () => window.open('https://maps.google.com/?q=urgent+care+near+me', '_blank'), variant: 'outline', icon: 'MapPin' }
      ]
    }
  };

  const config = alertConfig?.[emergencyLevel];

  return (
    <div className={`${config?.bgColor} ${config?.textColor} rounded-lg border ${config?.borderColor} p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon name={config?.icon} size={24} className="animate-pulse" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-2">{config?.title}</h3>
          <p className="text-sm mb-4 opacity-90">{config?.message}</p>
          
          <div className="flex flex-wrap gap-3">
            {config?.actions?.map((action, index) => (
              <Button
                key={index}
                variant={action?.variant}
                size="sm"
                onClick={action?.action}
                iconName={action?.icon}
                iconSize={16}
                className="bg-background/10 hover:bg-background/20 border-background/20"
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAlert(false)}
          className="flex-shrink-0 p-1 hover:bg-background/10 rounded-md healthcare-transition"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      {/* Disclaimer */}
      <div className="mt-4 pt-4 border-t border-current/20">
        <p className="text-xs opacity-75">
          <Icon name="Info" size={12} className="inline mr-1" />
          This is not a substitute for professional medical advice. Always consult with healthcare providers for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default EmergencyAlert;