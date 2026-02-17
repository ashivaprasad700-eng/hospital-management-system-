import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const DoctorHeader = ({ doctor }) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 healthcare-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Doctor Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={doctor?.photo}
              alt={`Dr. ${doctor?.name}`}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg object-cover"
            />
            <div className="absolute -bottom-2 -right-2">
              <div className={`w-6 h-6 rounded-full border-2 border-surface ${
                doctor?.isOnline ? 'bg-success' : 'bg-muted-foreground'
              }`} />
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                Dr. {doctor?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {doctor?.specializations?.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Icon name="GraduationCap" size={16} />
                  <span>{doctor?.experience} years experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={16} />
                  <span>{doctor?.location}</span>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-col gap-2">
              <StatusIndicator type="doctors" className="self-start" />
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  doctor?.isOnline ? 'bg-success animate-pulse-gentle' : 'bg-muted-foreground'
                }`} />
                <span className="text-muted-foreground">
                  {doctor?.isOnline ? 'Available Now' : 'Currently Busy'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{doctor?.rating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{doctor?.totalPatients}</div>
              <div className="text-xs text-muted-foreground">Patients</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{doctor?.consultationTime}</div>
              <div className="text-xs text-muted-foreground">Avg Time</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{doctor?.waitTime}</div>
              <div className="text-xs text-muted-foreground">Wait Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;