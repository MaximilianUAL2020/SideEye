import axios from "axios";

const parent = document.createElement("div");
const child = document.createElement("img");
parent.id = "sideye-wrapper";
child.id = "sideye";

const base = "https://api.giphy.com/v1/gifs/search";
const keywords = ["sideye", "side-eye", "judging"];
let gifs = [];

fetchGif();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  mountGif();
});

function fetchGif() {
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
      for (const item of res.data.data) {
        gifs.push(item.images.original.url);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function mountGif() {
  child.src = randomItem(gifs);
  parent.appendChild(child);
  document.body.appendChild(parent);
  document.body.classList.add("block");
}
function randomItem(array) {
  let randomIndex = Math.floor(Math.random() * Math.floor(array.length));
  let item = array[randomIndex];
  return item;
}
