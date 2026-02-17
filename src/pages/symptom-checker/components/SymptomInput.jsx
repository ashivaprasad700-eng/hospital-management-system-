import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SymptomInput = ({ symptoms, onSymptomsChange, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const commonSymptoms = [
    { id: 'headache', name: 'Headache', category: 'neurological', description: 'Pain in head or neck area' },
    { id: 'fever', name: 'Fever', category: 'general', description: 'Body temperature above normal' },
    { id: 'cough', name: 'Cough', category: 'respiratory', description: 'Sudden expulsion of air from lungs' },
    { id: 'fatigue', name: 'Fatigue', category: 'general', description: 'Extreme tiredness or exhaustion' },
    { id: 'nausea', name: 'Nausea', category: 'digestive', description: 'Feeling of sickness with urge to vomit' },
    { id: 'dizziness', name: 'Dizziness', category: 'neurological', description: 'Feeling unsteady or lightheaded' },
    { id: 'chest-pain', name: 'Chest Pain', category: 'cardiovascular', description: 'Pain or discomfort in chest area' },
    { id: 'shortness-breath', name: 'Shortness of Breath', category: 'respiratory', description: 'Difficulty breathing normally' },
    { id: 'stomach-pain', name: 'Stomach Pain', category: 'digestive', description: 'Pain in abdominal area' },
    { id: 'back-pain', name: 'Back Pain', category: 'musculoskeletal', description: 'Pain in back or spine area' },
    { id: 'joint-pain', name: 'Joint Pain', category: 'musculoskeletal', description: 'Pain in joints or bones' },
    { id: 'sore-throat', name: 'Sore Throat', category: 'respiratory', description: 'Pain or irritation in throat' }
  ];

  const quickSelectSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness'
  ];

  useEffect(() => {
    if (searchTerm?.length > 1) {
      const filtered = commonSymptoms?.filter(symptom =>
        symptom?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        symptom?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleAddSymptom = (symptomName) => {
    if (!symptoms?.find(s => s?.name === symptomName)) {
      const symptomData = commonSymptoms?.find(s => s?.name === symptomName) || {
        id: symptomName?.toLowerCase()?.replace(/\s+/g, '-'),
        name: symptomName,
        category: 'general',
        description: 'User-reported symptom'
      };
      
      onSymptomsChange([...symptoms, { ...symptomData, severity: 5, duration: '1-3 days' }]);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleRemoveSymptom = (symptomId) => {
    onSymptomsChange(symptoms?.filter(s => s?.id !== symptomId));
  };

  const handleSymptomUpdate = (symptomId, field, value) => {
    onSymptomsChange(symptoms?.map(s => 
      s?.id === symptomId ? { ...s, [field]: value } : s
    ));
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && searchTerm?.trim()) {
      e?.preventDefault();
      handleAddSymptom(searchTerm?.trim());
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Describe Your Symptoms</h3>
        <p className="text-sm text-muted-foreground">Add symptoms you're experiencing and provide details about severity and duration</p>
      </div>
      {/* Symptom Search */}
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search symptoms (e.g., headache, fever, cough)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          onKeyPress={handleKeyPress}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={16} className="text-muted-foreground" />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md healthcare-shadow z-20 max-h-48 overflow-y-auto">
            {suggestions?.map((symptom) => (
              <button
                key={symptom?.id}
                onClick={() => handleAddSymptom(symptom?.name)}
                className="w-full px-3 py-2 text-left hover:bg-accent healthcare-transition"
              >
                <div className="font-medium text-sm text-popover-foreground">{symptom?.name}</div>
                <div className="text-xs text-muted-foreground">{symptom?.description}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Quick Select Symptoms */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-2">Quick Select Common Symptoms:</h4>
        <div className="flex flex-wrap gap-2">
          {quickSelectSymptoms?.map((symptom) => (
            <Button
              key={symptom}
              variant="outline"
              size="sm"
              onClick={() => handleAddSymptom(symptom)}
              disabled={symptoms?.find(s => s?.name === symptom)}
              className="text-xs"
            >
              <Icon name="Plus" size={12} className="mr-1" />
              {symptom}
            </Button>
          ))}
        </div>
      </div>
      {/* Selected Symptoms */}
      {symptoms?.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Your Symptoms ({symptoms?.length}):</h4>
          
          {symptoms?.map((symptom) => (
            <div key={symptom?.id} className="p-4 bg-accent rounded-lg border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-medium text-foreground">{symptom?.name}</h5>
                  <p className="text-xs text-muted-foreground">{symptom?.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSymptom(symptom?.id)}
                  iconName="X"
                  iconSize={14}
                  className="text-muted-foreground hover:text-destructive"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Severity Slider */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Severity: {symptom?.severity}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={symptom?.severity}
                    onChange={(e) => handleSymptomUpdate(symptom?.id, 'severity', parseInt(e?.target?.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Mild</span>
                    <span>Severe</span>
                  </div>
                </div>

                {/* Duration Select */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Duration</label>
                  <select
                    value={symptom?.duration}
                    onChange={(e) => handleSymptomUpdate(symptom?.id, 'duration', e?.target?.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="less-than-1-day">Less than 1 day</option>
                    <option value="1-3-days">1-3 days</option>
                    <option value="4-7-days">4-7 days</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="2-4-weeks">2-4 weeks</option>
                    <option value="more-than-month">More than a month</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {symptoms?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Start by searching or selecting symptoms above</p>
        </div>
      )}
    </div>
  );
};

export default SymptomInput;