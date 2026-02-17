import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
  {
    label: 'Dashboard',
    path: '/patient-dashboard',
    icon: 'LayoutDashboard',
    description: 'Healthcare overview and quick access'
  },
  {
    label: 'Find Care',
    path: '/symptom-checker',
    icon: 'Stethoscope',
    description: 'Symptom assessment and doctor discovery'
  },
  {
    label: 'Appointments',
    path: '/appointment-booking',
    icon: 'Calendar',
    description: 'Schedule and manage appointments'
  },
  {
    label: 'Prescriptions',
    path: '/prescription-management',
    icon: 'Pill',
    description: 'Digital prescription access'
  }];


  const secondaryItems = [
  {
    label: 'Registration',
    path: '/patient-registration',
    icon: 'UserPlus'
  },
  {
    label: 'Doctor Profile',
    path: '/doctor-profile',
    icon: 'User'
  }];


  const isActivePath = (path) => {
    if (path === '/symptom-checker') {
      return location?.pathname === '/symptom-checker' || location?.pathname === '/doctor-profile';
    }
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Emergency Contact Banner */}
      <div className="emergency-banner text-white py-2 px-4 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={16} />
            <span>Emergency: 911</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Icon name="MapPin" size={16} />
            <span>Hospital: (555) 123-4567</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Icon name="Clock" size={16} />
            <span>24/7 Urgent Care Available</span>
          </div>
        </div>
      </div>
      {/* Patient Context Header */}
      <div className="patient-context border-b border-border py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              JD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Sharath R</p>
              <p className="text-xs text-muted-foreground">Patient ID: HC-2024-001</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
            <span className="text-xs text-muted-foreground hidden sm:inline">Active Session</span>
          </div>
        </div>
      </div>
      {/* Main Header */}
      <header className="bg-surface border-b border-border healthcare-shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">CMR Multispeciality Hospital</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems?.map((item) =>
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium healthcare-transition ${
                isActivePath(item?.path) ?
                'bg-primary text-primary-foreground' :
                'text-muted-foreground hover:text-foreground hover:bg-accent'}`
                }
                title={item?.description}>

                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              )}
              
              {/* More Menu */}
              <div className="relative ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  iconName="MoreHorizontal"
                  iconSize={16}>

                  More
                </Button>
                
                {isMenuOpen &&
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md healthcare-shadow z-60">
                    <div className="py-1">
                      {secondaryItems?.map((item) =>
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent healthcare-transition">

                          <Icon name={item?.icon} size={16} />
                          <span>{item?.label}</span>
                        </button>
                    )}
                    </div>
                  </div>
                }
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              iconName={isMenuOpen ? "X" : "Menu"}
              iconSize={20}>

              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen &&
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
              <nav className="space-y-2">
                {navigationItems?.map((item) =>
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-md text-sm font-medium healthcare-transition ${
                isActivePath(item?.path) ?
                'bg-primary text-primary-foreground' :
                'text-muted-foreground hover:text-foreground hover:bg-accent'}`
                }>

                    <Icon name={item?.icon} size={18} />
                    <div className="text-left">
                      <div>{item?.label}</div>
                      <div className="text-xs opacity-75">{item?.description}</div>
                    </div>
                  </button>
              )}
                
                <div className="border-t border-border pt-2 mt-2">
                  {secondaryItems?.map((item) =>
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent healthcare-transition">

                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                )}
                </div>
              </nav>
            </div>
          }
        </div>
      </header>
      {/* Click outside to close menu */}
      {isMenuOpen &&
      <div
        className="fixed inset-0 z-40 lg:hidden"
        onClick={() => setIsMenuOpen(false)} />

      }
    </>);

};

export default Header;