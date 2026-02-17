import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ formData, handleInputChange, errors }) => {
  const titleOptions = [
    { value: 'mr', label: 'Mr.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'dr', label: 'Dr.' },
    { value: 'prof', label: 'Prof.' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const bloodTypeOptions = [
    { value: 'a-positive', label: 'A+' },
    { value: 'a-negative', label: 'A-' },
    { value: 'b-positive', label: 'B+' },
    { value: 'b-negative', label: 'B-' },
    { value: 'ab-positive', label: 'AB+' },
    { value: 'ab-negative', label: 'AB-' },
    { value: 'o-positive', label: 'O+' },
    { value: 'o-negative', label: 'O-' },
    { value: 'unknown', label: 'Unknown' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">1</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          label="Title"
          options={titleOptions}
          value={formData?.title}
          onChange={(value) => handleInputChange('title', value)}
          error={errors?.title}
          placeholder="Select title"
          className="lg:col-span-1"
        />

        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
          className="md:col-span-1"
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
          className="md:col-span-1"
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
          description="Must be 18 years or older"
          className="md:col-span-1"
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleInputChange('gender', value)}
          error={errors?.gender}
          placeholder="Select gender"
          required
          className="md:col-span-1"
        />

        <Select
          label="Blood Type"
          options={bloodTypeOptions}
          value={formData?.bloodType}
          onChange={(value) => handleInputChange('bloodType', value)}
          error={errors?.bloodType}
          placeholder="Select blood type"
          description="Optional but recommended"
          className="md:col-span-1"
        />

        <Input
          label="Social Security Number"
          type="text"
          placeholder="XXX-XX-XXXX"
          value={formData?.ssn}
          onChange={(e) => handleInputChange('ssn', e?.target?.value)}
          error={errors?.ssn}
          description="Required for insurance verification"
          required
          className="md:col-span-1"
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
          className="md:col-span-1"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="hegde_sir@email.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          description="Used for appointment confirmations"
          className="md:col-span-1"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;