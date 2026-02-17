import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HealthcareBreadcrumb from '../../components/ui/HealthcareBreadcrumb';
import StatusIndicator from '../../components/ui/StatusIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import BodyDiagram from './components/BodyDiagram';
import SymptomInput from './components/SymptomInput';
import DoctorRecommendations from './components/DoctorRecommendations';
import EmergencyAlert from './components/EmergencyAlert';
import ProgressSteps from './components/ProgressSteps';

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleAreaSelect = (area) => {
    setSelectedAreas(prev => {
      const isSelected = prev?.includes(area?.id);
      if (isSelected) {
        return prev?.filter(id => id !== area?.id);
      } else {
        return [...prev, area?.id];
      }
    });
  };

  const handleSymptomsChange = (newSymptoms) => {
    setSymptoms(newSymptoms);
    if (newSymptoms?.length > 0) {
      setShowRecommendations(true);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleGetRecommendations = () => {
    if (symptoms?.length > 0 || selectedAreas?.length > 0) {
      setCurrentStep(3);
      setShowRecommendations(true);
    }
  };

  const handleDoctorSelect = (doctor) => {
    // Store selected doctor data for doctor profile page
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    window.location.href = '/doctor-profile';
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setSymptoms([]);
    setSelectedAreas([]);
    setShowRecommendations(false);
  };

  const canProceed = () => {
    if (currentStep === 1) return symptoms?.length > 0;
    if (currentStep === 2) return selectedAreas?.length > 0 || symptoms?.length > 0;
    return true;
  };

  return (
    <>
      <Helmet>
        <title>Symptom Checker - HospitalConnect</title>
        <meta name="description" content="Check your symptoms and get personalized doctor recommendations based on your health concerns." />
        <meta name="keywords" content="symptom checker, doctor recommendations, healthcare, medical consultation" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <HealthcareBreadcrumb />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Symptom Checker</h1>
                <p className="text-muted-foreground">
                  Describe your symptoms to get personalized doctor recommendations and care guidance
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusIndicator type="doctors" />
                <StatusIndicator type="system" />
              </div>
            </div>

            {/* Progress Steps */}
            <ProgressSteps 
              currentStep={currentStep} 
              onStepChange={handleStepChange}
              className="mb-6"
            />
          </div>

          {/* Emergency Alert */}
          <EmergencyAlert 
            symptoms={symptoms}
            className="mb-6"
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Symptom Input & Body Diagram */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Symptom Input */}
              {currentStep === 1 && (
                <SymptomInput
                  symptoms={symptoms}
                  onSymptomsChange={handleSymptomsChange}
                />
              )}

              {/* Step 2: Body Diagram */}
              {currentStep === 2 && (
                <BodyDiagram
                  selectedAreas={selectedAreas}
                  onAreaSelect={handleAreaSelect}
                />
              )}

              {/* Step 3: Summary */}
              {currentStep === 3 && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Assessment Summary</h3>
                  
                  {symptoms?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Reported Symptoms:</h4>
                      <div className="space-y-2">
                        {symptoms?.map((symptom) => (
                          <div key={symptom?.id} className="flex items-center justify-between p-2 bg-accent rounded-md">
                            <span className="text-sm">{symptom?.name}</span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>Severity: {symptom?.severity}/10</span>
                              <span>Duration: {symptom?.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAreas?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Affected Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAreas?.map((areaId) => (
                          <span key={areaId} className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                            {areaId?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={handleStartOver}
                      iconName="RotateCcw"
                      iconSize={16}
                    >
                      Start Over
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => window.location.href = '/appointment-booking'}
                      iconName="Calendar"
                      iconSize={16}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 3 && (
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    iconName="ChevronLeft"
                    iconSize={16}
                  >
                    Previous
                  </Button>
                  
                  {currentStep === 2 ? (
                    <Button
                      variant="default"
                      onClick={handleGetRecommendations}
                      disabled={!canProceed()}
                      iconName="Search"
                      iconSize={16}
                    >
                      Get Recommendations
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                      disabled={!canProceed()}
                      iconName="ChevronRight"
                      iconSize={16}
                    >
                      Next
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Doctor Recommendations */}
            <div className="lg:col-span-1">
              <DoctorRecommendations
                symptoms={symptoms}
                selectedAreas={selectedAreas}
                onDoctorSelect={handleDoctorSelect}
                className="sticky top-6"
              />
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Icon name="HelpCircle" size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our symptom checker is designed to help guide you to appropriate care, but it's not a substitute for professional medical advice.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <div>
                      <div className="text-sm font-medium">24/7 Nurse Line</div>
                      <div className="text-xs text-muted-foreground">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={16} className="text-primary" />
                    <div>
                      <div className="text-sm font-medium">Live Chat</div>
                      <div className="text-xs text-muted-foreground">Available 8 AM - 8 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-destructive" />
                    <div>
                      <div className="text-sm font-medium">Emergency</div>
                      <div className="text-xs text-muted-foreground">Call 911 immediately</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                <strong>Medical Disclaimer:</strong> This symptom checker is for informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or 911 immediately.
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SymptomChecker;