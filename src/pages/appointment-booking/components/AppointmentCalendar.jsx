import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const AppointmentCalendar = ({ selectedDate, onDateSelect, availableSlots, onSlotSelect, selectedSlot }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth]);

  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());

    const days = [];
    const today = new Date();
    today?.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date?.setDate(startDate?.getDate() + i);
      
      const isCurrentMonth = date?.getMonth() === month;
      const isToday = date?.getTime() === today?.getTime();
      const isPast = date < today;
      const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();
      
      // Mock availability data
      const hasSlots = isCurrentMonth && !isPast && Math.random() > 0.3;
      const slotCount = hasSlots ? Math.floor(Math.random() * 8) + 1 : 0;

      days?.push({
        date,
        day: date?.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isSelected,
        hasSlots,
        slotCount
      });
    }

    setCalendarDays(days);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeSlots = [
    { id: 1, time: '09:00 AM', available: true, waitTime: '5 min' },
    { id: 2, time: '09:30 AM', available: true, waitTime: '10 min' },
    { id: 3, time: '10:00 AM', available: false, waitTime: null },
    { id: 4, time: '10:30 AM', available: true, waitTime: '15 min' },
    { id: 5, time: '11:00 AM', available: true, waitTime: '5 min' },
    { id: 6, time: '11:30 AM', available: true, waitTime: '20 min' },
    { id: 7, time: '02:00 PM', available: true, waitTime: '5 min' },
    { id: 8, time: '02:30 PM', available: true, waitTime: '10 min' },
    { id: 9, time: '03:00 PM', available: false, waitTime: null },
    { id: 10, time: '03:30 PM', available: true, waitTime: '15 min' },
    { id: 11, time: '04:00 PM', available: true, waitTime: '5 min' },
    { id: 12, time: '04:30 PM', available: true, waitTime: '25 min' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border healthcare-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Select Date & Time</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
              iconSize={16}
            />
            <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames?.map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays?.map((day, index) => (
              <button
                key={index}
                onClick={() => day?.hasSlots && onDateSelect(day?.date)}
                disabled={day?.isPast || !day?.hasSlots}
                className={`
                  relative p-2 h-12 text-sm font-medium rounded-md healthcare-transition
                  ${day?.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                  ${day?.isToday ? 'ring-2 ring-primary ring-offset-2' : ''}
                  ${day?.isSelected ? 'bg-primary text-primary-foreground' : ''}
                  ${day?.hasSlots && !day?.isSelected ? 'hover:bg-accent' : ''}
                  ${day?.isPast || !day?.hasSlots ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                `}
              >
                {day?.day}
                {day?.hasSlots && day?.slotCount > 0 && (
                  <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-success rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Available Times - {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {timeSlots?.map(slot => (
                <button
                  key={slot?.id}
                  onClick={() => slot?.available && onSlotSelect(slot)}
                  disabled={!slot?.available}
                  className={`
                    p-3 rounded-md border text-sm font-medium healthcare-transition
                    ${selectedSlot?.id === slot?.id 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : slot?.available 
                        ? 'bg-background border-border hover:bg-accent text-foreground' 
                        : 'bg-muted border-border text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <div className="text-center">
                    <div>{slot?.time}</div>
                    {slot?.available && slot?.waitTime && (
                      <div className="text-xs opacity-75 mt-1">~{slot?.waitTime} wait</div>
                    )}
                    {!slot?.available && (
                      <div className="text-xs mt-1">Booked</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;