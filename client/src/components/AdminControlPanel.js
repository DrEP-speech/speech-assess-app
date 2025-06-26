import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminControlPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">🛠️ Admin Control Panel</h2>
      <table className="w-full text-sm table-auto">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminControlPanel;
