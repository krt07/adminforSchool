

const dbConfig = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, DataTypes);
db.student = require("./student.model")(sequelize, DataTypes);
db.teacher = require("./teacher.model")(sequelize, DataTypes);
db.subject = require("./subject.model")(sequelize, DataTypes);

db.student.belongsToMany(db.subject, { through: "StudentSubjects" });
db.subject.belongsToMany(db.student, { through: "StudentSubjects" });

db.teacher.belongsToMany(db.subject, { through: "TeacherSubjects" });
db.subject.belongsToMany(db.teacher, { through: "TeacherSubjects" });


module.exports = db;
