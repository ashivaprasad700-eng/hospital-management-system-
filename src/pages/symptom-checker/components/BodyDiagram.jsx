import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BodyDiagram = ({ selectedAreas, onAreaSelect, className = '' }) => {
  const [hoveredArea, setHoveredArea] = useState(null);

  const bodyAreas = [
    { id: 'head', name: 'Head & Face', x: '50%', y: '12%', symptoms: ['Headache', 'Dizziness', 'Eye pain', 'Jaw pain'] },
    { id: 'neck', name: 'Neck', x: '50%', y: '20%', symptoms: ['Neck pain', 'Stiff neck', 'Throat pain'] },
    { id: 'chest', name: 'Chest', x: '50%', y: '35%', symptoms: ['Chest pain', 'Shortness of breath', 'Heart palpitations'] },
    { id: 'abdomen', name: 'Abdomen', x: '50%', y: '50%', symptoms: ['Stomach pain', 'Nausea', 'Bloating'] },
    { id: 'back', name: 'Back', x: '75%', y: '40%', symptoms: ['Back pain', 'Lower back pain', 'Muscle spasms'] },
    { id: 'left-arm', name: 'Left Arm', x: '25%', y: '40%', symptoms: ['Arm pain', 'Numbness', 'Weakness'] },
    { id: 'right-arm', name: 'Right Arm', x: '75%', y: '40%', symptoms: ['Arm pain', 'Numbness', 'Weakness'] },
    { id: 'left-leg', name: 'Left Leg', x: '40%', y: '75%', symptoms: ['Leg pain', 'Swelling', 'Cramps'] },
    { id: 'right-leg', name: 'Right Leg', x: '60%', y: '75%', symptoms: ['Leg pain', 'Swelling', 'Cramps'] }
  ];

  const handleAreaClick = (area) => {
    onAreaSelect(area);
  };

  return (
    <div className={`relative bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Select Affected Area</h3>
        <p className="text-sm text-muted-foreground">Click on the body area where you're experiencing symptoms</p>
      </div>
      {/* Body Diagram Container */}
      <div className="relative mx-auto w-64 h-96 bg-muted/20 rounded-lg border-2 border-dashed border-border">
        {/* Simple body outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-muted-foreground opacity-30">
            🧍
          </div>
        </div>

        {/* Interactive Areas */}
        {bodyAreas?.map((area) => {
          const isSelected = selectedAreas?.includes(area?.id);
          const isHovered = hoveredArea === area?.id;

          return (
            <button
              key={area?.id}
              className={`absolute w-8 h-8 rounded-full border-2 healthcare-transition transform -translate-x-1/2 -translate-y-1/2 ${
                isSelected
                  ? 'bg-primary border-primary text-primary-foreground'
                  : isHovered
                  ? 'bg-primary/20 border-primary text-primary' :'bg-background border-border hover:border-primary/50'
              }`}
              style={{ left: area?.x, top: area?.y }}
              onClick={() => handleAreaClick(area)}
              onMouseEnter={() => setHoveredArea(area?.id)}
              onMouseLeave={() => setHoveredArea(null)}
              title={area?.name}
            >
              <Icon 
                name={isSelected ? "Check" : "Plus"} 
                size={16} 
                className="mx-auto"
              />
            </button>
          );
        })}
      </div>
      {/* Selected Areas Display */}
      {selectedAreas?.length > 0 && (
        <div className="mt-6 p-4 bg-accent rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Selected Areas:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedAreas?.map((areaId) => {
              const area = bodyAreas?.find(a => a?.id === areaId);
              return (
                <div
                  key={areaId}
                  className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                >
                  <span>{area?.name}</span>
                  <button
                    onClick={() => onAreaSelect(area)}
                    className="hover:bg-primary/20 rounded-sm p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Hover Tooltip */}
      {hoveredArea && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-md p-2 healthcare-shadow z-10">
          <div className="text-xs font-medium text-popover-foreground">
            {bodyAreas?.find(a => a?.id === hoveredArea)?.name}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Common: {bodyAreas?.find(a => a?.id === hoveredArea)?.symptoms?.slice(0, 2)?.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyDiagram;