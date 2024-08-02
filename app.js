const express = require("express");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  let video = req.query.video;
  let redirect = req.query.redirect;
  let originalLink = req.query.original_link;
  if (!video) return res.send(`Invalid request`);
  if (!originalLink) return res.send(`Invalid request`);

  let videoLink = decodeURIComponent(
    Buffer.from(decodeURIComponent(video), "base64").toString("utf8"),
  );

  originalLink = decodeURIComponent(
    Buffer.from(decodeURIComponent(originalLink), "base64").toString("utf8"),
  );

  if (redirect && redirect === "true") {
    let r = await fetch(videoLink, {
      headers: {
        Referer: originalLink,
      },
      redirect: "follow",
    });

    videoLink = r.url;
  }

  res.render("video", {
    video: videoLink,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
