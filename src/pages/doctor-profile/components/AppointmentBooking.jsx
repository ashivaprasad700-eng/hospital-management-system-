import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentBooking = ({ doctor, onBookAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultationType, setConsultationType] = useState('in-person');

  // Generate next 7 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date?.setDate(today?.getDate() + i);
      dates?.push({
        date: date,
        dayName: date?.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date?.getDate(),
        month: date?.toLocaleDateString('en-US', { month: 'short' }),
        available: i !== 3 && i !== 6 // Mock unavailable days
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true }
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onBookAppointment({
        doctor: doctor,
        date: selectedDate,
        time: selectedTime,
        type: consultationType
      });
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg healthcare-shadow">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Book Appointment</h3>
        <p className="text-sm text-muted-foreground">
          Select your preferred date and time for consultation
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Consultation Type */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Consultation Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setConsultationType('in-person')}
              className={`p-3 rounded-lg border text-sm font-medium healthcare-transition ${
                consultationType === 'in-person' ?'border-primary bg-primary/10 text-primary' :'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2 justify-center">
                <Icon name="MapPin" size={16} />
                <span>In-Person</span>
              </div>
              <div className="text-xs mt-1">${doctor?.fees?.inPerson}</div>
            </button>
            <button
              onClick={() => setConsultationType('telemedicine')}
              className={`p-3 rounded-lg border text-sm font-medium healthcare-transition ${
                consultationType === 'telemedicine' ?'border-primary bg-primary/10 text-primary' :'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2 justify-center">
                <Icon name="Video" size={16} />
                <span>Video Call</span>
              </div>
              <div className="text-xs mt-1">${doctor?.fees?.telemedicine}</div>
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Select Date
          </label>
          <div className="grid grid-cols-7 gap-2">
            {availableDates?.map((dateObj, index) => (
              <button
                key={index}
                onClick={() => dateObj?.available && setSelectedDate(dateObj)}
                disabled={!dateObj?.available}
                className={`p-3 rounded-lg text-center text-sm healthcare-transition ${
                  selectedDate?.date?.getTime() === dateObj?.date?.getTime()
                    ? 'bg-primary text-primary-foreground'
                    : dateObj?.available
                    ? 'border border-border hover:border-primary/50 text-foreground'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <div className="font-medium">{dateObj?.dayName}</div>
                <div className="text-xs">{dateObj?.month} {dateObj?.dayNumber}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Select Time
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots?.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => slot?.available && setSelectedTime(slot?.time)}
                  disabled={!slot?.available}
                  className={`p-2 rounded-lg text-sm healthcare-transition ${
                    selectedTime === slot?.time
                      ? 'bg-primary text-primary-foreground'
                      : slot?.available
                      ? 'border border-border hover:border-primary/50 text-foreground'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {slot?.time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Insurance & Payment Info */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground mb-1">
                Insurance Accepted
              </div>
              <div className="text-xs text-muted-foreground">
                {doctor?.insurance?.join(', ')}
              </div>
              <div className="text-xs text-primary mt-2">
                Most insurance plans cover this consultation
              </div>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <Button
          variant="default"
          fullWidth
          disabled={!selectedDate || !selectedTime}
          onClick={handleBooking}
          iconName="Calendar"
          iconPosition="left"
        >
          Book Appointment
          {selectedDate && selectedTime && (
            <span className="ml-2 text-sm opacity-90">
              - ${consultationType === 'in-person' ? doctor?.fees?.inPerson : doctor?.fees?.telemedicine}
            </span>
          )}
        </Button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
          >
            Ask Question
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Clock"
            iconPosition="left"
          >
            View Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;