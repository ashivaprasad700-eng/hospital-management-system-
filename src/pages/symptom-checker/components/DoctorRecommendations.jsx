import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DoctorRecommendations = ({ symptoms, selectedAreas, onDoctorSelect, className = '' }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockDoctors = [
    {
      id: 'dr-smith',
      name: 'Dr. Sarah Smith',
      specialty: 'Internal Medicine',
      subSpecialty: 'General Practice',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      experience: 12,
      location: 'Building A, Floor 2, Room 205',
      availability: 'Available Now',
      status: 'online',
      matchScore: 95,
      languages: ['English', 'Spanish'],
      nextSlot: '10:30 AM Today',
      consultationFee: 150,
      specializations: ['Fever', 'Headache', 'General Health', 'Preventive Care']
    },
    {
      id: 'dr-johnson',
      name: 'Dr. Michael Johnson',
      specialty: 'Neurology',
      subSpecialty: 'Headache & Migraine',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      experience: 15,
      location: 'Building B, Floor 3, Room 312',
      availability: 'Available in 30 min',
      status: 'busy',
      matchScore: 92,
      languages: ['English'],
      nextSlot: '11:00 AM Today',
      consultationFee: 200,
      specializations: ['Headache', 'Migraine', 'Dizziness', 'Neurological Disorders']
    },
    {
      id: 'dr-davis',
      name: 'Dr. Emily Davis',
      specialty: 'Cardiology',
      subSpecialty: 'Heart & Chest Conditions',
      avatar: 'https://images.unsplash.com/photo-1594824388853-d0c7e7c8b6b5?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      experience: 18,
      location: 'Building C, Floor 1, Room 108',
      availability: 'Available at 2:00 PM',
      status: 'scheduled',
      matchScore: 88,
      languages: ['English', 'French'],
      nextSlot: '2:00 PM Today',
      consultationFee: 250,
      specializations: ['Chest Pain', 'Heart Conditions', 'Shortness of Breath', 'Cardiovascular Health']
    },
    {
      id: 'dr-wilson',
      name: 'Dr. James Wilson',
      specialty: 'Gastroenterology',
      subSpecialty: 'Digestive Health',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      experience: 10,
      location: 'Building A, Floor 3, Room 301',
      availability: 'Available Tomorrow',
      status: 'offline',
      matchScore: 85,
      languages: ['English'],
      nextSlot: '9:00 AM Tomorrow',
      consultationFee: 180,
      specializations: ['Stomach Pain', 'Nausea', 'Digestive Issues', 'Abdominal Pain']
    }
  ];

  useEffect(() => {
    if (symptoms?.length > 0 || selectedAreas?.length > 0) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockDoctors?.filter(doctor => {
          const symptomMatch = symptoms?.some(symptom => 
            doctor?.specializations?.some(spec => 
              spec?.toLowerCase()?.includes(symptom?.name?.toLowerCase()) ||
              symptom?.name?.toLowerCase()?.includes(spec?.toLowerCase())
            )
          );
          
          const areaMatch = selectedAreas?.some(area => {
            const areaSpecialtyMap = {
              'head': ['Neurology', 'Internal Medicine'],
              'chest': ['Cardiology', 'Internal Medicine'],
              'abdomen': ['Gastroenterology', 'Internal Medicine'],
              'back': ['Orthopedics', 'Internal Medicine']
            };
            return areaSpecialtyMap?.[area]?.includes(doctor?.specialty);
          });

          return symptomMatch || areaMatch || doctor?.specialty === 'Internal Medicine';
        });

        // Sort by match score
        const sorted = filtered?.sort((a, b) => b?.matchScore - a?.matchScore);
        setRecommendations(sorted);
        setLoading(false);
      }, 1000);
    } else {
      setRecommendations([]);
    }
  }, [symptoms, selectedAreas]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'busy': return 'text-warning';
      case 'scheduled': return 'text-primary';
      case 'offline': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'busy': return 'Clock';
      case 'scheduled': return 'Calendar';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };

  if (symptoms?.length === 0 && selectedAreas?.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <div className="text-center py-8">
          <Icon name="UserCheck" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Doctor Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            Add symptoms or select body areas to get personalized doctor recommendations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recommended Doctors</h3>
            <p className="text-sm text-muted-foreground">
              Based on your symptoms and selected areas
            </p>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Finding matches...</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : recommendations?.length > 0 ? (
          <div className="space-y-4">
            {recommendations?.map((doctor) => (
              <div key={doctor?.id} className="p-4 border border-border rounded-lg hover:border-primary/50 healthcare-transition">
                <div className="flex items-start gap-4">
                  {/* Doctor Avatar */}
                  <div className="relative">
                    <Image
                      src={doctor?.avatar}
                      alt={doctor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                      doctor?.status === 'online' ? 'bg-success' : 
                      doctor?.status === 'busy' ? 'bg-warning' : 
                      doctor?.status === 'scheduled' ? 'bg-primary' : 'bg-muted-foreground'
                    }`}></div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{doctor?.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor?.specialty}</p>
                        {doctor?.subSpecialty && (
                          <p className="text-xs text-muted-foreground">{doctor?.subSpecialty}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                          <span className="text-sm font-medium">{doctor?.rating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {doctor?.experience} years exp.
                        </div>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Icon name="Target" size={14} className="text-primary" />
                        <span className="text-sm font-medium text-primary">{doctor?.matchScore}% match</span>
                      </div>
                      <div className={`flex items-center gap-1 ${getStatusColor(doctor?.status)}`}>
                        <Icon name={getStatusIcon(doctor?.status)} size={12} />
                        <span className="text-xs">{doctor?.availability}</span>
                      </div>
                    </div>

                    {/* Location & Languages */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        <span>{doctor?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Globe" size={12} />
                        <span>{doctor?.languages?.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="DollarSign" size={12} />
                        <span>${doctor?.consultationFee}</span>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {doctor?.specializations?.slice(0, 3)?.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                        >
                          {spec}
                        </span>
                      ))}
                      {doctor?.specializations?.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                          +{doctor?.specializations?.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onDoctorSelect(doctor)}
                        iconName="User"
                        iconSize={14}
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = '/appointment-booking'}
                        iconName="Calendar"
                        iconSize={14}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="UserX" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h4 className="font-semibold text-foreground mb-2">No Matching Doctors Found</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your symptoms or contact our general practitioners
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/patient-dashboard'}
              iconName="ArrowLeft"
              iconSize={14}
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorRecommendations;