import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DoctorDetails = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'expertise', label: 'Expertise', icon: 'Award' },
    { id: 'languages', label: 'Languages', icon: 'Globe' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg healthcare-shadow">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap healthcare-transition ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">About Dr. {doctor?.name}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {doctor?.about}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Icon name="Calendar" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Years of Practice</div>
                  <div className="text-sm text-muted-foreground">{doctor?.experience} years</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Icon name="Users" size={20} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Patients Treated</div>
                  <div className="text-sm text-muted-foreground">{doctor?.totalPatients}+</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Education & Certifications</h3>
            <div className="space-y-4">
              {doctor?.education?.map((edu, index) => (
                <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="GraduationCap" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{edu?.degree}</div>
                    <div className="text-sm text-primary">{edu?.institution}</div>
                    <div className="text-sm text-muted-foreground">{edu?.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'expertise' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Areas of Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctor?.expertise?.map((area, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">{area?.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{area?.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Languages Spoken</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {doctor?.languages?.map((language, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Globe" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{language}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;