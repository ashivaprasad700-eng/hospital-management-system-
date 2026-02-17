import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const PreferencesSection = ({ formData, handleInputChange, errors }) => {
  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    { value: 'chinese', label: 'Chinese (Mandarin)' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'hindi', label: 'Hindi' }
  ];

  const communicationPreferences = [
    { value: 'email', label: 'Email notifications' },
    { value: 'sms', label: 'SMS/Text messages' },
    { value: 'phone', label: 'Phone calls' },
    { value: 'mail', label: 'Physical mail' }
  ];

  const accessibilityNeeds = [
    { value: 'wheelchair', label: 'Wheelchair accessibility' },
    { value: 'interpreter', label: 'Sign language interpreter' },
    { value: 'large-print', label: 'Large print materials' },
    { value: 'audio', label: 'Audio assistance' },
    { value: 'mobility', label: 'Mobility assistance' },
    { value: 'vision', label: 'Vision assistance' },
    { value: 'hearing', label: 'Hearing assistance' }
  ];

  const handleCommunicationChange = (prefValue, checked) => {
    const currentPrefs = formData?.communicationPreferences || [];
    if (checked) {
      handleInputChange('communicationPreferences', [...currentPrefs, prefValue]);
    } else {
      handleInputChange('communicationPreferences', currentPrefs?.filter(p => p !== prefValue));
    }
  };

  const handleAccessibilityChange = (needValue, checked) => {
    const currentNeeds = formData?.accessibilityNeeds || [];
    if (checked) {
      handleInputChange('accessibilityNeeds', [...currentNeeds, needValue]);
    } else {
      handleInputChange('accessibilityNeeds', currentNeeds?.filter(n => n !== needValue));
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">6</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Preferences & Accessibility</h2>
      </div>
      <div className="space-y-6">
        {/* Language Preference */}
        <Select
          label="Preferred Language"
          options={languageOptions}
          value={formData?.preferredLanguage}
          onChange={(value) => handleInputChange('preferredLanguage', value)}
          error={errors?.preferredLanguage}
          placeholder="Select preferred language"
          description="Language for appointments and communications"
          searchable
        />

        {/* Communication Preferences */}
        <div>
          <CheckboxGroup 
            label="Communication Preferences" 
            description="How would you like to receive appointment reminders and health updates?"
            error={errors?.communicationPreferences}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {communicationPreferences?.map((pref) => (
                <Checkbox
                  key={pref?.value}
                  label={pref?.label}
                  checked={(formData?.communicationPreferences || [])?.includes(pref?.value)}
                  onChange={(e) => handleCommunicationChange(pref?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Accessibility Needs */}
        <div>
          <CheckboxGroup 
            label="Accessibility Needs" 
            description="Select any accommodations you may need during your visits"
            error={errors?.accessibilityNeeds}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {accessibilityNeeds?.map((need) => (
                <Checkbox
                  key={need?.value}
                  label={need?.label}
                  checked={(formData?.accessibilityNeeds || [])?.includes(need?.value)}
                  onChange={(e) => handleAccessibilityChange(need?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Marketing Preferences */}
        <div className="border-t border-border pt-6">
          <CheckboxGroup label="Marketing & Updates">
            <div className="space-y-3">
              <Checkbox
                label="Receive health tips and wellness newsletters"
                checked={formData?.receiveHealthTips}
                onChange={(e) => handleInputChange('receiveHealthTips', e?.target?.checked)}
                description="Monthly health and wellness information"
              />
              <Checkbox
                label="Receive information about new services"
                checked={formData?.receiveServiceUpdates}
                onChange={(e) => handleInputChange('receiveServiceUpdates', e?.target?.checked)}
                description="Updates about new medical services and facilities"
              />
              <Checkbox
                label="Participate in patient satisfaction surveys"
                checked={formData?.participateInSurveys}
                onChange={(e) => handleInputChange('participateInSurveys', e?.target?.checked)}
                description="Help us improve our services"
              />
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;