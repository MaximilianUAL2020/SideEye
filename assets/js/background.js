import axios from "axios";

const base = "https://api.giphy.com/v1/gifs/search";
const keywords = ["sideye", "side-eye", "judging"];
const icons = {
  active: "../images/48-on.png",
  inactive: "../images/48-off.png",
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      toggleSitesActive: false,
      toggleSitesList: "",
    },
    () => {
      console.log("Installed!");
    }
  );
});

var toggleSitesActive = false;
var toggleSitesList = "";
var gifs = [];

fetchGifs();

chrome.storage.sync.get(["toggleSitesActive", "toggleSitesList"], (result) => {
  toggleSitesActive = result.toggleSitesActive;
  toggleSitesList = result.toggleSitesList;
  setIcon(toggleSitesActive);
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg == "gif") {
    sendResponse({ url: randomItem(gifs) });
  }
});
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    var url = new URL(details.url);
    if (!toggleSitesActive || !toggleSitesList) {
      return;
    }
    var cancel = toggleSitesList.split(/\n/).some((site) => {
      return url.hostname.indexOf(site) !== -1;
    });
    if (cancel) pingContent(url.hostname);
  },
  {
    urls: ["<all_urls>"],
  }
);
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync") {
    if (changes.toggleSitesActive) {
      toggleSitesActive = changes.toggleSitesActive.newValue;
    }
    if (changes.toggleSitesList) {
      toggleSitesList = changes.toggleSitesList.newValue;
    }
  }
});
function pingContent(host) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      if (tabs[0] != "undefined")
        chrome.tabs.sendMessage(tabs[0].id, {
          hostname: host,
        });
    }
  );
}
function setIcon(bool) {
  chrome.browserAction.setIcon({
    path: icons[bool ? "active" : "inactive"],
  });
}
function fetchGifs() {
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
        gifs.push(item.images.fixed_height_downsampled.url);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
function randomItem(array) {
  let randomIndex = Math.floor(Math.random() * Math.floor(array.length));
  let item = array[randomIndex];
  return item;
}
