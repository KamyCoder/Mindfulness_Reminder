document.addEventListener("DOMContentLoaded", () => {
  const settingsForm = document.getElementById("settingsForm");
  const youtubeLinkInput = document.getElementById("youtubeLink");

  
  youtubeLinkInput.value = "";

   youtubeLinkInput.setAttribute("autocomplete", "off");

  settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const youtubeLink = youtubeLinkInput.value;

       chrome.storage.local.set({ youtubeLink }, () => {
          console.log("YouTube link saved");
      });
  });
});
