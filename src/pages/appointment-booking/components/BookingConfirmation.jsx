import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingConfirmation = ({ appointment, onClose, onReschedule }) => {
  const handleAddToCalendar = () => {
    const startDate = new Date(appointment.date);
    startDate?.setHours(parseInt(appointment?.time?.split(':')?.[0]), parseInt(appointment?.time?.split(':')?.[1]?.split(' ')?.[0]));
    
    const endDate = new Date(startDate);
    endDate?.setMinutes(endDate?.getMinutes() + parseInt(appointment?.duration));

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appointment with ${appointment?.doctor?.name}`)}&dates=${startDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z/${endDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z&details=${encodeURIComponent(`Consultation with ${appointment?.doctor?.name}\nType: ${appointment?.type}\nLocation: ${appointment?.location}`)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleDownloadConfirmation = () => {
    const confirmationData = `
APPOINTMENT CONFIRMATION
========================

Appointment ID: ${appointment?.id}
Patient: ${appointment?.patient?.name}
Doctor: ${appointment?.doctor?.name}
Date: ${appointment?.date?.toLocaleDateString()}
Time: ${appointment?.time}
Type: ${appointment?.type}
Location: ${appointment?.location}
Fee: ₹${appointment?.fee}

Please arrive 15 minutes early.
Bring valid ID and insurance card.
    `?.trim();

    const blob = new Blob([confirmationData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointment-confirmation-${appointment?.id}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg border border-border healthcare-shadow max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Success Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Appointment Confirmed!</h2>
            <p className="text-sm text-muted-foreground">
              Your appointment has been successfully booked
            </p>
          </div>

          {/* Appointment Details */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={appointment?.doctor?.image}
                alt={appointment?.doctor?.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium text-foreground">{appointment?.doctor?.name}</h3>
                <p className="text-sm text-muted-foreground">{appointment?.doctor?.specialization}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {appointment?.date?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{appointment?.time}</span>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{appointment?.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Rupees" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">₹{appointment?.fee}</span>
              </div>
            </div>
          </div>

          {/* Appointment ID */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Appointment ID</p>
                <p className="font-mono text-sm font-medium text-foreground">{appointment?.id}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard?.writeText(appointment?.id)}
                iconName="Copy"
                iconSize={14}
              />
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 mb-6">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Bell" size={14} />
              Reminders Set
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Email reminder 24 hours before</li>
              <li>• SMS reminder 2 hours before</li>
              <li>• Check-in opens 30 minutes early</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddToCalendar}
                iconName="Calendar"
                iconPosition="left"
                iconSize={14}
              >
                Add to Calendar
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadConfirmation}
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Download
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onReschedule}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
              fullWidth
            >
              Reschedule Appointment
            </Button>

            <Button
              variant="default"
              size="lg"
              onClick={onClose}
              fullWidth
            >
              Done
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Need help? Contact us at
            </p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Icon name="Phone" size={12} />
                <span className="text-primary">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Mail" size={12} />
                <span className="text-primary">support@hospitalconnect.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;