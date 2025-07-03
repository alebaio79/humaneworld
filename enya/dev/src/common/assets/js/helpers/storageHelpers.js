/*
* storageHelpers.js
* HSUS Engaging Networks Forms - Enya 2023
* Created: Fall 2023
* Purpose: A collection of functions that help us interact with browser storage.
*/

// Source: https://www.30secondsofcode.org/js/s/is-session-storage-enabled/
// Usage: if (!storageHelpers.isSessionStorageEnabled()) return;
export function isSessionStorageEnabled() {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log("Session storage is not available.");
    return false;
  }
}

// Usage: if (!storageHelpers.isLocalStorageEnabled()) return;
export function isLocalStorageEnabled() {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log("Local storage is not available.");
    return false;
  }
}
