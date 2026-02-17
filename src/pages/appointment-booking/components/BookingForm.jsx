import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const BookingForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    reason: '',
    urgency: 'routine',
    symptoms: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialRequests: '',
    reminderPreference: 'email',
    confirmationMethod: 'sms'
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    cancellation: false
  });

  const urgencyOptions = [
    { value: 'routine', label: 'Routine Care', description: 'Regular check-up or non-urgent issue' },
    { value: 'urgent', label: 'Urgent Care', description: 'Needs attention within 24 hours' },
    { value: 'emergency', label: 'Emergency', description: 'Immediate medical attention required' }
  ];

  const reminderOptions = [
    { value: 'email', label: 'Email Reminder' },
    { value: 'sms', label: 'SMS Reminder' },
    { value: 'both', label: 'Email & SMS' },
    { value: 'none', label: 'No Reminders' }
  ];

  const confirmationOptions = [
    { value: 'email', label: 'Email Confirmation' },
    { value: 'sms', label: 'SMS Confirmation' },
    { value: 'phone', label: 'Phone Call' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgreementChange = (field, checked) => {
    setAgreements(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (agreements?.terms && agreements?.privacy && agreements?.cancellation) {
      onSubmit({ ...formData, agreements });
    }
  };

  const isFormValid = agreements?.terms && agreements?.privacy && agreements?.cancellation && 
                     formData?.reason?.trim() && formData?.emergencyContact?.trim() && formData?.emergencyPhone?.trim();

  return (
    <div className="bg-card rounded-lg border border-border healthcare-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Appointment Details</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Appointment Reason */}
          <div>
            <Input
              label="Reason for Visit"
              type="text"
              placeholder="Brief description of your concern"
              value={formData?.reason}
              onChange={(e) => handleInputChange('reason', e?.target?.value)}
              required
              description="Help the doctor prepare for your visit"
            />
          </div>

          {/* Urgency Level */}
          <div>
            <Select
              label="Urgency Level"
              options={urgencyOptions}
              value={formData?.urgency}
              onChange={(value) => handleInputChange('urgency', value)}
              description="How urgent is your medical concern?"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Symptoms
            </label>
            <textarea
              value={formData?.symptoms}
              onChange={(e) => handleInputChange('symptoms', e?.target?.value)}
              placeholder="Describe your current symptoms in detail..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Known Allergies"
              type="text"
              placeholder="List any allergies"
              value={formData?.allergies}
              onChange={(e) => handleInputChange('allergies', e?.target?.value)}
              description="Include drug, food, or environmental allergies"
            />
            
            <Input
              label="Current Medications"
              type="text"
              placeholder="List current medications"
              value={formData?.medications}
              onChange={(e) => handleInputChange('medications', e?.target?.value)}
              description="Include dosages if known"
            />
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Name"
              type="text"
              placeholder="Full name"
              value={formData?.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
              required
            />
            
            <Input
              label="Emergency Contact Phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData?.emergencyPhone}
              onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
              required
            />
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Special Accommodations
            </label>
            <textarea
              value={formData?.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
              placeholder="Any special accommodations needed (wheelchair access, interpreter, etc.)"
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Notification Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Reminder Preference"
              options={reminderOptions}
              value={formData?.reminderPreference}
              onChange={(value) => handleInputChange('reminderPreference', value)}
              description="How would you like to be reminded?"
            />
            
            <Select
              label="Confirmation Method"
              options={confirmationOptions}
              value={formData?.confirmationMethod}
              onChange={(value) => handleInputChange('confirmationMethod', value)}
              description="How should we confirm your appointment?"
            />
          </div>

          {/* Agreements */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground">Required Agreements</h4>
            
            <Checkbox
              label="I agree to the Terms and Conditions"
              checked={agreements?.terms}
              onChange={(e) => handleAgreementChange('terms', e?.target?.checked)}
              description="Please read and accept our terms of service"
            />
            
            <Checkbox
              label="I agree to the Privacy Policy"
              checked={agreements?.privacy}
              onChange={(e) => handleAgreementChange('privacy', e?.target?.checked)}
              description="We protect your personal health information"
            />
            
            <Checkbox
              label="I understand the Cancellation Policy"
              checked={agreements?.cancellation}
              onChange={(e) => handleAgreementChange('cancellation', e?.target?.checked)}
              description="24-hour notice required for cancellations"
            />
          </div>

          {/* Preparation Instructions */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Info" size={16} />
              Appointment Preparation
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Arrive 15 minutes early for check-in</li>
              <li>• Bring a valid ID and insurance card</li>
              <li>• Bring a list of current medications</li>
              <li>• Prepare questions you want to ask the doctor</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={!isFormValid}
              loading={isLoading}
              iconName="Calendar"
              iconPosition="left"
              fullWidth
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;