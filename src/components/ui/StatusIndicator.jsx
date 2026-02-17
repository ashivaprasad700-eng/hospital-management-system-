import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ type = 'system', className = '' }) => {
  const [status, setStatus] = useState('online');
  const [doctorCount, setDoctorCount] = useState(12);
  const [appointmentSlots, setAppointmentSlots] = useState(8);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate doctor availability changes
      setDoctorCount(prev => Math.max(8, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
      
      // Simulate appointment slot changes
      setAppointmentSlots(prev => Math.max(3, Math.min(12, prev + (Math.random() > 0.6 ? 1 : -1))));
      
      // Simulate system status (rarely changes)
      if (Math.random() > 0.95) {
        setStatus(prev => prev === 'online' ? 'maintenance' : 'online');
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (type) {
      case 'doctors':
        return {
          icon: 'Users',
          label: `${doctorCount} doctors available`,
          color: doctorCount > 10 ? 'success' : doctorCount > 5 ? 'warning' : 'error',
          pulse: doctorCount > 10
        };
      case 'appointments':
        return {
          icon: 'Calendar',
          label: `${appointmentSlots} slots today`,
          color: appointmentSlots > 6 ? 'success' : appointmentSlots > 3 ? 'warning' : 'error',
          pulse: appointmentSlots > 6
        };
      case 'system':
      default:
        return {
          icon: 'Activity',
          label: status === 'online' ? 'All systems operational' : 'Maintenance mode',
          color: status === 'online' ? 'success' : 'warning',
          pulse: status === 'online'
        };
    }
  };

  const config = getStatusConfig();
  
  const colorClasses = {
    success: 'text-success bg-success/10 border-success/20',
    warning: 'text-warning bg-warning/10 border-warning/20',
    error: 'text-error bg-error/10 border-error/20'
  };

  const dotClasses = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium healthcare-transition ${colorClasses?.[config?.color]} ${className}`}>
      <div className={`w-2 h-2 rounded-full ${dotClasses?.[config?.color]} ${config?.pulse ? 'animate-pulse-gentle' : ''}`} />
      <Icon name={config?.icon} size={12} />
      <span className="hidden sm:inline">{config?.label}</span>
      <span className="sm:hidden">
        {type === 'doctors' && doctorCount}
        {type === 'appointments' && appointmentSlots}
        {type === 'system' && (status === 'online' ? '✓' : '⚠')}
      </span>
    </div>
  );
};

export default StatusIndicator;