import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Subjects from './components/Subjects';
import StudentSubjectAssignment from './components/StudentSubjectAssignment';
import TeacherSubjectAssignment from './components/TeacherSubjectAssignment';
import Navbar from './components/Navbar';
import PrivateRoute from './auth/routes';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
        <Route path="/teachers" element={<PrivateRoute><Teachers /></PrivateRoute>} />
        <Route path="/subjects" element={<PrivateRoute><Subjects /></PrivateRoute>} />
        <Route path="/assign-subjects" element={<PrivateRoute><StudentSubjectAssignment /></PrivateRoute>}/>
        <Route path="/assign-teacher-subjects" element={<PrivateRoute><TeacherSubjectAssignment /></PrivateRoute>}
/>
      </Routes>
    </Router>
  );
}

export default App;
