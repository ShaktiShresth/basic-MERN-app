const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,POST",
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());

// link router files for easy route
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
