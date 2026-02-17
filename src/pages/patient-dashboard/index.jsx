import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import HealthcareBreadcrumb from '../../components/ui/HealthcareBreadcrumb';
import StatusIndicator from '../../components/ui/StatusIndicator';
import QuickActionCard from './components/QuickActionCard';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import PrescriptionReminderCard from './components/PrescriptionReminderCard';
import RecentConsultationCard from './components/RecentConsultationCard';
import TestResultCard from './components/TestResultCard';
import HospitalAnnouncementCard from './components/HospitalAnnouncementCard';
import EmergencyContactPanel from './components/EmergencyContactPanel';
import HospitalMapPanel from './components/HospitalMapPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PatientDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for dashboard components
  const quickActions = [
    {
      title: "Symptom Checker",
      description: "Describe your symptoms and get doctor recommendations",
      icon: "Stethoscope",
      route: "/symptom-checker",
      color: "primary"
    },
    {
      title: "Find a Doctor",
      description: "Browse specialists and view their profiles",
      icon: "UserCheck",
      route: "/doctor-profile",
      color: "secondary"
    },
    {
      title: "Book Appointment",
      description: "Schedule appointments with available doctors",
      icon: "Calendar",
      route: "/appointment-booking",
      color: "success"
    },
    {
      title: "Prescriptions",
      description: "View and manage your digital prescriptions",
      icon: "Pill",
      route: "/prescription-management",
      color: "warning",
      badge: "2 New"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "October 8, 2024",
      time: "10:30 AM",
      location: "Cardiology Wing - Room 205",
      waitTime: 15,
      status: "confirmed",
      doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Neurologist",
      date: "October 10, 2024",
      time: "2:15 PM",
      location: "Neurology Wing - Room 312",
      waitTime: 25,
      status: "pending",
      doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const prescriptionReminders = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      dosage: "Once daily with food",
      frequency: "every morning",
      refillDate: "2024-10-15",
      priority: "high"
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      dosage: "Twice daily",
      frequency: "morning and evening",
      refillDate: "2024-10-20",
      priority: "medium"
    }
  ];

  const recentConsultations = [
    {
      id: 1,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Family Medicine",
      date: "October 3, 2024",
      type: "in-person",
      diagnosis: "Annual Physical Exam",
      followUp: "October 15, 2024",
      doctorImage: "https://images.unsplash.com/photo-1594824475317-1c5b5b5b5b5b?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      doctorName: "Dr. James Wilson",
      specialty: "Dermatology",
      date: "September 28, 2024",
      type: "video",
      diagnosis: "Skin Condition Follow-up",
      followUp: null,
      doctorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const testResults = [
    {
      id: 1,
      testName: "Complete Blood Count",
      category: "Laboratory",
      type: "blood",
      date: "October 5, 2024",
      status: "normal",
      orderedBy: "Dr. Sarah Johnson",
      criticalValues: false
    },
    {
      id: 2,
      testName: "Chest X-Ray",
      category: "Radiology",
      type: "xray",
      date: "October 4, 2024",
      status: "review",
      orderedBy: "Dr. Emily Rodriguez",
      criticalValues: false
    }
  ];

  const hospitalAnnouncements = [
    {
      id: 1,
      title: "New Telemedicine Services Available",
      content: `We're excited to announce the launch of our comprehensive telemedicine platform. Patients can now schedule virtual consultations with their healthcare providers from the comfort of their homes.\n\nThis service includes video consultations, secure messaging, and digital prescription management. To get started, simply log into your patient portal and select the 'Virtual Visit' option when booking your next appointment.`,
      date: "2024-10-06",
      priority: "info",
      actionRequired: false
    },
    {
      id: 2,
      title: "Flu Vaccination Campaign",
      content: `Annual flu vaccination is now available at all HospitalConnect locations. Protect yourself and your loved ones by getting vaccinated before the flu season peaks.\n\nWalk-in appointments are available Monday through Friday, 8 AM to 6 PM. No appointment necessary, but we recommend calling ahead to check availability.`,
      date: "2024-10-05",
      priority: "important",
      actionRequired: true,
      deadline: "November 30, 2024"
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HealthcareBreadcrumb />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                Welcome back, Sharath👋
              </h1>
              <p className="text-muted-foreground">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <StatusIndicator type="system" />
              <StatusIndicator type="doctors" />
              <StatusIndicator type="appointments" />
              
              <Button
                variant="outline"
                size="sm"
                iconName="Bell"
                iconPosition="left"
                iconSize={16}
                className="relative"
                onClick={() => window.location.href = '/prescription-management'}
              >
                Notifications
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions?.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action?.title}
                description={action?.description}
                icon={action?.icon}
                route={action?.route}
                color={action?.color}
                badge={action?.badge}
              />
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Upcoming Appointments</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => window.location.href = '/appointment-booking'}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {upcomingAppointments?.map((appointment) => (
                  <UpcomingAppointmentCard key={appointment?.id} appointment={appointment} />
                ))}
              </div>
            </section>

            {/* Prescription Reminders */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Prescription Reminders</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Pill"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => window.location.href = '/prescription-management'}
                >
                  Manage All
                </Button>
              </div>
              <div className="space-y-4">
                {prescriptionReminders?.map((prescription) => (
                  <PrescriptionReminderCard key={prescription?.id} prescription={prescription} />
                ))}
              </div>
            </section>

            {/* Recent Consultations */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Recent Consultations</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={16}
                >
                  View History
                </Button>
              </div>
              <div className="space-y-4">
                {recentConsultations?.map((consultation) => (
                  <RecentConsultationCard key={consultation?.id} consultation={consultation} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Secondary Content */}
          <div className="space-y-6">
            {/* Test Results */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Test Results</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="TestTube"
                  iconPosition="left"
                  iconSize={16}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {testResults?.map((result) => (
                  <TestResultCard key={result?.id} testResult={result} />
                ))}
              </div>
            </section>

            {/* Hospital Announcements */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Hospital News</h2>
                
              </div>
              <div className="space-y-4">
                {hospitalAnnouncements?.map((announcement) => (
                  <HospitalAnnouncementCard key={announcement?.id} announcement={announcement} />
                ))}
              </div>
            </section>

            {/* Emergency Contacts */}
            <EmergencyContactPanel />

            {/* Hospital Map */}
            <HospitalMapPanel />
          </div>
        </div>

        {/* Footer Section */}
        <section className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-primary/10 text-primary rounded-lg inline-block mb-3">
                <Icon name="Clock" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Our medical team is available around the clock for urgent care and consultations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-secondary/10 text-secondary rounded-lg inline-block mb-3">
                <Icon name="Shield" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Your medical information is protected with industry-leading security standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-success/10 text-success rounded-lg inline-block mb-3">
                <Icon name="Award" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Accredited Care</h3>
              <p className="text-sm text-muted-foreground">
                Joint Commission accredited facility with board-certified physicians.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;