import { activate } from './helpers';


/**
 * State button
 * @type {HTMLButtonElement}
 */
const stateButton = document.getElementById("stateButton");


chrome.storage.sync.get("state", ({ state }) => {
    stateButton.innerHTML = state ? 'ON' : 'OFF';
    stateButton.style.backgroundColor = state ? 'green' : 'red';
});

// When the button is clicked, inject setPageBackgroundColor into current page
stateButton.addEventListener("click", async () => {
    
    chrome.storage.sync.get("state", async ({ state }) => {
    
        chrome.storage.sync.set({ state: ! state });
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: activate,
        });
    });
});
