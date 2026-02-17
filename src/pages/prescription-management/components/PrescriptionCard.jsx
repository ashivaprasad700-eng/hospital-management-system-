import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const PrescriptionCard = ({ prescription, onDownload, onRefill, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return {
          color: 'text-success bg-success/10 border-success/20',
          icon: 'CheckCircle',
          label: 'Active'
        };
      case 'expired':
        return {
          color: 'text-error bg-error/10 border-error/20',
          icon: 'XCircle',
          label: 'Expired'
        };
      case 'pending':
        return {
          color: 'text-warning bg-warning/10 border-warning/20',
          icon: 'Clock',
          label: 'Pending'
        };
      default:
        return {
          color: 'text-muted-foreground bg-muted border-border',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig(prescription?.status);

  return (
    <div className="bg-card border border-border rounded-lg p-6 healthcare-shadow healthcare-transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-card-foreground">{prescription?.medicationName}</h3>
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${statusConfig?.color}`}>
              <Icon name={statusConfig?.icon} size={12} />
              <span>{statusConfig?.label}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            <span className="font-medium">Dosage:</span> {prescription?.dosage}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Prescribed by:</span> Dr. {prescription?.doctorName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-card-foreground">{prescription?.issueDate}</p>
          <p className="text-xs text-muted-foreground">Expires: {prescription?.expiryDate}</p>
        </div>
      </div>
      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="Pill" size={20} className="mx-auto mb-1 text-primary" />
          <p className="text-xs text-muted-foreground">Quantity</p>
          <p className="text-sm font-medium">{prescription?.quantity}</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="RefreshCw" size={20} className="mx-auto mb-1 text-primary" />
          <p className="text-xs text-muted-foreground">Refills</p>
          <p className="text-sm font-medium">{prescription?.refillsRemaining}/{prescription?.totalRefills}</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="DollarSign" size={20} className="mx-auto mb-1 text-primary" />
          <p className="text-xs text-muted-foreground">Cost</p>
          <p className="text-sm font-medium">₹{prescription?.cost}</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <Icon name="MapPin" size={20} className="mx-auto mb-1 text-primary" />
          <p className="text-xs text-muted-foreground">Pharmacy</p>
          <p className="text-sm font-medium">{prescription?.pharmacy}</p>
        </div>
      </div>
      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 mb-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-2">Usage Instructions</h4>
            <p className="text-sm text-muted-foreground">{prescription?.instructions}</p>
          </div>
          
          {prescription?.sideEffects && (
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                Side Effects
              </h4>
              <p className="text-sm text-muted-foreground">{prescription?.sideEffects}</p>
            </div>
          )}

          {prescription?.interactions && (
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                Drug Interactions
              </h4>
              <p className="text-sm text-muted-foreground">{prescription?.interactions}</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-2">Pharmacy Information</h4>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm font-medium">{prescription?.pharmacyDetails?.name}</p>
              <p className="text-sm text-muted-foreground">{prescription?.pharmacyDetails?.address}</p>
              <p className="text-sm text-muted-foreground">Phone: {prescription?.pharmacyDetails?.phone}</p>
              <p className="text-sm text-muted-foreground">Hours: {prescription?.pharmacyDetails?.hours}</p>
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Less Details' : 'More Details'}
        </Button>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload(prescription?.id)}
            iconName="Download"
            iconPosition="left"
          >
            Download PDF
          </Button>
          
          {prescription?.status === 'active' && prescription?.refillsRemaining > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onRefill(prescription?.id)}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Request Refill
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(prescription?.id)}
            iconName="Share2"
            iconPosition="left"
          >
            Share
          </Button>
        </div>
      </div>
      {/* Alerts */}
      {prescription?.alerts && prescription?.alerts?.length > 0 && (
        <div className="mt-4 space-y-2">
          {prescription?.alerts?.map((alert, index) => (
            <div key={index} className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
              alert?.type === 'warning' ? 'bg-warning/10 text-warning border border-warning/20' :
              alert?.type === 'error'? 'bg-error/10 text-error border border-error/20' : 'bg-primary/10 text-primary border border-primary/20'
            }`}>
              <Icon name={alert?.type === 'warning' ? 'AlertTriangle' : alert?.type === 'error' ? 'AlertCircle' : 'Info'} size={16} />
              <span>{alert?.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionCard;