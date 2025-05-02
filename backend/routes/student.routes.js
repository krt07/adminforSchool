const { create, findAll, delete: del,getstudent ,createSubject} = require("../controllers/student.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = (app) => {
  app.post("/api/students", verifyToken, create);
  app.get("/api/students", verifyToken, findAll);
  app.get("/api/students/:id",verifyToken,getstudent)
  app.post('/api/students/:id/subjects', verifyToken, createSubject)
  app.delete("/api/students/:id", verifyToken, del);
};
