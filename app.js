const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("video", {
    video: "/public/test.mp4",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
