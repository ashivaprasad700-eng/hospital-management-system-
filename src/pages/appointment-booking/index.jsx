import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HealthcareBreadcrumb from '../../components/ui/HealthcareBreadcrumb';
import StatusIndicator from '../../components/ui/StatusIndicator';
import AppointmentCalendar from './components/AppointmentCalendar';
import AppointmentTypeSelector from './components/AppointmentTypeSelector';
import DoctorInfoPanel from './components/DoctorInfoPanel';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AppointmentBooking = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  // Mock doctor data - in real app, this would come from props or API
  const mockDoctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Internal Medicine",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    experience: 12,
    location: "Room 205, Medical Center",
    fee: 1500
  };

  useEffect(() => {
    // Get doctor from location state (from doctor profile page)
    if (location?.state?.doctor) {
      setSelectedDoctor(location?.state?.doctor);
    } else {
      // Use mock doctor if no doctor passed
      setSelectedDoctor(mockDoctor);
    }
  }, [location?.state]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot when date changes
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleBookingSubmit = async (formData) => {
    setIsBooking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const appointment = {
      id: `APT-${Date.now()}`,
      patient: {
        name: "Sharath R",
        id: "HC-2024-001"
      },
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedSlot?.time,
      type: selectedType?.name,
      location: selectedDoctor?.location,
      fee: selectedType?.fee,
      duration: selectedType?.duration,
      formData
    };

    setConfirmedAppointment(appointment);
    setShowConfirmation(true);
    setIsBooking(false);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Reset form or redirect to dashboard
    window.location.href = '/patient-dashboard';
  };

  const handleReschedule = () => {
    setShowConfirmation(false);
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedType(null);
  };

  const isBookingReady = selectedDate && selectedSlot && selectedType && selectedDoctor;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HealthcareBreadcrumb />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Book Appointment</h1>
            <p className="text-muted-foreground">Schedule your consultation with our healthcare professionals</p>
          </div>
          
          <div className="flex items-center gap-3">
            <StatusIndicator type="doctors" />
            <StatusIndicator type="appointments" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <Icon name="Clock" size={24} className="mx-auto text-primary mb-2" />
            <h3 className="font-medium text-foreground mb-1">Same Day</h3>
            <p className="text-sm text-muted-foreground">Available today</p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <Icon name="Video" size={24} className="mx-auto text-primary mb-2" />
            <h3 className="font-medium text-foreground mb-1">Telemedicine</h3>
            <p className="text-sm text-muted-foreground">Virtual consultations</p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <Icon name="RefreshCw" size={24} className="mx-auto text-primary mb-2" />
            <h3 className="font-medium text-foreground mb-1">Follow-up</h3>
            <p className="text-sm text-muted-foreground">Continue care</p>
          </div>
        </div>

        {/* Main Booking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calendar and Type Selection */}
          <div className="lg:col-span-2 space-y-6">
            <AppointmentTypeSelector
              selectedType={selectedType}
              onTypeSelect={handleTypeSelect}
            />
            
            <AppointmentCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
              availableSlots={[]} // Add missing required prop
            />
            
            {isBookingReady && (
              <BookingForm
                onSubmit={handleBookingSubmit}
                isLoading={isBooking}
              />
            )}
          </div>

          {/* Right Column - Doctor Info and Summary */}
          <div className="space-y-6">
            <DoctorInfoPanel
              doctor={selectedDoctor}
              appointmentType={selectedType}
              selectedSlot={selectedSlot}
              selectedDate={selectedDate}
            />

            {/* Booking Progress */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Booking Progress</h4>
              <div className="space-y-2">
                <div className={`flex items-center gap-2 text-sm ${selectedType ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={selectedType ? "CheckCircle" : "Circle"} size={16} />
                  <span>Select appointment type</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${selectedDate ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={selectedDate ? "CheckCircle" : "Circle"} size={16} />
                  <span>Choose date</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${selectedSlot ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={selectedSlot ? "CheckCircle" : "Circle"} size={16} />
                  <span>Select time slot</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${isBookingReady ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={isBookingReady ? "CheckCircle" : "Circle"} size={16} />
                  <span>Complete booking form</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-error/5 border border-error/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                Emergency Care
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                For immediate medical attention, call emergency services or visit the ER.
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                iconSize={14}
                fullWidth
              >
                Call 911
              </Button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-muted rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Icon name="HelpCircle" size={32} className="mx-auto text-primary mb-3" />
              <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our support team is available 24/7 to assist you with booking.
              </p>
              <Button variant="outline" size="sm">Contact Support</Button>
            </div>
            
            <div className="text-center">
              <Icon name="Calendar" size={32} className="mx-auto text-primary mb-3" />
              <h3 className="font-medium text-foreground mb-2">Manage Appointments</h3>
              <p className="text-sm text-muted-foreground mb-3">
                View, reschedule, or cancel your existing appointments.
              </p>
              <Button variant="outline" size="sm">View Appointments</Button>
            </div>
            
            <div className="text-center">
              <Icon name="FileText" size={32} className="mx-auto text-primary mb-3" />
              <h3 className="font-medium text-foreground mb-2">Insurance Info</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Check your insurance coverage and benefits information.
              </p>
              <Button variant="outline" size="sm">Check Coverage</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmation && confirmedAppointment && (
        <BookingConfirmation
          appointment={confirmedAppointment}
          onClose={handleConfirmationClose}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
};

export default AppointmentBooking;