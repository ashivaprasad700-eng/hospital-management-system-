import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PrivacyPolicyPanel = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey]
    }));
  };

  const policySection = [
    {
      key: 'hipaa',
      title: 'HIPAA Compliance',
      icon: 'Shield',
      summary: 'Your health information is protected under federal law',
      content: `HospitalConnect is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA). We implement administrative, physical, and technical safeguards to protect your personal health information.\n\nYour medical records, appointment information, and personal data are encrypted both in transit and at rest. Access to your information is strictly limited to authorized healthcare personnel involved in your care.\n\nYou have the right to access, amend, and request restrictions on the use of your health information. We will never share your information without your explicit consent, except as required by law or for treatment, payment, and healthcare operations.`
    },
    {
      key: 'privacy',
      title: 'Privacy Policy',
      icon: 'Lock',
      summary: 'How we collect, use, and protect your personal information',
      content: `We collect personal information necessary to provide quality healthcare services, including:\n• Personal identification information (name, address, phone, email)\n• Medical history and current health conditions\n• Insurance and payment information\n• Emergency contact details\n\nThis information is used solely for:\n• Providing medical care and treatment\n• Processing insurance claims and payments\n• Scheduling appointments and sending reminders\n• Emergency contact purposes\n• Quality improvement and patient safety initiatives\n\nWe do not sell, rent, or share your personal information with third parties for marketing purposes.`
    },
    {
      key: 'rights',
      title: 'Patient Rights',
      icon: 'Users',
      summary: 'Your rights as a patient in our healthcare system',
      content: `As a patient, you have the right to:\n• Receive respectful, considerate care regardless of age, gender, race, religion, or sexual orientation\n• Receive information about your diagnosis, treatment, and prognosis in terms you can understand\n• Participate in decisions about your care\n• Request a second opinion\n• Access your medical records\n• File complaints or grievances about your care\n• Refuse treatment (with certain legal exceptions)\n• Privacy and confidentiality of your medical information\n• Receive care in a safe environment\n• Be informed of hospital policies and procedures that affect your care`
    },
    {
      key: 'data',
      title: 'Data Security',
      icon: 'Database',
      summary: 'Technical measures to protect your information',
      content: `HospitalConnect employs industry-leading security measures:\n\n• End-to-end encryption for all data transmission\n• Multi-factor authentication for all user accounts\n• Regular security audits and penetration testing\n• Secure cloud infrastructure with 99.9% uptime\n• Automated backup systems with disaster recovery\n• Staff training on data security and privacy protocols\n• Compliance with SOC 2 Type II standards\n\nIn the unlikely event of a security incident, we will notify affected patients within 72 hours and provide guidance on protective measures.`
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow h-fit sticky top-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} color="white" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Privacy & Policies</h2>
      </div>
      <div className="space-y-4">
        {policySection?.map((section) => (
          <div key={section?.key} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section?.key)}
              className="w-full p-4 text-left hover:bg-accent healthcare-transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Icon name={section?.icon} size={18} className="text-primary" />
                <div>
                  <h3 className="font-medium text-foreground">{section?.title}</h3>
                  <p className="text-sm text-muted-foreground">{section?.summary}</p>
                </div>
              </div>
              <Icon 
                name={expandedSections?.[section?.key] ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSections?.[section?.key] && (
              <div className="px-4 pb-4 border-t border-border bg-muted/30">
                <div className="pt-4 text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {section?.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              If you have questions about our privacy practices or need assistance with registration, our patient advocates are here to help.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={14} className="text-primary" />
                <span className="text-foreground">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={14} className="text-primary" />
                <span className="text-foreground">privacy@hospitalconnect.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={14} className="text-primary" />
                <span className="text-foreground">Mon-Fri 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPanel;