import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DoctorInfoPanel = ({ doctor, appointmentType, selectedSlot, selectedDate }) => {
  if (!doctor) {
    return (
      <div className="bg-card rounded-lg border border-border healthcare-shadow">
        <div className="p-6 text-center">
          <Icon name="UserX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No doctor selected</p>
        </div>
      </div>
    );
  }

  const insuranceProviders = [
    { name: 'Blue Cross Blue Shield', coverage: '80%', copay: '₹2,400' },
    { name: 'Aetna', coverage: '75%', copay: '₹2,800' },
    { name: 'UnitedHealth', coverage: '85%', copay: '₹2,000' },
    { name: 'Cigna', coverage: '70%', copay: '₹3,200' }
  ];

  const paymentMethods = [
    { type: 'Insurance', icon: 'CreditCard', description: 'Use your insurance coverage' },
    { type: 'Credit Card', icon: 'CreditCard', description: 'Visa, MasterCard, American Express' },
    { type: 'Debit Card', icon: 'CreditCard', description: 'Direct bank payment' },
    { type: 'Cash', icon: 'RupeeSign', description: 'Pay at the hospital' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border healthcare-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Appointment Summary</h3>
        
        {/* Doctor Information */}
        <div className="flex items-start gap-4 mb-6">
          <Image
            src={doctor?.image}
            alt={doctor?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{doctor?.name}</h4>
            <p className="text-sm text-muted-foreground mb-1">{doctor?.specialization}</p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-foreground">{doctor?.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{doctor?.experience} years exp</span>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-sm font-medium text-foreground">
              {appointmentType?.name || 'Not selected'}
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Date</span>
            <span className="text-sm font-medium text-foreground">
              {selectedDate ? selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              }) : 'Not selected'}
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Time</span>
            <span className="text-sm font-medium text-foreground">
              {selectedSlot?.time || 'Not selected'}
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="text-sm font-medium text-foreground">
              {appointmentType?.duration || 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Consultation Fee</span>
            <span className="text-lg font-semibold text-primary">
              ₹{appointmentType?.fee || 0}
            </span>
          </div>
        </div>

        {/* Insurance Coverage */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Insurance Coverage</h4>
          <div className="space-y-2">
            {insuranceProviders?.slice(0, 2)?.map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{provider?.name}</p>
                  <p className="text-xs text-muted-foreground">Coverage: {provider?.coverage}</p>
                </div>
                <span className="text-sm font-medium text-foreground">{provider?.copay}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Payment Options</h4>
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods?.map((method, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg text-center">
                <Icon name={method?.icon} size={20} className="mx-auto text-muted-foreground mb-1" />
                <p className="text-xs font-medium text-foreground">{method?.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoPanel;