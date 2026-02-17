import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdherenceTracker = ({ adherenceData, onUpdateAdherence }) => {
  const getAdherenceColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10 border-success/20';
    if (percentage >= 70) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getAdherenceIcon = (percentage) => {
    if (percentage >= 90) return 'CheckCircle';
    if (percentage >= 70) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Medication Adherence</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date()?.toLocaleDateString()}
        </div>
      </div>
      {/* Overall Adherence */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Overall Adherence</span>
          <span className="text-lg font-bold text-card-foreground">{adherenceData?.overall}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              adherenceData?.overall >= 90 ? 'bg-success' :
              adherenceData?.overall >= 70 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${adherenceData?.overall}%` }}
          />
        </div>
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium mt-2 {getAdherenceColor(adherenceData?.overall)}`}>
          <Icon name={getAdherenceIcon(adherenceData?.overall)} size={12} />
          <span>
            {adherenceData?.overall >= 90 ? 'Excellent' :
             adherenceData?.overall >= 70 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
      </div>
      {/* Individual Medications */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-semibold text-card-foreground">Current Medications</h3>
        {adherenceData?.medications?.map((medication) => (
          <div key={medication?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-card-foreground">{medication?.name}</h4>
                <p className="text-sm text-muted-foreground">{medication?.dosage}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-card-foreground">{medication?.adherence}%</span>
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs mt-1 ${getAdherenceColor(medication?.adherence)}`}>
                  <Icon name={getAdherenceIcon(medication?.adherence)} size={10} />
                </div>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  medication?.adherence >= 90 ? 'bg-success' :
                  medication?.adherence >= 70 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `₹{medication?.adherence}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Taken:</span>
                <span className="ml-2 font-medium text-card-foreground">{medication?.taken}/{medication?.prescribed}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Missed:</span>
                <span className="ml-2 font-medium text-error">{medication?.missed}</span>
              </div>
            </div>

            {medication?.nextDose && (
              <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={14} className="text-primary" />
                  <span className="text-primary">Next dose: {medication?.nextDose}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Weekly Progress */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Weekly Progress</h3>
        <div className="grid grid-cols-7 gap-2">
          {adherenceData?.weeklyProgress?.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{day?.day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                day?.completed ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {day?.completed ? <Icon name="Check" size={12} /> : day?.percentage}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Reminders */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-card-foreground">Medication Reminders</h3>
          <Button variant="ghost" size="sm" iconName="Settings">
            Settings
          </Button>
        </div>
        
        <div className="space-y-2">
          {adherenceData?.reminders?.map((reminder, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="Bell" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">{reminder?.medication}</p>
                  <p className="text-xs text-muted-foreground">{reminder?.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateAdherence(reminder?.id, 'taken')}
                  iconName="Check"
                  className="text-success hover:bg-success/10"
                >
                  Taken
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateAdherence(reminder?.id, 'skip')}
                  iconName="X"
                  className="text-muted-foreground hover:bg-muted"
                >
                  Skip
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdherenceTracker;