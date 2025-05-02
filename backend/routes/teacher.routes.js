const { create, findAll, delete: del,getTeacher,createTeacher } = require("../controllers/teacher.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = (app) => {
  app.post("/api/teachers", verifyToken, create);
  app.get("/api/teachers", verifyToken, findAll);
  app.delete("/api/teachers/:id", verifyToken, del);
  app.get('/api/teachers/:id', verifyToken,getTeacher);
  app.post('/api/teachers/:id/subjects', verifyToken,createTeacher);

};
