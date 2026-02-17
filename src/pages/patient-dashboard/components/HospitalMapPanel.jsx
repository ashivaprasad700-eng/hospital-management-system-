import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HospitalMapPanel = () => {
  const [selectedFloor, setSelectedFloor] = useState('ground');

  const floorOptions = [
    { value: 'ground', label: 'Ground Floor', description: 'Emergency, Reception, Pharmacy' },
    { value: 'first', label: '1st Floor', description: 'Cardiology, Neurology, ICU' },
    { value: 'second', label: '2nd Floor', description: 'Surgery, Recovery Rooms' },
    { value: 'third', label: '3rd Floor', description: 'Pediatrics, Maternity' }
  ];

  const departments = [
    { name: 'Emergency Department', location: 'Ground Floor - Wing A', icon: 'Zap', color: 'error' },
    { name: 'Cardiology', location: '1st Floor - Wing B', icon: 'Heart', color: 'primary' },
    { name: 'Neurology', location: '1st Floor - Wing C', icon: 'Brain', color: 'secondary' },
    { name: 'Pharmacy', location: 'Ground Floor - Wing B', icon: 'Pill', color: 'success' },
    { name: 'Laboratory', location: 'Ground Floor - Wing C', icon: 'TestTube', color: 'warning' },
    { name: 'Radiology', location: '2nd Floor - Wing A', icon: 'Scan', color: 'primary' }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'error': return 'text-error bg-error/10';
      case 'primary': return 'text-primary bg-primary/10';
      case 'secondary': return 'text-secondary bg-secondary/10';
      case 'success': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 healthcare-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Icon name="Map" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Hospital Map & Navigation</h3>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Navigation"
          iconPosition="left"
          iconSize={14}
        >
          Get Directions
        </Button>
      </div>
      {/* Interactive Map */}
      <div className="mb-4">
        <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="HospitalConnect Location"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=12.967629160447734, 77.71392493781289&z=15&output=embed"
            className="border-0"
          />
        </div>
      </div>
      {/* Floor Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">Select Floor:</label>
        <div className="grid grid-cols-2 gap-2">
          {floorOptions?.map((floor) => (
            <button
              key={floor?.value}
              onClick={() => setSelectedFloor(floor?.value)}
              className={`p-3 rounded-lg border text-left healthcare-transition ${
                selectedFloor === floor?.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:bg-accent'
              }`}
            >
              <div className="font-medium text-sm">{floor?.label}</div>
              <div className={`text-xs ${selectedFloor === floor?.value ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {floor?.description}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Department Directory */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Department Directory</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {departments?.map((dept, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent healthcare-transition">
              <div className={`p-1.5 rounded-lg ${getColorClasses(dept?.color)}`}>
                <Icon name={dept?.icon} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{dept?.name}</p>
                <p className="text-xs text-muted-foreground">{dept?.location}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Navigation"
                iconSize={12}
                className="text-primary hover:bg-primary/10"
              >
                <span className="sr-only">Navigate to {dept?.name}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="MapPin" size={16} className="text-success mt-0.5" />
          <div className="text-sm">
            <p className="text-success font-medium mb-1">Hospital Address</p>
            <p className="text-muted-foreground">
              CMR Institute of Technology,#132, IT PARK ROAD, AECS LAYOUT, BANGALORE -560037, Karnataka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalMapPanel;