import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { daysOfWeek, timeSlots, availabilityPresets } from '../../data/mockData';
import API_BASE from '../../config/api';
import './Availability.css';

const Availability = () => {
  const { availability, updateDayAvailability, applyPreset, user, selectedShifts, showToast } = useAppContext();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTimeToggle = (day, time) => {
    const currentTimes = availability[day] || [];
    const newTimes = currentTimes.includes(time)
      ? currentTimes.filter(t => t !== time)
      : [...currentTimes, time];
    updateDayAvailability(day, newTimes);
  };

  const handlePresetClick = (preset) => {
    applyPreset(preset);
    showToast('success', `Applied "${preset.name}" preset`);
  };

  const selectAllTimes = (day) => {
    updateDayAvailability(day, [...timeSlots]);
  };

  const clearAllTimes = (day) => {
    updateDayAvailability(day, []);
  };

  const getTotalHours = () => {
    let total = 0;
    Object.values(availability).forEach(times => {
      total += times.length;
    });
    return total;
  };

  const hasAvailability = () => {
    return Object.values(availability).some(times => times.length > 0);
  };

  const handleContinue = async () => {
    if (!hasAvailability()) return;

    setIsSubmitting(true);

    try {
      const shiftInterest =
        selectedShifts.length > 0
          ? selectedShifts.map(shift => shift.title).join(', ')
          : 'Any';

      const response = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user?.name || 'Unknown',
          email: user?.email || '',
          availability: availability,
          shift_interest: shiftInterest,
        }),
      });

      if (response.ok) {
        navigate('/confirmation', {
          state: {
            type: 'success',
            message: 'Your availability has been saved successfully!',
          },
        });
      } else {
        const errorData = await response.json();
        showToast('error', errorData.detail || 'Failed to save availability. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Unable to connect to the server. Make sure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="availability-container">
      <header className="availability-header">
        <div className="header-content">
          <h1>Set Your Availability</h1>
          <p>Hi {user?.name || 'there'}! Select the days and times you're available to work.</p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-value">{getTotalHours()}</span>
            <span className="stat-label">hours selected</span>
          </div>
          <div className="header-nav">
            <button
              className="nav-btn dashboard-btn"
              onClick={() => navigate('/dashboard')}
            >
              📊 View Earnings
            </button>
            <button
              className="nav-btn shifts-btn"
              onClick={() => navigate('/shifts')}
            >
              💼 Find Shifts
            </button>
            <button
              className="nav-btn shifts-btn"
              onClick={() => navigate('/students')}
            >
              📋 View Saved Records
            </button>
          </div>
        </div>
      </header>

      <div className="availability-content">
        <section className="presets-section">
          <h3>Quick Presets</h3>
          <div className="presets-grid">
            {availabilityPresets.map((preset, index) => (
              <button
                key={index}
                className="preset-btn"
                onClick={() => handlePresetClick(preset)}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </section>

        <section className="days-section">
          <h3>Select Days</h3>
          <div className="days-tabs">
            {daysOfWeek.map(day => (
              <button
                key={day}
                className={`day-tab ${selectedDay === day ? 'active' : ''} ${
                  availability[day]?.length > 0 ? 'has-times' : ''
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="day-name">{day.slice(0, 3)}</span>
                {availability[day]?.length > 0 && (
                  <span className="time-count">{availability[day].length}</span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="times-section">
          <div className="times-header">
            <h3>Available Times for {selectedDay}</h3>
            <div className="times-actions">
              <button
                className="action-btn"
                onClick={() => selectAllTimes(selectedDay)}
              >
                Select All
              </button>
              <button
                className="action-btn clear"
                onClick={() => clearAllTimes(selectedDay)}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="times-grid">
            {timeSlots.map(time => {
              const isSelected = availability[selectedDay]?.includes(time);
              return (
                <button
                  key={time}
                  className={`time-slot ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleTimeToggle(selectedDay, time)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </section>

        <section className="summary-section">
          <h3>Your Availability Summary</h3>
          <div className="summary-grid">
            {daysOfWeek.map(day => {
              const times = availability[day] || [];
              if (times.length === 0) return null;
              return (
                <div key={day} className="summary-day">
                  <span className="summary-day-name">{day}</span>
                  <span className="summary-times">
                    {times.length === timeSlots.length
                      ? 'All day'
                      : `${times.length} hours`}
                  </span>
                </div>
              );
            })}
          </div>
          {!hasAvailability() && (
            <p className="no-availability">No availability set yet. Select times above to get started.</p>
          )}
        </section>

        <div className="availability-actions">
          <button
            className="continue-btn"
            onClick={handleContinue}
            disabled={!hasAvailability() || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Availability & Find Shifts →'}
          </button>
          <button
            className="skip-btn"
            onClick={() => navigate('/shifts')}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Availability;
