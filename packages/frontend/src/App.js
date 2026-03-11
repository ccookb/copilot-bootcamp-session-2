import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './App.css';
import PriorityPill from './components/PriorityPill';
import { DEFAULT_PRIORITY, PRIORITY_VALUES } from './constants/priority';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [newItemPriority, setNewItemPriority] = useState(DEFAULT_PRIORITY);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data: ' + err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItem, priority: newItemPriority }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const result = await response.json();
      setData([...data, result]);
      setNewItem('');
      setNewItemPriority(DEFAULT_PRIORITY);
    } catch (err) {
      setError('Error adding item: ' + err.message);
      console.error('Error adding item:', err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setData(data.filter(item => item.id !== itemId));
      setError(null);
    } catch (err) {
      setError('Error deleting item: ' + err.message);
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do App</h1>
        <p>Keep track of your tasks</p>
      </header>

      <main>
        <section className="add-item-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item name"
            />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="priority-select-label">Priority</InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={newItemPriority}
                label="Priority"
                onChange={(e) => setNewItemPriority(e.target.value)}
              >
                <MenuItem value={PRIORITY_VALUES.HIGH}>High</MenuItem>
                <MenuItem value={PRIORITY_VALUES.MEDIUM}>Medium</MenuItem>
                <MenuItem value={PRIORITY_VALUES.MINOR}>Minor</MenuItem>
              </Select>
            </FormControl>
            <button type="submit">Add Item</button>
          </form>
        </section>

        <section className="items-section">
          <h2>Items from Database</h2>
          {loading && <p>Loading data...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <ul>
              {data.length > 0 ? (
                data.map((item) => (
                  <li key={item.id}>
                    <span className="item-details">
                      <span>{item.name}</span>
                      <PriorityPill priority={item.priority} />
                    </span>
                    <button onClick={() => handleDelete(item.id)} className="delete-btn" type="button">
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <p>No items found. Add some!</p>
              )}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;