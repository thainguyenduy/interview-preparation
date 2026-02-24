import React, { useState } from 'react';
import './Search.css';
import { mockData } from '../data/mockData';

const Search = ({ onSearch }) => {
  const [selectedId, setSelectedId] = useState('');

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);

    if (id === '') {
      onSearch([]);
      return;
    }

    // Find the selected record by id
    const result = mockData.find(item => item.id.toString() === id);

    if (result) {
      onSearch([result]);
    }
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <select
          value={selectedId}
          onChange={handleSelectChange}
          className="search-select"
        >
          <option value="">-- Select a person --</option>
          {mockData.map(item => (
            <option key={item.id} value={item.id}>
              {item.data[0].userI
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Search;
