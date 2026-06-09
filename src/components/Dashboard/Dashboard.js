import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { 
    user, 
    selectedShifts, 
    removeInterest, 
    calculateEarnings, 
    getTotalHours,
    calculateMonthlyProjection,
    getMonthlyHoursProjection,
    showToast
  } = useAppContext();
  const navigate = useNavigate();

  const totalEarnings = calculateEarnings();
  const totalHours = getTotalHours();
  const averagePay = totalHours > 0 ? totalEarnings / totalHours : 0;
  const monthlyEarnings = calculateMonthlyProjection();
  const monthlyHours = getMonthlyHoursProjection();

  const getEarningsByDay = () => {
    const byDay = {};
    selectedShifts.forEach(shift => {
      if (!byDay[shift.day]) {
        byDay[shift.day] = 0;
      }
      byDay[shift.day] += shift.pay * shift.hours;
    });
    return byDay;
  };

  const earningsByDay = getEarningsByDay();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Your Earnings Dashboard</h1>
          <p>Welcome back, {user?.name || 'Student'}!</p>
        </div>
        <div className="header-actions">
          <button 
            className="nav-btn shifts-btn"
            onClick={() => navigate('/shifts')}
          >
            💼 Find Shifts
          </button>
          <button 
            className="nav-btn availability-btn"
            onClick={() => navigate('/availability')}
          >
            📅 Update Availability
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-section">
          <div className="stat-card main-stat">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <span className="stat-value">${totalEarnings.toFixed(2)}</span>
              <span className="stat-label">Estimated Weekly Earnings</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <span className="stat-value">{totalHours}</span>
              <span className="stat-label">Total Hours</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-value">${averagePay.toFixed(2)}</span>
              <span className="stat-label">Average Pay/Hour</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-info">
              <span className="stat-value">{selectedShifts.length}</span>
              <span className="stat-label">Shifts Selected</span>
            </div>
          </div>
        </div>

        {selectedShifts.length > 0 && (
          <section className="monthly-projection">
            <h2>Monthly Projection</h2>
            <div className="projection-grid">
              <div className="projection-card">
                <div className="projection-icon">📈</div>
                <div className="projection-info">
                  <span className="projection-value">${monthlyEarnings.toFixed(2)}</span>
                  <span className="projection-label">Projected Monthly Earnings</span>
                </div>
              </div>
              <div className="projection-card">
                <div className="projection-icon">⏰</div>
                <div className="projection-info">
                  <span className="projection-value">{monthlyHours}</span>
                  <span className="projection-label">Projected Monthly Hours</span>
                </div>
              </div>
            </div>
            <p className="projection-note">*Based on maintaining your current weekly schedule (4 weeks/month)</p>
          </section>
        )}

        {selectedShifts.length > 0 && (
          <>
            <section className="earnings-breakdown">
              <h2>Earnings by Day</h2>
              <div className="breakdown-grid">
                {Object.entries(earningsByDay).map(([day, amount]) => (
                  <div key={day} className="breakdown-item">
                    <span className="breakdown-day">{day}</span>
                    <span className="breakdown-amount">${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="selected-shifts">
              <h2>Your Selected Shifts</h2>
              <div className="shifts-list">
                {selectedShifts.map(shift => (
                  <div key={shift.id} className="shift-item">
                    <div className="shift-info">
                      <h3>{shift.title}</h3>
                      <p className="shift-company">{shift.company}</p>
                      <div className="shift-meta">
                        <span>📅 {shift.day}</span>
                        <span>⏰ {shift.startTime} - {shift.endTime}</span>
                        <span>📍 {shift.location}</span>
                      </div>
                    </div>
                    <div className="shift-payment">
                      <span className="shift-pay">${shift.pay}/hr</span>
                      <span className="shift-total">${(shift.pay * shift.hours).toFixed(2)}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => {
                          removeInterest(shift.id);
                          showToast('success', `Removed ${shift.title} from your shifts`);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {selectedShifts.length === 0 && (
          <section className="no-shifts-section">
            <div className="no-shifts-content">
              <div className="no-shifts-icon">📭</div>
              <h3>No Shifts Selected Yet</h3>
              <p>Browse available shifts and express interest to start tracking your earnings.</p>
              <button 
                className="browse-shifts-btn"
                onClick={() => navigate('/shifts')}
              >
                Browse Shifts
              </button>
            </div>
          </section>
        )}

        <section className="tips-section">
          <h2>Maximize Your Earnings</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">📅</span>
              <h4>Set Your Availability</h4>
              <p>The more times you're available, the more shifts you'll see.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">⚡</span>
              <h4>Be Quick</h4>
              <p>Popular shifts fill up fast. Express interest early!</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🎯</span>
              <h4>Focus on High-Pay</h4>
              <p>Sort by pay rate to find the best earning opportunities.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">📈</span>
              <h4>Build Your Profile</h4>
              <p>Complete shifts to get better opportunities.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="dashboard-footer">
        <button 
          className="back-btn"
          onClick={() => navigate('/shifts')}
        >
          ← Back to Shifts
        </button>
      </div>
    </div>
  );
};

export default Dashboard;