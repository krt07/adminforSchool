module.exports = (sequelize, DataTypes) => {
  return sequelize.define('teacher', {
    name: DataTypes.STRING
  });
};
