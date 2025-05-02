module.exports = (sequelize, DataTypes) => {
  return sequelize.define('student', {
    name: DataTypes.STRING
  });
};
