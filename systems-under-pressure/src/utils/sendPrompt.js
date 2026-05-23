export function sendPrompt(text) {
  if (window.parent !== window) {
    window.parent.postMessage({ type: "sendPrompt", text }, "*");
    return;
  }

  console.log("[sendPrompt]", text);
}
