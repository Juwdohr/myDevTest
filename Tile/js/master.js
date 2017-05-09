function videoPlay() {
  let video = document.getElementById("video");
  let button = document.getElementById("playBtn");
  let tile = document.querySelector(".tile");

  tile.setAttribute("style", "flex-direction: column");
  video.classList.add("playing");
  video.play();
  video.setAttribute("controls", true);
  button.style.visibility = "hidden";
}
