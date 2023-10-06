document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["timerValue", "reminderText"], ({ timerValue, reminderText }) => {
    const frequencyInput = document.getElementById("frequencyInput");
    frequencyInput.value = timerValue || "";  

    const reminderTextElement = document.getElementById("reminderText");
    reminderTextElement.innerText = reminderText || ""; 

    if (!reminderText) {
      reminderTextElement.innerText = "Reminder cancelled";  
    }
  });

  const setTimerBtn = document.getElementById("setTimerBtn");
  setTimerBtn.addEventListener("click", () => {
    const frequencyInput = document.getElementById("frequencyInput");
    const time = parseInt(frequencyInput.value, 10);  

    chrome.storage.local.set({ timerValue: time });

    const reminderText = document.getElementById("reminderText");
    reminderText.innerText = `Reminder every ${time} minutes`;

    chrome.storage.local.set({ reminderText: reminderText.innerText });

    chrome.runtime.sendMessage({ time }, function (response) {
      console.log(response);
    });
  });

  const stopTimerBtn = document.getElementById("StopTimerBtn");
  stopTimerBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["timerValue", "reminderText"], () => {
      console.log("Timer value and reminder text cleared");
    });

    const frequencyInput = document.getElementById("frequencyInput");
    frequencyInput.value = "";

    const reminderText = document.getElementById("reminderText");
    reminderText.innerText = "Reminder Off";

    chrome.runtime.sendMessage({ cancelAlarm: true }, function (response) {
      console.log(response);
    });
  });
  
  chrome.storage.local.get("youtubeLink", ({ youtubeLink }) => {
     
    const defaultYouTubeLink = "https://www.youtube.com/watch?v=jttcWa7tS38&list=PL7by6RYPG3HDc04dtETBExwyl_az6iWoY";
    const youtubeLinkToOpen = youtubeLink || defaultYouTubeLink;

    const meditationTimerBtn = document.getElementById("MeditationTimer");
    meditationTimerBtn.addEventListener("click", () => {
      window.open(youtubeLinkToOpen, "_blank");
    });
  });

  const settingsBtn = document.getElementById("settingsLink");

  settingsBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: "settings.html" });
  });

});
