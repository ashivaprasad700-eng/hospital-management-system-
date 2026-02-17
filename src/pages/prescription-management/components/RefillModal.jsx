import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RefillModal = ({ isOpen, onClose, prescription, onSubmitRefill }) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');
  const [urgentRequest, setUrgentRequest] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pharmacyOptions = [
    { value: 'cvs-main', label: 'CVS Pharmacy - Main Street' },
    { value: 'walgreens-downtown', label: 'Walgreens - Downtown' },
    { value: 'rite-aid-plaza', label: 'Rite Aid - Medical Plaza' },
    { value: 'hospital-pharmacy', label: 'HospitalConnect Pharmacy' },
    { value: 'online-pharmacy', label: 'Online Pharmacy Delivery' }
  ];

  const deliveryOptions = [
    { value: 'pickup', label: 'Pharmacy Pickup' },
    { value: 'delivery', label: 'Home Delivery' },
    { value: 'curbside', label: 'Curbside Pickup' }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    const refillRequest = {
      prescriptionId: prescription?.id,
      pharmacy: selectedPharmacy,
      deliveryOption,
      deliveryAddress: deliveryOption === 'delivery' ? deliveryAddress : '',
      insuranceInfo,
      urgentRequest,
      notes,
      requestDate: new Date()?.toISOString()
    };

    try {
      await onSubmitRefill(refillRequest);
      onClose();
    } catch (error) {
      console.error('Error submitting refill request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !prescription) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Request Refill</h2>
            <p className="text-sm text-muted-foreground mt-1">{prescription?.medicationName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="text-muted-foreground hover:text-card-foreground"
          />
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Prescription Info */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-card-foreground mb-2">Prescription Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Medication:</span>
                <span className="ml-2 font-medium">{prescription?.medicationName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Dosage:</span>
                <span className="ml-2 font-medium">{prescription?.dosage}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Refills Remaining:</span>
                <span className="ml-2 font-medium">{prescription?.refillsRemaining}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Filled:</span>
                <span className="ml-2 font-medium">{prescription?.lastFilled}</span>
              </div>
            </div>
          </div>

          {/* Pharmacy Selection */}
          <Select
            label="Select Pharmacy"
            description="Choose where you'd like to fill your prescription"
            required
            options={pharmacyOptions}
            value={selectedPharmacy}
            onChange={setSelectedPharmacy}
            searchable
          />

          {/* Delivery Options */}
          <Select
            label="Delivery Option"
            description="How would you like to receive your medication?"
            required
            options={deliveryOptions}
            value={deliveryOption}
            onChange={setDeliveryOption}
          />

          {/* Delivery Address (if delivery selected) */}
          {deliveryOption === 'delivery' && (
            <Input
              label="Delivery Address"
              type="text"
              placeholder="Enter your delivery address"
              description="Full address including apartment/unit number"
              required
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e?.target?.value)}
            />
          )}

          {/* Insurance Information */}
          <Input
            label="Insurance Information (Optional)"
            type="text"
            placeholder="Insurance card number or changes"
            description="Leave blank if no changes to insurance"
            value={insuranceInfo}
            onChange={(e) => setInsuranceInfo(e?.target?.value)}
          />

          {/* Urgent Request */}
          <Checkbox
            label="Urgent Request"
            description="Check if you need this refill urgently (may incur additional fees)"
            checked={urgentRequest}
            onChange={(e) => setUrgentRequest(e?.target?.checked)}
          />

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              placeholder="Any special instructions or requests..."
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
            />
          </div>

          {/* Cost Estimate */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <h3 className="font-medium text-primary">Estimated Cost</h3>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Medication:</span>
                <span className="font-medium">₹{prescription?.cost}</span>
              </div>
              {urgentRequest && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgent Processing:</span>
                  <span className="font-medium">₹50.00</span>
                </div>
              )}
              {deliveryOption === 'delivery' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee:</span>
                  <span className="font-medium">₹70.99</span>
                </div>
              )}
              <div className="border-t border-primary/20 pt-1 flex justify-between font-semibold">
                <span>Total Estimated:</span>
                <span>₹{(parseFloat(prescription?.cost) + 
                (urgentRequest ? 5 : 0) + (deliveryOption === 'delivery' ? 7.99 : 0))?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!selectedPharmacy}
              className="flex-1"
            >
              Submit Refill Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefillModal;