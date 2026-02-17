import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, completedSections }) => {
  const steps = [
    { number: 1, label: 'Personal Info', key: 'personal' },
    { number: 2, label: 'Address', key: 'address' },
    { number: 3, label: 'Insurance', key: 'insurance' },
    { number: 4, label: 'Emergency Contact', key: 'emergency' },
    { number: 5, label: 'Medical History', key: 'medical' },
    { number: 6, label: 'Preferences', key: 'preferences' },
    { number: 7, label: 'Documents', key: 'documents' }
  ];

  const getStepStatus = (stepNumber) => {
    if (completedSections?.includes(steps?.[stepNumber - 1]?.key)) {
      return 'completed';
    } else if (stepNumber === currentStep) {
      return 'current';
    } else if (stepNumber < currentStep) {
      return 'completed';
    } else {
      return 'upcoming';
    }
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepNumber) => {
    const status = getStepStatus(stepNumber);
    return status === 'completed' ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Registration Progress</h2>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      {/* Desktop Progress */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.number);
            return (
              <div key={step?.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-medium text-sm healthcare-transition ${getStepClasses(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      step?.number
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </span>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 healthcare-transition ${getConnectorClasses(step?.number)}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium text-sm ${getStepClasses(getStepStatus(currentStep))}`}>
            {getStepStatus(currentStep) === 'completed' ? (
              <Icon name="Check" size={14} />
            ) : (
              currentStep
            )}
          </div>
          <div>
            <h3 className="font-medium text-foreground">{steps?.[currentStep - 1]?.label}</h3>
            <p className="text-sm text-muted-foreground">
              {completedSections?.length} of {totalSteps} sections completed
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full healthcare-transition"
            style={{ width: `${(completedSections?.length / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      {/* Completion Status */}
      {completedSections?.length > 0 && (
        <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              {completedSections?.length} section{completedSections?.length !== 1 ? 's' : ''} completed
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;