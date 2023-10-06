chrome.alarms.onAlarm.addListener(
    () => {
        chrome.notifications.create(
            // "mindfulness_alarm",
            {
                type: "basic",
                iconUrl: "alarm.jpg",
                title: "Arrive To The Present",
                message: "Take a mindful breath and come back to the present moment",
                silent: false
            },
            () => { }
        )
    },
);
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.time)
            createAlarm(request.time);

        sendResponse(false);
    }
);

function createAlarm(timeInMinutes) {
    chrome.alarms.create(
        "mindfulness_alarm",
        {
            delayInMinutes: timeInMinutes,
            periodInMinutes: timeInMinutes
        }
    );
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cancelAlarm) {
      chrome.alarms.clear("mindfulness_alarm", function() {
        sendResponse("Alarm cancelled");
      });
    }
  });
