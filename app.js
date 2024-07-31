const express = require("express");
require("dotenv").config();
const app = express();
let disabled_sources = [];
const sources = {
  sibnet: require("./sources/sibnet"),
  sendvid: require("./sources/sendvid"),
};

if (process.env.DISABLED_SOURCES) {
  disabled_sources = process.env.DISABLED_SOURCES.split(",");
}

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  let source = req.query.source;
  let id = req.query.id;
  if (disabled_sources.includes(source)) return res.send(`Disabled source`);
  if (!source || !id) return res.send(`Invalid request`);
  if (!sources[source]) return res.send(`Invalid source`);

  let video = await sources[source](id);
  if (!video.success) return res.send(video.message);

  res.render("video", {
    video: video.message,
    source,
  });
});

app.get("/disabledSources", (req, res) => {
  res.json(disabled_sources);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
