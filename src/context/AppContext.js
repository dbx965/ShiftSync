import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Availability state - stores available days and times
  const [availability, setAvailability] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  // Selected/interested shifts
  const [selectedShifts, setSelectedShifts] = useState([]);

  // Confirmation modal state
  const [confirmation, setConfirmation] = useState({
    show: false,
    type: '', // 'success' or 'error'
    message: ''
  });

  // Toast notification state
  const [toast, setToast] = useState({
    show: false,
    type: '', // 'success', 'error', 'info', 'warning'
    message: ''
  });

  // Login function
  const login = (email, password) => {
    // Mock authentication - accepts any valid format
    if (email && password && password.length >= 6) {
      setUser({
        email,
        name: email.split('@')[0],
        id: Date.now()
      });
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  // Sign up function
  const signup = (email, password, name) => {
    if (email && password && password.length >= 6 && name) {
      setUser({
        email,
        name,
        id: Date.now()
      });
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields correctly' };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAvailability({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    });
    setSelectedShifts([]);
  };

  // Update availability for a specific day
  const updateDayAvailability = (day, times) => {
    setAvailability(prev => ({
      ...prev,
      [day]: times
    }));
  };

  // Apply preset availability
  const applyPreset = (preset) => {
    if (preset.days) {
      // Weekend preset - set all times for those days
      const newAvailability = { ...availability };
      preset.days.forEach(day => {
        newAvailability[day] = preset.times || ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];
      });
      setAvailability(newAvailability);
    } else if (preset.times) {
      // Time-based preset - apply to all days
      const newAvailability = {};
      Object.keys(availability).forEach(day => {
        newAvailability[day] = preset.times;
      });
      setAvailability(newAvailability);
    }
  };

  // Express interest in a shift
  const expressInterest = (shift) => {
    if (!selectedShifts.find(s => s.id === shift.id)) {
      setSelectedShifts(prev => [...prev, shift]);
      showConfirmation('success', `Successfully expressed interest in ${shift.title} at ${shift.company}!`);
      return true;
    }
    showConfirmation('error', 'You have already expressed interest in this shift.');
    return false;
  };

  // Remove interest from a shift
  const removeInterest = (shiftId) => {
    setSelectedShifts(prev => prev.filter(s => s.id !== shiftId));
  };

  // Show confirmation modal
  const showConfirmation = (type, message) => {
    setConfirmation({ show: true, type, message });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setConfirmation({ show: false, type: '', message: '' });
    }, 3000);
  };

  // Show toast notification
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast({ show: false, type: '', message: '' });
  };

  // Calculate estimated weekly earnings
  const calculateEarnings = () => {
    return selectedShifts.reduce((total, shift) => {
      return total + (shift.pay * shift.hours);
    }, 0);
  };

  // Get total hours from selected shifts
  const getTotalHours = () => {
    return selectedShifts.reduce((total, shift) => {
      return total + shift.hours;
    }, 0);
  };

  // Calculate monthly earnings projection (assuming 4 weeks per month)
  const calculateMonthlyProjection = () => {
    const weeklyEarnings = calculateEarnings();
    return weeklyEarnings * 4;
  };

  // Get average weekly hours
  const getAverageWeeklyHours = () => {
    return getTotalHours();
  };

  // Get monthly hours projection
  const getMonthlyHoursProjection = () => {
    return getAverageWeeklyHours() * 4;
  };

  const value = {
    // Auth
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    
    // Availability
    availability,
    updateDayAvailability,
    applyPreset,
    
    // Shifts
    selectedShifts,
    expressInterest,
    removeInterest,
    
    // Confirmation
    confirmation,
    showConfirmation,
    
    // Toast
    toast,
    showToast,
    hideToast,
    
    // Earnings
    calculateEarnings,
    getTotalHours,
    calculateMonthlyProjection,
    getAverageWeeklyHours,
    getMonthlyHoursProjection
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;