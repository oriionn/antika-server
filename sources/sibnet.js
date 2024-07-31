async function getSrcURL(id) {
  let res = await fetch(`https://video.sibnet.ru/shell.php?videoid=${id}`);
  let text = await res.text();
  let regex = /\/v\/[a-zA-Z0-9]+\/[0-9]+\.mp4/g;
  let url = text.match(regex)[0];
  url = `https://video.sibnet.ru${url}`;

  if (!url)
    return {
      message: "Video not available.",
      success: false,
    };

  res = await fetch(url, {
    headers: {
      Referer: `https://video.sibnet.ru/shell.php?videoid=${id}`,
    },
    redirect: "follow",
  });

  return {
    message: res.url,
    success: true,
  };
}

module.exports = getSrcURL;
