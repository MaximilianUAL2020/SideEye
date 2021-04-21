const wrapper = document.createElement("div");
const enter = document.createElement("button");
const gif = document.createElement("img");

wrapper.id = "sideye-wrapper";
enter.textContent = "Enter";
enter.id = "enter";
gif.id = "sideye";

let first = true;
let allow = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!first || allow) return;
  if (window.location.hostname == request.hostname) {
    mountGif(request.url);
    first = false;
  }
  sendResponse(null);
});

function mountGif(res) {
  setFont();
  gif.src = res;
  wrapper.appendChild(gif);
  wrapper.appendChild(enter);
  document.body.appendChild(wrapper);
  document.body.classList.add("block");
  document.documentElement.classList.add("block");
  removeGif();
}
function removeGif() {
  document.getElementById("enter").addEventListener("click", () => {
    let obj = document.getElementById("sideye-wrapper");
    document.documentElement.classList.remove("block");
    document.body.classList.remove("block");
    obj.remove();
    allow = true;
  });
}
function setFont() {
  var style = document.createElement("style");
  style.textContent = `@font-face{font-family: Space-Mono; src: url("${chrome.extension.getURL(
    "ttf/Space.ttf"
  )}");}`;
  document.head.appendChild(style);
}
