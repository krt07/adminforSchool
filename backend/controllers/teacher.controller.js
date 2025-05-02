const db = require("../models");
const Teacher = db.teacher;

exports.create = async (req, res) => {
  try {
    const teacher = await Teacher.create({ name: req.body.name });
    res.send(teacher);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({ include: db.subject });
    res.send(teachers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Teacher.destroy({ where: { id: req.params.id } });
    res.send({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.getTeacher = async (req, res) => {
  const teacher = await db.teacher.findByPk(req.params.id, {
    include: db.subject,
  });
  res.send(teacher);
}

exports.createTeacher = async (req, res) => {
  const teacher = await db.teacher.findByPk(req.params.id);
  await teacher.setSubjects(req.body.subjectIds);
  res.send({ message: 'Subjects updated' });
}
