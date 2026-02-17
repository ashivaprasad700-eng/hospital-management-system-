import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PrescriptionFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange, 
  doctorFilter, 
  onDoctorChange, 
  dateFilter, 
  onDateChange,
  onClearFilters,
  totalCount,
  filteredCount
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Prescriptions' },
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending' }
  ];

  const doctorOptions = [
    { value: 'all', label: 'All Doctors' },
    { value: 'sarah-johnson', label: 'Dr. Sarah Johnson' },
    { value: 'michael-chen', label: 'Dr. Michael Chen' },
    { value: 'emily-davis', label: 'Dr. Emily Davis' },
    { value: 'robert-wilson', label: 'Dr. Robert Wilson' },
    { value: 'lisa-anderson', label: 'Dr. Lisa Anderson' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' }
  ];

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || doctorFilter !== 'all' || dateFilter !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Filter Prescriptions</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCount} prescriptions
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search medications, doctors, or conditions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusChange}
        />

        {/* Doctor Filter */}
        <Select
          placeholder="Filter by doctor"
          options={doctorOptions}
          value={doctorFilter}
          onChange={onDoctorChange}
          searchable
        />
      </div>
      <div className="flex items-center justify-between">
        {/* Date Filter */}
        <div className="w-full md:w-64">
          <Select
            placeholder="Filter by date"
            options={dateOptions}
            value={dateFilter}
            onChange={onDateChange}
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="ml-4"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Quick Filter Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => onStatusChange('active')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success border border-success/20 rounded-full text-xs font-medium healthcare-transition hover:bg-success/20"
        >
          <Icon name="CheckCircle" size={12} />
          Active Prescriptions
        </button>
        <button
          onClick={() => onDateChange('last-30-days')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium healthcare-transition hover:bg-primary/20"
        >
          <Icon name="Calendar" size={12} />
          Recent
        </button>
        <button
          onClick={() => {
            onStatusChange('active');
            onSearchChange('refill');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warning/10 text-warning border border-warning/20 rounded-full text-xs font-medium healthcare-transition hover:bg-warning/20"
        >
          <Icon name="RefreshCw" size={12} />
          Need Refill
        </button>
      </div>
    </div>
  );
};

export default PrescriptionFilters;