const hotkeys = {
  playPause: 32,
  volumeUp: 38,
  volumeDown: 40,
  seekForward: 39,
  seekBackward: 37,
  mute: 77,
  secondMute: 109,
  fullscreen: 70,
  secondFullscreen: 102,
};

document.addEventListener("keypress", (e) => {
  let video = videojs.players["video"];
  if (hotkeys["playPause"] === e.which) {
    video.paused() ? video.play() : video.pause();
  } else if (hotkeys["mute"] === e.which || hotkeys["secondMute"] === e.which) {
    video.muted(!video.muted());
  } else if (
    hotkeys["fullscreen"] === e.which ||
    hotkeys["secondFullscreen"] === e.which
  ) {
    video.$(".vjs-fullscreen-control").click();
  }
});

document.addEventListener("keydown", (e) => {
  let video = videojs.players["video"];

  if (hotkeys["volumeUp"] === e.which) {
    video.volume(video.volume() + 0.05);
  } else if (hotkeys["volumeDown"] === e.which) {
    video.volume(video.volume() - 0.05);
  } else if (hotkeys["seekForward"] === e.which) {
    if (!video.paused()) video.currentTime(video.currentTime() + 10);
  } else if (hotkeys["seekBackward"] === e.which) {
    if (!video.paused()) video.currentTime(video.currentTime() - 10);
  }
});
