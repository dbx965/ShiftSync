import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { mockShifts } from '../../data/mockData';
import './ShiftDetails.css';

const ShiftDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expressInterest, selectedShifts } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  
  const shift = mockShifts.find(s => s.id === parseInt(id));
  
  if (!shift) {
    return (
      <div className="shift-details-container">
        <div className="not-found">
          <h2>Shift Not Found</h2>
          <p>The shift you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shifts')}>
            <span className="btn-icon">←</span>
            Back to Shifts
          </button>
        </div>
      </div>
    );
  }

  const isAlreadyInterested = selectedShifts.some(s => s.id === shift.id);

  const handleExpressInterest = () => {
    if (!isAlreadyInterested) {
      setShowModal(true);
    }
  };

  const confirmApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      const success = expressInterest(shift);
      if (success) {
        setShowModal(false);
        setIsApplying(false);
        navigate('/confirmation', { 
          state: { 
            type: 'success',
            shift: shift
          }
        });
      }
    }, 500);
  };

  const cancelApply = () => {
    setShowModal(false);
  };

  return (
    <div className="shift-details-container">
      {/* Confirmation Modal */}
      {showModal && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-modal-icon success">
              💼
            </div>
            <h3>Apply for this Shift?</h3>
            <p>
              You're about to express interest in <strong>{shift.title}</strong> at {shift.company}.
              The employer will review your profile and get back to you.
            </p>
            <div className="confirmation-modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={cancelApply}
                disabled={isApplying}
              >
                Cancel
              </button>
              <button 
                className="btn btn-success" 
                onClick={confirmApply}
                disabled={isApplying}
              >
                {isApplying ? 'Applying...' : 'Confirm Application'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate('/shifts')}>
          <span className="back-btn-icon">←</span>
          Back to Shifts
        </button>
        {isAlreadyInterested && (
          <span className="interested-badge">✓ You're Interested</span>
        )}
      </header>

      <div className="details-content">
        <div className="main-details">
          <div className="shift-title-section">
            <h1>{shift.title}</h1>
            <div className="company-info">
              <span className="company-icon">🏢</span>
              <span className="company-name">{shift.company}</span>
            </div>
          </div>

          <div className="details-card">
            <h2>Shift Information</h2>
            
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <div className="detail-content">
                  <span className="detail-label">Day</span>
                  <span className="detail-value">{shift.day}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <span className="detail-icon">⏰</span>
                <div className="detail-content">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">{shift.startTime} - {shift.endTime}</span>
                </div>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div className="detail-content">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{shift.location}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <span className="detail-icon">⏱️</span>
                <div className="detail-content">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{shift.hours} hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="description-card">
            <h2>About This Shift</h2>
            <p>{shift.description}</p>
          </div>

          <div className="requirements-card">
            <h2>Requirements</h2>
            <ul className="requirements-list">
              {shift.requirements.map((req, index) => (
                <li key={index}>
                  <span className="req-icon">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sidebar">
          <div className="pay-card">
            <div className="pay-header">
              <h3>Compensation</h3>
            </div>
            <div className="pay-details">
              <div className="pay-rate">
                <span className="pay-amount">${shift.pay.toFixed(2)}</span>
                <span className="pay-period">/hour</span>
              </div>
              <div className="total-earnings">
                <span className="earnings-label">Total Earnings</span>
                <span className="earnings-amount">${(shift.pay * shift.hours).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="action-card">
            {isAlreadyInterested ? (
              <div className="already-interested">
                <div className="interested-icon">✓</div>
                <h4>Already Expressed Interest</h4>
                <p>You'll be notified if you're selected for this shift.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  <span className="btn-icon">📊</span>
                  View Your Earnings
                </button>
              </div>
            ) : (
              <div className="express-interest">
                <h4>Interested in this shift?</h4>
                <p>Express your interest and the employer will review your profile.</p>
                <button 
                  className="btn btn-success"
                  onClick={handleExpressInterest}
                >
                  <span className="btn-icon">💼</span>
                  Express Interest
                </button>
              </div>
            )}
          </div>

          <div className="tips-card">
            <h4>Tips for Getting Hired</h4>
            <ul>
              <li>Make sure your availability matches this shift</li>
              <li>Update your profile with relevant skills</li>
              <li>Respond quickly to employer messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftDetails;