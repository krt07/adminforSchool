import React, { useEffect, useState } from 'react';
import API from '../apis/apis';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await API.get('/api/subjects');
      setSubjects(res.data);
    } catch (error) {
      console.error('Error fetching subjects', error);
    }
  };

  const handleAddSubject = async () => {
    try {
      await API.post('/api/subjects', { name });
      setName('');
      fetchSubjects();
    } catch (error) {
      console.error('Error adding subject', error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await API.delete(`/api/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Subjects</h2>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control"
          placeholder="Enter Subject Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddSubject}>Add</button>
      </div>

      <ul className="list-group">
        {subjects.map((subject) => (
          <li key={subject.id} className="list-group-item d-flex justify-content-between align-items-center">
            {subject.name}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSubject(subject.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subjects;
