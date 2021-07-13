import { activate } from './helpers';


let state = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ state });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get("state", ({ state }) => {
            if (state) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: activate,
                });
            }
        });
    }
});
