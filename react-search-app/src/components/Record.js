import React, { useState, useEffect } from 'react';
import './Record.css';

const Record = ({ records }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset to first record when records change
  useEffect(() => {
    setCurrentIndex(0);
  }, [records]);

  const handleNext = () => {
    if (currentIndex < records.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (records.length === 0) {
    return null;
  }

  const currentRecord = records[currentIndex];

  return (
    <div className="record-container">
      <div className="record-card">
        <h2>Record {currentIndex + 1} of {records.length}</h2>
        <div className="record-details">
          <div className="record-field">
            <strong>ID:</strong>
            <span>{currentRecord.id}</span>
          </div>
          <div className="record-field">
            <strong>Name:</strong>
            <span>{currentRecord.name}</span>
          </div>
          <div className="record-field">
            <strong>Email:</strong>
            <span>{currentRecord.email}</span>
          </div>
          <div className="record-field">
            <strong>Role:</strong>
            <span>{currentRecord.role}</span>
          </div>
        </div>
        <div className="record-navigation">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="nav-button"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === records.length - 1}
            className="nav-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Record;
