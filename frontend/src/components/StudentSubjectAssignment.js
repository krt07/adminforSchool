import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../apis/apis';
import { toast } from 'react-toastify';

const StudentSubjectAssignment = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedSubjectOptions, setSelectedSubjectOptions] = useState([]);
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get('/api/students');
      setStudents(res.data);
    } catch (error) {
      toast.error('Failed to fetch students');
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await API.get('/api/subjects');
      setSubjects(res.data);
    } catch (error) {
      toast.error('Failed to fetch subjects');
    }
  };

  const handleStudentSelect = async (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    if (studentId) {
      try {
        const res = await API.get(`/api/students/${studentId}`);
        const student = res.data;
        const assigned = student.subjects?.map((subj) => ({
          label: subj.name,
          value: subj.id
        })) || [];
        setAssignedSubjects(assigned);
      } catch (err) {
        toast.error('Error fetching student subjects');
      }
    } else {
      setAssignedSubjects([]);
    }
  };

  const handleAssignSubjects = async () => {
    try {
      const subjectIds = selectedSubjectOptions.map((subj) => subj.value);
      await API.post(`/api/students/${selectedStudentId}/subjects`, {
        subjectIds
      });
      toast.success('Subjects assigned to student!');
      setSelectedSubjectOptions([]);
      handleStudentSelect({ target: { value: selectedStudentId } }); 
    } catch (err) {
      toast.error('Error assigning subjects');
    }
  };

  return (
    <div className="container mt-4">
      <h4>Assign Subjects to Student</h4>

      <div className="mb-3">
        <label>Select Student:</label>
        <select className="form-select" onChange={handleStudentSelect}>
          <option value="">-- Choose Student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Select Subjects:</label>
        <Select
          isMulti
          options={subjects.map((s) => ({ label: s.name, value: s.id }))}
          value={selectedSubjectOptions}
          onChange={setSelectedSubjectOptions}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleAssignSubjects}
        disabled={!selectedStudentId || selectedSubjectOptions.length === 0}
      >
        Assign Subjects
      </button>

      <hr />
      <h5>Currently Assigned Subjects</h5>
      {assignedSubjects.length === 0 ? (
        <p>No subjects assigned</p>
      ) : (
        <ul className="list-group">
          {assignedSubjects.map((subj, i) => (
            <li key={i} className="list-group-item">{subj.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentSubjectAssignment;
