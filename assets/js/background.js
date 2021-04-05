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

chrome.storage.sync.get(["toggleSitesActive", "toggleSitesList"], (result) => {
  toggleSitesActive = result.toggleSitesActive;
  toggleSitesList = result.toggleSitesList;
  setIcon(toggleSitesActive);
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
