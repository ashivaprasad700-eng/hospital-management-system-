import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const MedicalHistorySection = ({ formData, handleInputChange, errors }) => {
  const commonConditions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'High Blood Pressure' },
    { value: 'heart-disease', label: 'Heart Disease' },
    { value: 'asthma', label: 'Asthma' },
    { value: 'arthritis', label: 'Arthritis' },
    { value: 'depression', label: 'Depression' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'cancer', label: 'Cancer' },
    { value: 'stroke', label: 'Stroke' },
    { value: 'kidney-disease', label: 'Kidney Disease' }
  ];

  const commonAllergies = [
    { value: 'penicillin', label: 'Penicillin' },
    { value: 'aspirin', label: 'Aspirin' },
    { value: 'ibuprofen', label: 'Ibuprofen' },
    { value: 'latex', label: 'Latex' },
    { value: 'peanuts', label: 'Peanuts' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'milk', label: 'Milk' },
    { value: 'pollen', label: 'Pollen' },
    { value: 'dust', label: 'Dust Mites' }
  ];

  const handleConditionChange = (conditionValue, checked) => {
    const currentConditions = formData?.medicalConditions || [];
    if (checked) {
      handleInputChange('medicalConditions', [...currentConditions, conditionValue]);
    } else {
      handleInputChange('medicalConditions', currentConditions?.filter(c => c !== conditionValue));
    }
  };

  const handleAllergyChange = (allergyValue, checked) => {
    const currentAllergies = formData?.allergies || [];
    if (checked) {
      handleInputChange('allergies', [...currentAllergies, allergyValue]);
    } else {
      handleInputChange('allergies', currentAllergies?.filter(a => a !== allergyValue));
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">5</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Medical History</h2>
      </div>
      <div className="space-y-6">
        {/* Medical Conditions */}
        <div>
          <CheckboxGroup 
            label="Current Medical Conditions" 
            description="Select all that apply to your current health status"
            error={errors?.medicalConditions}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {commonConditions?.map((condition) => (
                <Checkbox
                  key={condition?.value}
                  label={condition?.label}
                  checked={(formData?.medicalConditions || [])?.includes(condition?.value)}
                  onChange={(e) => handleConditionChange(condition?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Allergies */}
        <div>
          <CheckboxGroup 
            label="Known Allergies" 
            description="Select all substances you are allergic to"
            error={errors?.allergies}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {commonAllergies?.map((allergy) => (
                <Checkbox
                  key={allergy?.value}
                  label={allergy?.label}
                  checked={(formData?.allergies || [])?.includes(allergy?.value)}
                  onChange={(e) => handleAllergyChange(allergy?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Current Medications"
            type="text"
            placeholder="List current medications (optional)"
            value={formData?.currentMedications}
            onChange={(e) => handleInputChange('currentMedications', e?.target?.value)}
            error={errors?.currentMedications}
            description="Include dosages if known"
          />

          <Input
            label="Primary Care Physician"
            type="text"
            placeholder="Dr. Smith (optional)"
            value={formData?.primaryCarePhysician}
            onChange={(e) => handleInputChange('primaryCarePhysician', e?.target?.value)}
            error={errors?.primaryCarePhysician}
            description="Your current family doctor"
          />
        </div>

        <Input
          label="Additional Medical Notes"
          type="text"
          placeholder="Any other medical information you'd like to share (optional)"
          value={formData?.medicalNotes}
          onChange={(e) => handleInputChange('medicalNotes', e?.target?.value)}
          error={errors?.medicalNotes}
          description="Surgeries, hospitalizations, family history, etc."
        />
      </div>
    </div>
  );
};

export default MedicalHistorySection;