import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { mockShifts, daysOfWeek } from '../../data/mockData';
import './Shifts.css';

const Shifts = () => {
  const { availability, selectedShifts } = useAppContext();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('All');
  const [sortBy, setSortBy] = useState('pay');

  // Filter shifts based on user availability
  const matchedShifts = useMemo(() => {
    let shifts = mockShifts;

    // Filter by availability if user has set availability
    const hasAvailability = Object.values(availability).some(times => times.length > 0);
    if (hasAvailability) {
      shifts = shifts.filter(shift => {
        const dayAvailability = availability[shift.day] || [];
        return dayAvailability.includes(shift.startTime);
      });
    }

    // Filter by selected day
    if (selectedDay !== 'All') {
      shifts = shifts.filter(shift => shift.day === selectedDay);
    }

    // Sort shifts
    switch (sortBy) {
      case 'pay':
        shifts = [...shifts].sort((a, b) => b.pay - a.pay);
        break;
      case 'hours':
        shifts = [...shifts].sort((a, b) => b.hours - a.hours);
        break;
      case 'day':
        const dayOrder = daysOfWeek.reduce((acc, day, idx) => {
          acc[day] = idx;
          return acc;
        }, {});
        shifts = [...shifts].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
        break;
      default:
        break;
    }

    return shifts;
  }, [availability, selectedDay, sortBy]);

  const isShiftSelected = (shiftId) => {
    return selectedShifts.some(s => s.id === shiftId);
  };

  const getAvailableDays = () => {
    const daysWithShifts = [...new Set(matchedShifts.map(s => s.day))];
    return ['All', ...daysWithShifts];
  };

  return (
    <div className="shifts-container">
      <header className="shifts-header">
        <div className="header-content">
          <h1>Matched Shifts</h1>
          <p>Shifts that fit your availability</p>
        </div>
        <div className="header-actions">
          <button 
            className="nav-btn"
            onClick={() => navigate('/availability')}
          >
            <span>📅</span>
            Update Availability
          </button>
          <button 
            className="nav-btn primary"
            onClick={() => navigate('/dashboard')}
          >
            <span>📊</span>
            View Earnings
          </button>
        </div>
      </header>

      <div className="shifts-content">
        <div className="filters-section">
          <div className="filter-group">
            <label>Filter by Day:</label>
            <div className="filter-tabs">
              {getAvailableDays().map(day => (
                <button
                  key={day}
                  className={`filter-tab ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day === 'All' ? 'All Days' : day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="pay">Highest Pay</option>
              <option value="hours">Most Hours</option>
              <option value="day">Day of Week</option>
            </select>
          </div>
        </div>

        <div className="shifts-stats">
          <span className="stat">
            <strong>{matchedShifts.length}</strong> shifts found
          </span>
          {matchedShifts.length > 0 && (
            <span className="stat">
              Average pay: <strong>${(matchedShifts.reduce((sum, s) => sum + s.pay, 0) / matchedShifts.length).toFixed(2)}/hr</strong>
            </span>
          )}
        </div>

        {matchedShifts.length === 0 ? (
          <div className="no-shifts">
            <div className="no-shifts-icon">🔍</div>
            <h3>No shifts found</h3>
            <p>
              {Object.values(availability).some(times => times.length > 0)
                ? "No shifts match your current availability. Try adjusting your available times."
                : "Set your availability first to see matching shifts."
              }
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/availability')}
            >
              <span className="btn-icon">📅</span>
              Set Availability
            </button>
          </div>
        ) : (
          <div className="shifts-grid">
            {matchedShifts.map(shift => (
              <div 
                key={shift.id} 
                className={`shift-card ${isShiftSelected(shift.id) ? 'selected' : ''}`}
                onClick={() => navigate(`/shift/${shift.id}`)}
              >
                <div className="shift-header">
                  <h3 className="shift-title">{shift.title}</h3>
                  {isShiftSelected(shift.id) && (
                    <span className="selected-badge">✓ Interested</span>
                  )}
                </div>
                
                <div className="shift-company">
                  <span className="company-icon">🏢</span>
                  {shift.company}
                </div>
                
                <div className="shift-details">
                  <div className="detail">
                    <span className="detail-icon">📅</span>
                    <span>{shift.day}</span>
                  </div>
                  <div className="detail">
                    <span className="detail-icon">⏰</span>
                    <span>{shift.startTime} - {shift.endTime}</span>
                  </div>
                  <div className="detail">
                    <span className="detail-icon">📍</span>
                    <span>{shift.location}</span>
                  </div>
                </div>
                
                <div className="shift-footer">
                  <div className="shift-pay">
                    <span className="pay-amount">${shift.pay.toFixed(2)}</span>
                    <span className="pay-period">/hour</span>
                  </div>
                  <div className="shift-hours">
                    <span className="hours-amount">{shift.hours}</span>
                    <span className="hours-label">hours</span>
                  </div>
                </div>
                
                <div className="shift-earnings">
                  Total: ${(shift.pay * shift.hours).toFixed(2)}
                </div>
                
                <button className="view-details-btn">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shifts-footer">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/availability')}
        >
          <span className="btn-icon">📅</span>
          Update Availability
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          <span className="btn-icon">📊</span>
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default Shifts;