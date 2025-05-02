import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../apis/apis';
import { toast } from 'react-toastify';

const TeacherSubjectAssignment = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedSubjectOptions, setSelectedSubjectOptions] = useState([]);
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await API.get('/api/teachers');
      setTeachers(res.data);
    } catch (error) {
      toast.error('Failed to fetch teachers');
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

  const handleTeacherSelect = async (e) => {
    const teacherId = e.target.value;
    setSelectedTeacherId(teacherId);

    if (teacherId) {
      try {
        const res = await API.get(`/api/teachers/${teacherId}`);
        const teacher = res.data;
        const assigned = teacher.subjects?.map((subj) => ({
          label: subj.name,
          value: subj.id,
        })) || [];
        setAssignedSubjects(assigned);
      } catch (err) {
        toast.error('Error fetching teacher subjects');
      }
    } else {
      setAssignedSubjects([]);
    }
  };

  const handleAssignSubjects = async () => {
    try {
      const subjectIds = selectedSubjectOptions.map((subj) => subj.value);
      await API.post(`/api/teachers/${selectedTeacherId}/subjects`, {
        subjectIds,
      });
      toast.success('Subjects assigned to teacher!');
      setSelectedSubjectOptions([]);
      handleTeacherSelect({ target: { value: selectedTeacherId } }); 
    } catch (err) {
      toast.error('Error assigning subjects');
    }
  };

  return (
    <div className="container mt-4">
      <h4>Assign Subjects to Teacher</h4>

      <div className="mb-3">
        <label>Select Teacher:</label>
        <select className="form-select" onChange={handleTeacherSelect}>
          <option value="">-- Choose Teacher --</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
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
        disabled={!selectedTeacherId || selectedSubjectOptions.length === 0}
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
            <li key={i} className="list-group-item">
              {subj.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherSubjectAssignment;
