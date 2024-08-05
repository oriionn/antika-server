const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.use("/proxy", (req, res, next) => {
  let target = req.query.target;
  let originalLink = req.query.original_link;
  const onlyDomain = req.query.only_domain;
  if (!target) return res.send(`Invalid request`);
  if (!originalLink) return res.send(`Invalid request`);
  let cookies = req.query.cookies;

  target = decodeURIComponent(
    Buffer.from(decodeURIComponent(target), "base64").toString("utf8"),
  );

  originalLink = decodeURIComponent(
    Buffer.from(decodeURIComponent(originalLink), "base64").toString("utf8"),
  );

  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader(
          "Referer",
          onlyDomain === "true"
            ? `${new URL(originalLink).origin}/`
            : originalLink,
        );

        if (cookies) {
          cookies = decodeURIComponent(
            Buffer.from(decodeURIComponent(cookies), "base64").toString(
              "utf-8",
            ),
          );
          proxyReq.setHeader("Cookie", cookies);
        }
      },
    },
  })(req, res, next);
});

app.get("/", async (req, res) => {
  let video = req.query.video;
  let redirect = req.query.redirect;
  let originalLink = req.query.original_link;
  let type = req.query.type;
  if (!video) return res.send(`Invalid request`);
  if (!originalLink) return res.send(`Invalid request`);
  if (!type) return res.send(`Invalid request`);

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
    type,
    originalLink,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + (process.env.PORT || 3000));
});
