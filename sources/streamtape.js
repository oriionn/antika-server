async function getSrcURL(id) {
  let res = await fetch(`https://streamtape.com/v/${id}`);
  let text = await res.text();
  console.log(text);

  let regex =
    /document\.getElementById\('captchalink'\)\.innerHTML\s*=\s*(.+);/;
  let url = text.match(regex);
  if (!url)
    return {
      message: "Video not available.",
      success: false,
    };

  url = eval(url[1]);
  let r = await fetch(url, {
    redirect: "follow",
  });
  url = r.url;

  return {
    message: url,
    success: true,
  };
}

module.exports = getSrcURL;
