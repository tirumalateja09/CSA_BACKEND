const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const dbConnection = require("./DB/dbConnection");
const userRoutes = require('./routes/users')


dbConnection();

app.use(cors()); // middlware;
app.use(express.json()); // middlware;
app.use('/', userRoutes)


let PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
   
);


