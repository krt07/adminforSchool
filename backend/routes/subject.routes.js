const { create, findAll, delete: del ,subjectDetails} = require("../controllers/subject.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = (app) => {
  app.post("/api/subjects", verifyToken, create);
  app.get("/api/subjects", verifyToken, findAll);
  app.delete("/api/subjects/:id", verifyToken, del);
  app.get('/api/subjects/:id/details', verifyToken,subjectDetails);

};
