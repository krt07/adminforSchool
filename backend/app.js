
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth.routes');
const { verifyToken } = require('./middleware/authJwt');


app.use('/auth',authRoutes);

app.use(verifyToken);

const db = require("./models");
db.sequelize.sync();

console.log("DB connected");

require("./routes/student.routes")(app);
require("./routes/teacher.routes")(app);
require("./routes/subject.routes")(app);

const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
