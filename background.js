const webURL = chrome.runtime.getURL("ui/index.html");
async function openInWindow(url) {
  let screen = await chrome.system.display.getInfo();
  const w = Math.floor(screen[0].workArea.width * 0.75);
  const h = Math.floor(screen[0].workArea.height * 0.75);
  const l = Math.floor(screen[0].workArea.width * 0.12);
  const t = Math.floor(screen[0].workArea.height * 0.12);

  chrome.windows
    .create({
      url: url,
      width: w,
      height: h,
      left: l,
      top: t,
      type: "popup",
      focused: false,
    })
    .then(function (window) {
      chrome.windows.update(window.id, {
        focused: true,
      });
    });
}

function lunch() {
  console.log("lunch");
  openInWindow(webURL);
}
// chrome.action.setPopup({
//   popup: webURL,
// });
console.log("onClick");
chrome.action.onClicked.addListener(lunch);
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
});
chrome.storage.local.set({ abc: 222 });
