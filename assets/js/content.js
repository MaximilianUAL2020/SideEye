const wrapper = document.createElement("div");
const enter = document.createElement("button");
const logo = document.createElement("img");
const gif = document.createElement("img");

wrapper.id = "sideye-wrapper";
enter.textContent = "Enter";
enter.id = "enter";
logo.id = "giphyLogo";
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
  logo.src = chrome.extension.getURL("icons/giphy.gif");
  wrapper.appendChild(gif);
  wrapper.appendChild(logo);
  wrapper.appendChild(enter);
  document.body.appendChild(wrapper);
  document.body.classList.add("block");
  document.documentElement.classList.add("block");
  removeGif();
}
function removeGif() {
  document.getElementById("enter").addEventListener("click", () => {
    document.documentElement.classList.remove("block");
    document.body.classList.remove("block");
    wrapper.remove();
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
