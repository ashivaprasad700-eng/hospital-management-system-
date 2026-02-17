import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HealthcareBreadcrumb from '../../components/ui/HealthcareBreadcrumb';
import StatusIndicator from '../../components/ui/StatusIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PrescriptionCard from './components/PrescriptionCard';
import PrescriptionFilters from './components/PrescriptionFilters';
import AdherenceTracker from './components/AdherenceTracker';
import PrescriptionStats from './components/PrescriptionStats';
import RefillModal from './components/RefillModal';

const PrescriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock prescription data
  const mockPrescriptions = [
    {
      id: 'rx-001',
      medicationName: 'Lisinopril',
      dosage: '10mg once daily',
      doctorName: 'Sarah Johnson',
      issueDate: '2024-09-15',
      expiryDate: '2025-09-15',
      status: 'active',
      quantity: '30 tablets',
      refillsRemaining: 3,
      totalRefills: 5,
      cost: '15.99',
      pharmacy: 'CVS Main St',
      lastFilled: '2024-09-15',
      instructions: `Take one tablet by mouth once daily in the morning with or without food.\nDo not stop taking this medication without consulting your doctor.\nMonitor blood pressure regularly.`,
      sideEffects: 'Common side effects may include dizziness, headache, fatigue, and dry cough. Contact your doctor if you experience swelling of face, lips, or throat.',
      interactions: 'Avoid potassium supplements and salt substitutes. Inform your doctor about all medications you are taking.',
      pharmacyDetails: {
        name: 'CVS Pharmacy - Main Street',
        address: '123 Main Street, Downtown, NY 10001',
        phone: '(555) 123-4567',
        hours: 'Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM'
      },
      alerts: [
        {
          type: 'info',
          message: 'Refill available in 5 days'
        }
      ]
    },
    {
      id: 'rx-002',
      medicationName: 'Metformin',
      dosage: '500mg twice daily',
      doctorName: 'Michael Chen',
      issueDate: '2024-08-20',
      expiryDate: '2025-08-20',
      status: 'active',
      quantity: '60 tablets',
      refillsRemaining: 2,
      totalRefills: 4,
      cost: '12.50',
      pharmacy: 'Walgreens Downtown',
      lastFilled: '2024-09-20',
      instructions: `Take one tablet by mouth twice daily with meals.\nTake with breakfast and dinner to reduce stomach upset.\nDo not crush or chew extended-release tablets.`,
      sideEffects: 'May cause nausea, vomiting, diarrhea, or metallic taste. These effects usually improve over time.',
      interactions: 'Limit alcohol consumption. Inform your doctor about contrast dye procedures.',
      pharmacyDetails: {
        name: 'Walgreens Pharmacy - Downtown',
        address: '456 Broadway Ave, Downtown, NY 10002',
        phone: '(555) 234-5678',
        hours: 'Mon-Sun: 7AM-11PM'
      },
      alerts: [
        {
          type: 'warning',
          message: 'Due for refill - only 3 days supply remaining'
        }
      ]
    },
    {
      id: 'rx-003',
      medicationName: 'Atorvastatin',
      dosage: '20mg once daily',
      doctorName: 'Emily Davis',
      issueDate: '2024-07-10',
      expiryDate: '2024-10-10',
      status: 'expired',
      quantity: '30 tablets',
      refillsRemaining: 0,
      totalRefills: 3,
      cost: '18.75',
      pharmacy: 'Hospital Pharmacy',
      lastFilled: '2024-07-10',
      instructions: `Take one tablet by mouth once daily in the evening.\nCan be taken with or without food.\nAvoid grapefruit and grapefruit juice.`,
      sideEffects: 'May cause muscle pain, weakness, or liver problems. Report unusual muscle pain immediately.',
      interactions: 'Avoid grapefruit products. Inform your doctor about other cholesterol medications.',
      pharmacyDetails: {
        name: 'HospitalConnect Pharmacy',
        address: '789 Medical Center Dr, NY 10003',
        phone: '(555) 345-6789',
        hours: 'Mon-Fri: 7AM-9PM, Sat: 8AM-6PM'
      },
      alerts: [
        {
          type: 'error',
          message: 'Prescription expired - contact doctor for renewal'
        }
      ]
    },
    {
      id: 'rx-004',
      medicationName: 'Omeprazole',
      dosage: '20mg once daily',
      doctorName: 'Robert Wilson',
      issueDate: '2024-09-25',
      expiryDate: '2025-09-25',
      status: 'pending',
      quantity: '30 capsules',
      refillsRemaining: 5,
      totalRefills: 5,
      cost: '22.30',
      pharmacy: 'Rite Aid Plaza',
      lastFilled: 'Not filled yet',
      instructions: `Take one capsule by mouth once daily before breakfast.\nSwallow whole, do not crush or chew.\nTake 30-60 minutes before eating.`,
      sideEffects: 'May cause headache, nausea, or diarrhea. Long-term use may affect magnesium levels.',
      interactions: 'May affect absorption of certain medications. Take 2 hours apart from other medications.',
      pharmacyDetails: {
        name: 'Rite Aid Pharmacy - Medical Plaza',
        address: '321 Health Plaza, NY 10004',
        phone: '(555) 456-7890',
        hours: 'Mon-Fri: 8AM-9PM, Sat-Sun: 9AM-7PM'
      },
      alerts: [
        {
          type: 'info',
          message: 'New prescription ready for pickup'
        }
      ]
    },
    {
      id: 'rx-005',
      medicationName: 'Amlodipine',
      dosage: '5mg once daily',
      doctorName: 'Lisa Anderson',
      issueDate: '2024-09-01',
      expiryDate: '2025-09-01',
      status: 'active',
      quantity: '30 tablets',
      refillsRemaining: 4,
      totalRefills: 5,
      cost: '8.99',
      pharmacy: 'CVS Main St',
      lastFilled: '2024-09-01',
      instructions: `Take one tablet by mouth once daily.\nCan be taken with or without food.\nTake at the same time each day.`,
      sideEffects: 'May cause swelling of ankles/feet, dizziness, or flushing. Contact doctor if swelling worsens.',
      interactions: 'Avoid grapefruit products. Monitor blood pressure regularly.',
      pharmacyDetails: {
        name: 'CVS Pharmacy - Main Street',
        address: '123 Main Street, Downtown, NY 10001',
        phone: '(555) 123-4567',
        hours: 'Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM'
      },
      alerts: []
    }
  ];

  // Mock adherence data
  const mockAdherenceData = {
    overall: 87,
    medications: [
      {
        id: 'rx-001',
        name: 'Lisinopril',
        dosage: '10mg daily',
        adherence: 92,
        taken: 28,
        prescribed: 30,
        missed: 2,
        nextDose: 'Tomorrow 8:00 AM'
      },
      {
        id: 'rx-002',
        name: 'Metformin',
        dosage: '500mg twice daily',
        adherence: 85,
        taken: 51,
        prescribed: 60,
        missed: 9,
        nextDose: 'Today 6:00 PM'
      },
      {
        id: 'rx-005',
        name: 'Amlodipine',
        dosage: '5mg daily',
        adherence: 90,
        taken: 27,
        prescribed: 30,
        missed: 3,
        nextDose: 'Tomorrow 8:00 AM'
      }
    ],
    weeklyProgress: [
      { day: 'Mon', completed: true, percentage: 100 },
      { day: 'Tue', completed: true, percentage: 100 },
      { day: 'Wed', completed: false, percentage: 67 },
      { day: 'Thu', completed: true, percentage: 100 },
      { day: 'Fri', completed: true, percentage: 100 },
      { day: 'Sat', completed: false, percentage: 33 },
      { day: 'Sun', completed: true, percentage: 100 }
    ],
    reminders: [
      {
        id: 'reminder-1',
        medication: 'Metformin 500mg',
        time: 'Today 6:00 PM'
      },
      {
        id: 'reminder-2',
        medication: 'Lisinopril 10mg',
        time: 'Tomorrow 8:00 AM'
      }
    ]
  };

  // Mock stats data
  const mockStats = {
    active: 3,
    pendingRefills: 1,
    total: 5,
    monthlyCost: 78.53,
    activeTrend: 0,
    refillTrend: -20,
    totalTrend: 25,
    costTrend: -15
  };

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Filter prescriptions
  const filteredPrescriptions = mockPrescriptions?.filter(prescription => {
    const matchesSearch = searchTerm === '' || 
      prescription?.medicationName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      prescription?.doctorName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      prescription?.instructions?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || prescription?.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || 
      prescription?.doctorName?.toLowerCase()?.replace(' ', '-')?.includes(doctorFilter?.replace('dr-', ''));
    
    // Simple date filtering logic
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'last-30-days' && new Date(prescription.issueDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === 'last-90-days' && new Date(prescription.issueDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDoctorFilter('all');
    setDateFilter('all');
  };

  const handleDownload = (prescriptionId) => {
    const prescription = mockPrescriptions?.find(p => p?.id === prescriptionId);
    if (prescription) {
      // Simulate PDF download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `prescription-${prescription?.medicationName}-${prescription?.issueDate}.pdf`;
      link?.click();
      
      // Show success message (in real app, this would be a toast notification)
      alert(`Downloading prescription for ${prescription?.medicationName}`);
    }
  };

  const handleRefill = (prescriptionId) => {
    const prescription = mockPrescriptions?.find(p => p?.id === prescriptionId);
    if (prescription) {
      setSelectedPrescription(prescription);
      setIsRefillModalOpen(true);
    }
  };

  const handleShare = (prescriptionId) => {
    const prescription = mockPrescriptions?.find(p => p?.id === prescriptionId);
    if (prescription && navigator.share) {
      navigator.share({
        title: `Prescription: ${prescription?.medicationName}`,
        text: `Prescription details for ${prescription?.medicationName} - ${prescription?.dosage}`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Prescription: ${prescription?.medicationName} - ${prescription?.dosage}\nPrescribed by: Dr. ${prescription?.doctorName}\nIssue Date: ${prescription?.issueDate}`;
      navigator.clipboard?.writeText(shareText);
      alert('Prescription details copied to clipboard');
    }
  };

  const handleSubmitRefill = async (refillRequest) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert(`Refill request submitted successfully for ${selectedPrescription?.medicationName}. You will receive a confirmation email shortly.`);
    
    setIsRefillModalOpen(false);
    setSelectedPrescription(null);
  };

  const handleUpdateAdherence = (reminderId, action) => {
    // Simulate updating adherence
    alert(`Marked medication as ${action} for reminder ${reminderId}`);
  };

  return (
    <>
      <Helmet>
        <title>Prescription Management - HospitalConnect</title>
        <meta name="description" content="Manage your digital prescriptions, track medication adherence, and request refills with HospitalConnect's comprehensive prescription management system." />
        <meta name="keywords" content="prescription management, digital prescriptions, medication tracking, refill requests, pharmacy, healthcare" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <HealthcareBreadcrumb />
        
        {/* Status Bar */}
        <div className="bg-muted border-b border-border py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <StatusIndicator type="system" />
              <StatusIndicator type="doctors" />
              <div className="hidden md:block">
                <StatusIndicator type="appointments" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString()}
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Prescription Management</h1>
              <p className="text-muted-foreground">
                Manage your digital prescriptions, track medication adherence, and request refills
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => alert('Downloading all prescriptions as PDF...')}
              >
                Download All
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => window.location.href = '/appointment-booking'}
              >
                New Prescription
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <PrescriptionStats stats={mockStats} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Filters */}
              <PrescriptionFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                doctorFilter={doctorFilter}
                onDoctorChange={setDoctorFilter}
                dateFilter={dateFilter}
                onDateChange={setDateFilter}
                onClearFilters={handleClearFilters}
                totalCount={mockPrescriptions?.length}
                filteredCount={filteredPrescriptions?.length}
              />

              {/* Prescriptions List */}
              <div className="space-y-4">
                {filteredPrescriptions?.length > 0 ? (
                  filteredPrescriptions?.map((prescription) => (
                    <PrescriptionCard
                      key={prescription?.id}
                      prescription={prescription}
                      onDownload={handleDownload}
                      onRefill={handleRefill}
                      onShare={handleShare}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">No prescriptions found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Adherence Tracker */}
              <AdherenceTracker
                adherenceData={mockAdherenceData}
                onUpdateAdherence={handleUpdateAdherence}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => window.location.href = '/appointment-booking'}
                  >
                    Schedule Consultation
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageSquare"
                    iconPosition="left"
                    onClick={() => alert('Opening chat with pharmacist...')}
                  >
                    Chat with Pharmacist
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MapPin"
                    iconPosition="left"
                    onClick={() => alert('Finding nearby pharmacies...')}
                  >
                    Find Pharmacies
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="CreditCard"
                    iconPosition="left"
                    onClick={() => alert('Opening insurance information...')}
                  >
                    Insurance Info
                  </Button>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-error/10 border border-error/20 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                  <h2 className="text-lg font-semibold text-error">Emergency Contacts</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-error">Poison Control:</span>
                    <a href="tel:1-800-222-1222" className="font-medium text-error hover:underline">
                      1-800-222-1222
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-error">Emergency:</span>
                    <a href="tel:911" className="font-medium text-error hover:underline">
                      911
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-error">Hospital:</span>
                    <a href="tel:555-123-4567" className="font-medium text-error hover:underline">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Refill Modal */}
        <RefillModal
          isOpen={isRefillModalOpen}
          onClose={() => {
            setIsRefillModalOpen(false);
            setSelectedPrescription(null);
          }}
          prescription={selectedPrescription}
          onSubmitRefill={handleSubmitRefill}
        />
      </div>
    </>
  );
};

export default PrescriptionManagement;