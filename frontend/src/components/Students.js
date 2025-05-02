import React, { useEffect, useState } from 'react';
import API from '../apis/apis';

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get('/api/students');
    setStudents(res.data);
  };

  const handleAddStudent = async () => {
    await API.post('/api/students', { name });
    setName('');
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    await API.delete(`/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="container mt-5">
      <h2>Students</h2>
      <div className="input-group mb-3">
        <input type="text" className="form-control"
          value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" />
        <button className="btn btn-success" onClick={handleAddStudent}>Add</button>
      </div>
      <ul className="list-group">
        {students.map(student => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={student.id}>
            {student.name}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
