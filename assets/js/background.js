// set values on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      toggleSitesActive: true,
      toggleSitesList: "youtube.com",
    },
    () => {
      console.log("Installed!");
    }
  );
});

// set initial values
var toggleSitesActive = false;
var toggleSitesList = "youtube.com";

chrome.storage.sync.get(["toggleSitesActive", "toggleSitesList"], (result) => {
  toggleSitesActive = result.toggleSitesActive;
  toggleSitesList = result.toggleSitesList;
});
// check url on new request
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // if (!toggleSitesActive) {
    //   return { cancel: false };
    // }
    if (toggleSitesActive) {
      var cancel = toggleSitesList.split(/\n/).some((site) => {
        var url = new URL(details.url);
        return Boolean(url.hostname.indexOf(site) !== -1);
      });
      if (cancel) send();
    }
    // return { cancel: cancel };
  },
  {
    urls: ["<all_urls>"],
  }
  // ["blocking"]
);
// update local variables
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === "sync") {
    if (changes.toggleSitesActive) {
      toggleSitesActive = changes.toggleSitesActive.newValue;
    }
    if (changes.toggleSitesList) {
      toggleSitesList = changes.toggleSitesList.newValue;
    }
  }
  // debubg mode
  console.log(changes);
  for (var key in changes) {
    var storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );
  }
});
// ping content.js
function send() {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { msg: "block!" }, () => {});
    }
  );
}
