const db = require("../models");
const Student = db.student;

exports.create = async (req, res) => {
  const student = await Student.create({ name: req.body.name });
  res.send(student);
};

exports.findAll = async (req, res) => {
  const students = await Student.findAll({ include: db.subject });
  res.send(students);
};

exports.delete = async (req, res) => {
  await Student.destroy({ where: { id: req.params.id } });
  res.send({ message: "Deleted successfully!" });
};

exports.getstudent = async (req, res) => {
  try {
    const student = await db.student.findByPk(req.params.id, {
      include: db.subject
    });

    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    res.send(student);
  } catch (error) {
    console.error('Error fetching student with subjects:', error);
    res.status(500).send({ message: 'Server error' });
  }
}

exports.createSubject = async (req, res) => {
  try {
    const student = await db.student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    const subjectIds = req.body.subjectIds;

    if (!Array.isArray(subjectIds)) {
      return res.status(400).send({ message: 'subjectIds must be an array' });
    }

    await student.setSubjects(subjectIds);
    res.send({ message: 'Subjects assigned successfully' });
  } catch (error) {
    console.error('Error assigning subjects to student:', error);
    res.status(500).send({ message: 'Server error' });
  }
}
