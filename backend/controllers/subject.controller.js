const db = require("../models");
const Subject = db.subject;

exports.create = async (req, res) => {
  try {
    const subject = await Subject.create({ name: req.body.name });
    res.send(subject);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      include: [
        { model: db.student },
        { model: db.teacher }
      ]
    });
    res.send(subjects);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Subject.destroy({ where: { id: req.params.id } });
    res.send({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


  
  exports.subjectDetails = async (req, res) => {
  try {
    const subject = await db.subject.findByPk(req.params.id, {
      include: [
        { model: db.student, attributes: ['id', 'name'] },
        { model: db.teacher, attributes: ['id', 'name'] }
      ]
    });

    if (!subject) {
      return res.status(404).send({ message: 'Subject not found' });
    }

    res.send({
      subjectId: subject.id,
      subjectName: subject.name,
      students: subject.students,
      teachers: subject.teachers
    });
  } catch (error) {
    console.error('Error in /api/subjects/:id/details:', error);
    res.status(500).send({ message: 'Server error' });
  }
}
