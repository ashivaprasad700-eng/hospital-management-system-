import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HealthcareBreadcrumb from '../../components/ui/HealthcareBreadcrumb';
import DoctorHeader from './components/DoctorHeader';
import DoctorDetails from './components/DoctorDetails';
import PatientReviews from './components/PatientReviews';
import AppointmentBooking from './components/AppointmentBooking';
import LocationTracker from './components/LocationTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock doctor data
  const doctorData = {
    id: 'dr-sarah-johnson',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    specializations: ['Cardiology', 'Internal Medicine'],
    experience: 12,
    location: 'Room 205 - Cardiology Wing',
    currentLocation: 'Room 205 - Cardiology Wing',
    isOnline: true,
    rating: 4.8,
    totalPatients: 2847,
    consultationTime: '25 min',
    waitTime: '15 min',
    about: `Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and interventional procedures.\n\nDr. Johnson completed her medical degree from Harvard Medical School and her cardiology fellowship at Johns Hopkins Hospital. She is known for her compassionate patient care and evidence-based treatment approaches.\n\nShe has published numerous research papers in peer-reviewed journals and is actively involved in clinical trials for innovative cardiac treatments.`,
    education: [
      {
        degree: 'MD - Doctor of Medicine',
        institution: 'Harvard Medical School',
        year: '2011'
      },
      {
        degree: 'Cardiology Fellowship',
        institution: 'Johns Hopkins Hospital',
        year: '2015'
      },
      {
        degree: 'Internal Medicine Residency',
        institution: 'Massachusetts General Hospital',
        year: '2014'
      },
      {
        degree: 'Board Certification - Cardiology',
        institution: 'American Board of Internal Medicine',
        year: '2016'
      }
    ],
    expertise: [
      {
        name: 'Preventive Cardiology',
        description: 'Risk assessment and prevention of heart disease through lifestyle modifications and medical management'
      },
      {
        name: 'Heart Failure Management',
        description: 'Comprehensive care for patients with acute and chronic heart failure conditions'
      },
      {
        name: 'Interventional Cardiology',
        description: 'Minimally invasive procedures including angioplasty and stent placement'
      },
      {
        name: 'Echocardiography',
        description: 'Advanced cardiac imaging and diagnostic procedures'
      },
      {
        name: 'Hypertension Management',
        description: 'Specialized treatment for high blood pressure and related complications'
      },
      {
        name: 'Lipid Disorders',
        description: 'Management of cholesterol and triglyceride abnormalities'
      }
    ],
    languages: ['English', 'Spanish', 'French'],
    fees: {
      inPerson: 250,
      telemedicine: 180
    },
    insurance: ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealth', 'Medicare', 'Medicaid']
  };

  // Mock reviews data
  const reviewsData = [
    {
      patientName: 'Michael Rodriguez',
      patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: 'October 3, 2024',
      comment: `Dr. Johnson is exceptional! She took the time to explain my heart condition in detail and answered all my questions patiently. Her treatment plan has significantly improved my quality of life. The follow-up care has been outstanding.`,
      treatmentType: 'Heart Failure Management'
    },
    {
      patientName: 'Emily Chen',
      patientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: 'September 28, 2024',
      comment: `Excellent doctor with great bedside manner. She made me feel comfortable during a very stressful time. The procedure went smoothly and recovery was faster than expected. Highly recommend!`,
      treatmentType: 'Angioplasty'
    },
    {
      patientName: 'Robert Thompson',
      patientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      date: 'September 25, 2024',
      comment: `Dr. Johnson is very knowledgeable and professional. She helped me understand my hypertension better and created a comprehensive treatment plan. The only minor issue was the wait time, but the quality of care made it worthwhile.`,
      treatmentType: 'Hypertension Management'
    },
    {
      patientName: 'Lisa Anderson',
      patientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: 'September 20, 2024',
      comment: `Outstanding cardiologist! Dr. Johnson caught an issue that other doctors missed. Her attention to detail and thorough examination saved my life. The entire team is professional and caring.`,
      treatmentType: 'Preventive Cardiology'
    },
    {
      patientName: 'David Wilson',
      patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      date: 'September 15, 2024',
      comment: `Great experience overall. Dr. Johnson is very thorough and explains everything clearly. The telemedicine consultation was convenient and effective. Would definitely recommend to others.`,
      treatmentType: 'Follow-up Consultation'
    }
  ];

  const handleBookAppointment = (appointmentData) => {
    console.log('Booking appointment:', appointmentData);
    setShowBookingModal(true);
    // Simulate booking process
    setTimeout(() => {
      setShowBookingModal(false);
      navigate('/appointment-booking', { 
        state: { 
          doctor: doctorData,
          appointmentData 
        }
      });
    }, 2000);
  };

  const handleBackToSearch = () => {
    navigate('/symptom-checker');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HealthcareBreadcrumb />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToSearch}
            iconName="ArrowLeft"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Doctor Search
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Header */}
            <DoctorHeader doctor={doctorData} />

            {/* Doctor Details */}
            <DoctorDetails doctor={doctorData} />

            {/* Patient Reviews */}
            <PatientReviews 
              reviews={reviewsData}
              overallRating={doctorData?.rating}
              totalReviews={reviewsData?.length}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointment Booking */}
            <AppointmentBooking 
              doctor={doctorData}
              onBookAppointment={handleBookAppointment}
            />

            {/* Location Tracker */}
            <LocationTracker doctor={doctorData} />

            {/* Emergency Contact */}
            <div className="bg-error/5 border border-error/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-error mb-1">
                    Emergency Contact
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    For urgent medical situations, call:
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    911 or (555) 123-4567
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg p-6 max-w-sm w-full healthcare-shadow">
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your appointment request has been submitted. You will be redirected to the booking page.
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Processing...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;