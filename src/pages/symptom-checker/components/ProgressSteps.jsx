import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSteps = ({ currentStep, onStepChange, className = '' }) => {
  const steps = [
    {
      id: 1,
      title: 'Symptoms',
      description: 'Describe your symptoms',
      icon: 'Stethoscope'
    },
    {
      id: 2,
      title: 'Body Areas',
      description: 'Select affected areas',
      icon: 'User'
    },
    {
      id: 3,
      title: 'Recommendations',
      description: 'Get doctor matches',
      icon: 'UserCheck'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-primary text-primary-foreground border-primary';
      case 'current':
        return 'bg-primary/10 text-primary border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-primary' : 'bg-border';
  };

  return (
    <div className={`${className}`}>
      <nav aria-label="Symptom checker progress">
        <ol className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isClickable = step?.id <= currentStep;

            return (
              <li key={step?.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <button
                  onClick={() => isClickable && onStepChange(step?.id)}
                  disabled={!isClickable}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 healthcare-transition ${getStepClasses(status)} ${
                    isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'
                  }`}
                  aria-current={status === 'current' ? 'step' : undefined}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </button>
                {/* Step Info */}
                <div className="ml-3 flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-foreground' : 
                    'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {step?.description}
                  </div>
                </div>
                {/* Connector Line */}
                {index < steps?.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 ${getConnectorClasses(step?.id)} healthcare-transition`}></div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {/* Mobile Step Info */}
      <div className="sm:hidden mt-4 text-center">
        <div className="text-sm font-medium text-foreground">
          Step {currentStep} of {steps?.length}: {steps?.find(s => s?.id === currentStep)?.title}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {steps?.find(s => s?.id === currentStep)?.description}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;