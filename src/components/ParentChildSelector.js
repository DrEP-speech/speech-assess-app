import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParentChildSelector = ({ onSelect }) => {
  const [children, setChildren] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const fetchChildren = async () => {
      const { data } = await axios.get('/api/users/my-children');
      setChildren(data);
    };
    fetchChildren();
  }, []);

  const handleChange = (e) => {
    const childId = e.target.value;
    setSelectedId(childId);
    onSelect(childId);
  };

  return (
    <div className="mb-4">
      <label className="font-semibold mr-2">Select Child:</label>
      <select value={selectedId} onChange={handleChange} className="border p-2 rounded">
        <option value="">-- Choose --</option>
        {children.map((child) => (
          <option key={child._id} value={child._id}>{child.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ParentChildSelector;
