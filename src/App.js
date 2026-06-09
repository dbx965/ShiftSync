import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Auth from './components/Auth/Auth';
import Availability from './components/Availability/Availability';
import Shifts from './components/Shifts/Shifts';
import ShiftDetails from './components/ShiftDetails/ShiftDetails';
import Dashboard from './components/Dashboard/Dashboard';
import Confirmation from './components/Confirmation/Confirmation';
import StudentsList from './components/StudentsList/StudentsList';
import Toast from './components/Toast/Toast';
import './App.css';

// Navigation Progress Component
const NavProgress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();
  
  if (!isAuthenticated || location.pathname === '/') {
    return null;
  }

  const steps = [
    { path: '/availability', label: 'Availability', icon: '📅' },
    { path: '/shifts', label: 'Shifts', icon: '💼' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' }
  ];

  const getCurrentStepIndex = () => {
    if (location.pathname.startsWith('/shift/')) return 1;
    if (location.pathname === '/confirmation') return 1;
    return steps.findIndex(step => step.path === location.pathname);
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <nav className="nav-progress">
      <div className="nav-progress-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.path}>
            <div 
              className={`nav-step ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'completed' : ''}`}
              onClick={() => navigate(step.path)}
              style={{ cursor: 'pointer' }}
            >
              <span className="nav-step-icon">{step.icon}</span>
              <span>{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <span className="nav-step-arrow">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Public Route Component (redirect to shifts if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  
  if (isAuthenticated) {
    return <Navigate to="/availability" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        } 
      />
      <Route 
        path="/availability" 
        element={
          <ProtectedRoute>
            <Availability />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/shifts" 
        element={
          <ProtectedRoute>
            <Shifts />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/shift/:id" 
        element={
          <ProtectedRoute>
            <ShiftDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/confirmation" 
        element={
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students" 
        element={
          <ProtectedRoute>
            <StudentsList />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <NavProgress />
          <AppRoutes />
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
