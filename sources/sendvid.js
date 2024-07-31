async function getSrcURL(id) {
  let res = await fetch(`https://sendvid.com/embed/${id}`);
  let text = await res.text();
  let regex = /var video_source = "(http[s]?:\/\/[^"]+)"/;
  let url = text.match(regex)[1];

  if (!url)
    return {
      message: "Video not available.",
      success: false,
    };

  return {
    message: url,
    success: true,
  };
}

module.exports = getSrcURL;
