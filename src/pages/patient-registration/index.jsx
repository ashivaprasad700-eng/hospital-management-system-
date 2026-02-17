import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HealthcareBreadcrumb from '../../components/ui/HealthcareBreadcrumb';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';

// Import all components
import PersonalInfoSection from './components/PersonalInfoSection';
import AddressSection from './components/AddressSection';
import InsuranceSection from './components/InsuranceSection';
import EmergencyContactSection from './components/EmergencyContactSection';
import MedicalHistorySection from './components/MedicalHistorySection';
import PreferencesSection from './components/PreferencesSection';
import DocumentUploadSection from './components/DocumentUploadSection';
import PrivacyPolicyPanel from './components/PrivacyPolicyPanel';
import ProgressIndicator from './components/ProgressIndicator';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    ssn: '',
    phone: '',
    email: '',
    
    // Address Information
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Insurance Information
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    primaryInsuredName: '',
    relationshipToInsured: '',
    insurancePhone: '',
    insuranceEffectiveDate: '',
    hasSecondaryInsurance: false,
    secondaryInsuranceProvider: '',
    secondaryPolicyNumber: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    emergencyContactAltPhone: '',
    emergencyContactEmail: '',
    
    // Medical History
    medicalConditions: [],
    allergies: [],
    currentMedications: '',
    primaryCarePhysician: '',
    medicalNotes: '',
    
    // Preferences
    preferredLanguage: 'english',
    communicationPreferences: ['email'],
    accessibilityNeeds: [],
    receiveHealthTips: false,
    receiveServiceUpdates: false,
    participateInSurveys: false,
    
    // Documents
    insuranceCard: null,
    photoId: null,
    medicalRecords: null,
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToTreatment: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateSection = (sectionKey) => {
    const newErrors = {};
    
    switch (sectionKey) {
      case 'personal':
        if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData?.gender) newErrors.gender = 'Gender is required';
        if (!formData?.ssn?.trim()) newErrors.ssn = 'Social Security Number is required';
        if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
        if (!formData?.email?.trim()) newErrors.email = 'Email address is required';
        else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Please enter a valid email address';
        break;
        
      case 'address':
        if (!formData?.streetAddress?.trim()) newErrors.streetAddress = 'Street address is required';
        if (!formData?.city?.trim()) newErrors.city = 'City is required';
        if (!formData?.state) newErrors.state = 'State is required';
        if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
        else if (!/^\d{5}(-\d{4})?$/?.test(formData?.zipCode)) newErrors.zipCode = 'Please enter a valid ZIP code';
        break;
        
      case 'insurance':
        if (!formData?.insuranceProvider) newErrors.insuranceProvider = 'Insurance provider is required';
        if (formData?.insuranceProvider && formData?.insuranceProvider !== 'none') {
          if (!formData?.policyNumber?.trim()) newErrors.policyNumber = 'Policy number is required';
          if (!formData?.primaryInsuredName?.trim()) newErrors.primaryInsuredName = 'Primary insured name is required';
          if (!formData?.relationshipToInsured) newErrors.relationshipToInsured = 'Relationship to insured is required';
        }
        break;
        
      case 'emergency':
        if (!formData?.emergencyContactName?.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
        if (!formData?.emergencyContactRelationship) newErrors.emergencyContactRelationship = 'Relationship is required';
        if (!formData?.emergencyContactPhone?.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
        break;
        
      case 'documents':
        if (!formData?.insuranceCard) newErrors.insuranceCard = 'Insurance card is required';
        if (!formData?.photoId) newErrors.photoId = 'Photo ID is required';
        break;
    }
    
    return newErrors;
  };

  const handleSectionComplete = (sectionKey) => {
    const sectionErrors = validateSection(sectionKey);
    
    if (Object.keys(sectionErrors)?.length === 0) {
      if (!completedSections?.includes(sectionKey)) {
        setCompletedSections(prev => [...prev, sectionKey]);
      }
      setErrors(prev => {
        const newErrors = { ...prev };
        Object.keys(newErrors)?.forEach(key => {
          if (sectionKey === 'personal' && ['firstName', 'lastName', 'dateOfBirth', 'gender', 'ssn', 'phone', 'email']?.includes(key)) {
            delete newErrors?.[key];
          }
          // Add similar cleanup for other sections
        });
        return newErrors;
      });
    } else {
      setErrors(prev => ({ ...prev, ...sectionErrors }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Validate all required sections
    const allErrors = {
      ...validateSection('personal'),
      ...validateSection('address'),
      ...validateSection('insurance'),
      ...validateSection('emergency'),
      ...validateSection('documents')
    };
    
    // Check terms agreement
    if (!formData?.agreeToTerms) allErrors.agreeToTerms = 'You must agree to the terms and conditions';
    if (!formData?.agreeToPrivacy) allErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    if (!formData?.agreeToTreatment) allErrors.agreeToTreatment = 'You must consent to treatment';
    
    if (Object.keys(allErrors)?.length > 0) {
      setErrors(allErrors);
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-error="true"]');
      if (firstErrorElement) {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to dashboard
      navigate('/patient-dashboard', { 
        state: { 
          message: 'Registration completed successfully! Welcome to HospitalConnect.',
          patientId: 'HC-2024-' + Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0')
        }
      });
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/patient-dashboard'); // Since we don't have a login page, redirect to dashboard
  };

  // Auto-save progress
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('patientRegistrationData', JSON.stringify(formData));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('patientRegistrationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Failed to load saved registration data');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HealthcareBreadcrumb />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Registration Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-2">Patient Registration</h1>
              <p className="text-muted-foreground">
                Create your secure healthcare account to access personalized medical services and manage your health information.
              </p>
            </div>

            <ProgressIndicator 
              currentStep={currentStep}
              totalSteps={7}
              completedSections={completedSections}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <PersonalInfoSection 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <AddressSection 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <InsuranceSection 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <EmergencyContactSection 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <MedicalHistorySection 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <PreferencesSection 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              <DocumentUploadSection 
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />

              {/* Terms and Conditions */}
              <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="FileCheck" size={20} color="white" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Terms & Agreements</h2>
                </div>

                <div className="space-y-4">
                  <Checkbox
                    label="I agree to the Terms and Conditions"
                    checked={formData?.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                    error={errors?.agreeToTerms}
                    required
                    description="I have read and agree to the terms of service and user agreement"
                  />

                  <Checkbox
                    label="I agree to the Privacy Policy and HIPAA Notice"
                    checked={formData?.agreeToPrivacy}
                    onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
                    error={errors?.agreeToPrivacy}
                    required
                    description="I understand how my personal health information will be used and protected"
                  />

                  <Checkbox
                    label="I consent to treatment and medical care"
                    checked={formData?.agreeToTreatment}
                    onChange={(e) => handleInputChange('agreeToTreatment', e?.target?.checked)}
                    error={errors?.agreeToTreatment}
                    required
                    description="I consent to receive medical treatment and care from healthcare providers"
                  />
                </div>
              </div>

              {/* Submit Section */}
              <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToLogin}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    Back to Login
                  </Button>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        localStorage.setItem('patientRegistrationData', JSON.stringify(formData));
                        alert('Progress saved successfully!');
                      }}
                      iconName="Save"
                      iconPosition="left"
                      className="w-full sm:w-auto"
                    >
                      Save Progress
                    </Button>

                    <Button
                      type="submit"
                      variant="default"
                      loading={isSubmitting}
                      iconName="UserPlus"
                      iconPosition="left"
                      className="w-full sm:w-auto"
                      disabled={!formData?.agreeToTerms || !formData?.agreeToPrivacy || !formData?.agreeToTreatment}
                    >
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>
                </div>

                {errors?.submit && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="AlertCircle" size={16} className="text-destructive" />
                      <span className="text-sm text-destructive">{errors?.submit}</span>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Privacy Policy Panel */}
          <div className="lg:col-span-1">
            <PrivacyPolicyPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;