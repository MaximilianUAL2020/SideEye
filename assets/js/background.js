// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      toggleSitesActive: true,
      toggleSitesList: "example.com",
    },
    () => {
      console.log("Installed!");
    }
  );
});

// set up initial chrome storage values
var toggleSitesActive = false;
var toggleSitesList = "example.com";

chrome.storage.sync.get(["toggleSitesActive", "toggleSitesList"], (result) => {
  toggleSitesActive = result.toggleSitesActive;
  toggleSitesList = result.toggleSitesList;
  console.log(toggleSitesActive, toggleSitesList);
});

// on each site request, block if it's in toggleSitesList
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log(details);
    // if the toggle is inactive, don't block anything
    if (!toggleSitesActive) {
      return { cancel: false };
    }
    // determine if the url is in toggleSitesList
    var cancel = toggleSitesList.split(/\n/).some((site) => {
      var url = new URL(details.url);
      return Boolean(url.hostname.indexOf(site) !== -1);
    });
    return { cancel: cancel };
  },
  {
    urls: ["<all_urls>"],
  },
  ["blocking"]
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
  // debubg
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
