import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const InsuranceSection = ({ formData, handleInputChange, errors }) => {
  const insuranceProviders = [
    { value: 'aetna', label: 'Aetna' },
    { value: 'anthem', label: 'Anthem Blue Cross Blue Shield' },
    { value: 'cigna', label: 'Cigna' },
    { value: 'humana', label: 'Humana' },
    { value: 'kaiser', label: 'Kaiser Permanente' },
    { value: 'medicare', label: 'Medicare' },
    { value: 'medicaid', label: 'Medicaid' },
    { value: 'tricare', label: 'TRICARE' },
    { value: 'united', label: 'UnitedHealthcare' },
    { value: 'bcbs', label: 'Blue Cross Blue Shield' },
    { value: 'other', label: 'Other' },
    { value: 'none', label: 'No Insurance' }
  ];

  const relationshipOptions = [
    { value: 'self', label: 'Self' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'child', label: 'Child' },
    { value: 'parent', label: 'Parent' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">3</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Insurance Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Insurance Provider"
          options={insuranceProviders}
          value={formData?.insuranceProvider}
          onChange={(value) => handleInputChange('insuranceProvider', value)}
          error={errors?.insuranceProvider}
          placeholder="Select insurance provider"
          required
          searchable
          className="md:col-span-2"
        />

        {formData?.insuranceProvider && formData?.insuranceProvider !== 'none' && (
          <>
            <Input
              label="Policy Number"
              type="text"
              placeholder="Enter policy number"
              value={formData?.policyNumber}
              onChange={(e) => handleInputChange('policyNumber', e?.target?.value)}
              error={errors?.policyNumber}
              required
              className="md:col-span-1"
            />

            <Input
              label="Group Number"
              type="text"
              placeholder="Enter group number"
              value={formData?.groupNumber}
              onChange={(e) => handleInputChange('groupNumber', e?.target?.value)}
              error={errors?.groupNumber}
              description="Optional - found on insurance card"
              className="md:col-span-1"
            />

            <Input
              label="Primary Insured Name"
              type="text"
              placeholder="Enter primary insured name"
              value={formData?.primaryInsuredName}
              onChange={(e) => handleInputChange('primaryInsuredName', e?.target?.value)}
              error={errors?.primaryInsuredName}
              required
              className="md:col-span-1"
            />

            <Select
              label="Relationship to Insured"
              options={relationshipOptions}
              value={formData?.relationshipToInsured}
              onChange={(value) => handleInputChange('relationshipToInsured', value)}
              error={errors?.relationshipToInsured}
              placeholder="Select relationship"
              required
              className="md:col-span-1"
            />

            <Input
              label="Insurance Phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData?.insurancePhone}
              onChange={(e) => handleInputChange('insurancePhone', e?.target?.value)}
              error={errors?.insurancePhone}
              description="Customer service number"
              className="md:col-span-1"
            />

            <Input
              label="Effective Date"
              type="date"
              value={formData?.insuranceEffectiveDate}
              onChange={(e) => handleInputChange('insuranceEffectiveDate', e?.target?.value)}
              error={errors?.insuranceEffectiveDate}
              description="When coverage began"
              className="md:col-span-1"
            />
          </>
        )}

        <div className="md:col-span-2 mt-4">
          <Checkbox
            label="I have secondary insurance"
            checked={formData?.hasSecondaryInsurance}
            onChange={(e) => handleInputChange('hasSecondaryInsurance', e?.target?.checked)}
            description="Check if you have additional insurance coverage"
          />
        </div>

        {formData?.hasSecondaryInsurance && (
          <>
            <Select
              label="Secondary Insurance Provider"
              options={insuranceProviders}
              value={formData?.secondaryInsuranceProvider}
              onChange={(value) => handleInputChange('secondaryInsuranceProvider', value)}
              error={errors?.secondaryInsuranceProvider}
              placeholder="Select secondary provider"
              searchable
              className="md:col-span-1"
            />

            <Input
              label="Secondary Policy Number"
              type="text"
              placeholder="Enter secondary policy number"
              value={formData?.secondaryPolicyNumber}
              onChange={(e) => handleInputChange('secondaryPolicyNumber', e?.target?.value)}
              error={errors?.secondaryPolicyNumber}
              className="md:col-span-1"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InsuranceSection;