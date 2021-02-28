import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = useCallback(async () => {
    const apiValues = await axios.get('/api/values/current');
    setValues(apiValues.data);
  }, []);

  const fetchIndexes = useCallback(async () => {
    const apiSeenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(apiSeenIndexes.data);
  }, []);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes])

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: index,
    });

    setIndex('');
    
    fetchValues();
    fetchIndexes();
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
