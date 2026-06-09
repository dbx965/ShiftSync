import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmation } = useAppContext();
  
  const type = location.state?.type || confirmation.type || 'success';
  const shift = location.state?.shift || null;
  const customMessage = location.state?.message || null;
  
  const isSuccess = type === 'success';

  const getTitle = () => {
    if (customMessage) return 'Success!';
    return isSuccess ? 'Interest Expressed!' : 'Something Went Wrong';
  };

  const getMessage = () => {
    if (customMessage) return customMessage;
    return isSuccess 
      ? 'Your interest has been recorded. The employer will review your profile and get back to you soon.'
      : confirmation.message || 'There was an issue processing your request. Please try again.';
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className={`confirmation-icon ${type}`}>
          {isSuccess ? '✓' : '!'}
        </div>
        
        <h1 className="confirmation-title">
          {getTitle()}
        </h1>
        
        <p className="confirmation-message">
          {getMessage()}
        </p>

        {shift && isSuccess && (
          <div className="shift-summary">
            <h3>Shift Details</h3>
            <div className="summary-content">
              <div className="summary-row">
                <span className="summary-label">Position:</span>
                <span className="summary-value">{shift.title}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Company:</span>
                <span className="summary-value">{shift.company}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Schedule:</span>
                <span className="summary-value">{shift.day}, {shift.startTime} - {shift.endTime}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Earnings:</span>
                <span className="summary-value highlight">${(shift.pay * shift.hours).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="confirmation-actions">
          {isSuccess ? (
            <>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/dashboard')}
              >
                <span className="btn-icon">📊</span>
                View Your Earnings
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/shifts')}
              >
                <span className="btn-icon">💼</span>
                Find More Shifts
              </button>
              <button 
                className="btn btn-ghost"
                onClick={() => navigate('/availability')}
              >
                <span className="btn-icon">📅</span>
                Update Availability
              </button>
              <button 
                className="btn btn-ghost"
                onClick={() => navigate('/students')}
              >
                <span className="btn-icon">📋</span>
                View Saved Records
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-primary"
                onClick={() => navigate(-1)}
              >
                <span className="btn-icon">↻</span>
                Try Again
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/shifts')}
              >
                <span className="btn-icon">←</span>
                Back to Shifts
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;