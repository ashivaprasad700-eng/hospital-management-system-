import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const HealthcareBreadcrumb = () => {
  const location = useLocation();

  const breadcrumbMap = {
    '/patient-dashboard': [
      { label: 'Dashboard', path: '/patient-dashboard', icon: 'LayoutDashboard' }
    ],
    '/patient-registration': [
      { label: 'Registration', path: '/patient-registration', icon: 'UserPlus' }
    ],
    '/symptom-checker': [
      { label: 'Find Care', path: '/symptom-checker', icon: 'Stethoscope' },
      { label: 'Symptom Checker', path: '/symptom-checker', icon: 'Search' }
    ],
    '/doctor-profile': [
      { label: 'Find Care', path: '/symptom-checker', icon: 'Stethoscope' },
      { label: 'Symptom Checker', path: '/symptom-checker', icon: 'Search' },
      { label: 'Doctor Profile', path: '/doctor-profile', icon: 'User' }
    ],
    '/appointment-booking': [
      { label: 'Appointments', path: '/appointment-booking', icon: 'Calendar' },
      { label: 'Book Appointment', path: '/appointment-booking', icon: 'Plus' }
    ],
    '/prescription-management': [
      { label: 'Prescriptions', path: '/prescription-management', icon: 'Pill' },
      { label: 'Manage Prescriptions', path: '/prescription-management', icon: 'FileText' }
    ]
  };

  const currentBreadcrumb = breadcrumbMap?.[location?.pathname] || [];

  if (currentBreadcrumb?.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path !== location?.pathname) {
      window.location.href = path;
    }
  };

  return (
    <nav className="bg-background border-b border-border py-3 px-4" aria-label="Healthcare workflow breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          {currentBreadcrumb?.map((item, index) => {
            const isLast = index === currentBreadcrumb?.length - 1;
            const isClickable = !isLast && item?.path !== location?.pathname;

            return (
              <li key={item?.path} className="flex items-center gap-2">
                {index > 0 && (
                  <Icon 
                    name="ChevronRight" 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                )}
                {isClickable ? (
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center gap-1.5 text-primary hover:text-primary/80 healthcare-transition"
                    aria-label={`Navigate to ${item?.label}`}
                  >
                    <Icon name={item?.icon} size={14} />
                    <span>{item?.label}</span>
                  </button>
                ) : (
                  <div className={`flex items-center gap-1.5 ${
                    isLast ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    <Icon name={item?.icon} size={14} />
                    <span>{item?.label}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        
        {/* Mobile: Show only current page */}
        <div className="sm:hidden mt-2">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Icon name={currentBreadcrumb?.[currentBreadcrumb?.length - 1]?.icon} size={16} />
            <span>{currentBreadcrumb?.[currentBreadcrumb?.length - 1]?.label}</span>
          </div>
          {currentBreadcrumb?.length > 1 && (
            <button
              onClick={() => handleNavigation(currentBreadcrumb?.[currentBreadcrumb?.length - 2]?.path)}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 healthcare-transition mt-1"
            >
              <Icon name="ArrowLeft" size={12} />
              <span>Back to {currentBreadcrumb?.[currentBreadcrumb?.length - 2]?.label}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HealthcareBreadcrumb;