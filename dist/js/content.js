/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./assets/js/content.js ***!
  \******************************/
var wrapper = document.createElement("div");
var enter = document.createElement("button");
var gif = document.createElement("img");
wrapper.id = "sideye-wrapper";
enter.textContent = "Enter";
enter.id = "enter";
gif.id = "sideye";
var first = true;
var allow = false;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (!first || allow) return;

  if (window.location.hostname == request.hostname) {
    mountGif(request.url);
    first = false;
  }

  sendResponse(null);
});

function mountGif(res) {
  gif.src = res;
  wrapper.appendChild(gif);
  wrapper.appendChild(enter);
  document.body.appendChild(wrapper);
  document.body.classList.add("block");
  document.documentElement.classList.add("block");
  removeGif();
}

function removeGif() {
  document.getElementById("enter").addEventListener("click", function () {
    var obj = document.getElementById("sideye-wrapper");
    document.documentElement.classList.remove("block");
    document.body.classList.remove("block");
    obj.remove();
    allow = true;
  });
}
/******/ })()
;