import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentUploadSection = ({ formData, handleInputChange, errors }) => {
  const [dragActive, setDragActive] = useState({});

  const documentTypes = [
    {
      key: 'insuranceCard',
      label: 'Insurance Card',
      description: 'Front and back of your insurance card',
      required: true,
      accept: '.jpg,.jpeg,.png,.pdf'
    },
    {
      key: 'photoId',
      label: 'Photo ID',
      description: 'Driver\'s license, passport, or state ID',
      required: true,
      accept: '.jpg,.jpeg,.png,.pdf'
    },
    {
      key: 'medicalRecords',
      label: 'Medical Records',
      description: 'Recent medical records or test results (optional)',
      required: false,
      accept: '.jpg,.jpeg,.png,.pdf,.doc,.docx'
    }
  ];

  const handleDrag = (e, docType) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(prev => ({ ...prev, [docType]: true }));
    } else if (e?.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [docType]: false }));
    }
  };

  const handleDrop = (e, docType) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(prev => ({ ...prev, [docType]: false }));
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files?.[0], docType);
    }
  };

  const handleFileSelect = (file, docType) => {
    if (file) {
      const fileData = {
        file: file,
        name: file?.name,
        size: file?.size,
        type: file?.type,
        uploadDate: new Date()?.toISOString()
      };
      handleInputChange(docType, fileData);
    }
  };

  const removeFile = (docType) => {
    handleInputChange(docType, null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">7</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Document Upload</h2>
      </div>
      <div className="space-y-6">
        {documentTypes?.map((docType) => (
          <div key={docType?.key} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground">{docType?.label}</h3>
              {docType?.required && (
                <span className="text-destructive text-sm">*</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{docType?.description}</p>

            {formData?.[docType?.key] ? (
              // File uploaded state
              (<div className="border border-border rounded-lg p-4 bg-accent/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileCheck" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{formData?.[docType?.key]?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(formData?.[docType?.key]?.size)} • Uploaded
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(docType?.key)}
                    iconName="X"
                    iconSize={16}
                  >
                    Remove
                  </Button>
                </div>
              </div>)
            ) : (
              // Upload area
              (<div
                className={`border-2 border-dashed rounded-lg p-6 text-center healthcare-transition ${
                  dragActive?.[docType?.key]
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                } ${errors?.[docType?.key] ? 'border-destructive' : ''}`}
                onDragEnter={(e) => handleDrag(e, docType?.key)}
                onDragLeave={(e) => handleDrag(e, docType?.key)}
                onDragOver={(e) => handleDrag(e, docType?.key)}
                onDrop={(e) => handleDrop(e, docType?.key)}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Icon name="Upload" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Drop your file here, or{' '}
                      <label className="text-primary hover:text-primary/80 cursor-pointer healthcare-transition">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept={docType?.accept}
                          onChange={(e) => handleFileSelect(e?.target?.files?.[0], docType?.key)}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports: JPG, PNG, PDF {docType?.key === 'medicalRecords' && ', DOC, DOCX'} (Max 10MB)
                    </p>
                  </div>
                </div>
              </div>)
            )}

            {errors?.[docType?.key] && (
              <p className="text-sm text-destructive">{errors?.[docType?.key]}</p>
            )}
          </div>
        ))}

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Document Security</h4>
              <p className="text-sm text-muted-foreground">
                All uploaded documents are encrypted and stored securely in compliance with HIPAA regulations. 
                Your personal information is protected and will only be used for healthcare purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadSection;