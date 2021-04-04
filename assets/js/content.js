import axios from "axios";

const parent = document.createElement("div");
const child = document.createElement("img");
parent.id = "sideye-wrapper";
child.id = "sideye";
let first = true;

const base = "https://api.giphy.com/v1/gifs/search";
const keywords = ["sideye", "side-eye", "judging"];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!first) return;
  if (
    window.location.hostname == request.hostname &&
    request.state &&
    request.list
  ) {
    mountGif();
    first = false;
  }
  sendResponse("null");
});

function mountGif() {
  axios
    .get(base, {
      params: {
        api_key: "w47MWINgm4Oj0NO3YClVZMn50IfRtgtI",
        q: randomItem(keywords),
        limit: "50",
        offset: 0,
        rating: "g",
        lang: "en",
      },
    })
    .then((res) => {
      let gifs = [];
      for (const item of res.data.data) {
        gifs.push(item.images.fixed_height_downsampled.url);
      }
      child.src = randomItem(gifs);
      parent.appendChild(child);
      document.body.appendChild(parent);
      document.body.classList.add("block");
      document.documentElement.classList.add("block");
    })
    .catch((err) => {
      console.log(err);
    });
}
function randomItem(array) {
  let randomIndex = Math.floor(Math.random() * Math.floor(array.length));
  let item = array[randomIndex];
  return item;
}
