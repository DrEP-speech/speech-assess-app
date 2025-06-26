import React, { useState } from 'react';
import axios from 'axios';

const ICDCPTTagger = ({ sessionId, initialICD = [], initialCPT = [], onSave }) => {
  const [icdCodes, setIcdCodes] = useState(initialICD);
  const [cptCodes, setCptCodes] = useState(initialCPT);
  const [newICD, setNewICD] = useState('');
  const [newCPT, setNewCPT] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddCode = (type) => {
    if (type === 'icd' && newICD) {
      setIcdCodes([...icdCodes, newICD.toUpperCase()]);
      setNewICD('');
    }
    if (type === 'cpt' && newCPT) {
      setCptCodes([...cptCodes, newCPT.toUpperCase()]);
      setNewCPT('');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`/api/schedule/codes/${sessionId}`, {
        icdCodes,
        cptCodes,
      });
      onSave({ icdCodes: res.data.icdCodes, cptCodes: res.data.cptCodes });
    } catch (err) {
      console.error('Code save error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded border">
      <h3 className="font-semibold text-gray-700 mb-2">ICD / CPT Code Tagging</h3>

      {/* ICD Input */}
      <div className="mb-2">
        <label className="block text-sm font-medium">Add ICD Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newICD}
            onChange={(e) => setNewICD(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="e.g., F80.0"
          />
          <button
            onClick={() => handleAddCode('icd')}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="mt-1 text-xs text-gray-600">Current: {icdCodes.join(', ') || 'None'}</div>
      </div>

      {/* CPT Input */}
      <div className="mb-2">
        <label className="block text-sm font-medium">Add CPT Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCPT}
