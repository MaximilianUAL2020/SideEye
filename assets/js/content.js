import axios from "axios";

let gifs = [];
const keywords = ["sideye", "side-eye", "judging"];
const base = "https://api.giphy.com/v1/gifs/search";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("blocking!");
  if (request) fetchGifs();
});

let parent = document.createElement("div");
let child = document.createElement("img");
parent.id = "sideye-wrapper";
child.id = "sideye";

function fetchGifs() {
  axios
    .get(base, {
      params: {
        api_key: "w47MWINgm4Oj0NO3YClVZMn50IfRtgtI",
        q: randomItem(keywords),
        limit: "1",
        offset: 0,
        rating: "g",
        lang: "en",
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.data.data[0].url);
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
