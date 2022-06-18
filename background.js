chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log('BACKGROUND SCRIPT', tab);
  const regexLinkedIn = new RegExp('^(http(s)?://)?([w]+.)?linkedin.com/(pub|in|profile)');
  if (tab.url && regexLinkedIn.test(tab.url)) {
    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      profileUrl: tab.url,
    });
  }
});
