import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmergencyContactSection = ({ formData, handleInputChange, errors }) => {
  const relationshipOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'friend', label: 'Friend' },
    { value: 'guardian', label: 'Guardian' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">4</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Emergency Contact</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Emergency Contact Name"
          type="text"
          placeholder="Enter full name"
          value={formData?.emergencyContactName}
          onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
          error={errors?.emergencyContactName}
          required
          className="md:col-span-1"
        />

        <Select
          label="Relationship"
          options={relationshipOptions}
          value={formData?.emergencyContactRelationship}
          onChange={(value) => handleInputChange('emergencyContactRelationship', value)}
          error={errors?.emergencyContactRelationship}
          placeholder="Select relationship"
          required
          className="md:col-span-1"
        />

        <Input
          label="Primary Phone"
          type="tel"
          placeholder="9845627189"
          value={formData?.emergencyContactPhone}
          onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
          error={errors?.emergencyContactPhone}
          required
          className="md:col-span-1"
        />

        <Input
          label="Alternative Phone (Optional)"
          type="tel"
          placeholder="9845627188"
          value={formData?.emergencyContactAltPhone}
          onChange={(e) => handleInputChange('emergencyContactAltPhone', e?.target?.value)}
          error={errors?.emergencyContactAltPhone}
          className="md:col-span-1"
        />

        <Input
          label="Email Address (Optional)"
          type="email"
          placeholder="cmremergency@email.com"
          value={formData?.emergencyContactEmail}
          onChange={(e) => handleInputChange('emergencyContactEmail', e?.target?.value)}
          error={errors?.emergencyContactEmail}
          description="For non-urgent notifications"
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default EmergencyContactSection;