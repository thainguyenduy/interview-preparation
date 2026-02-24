import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Record from './components/Record';

function App() {
  const [records, setRecords] = useState([]);

  const handleSearch = (results) => {
    setRecords(results);
  };

  return (
    <div className="App">
      <h1>Search & Record App</h1>
      <Search onSearch={handleSearch} />
      {records.length > 0 && <Record records={records} />}
    </div>
  );
}

export default App;
