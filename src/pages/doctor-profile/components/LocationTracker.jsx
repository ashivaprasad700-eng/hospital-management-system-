import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LocationTracker = ({ doctor }) => {
  const [currentLocation, setCurrentLocation] = useState(doctor?.currentLocation);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate location changes
      const locations = [
        'Room 205 - Cardiology Wing',
        'Emergency Department',
        'Surgery Suite 3',
        'Consultation Room A',
        'ICU Ward 2'
      ];
      
      if (Math.random() > 0.7) { // 30% chance of location change
        const newLocation = locations?.[Math.floor(Math.random() * locations?.length)];
        setCurrentLocation(newLocation);
        setLastUpdated(new Date());
      }
    }, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const getLocationIcon = (location) => {
    if (location?.includes('Emergency')) return 'AlertTriangle';
    if (location?.includes('Surgery')) return 'Activity';
    if (location?.includes('ICU')) return 'Heart';
    if (location?.includes('Consultation')) return 'MessageSquare';
    return 'MapPin';
  };

  const getLocationStatus = (location) => {
    if (location?.includes('Emergency')) return 'urgent';
    if (location?.includes('Surgery')) return 'busy';
    if (location?.includes('ICU')) return 'critical';
    return 'available';
  };

  const statusColors = {
    available: 'text-success bg-success/10 border-success/20',
    busy: 'text-warning bg-warning/10 border-warning/20',
    urgent: 'text-error bg-error/10 border-error/20',
    critical: 'text-error bg-error/10 border-error/20'
  };

  const status = getLocationStatus(currentLocation);

  return (
    <div className="bg-surface border border-border rounded-lg healthcare-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Current Location</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors?.[status]}`}>
            {status === 'available' && 'Available'}
            {status === 'busy' && 'In Surgery'}
            {status === 'urgent' && 'Emergency'}
            {status === 'critical' && 'Critical Care'}
          </div>
        </div>

        {/* Current Location */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name={getLocationIcon(currentLocation)} size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-foreground mb-1">{currentLocation}</div>
            <div className="text-sm text-muted-foreground mb-2">
              Last updated: {lastUpdated?.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle" />
              <span className="text-xs text-success">Live tracking active</span>
            </div>
          </div>
        </div>

        {/* Hospital Map */}
        <div className="mb-4">
          <div className="text-sm font-medium text-foreground mb-2">Hospital Floor Plan</div>
          <div className="bg-muted/30 rounded-lg p-4 h-32 flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Hospital Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7128,-74.0060&z=18&output=embed"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground mb-2">Quick Navigation</div>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-2 p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg healthcare-transition">
              <Icon name="Navigation" size={14} />
              <span>Get Directions</span>
            </button>
            <button className="flex items-center gap-2 p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg healthcare-transition">
              <Icon name="Phone" size={14} />
              <span>Call Extension</span>
            </button>
          </div>
        </div>

        {/* Estimated Arrival */}
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <div className="text-sm">
              <span className="font-medium text-foreground">Estimated arrival: </span>
              <span className="text-primary">2-3 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTracker;