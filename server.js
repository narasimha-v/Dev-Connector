const express = require("express");
const app = express();
const ConnectDB = require("./config/db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//Connect to database
ConnectDB();

//Init middleware
app.use(express.json({ extended: false })); //getting data from req.body

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, err => {
  if (!err) {
    console.log(`Server started at port ${PORT}`);
  }
});

if (process.env.NODE_ENV === "production") {
  //Set Static
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
