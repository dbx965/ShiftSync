import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { daysOfWeek } from '../../data/mockData';
import API_BASE from '../../config/api';
import './StudentsList.css';

const StudentsList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE}/students`);
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          setError('Failed to fetch saved records.');
        }
      } catch (err) {
        setError('Unable to connect to the server. Make sure the backend is running on ' + API_BASE);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const formatAvailability = (availability) => {
    if (!availability || typeof availability !== 'object') return 'None';
    const activeDays = daysOfWeek.filter(day => availability[day]?.length > 0);
    if (activeDays.length === 0) return 'None';
    return activeDays.map(day => `${day} (${availability[day].length} hrs)`).join(', ');
  };

  // Handles both string (stored by backend) and array formats
  const formatShiftInterest = (shiftInterest) => {
    if (!shiftInterest) return 'None';
    if (Array.isArray(shiftInterest)) return shiftInterest.join(', ');
    return shiftInterest;
  };

  if (loading) {
    return (
      <div className="students-container">
        <div className="students-loading">
          <div className="loading-spinner"></div>
          <p>Loading saved records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="students-container">
        <div className="students-error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/availability')}>
            Back to Availability
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="students-container">
      <header className="students-header">
        <div className="header-content">
          <h1>Saved Student Records</h1>
          <p>All student submissions stored in Supabase.</p>
        </div>
        <div className="header-nav">
          <button
            className="nav-btn shifts-btn"
            onClick={() => navigate('/availability')}
          >
            📅 Update Availability
          </button>
          <button
            className="nav-btn dashboard-btn"
            onClick={() => navigate('/dashboard')}
          >
            📊 View Earnings
          </button>
        </div>
      </header>

      <div className="students-content">
        {students.length === 0 ? (
          <div className="students-empty">
            <h2>No Records Found</h2>
            <p>No student submissions have been saved yet. Go to the Availability page to submit your first record.</p>
            <button className="btn btn-primary" onClick={() => navigate('/availability')}>
              📅 Set Availability
            </button>
          </div>
        ) : (
          <div className="students-table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Availability</th>
                  <th>Shift Interest</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id || index}>
                    <td>{index + 1}</td>
                    <td className="student-name">{student.name}</td>
                    <td className="student-email">{student.email}</td>
                    <td className="student-availability">{formatAvailability(student.availability)}</td>
                    <td className="student-shifts">{formatShiftInterest(student.shift_interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;
