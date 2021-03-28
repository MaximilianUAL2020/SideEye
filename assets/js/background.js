chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      toggleSitesActive: false,
      toggleSitesList: "instagram.com",
    },
    () => {
      console.log("Installed!");
    }
  );
});

var toggleSitesActive = false;
var toggleSitesList = "instagram.com";

chrome.storage.sync.get(["toggleSitesActive", "toggleSitesList"], (result) => {
  toggleSitesActive = result.toggleSitesActive;
  toggleSitesList = result.toggleSitesList;
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    var url = new URL(details.url);
    if (!toggleSitesActive) {
      return;
    }
    var cancel = toggleSitesList.split(/\n/).some((site) => {
      return Boolean(url.hostname.indexOf(site) !== -1);
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
      chrome.tabs.sendMessage(
        tabs[0].id,
        { hostname: host, state: toggleSitesActive, list: toggleSitesList },
        () => {}
      );
    }
  );
}
