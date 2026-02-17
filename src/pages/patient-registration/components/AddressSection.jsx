import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddressSection = ({ formData, handleInputChange, errors }) => {
  const stateOptions = [
    { value: 'al', label: 'Alabama' },
    { value: 'ak', label: 'Alaska' },
    { value: 'az', label: 'Arizona' },
    { value: 'ar', label: 'Arkansas' },
    { value: 'ca', label: 'California' },
    { value: 'co', label: 'Colorado' },
    { value: 'ct', label: 'Connecticut' },
    { value: 'de', label: 'Delaware' },
    { value: 'fl', label: 'Florida' },
    { value: 'ga', label: 'Georgia' },
    { value: 'hi', label: 'Hawaii' },
    { value: 'id', label: 'Idaho' },
    { value: 'il', label: 'Illinois' },
    { value: 'in', label: 'Indiana' },
    { value: 'ia', label: 'Iowa' },
    { value: 'ks', label: 'Kansas' },
    { value: 'ky', label: 'Kentucky' },
    { value: 'la', label: 'Louisiana' },
    { value: 'me', label: 'Maine' },
    { value: 'md', label: 'Maryland' },
    { value: 'ma', label: 'Massachusetts' },
    { value: 'mi', label: 'Michigan' },
    { value: 'mn', label: 'Minnesota' },
    { value: 'ms', label: 'Mississippi' },
    { value: 'mo', label: 'Missouri' },
    { value: 'mt', label: 'Montana' },
    { value: 'ne', label: 'Nebraska' },
    { value: 'nv', label: 'Nevada' },
    { value: 'nh', label: 'New Hampshire' },
    { value: 'nj', label: 'New Jersey' },
    { value: 'nm', label: 'New Mexico' },
    { value: 'ny', label: 'New York' },
    { value: 'nc', label: 'North Carolina' },
    { value: 'nd', label: 'North Dakota' },
    { value: 'oh', label: 'Ohio' },
    { value: 'ok', label: 'Oklahoma' },
    { value: 'or', label: 'Oregon' },
    { value: 'pa', label: 'Pennsylvania' },
    { value: 'ri', label: 'Rhode Island' },
    { value: 'sc', label: 'South Carolina' },
    { value: 'sd', label: 'South Dakota' },
    { value: 'tn', label: 'Tennessee' },
    { value: 'tx', label: 'Texas' },
    { value: 'ut', label: 'Utah' },
    { value: 'vt', label: 'Vermont' },
    { value: 'va', label: 'Virginia' },
    { value: 'wa', label: 'Washington' },
    { value: 'wv', label: 'West Virginia' },
    { value: 'wi', label: 'Wisconsin' },
    { value: 'wy', label: 'Wyoming' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">2</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Address Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Street Address"
          type="text"
          placeholder="123 Main Street"
          value={formData?.streetAddress}
          onChange={(e) => handleInputChange('streetAddress', e?.target?.value)}
          error={errors?.streetAddress}
          required
          className="md:col-span-2"
        />

        <Input
          label="Apartment/Unit (Optional)"
          type="text"
          placeholder="Apt 4B, Unit 205, etc."
          value={formData?.apartment}
          onChange={(e) => handleInputChange('apartment', e?.target?.value)}
          error={errors?.apartment}
          className="md:col-span-2"
        />

        <Input
          label="City"
          type="text"
          placeholder="Enter city"
          value={formData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
          className="md:col-span-1"
        />

        <Select
          label="State"
          options={stateOptions}
          value={formData?.state}
          onChange={(value) => handleInputChange('state', value)}
          error={errors?.state}
          placeholder="Select state"
          required
          searchable
          className="md:col-span-1"
        />

        <Input
          label="ZIP Code"
          type="text"
          placeholder="12345"
          value={formData?.zipCode}
          onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
          error={errors?.zipCode}
          required
          pattern="[0-9]{5}(-[0-9]{4})?"
          className="md:col-span-1"
        />

        <Input
          label="Country"
          type="text"
          value="United States"
          disabled
          className="md:col-span-1"
        />
      </div>
    </div>
  );
};

export default AddressSection;