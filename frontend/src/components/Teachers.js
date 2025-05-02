import React, { useEffect, useState } from 'react';
import API from '../apis/apis';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await API.get('/api/teachers');
      setTeachers(res.data);
    } catch (error) {
      console.error('Error fetching teachers', error);
    }
  };

  const handleAddTeacher = async () => {
    try {
      await API.post('/api/teachers', { name });
      setName('');
      fetchTeachers();
    } catch (error) {
      console.error('Error adding teacher', error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await API.delete(`/api/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Teachers</h2>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control"
          placeholder="Enter Teacher Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddTeacher}>Add</button>
      </div>

      <ul className="list-group">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="list-group-item d-flex justify-content-between align-items-center">
            {teacher.name}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTeacher(teacher.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teachers;
