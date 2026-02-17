import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PatientRegistration from "./pages/patient-registration";
import AppointmentBooking from "./pages/appointment-booking";
import PatientDashboard from "./pages/patient-dashboard";
import PrescriptionManagement from "./pages/prescription-management";
import SymptomChecker from "./pages/symptom-checker";
import DoctorProfile from "./pages/doctor-profile";

// Temporary simple components
const ScrollToTop = () => null;
const ErrorBoundary = ({ children }) => children;

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<SymptomChecker />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/prescription-management" element={<PrescriptionManagement />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;