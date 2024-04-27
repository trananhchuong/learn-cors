const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 8000;

// config https
const fs = require("fs");
const https = require("https");

const app = express();

const routes = require("./routes/routes");

app.use(cors({ origin: "http://localhost:3001", credentials: true }));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.json());

app.set("view engine", "ejs");
app.use("/", routes);

// app.listen(8000);

https
  .createServer(
    {
      key: fs.readFileSync("testcookie.com+2-key.pem"),
      cert: fs.readFileSync("testcookie.com+2.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
