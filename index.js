//THEME SELECTOR

const themeSelector = document.getElementById("theme-selector");
const themes = ["Ximuelo", "Laia"];

//Default theme
const defaultTheme = themes[0];
document.documentElement.setAttribute('data-theme', defaultTheme);

//Apply default innerText
themeSelector.innerText = defaultTheme;

themeSelector.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const currentThemeIndex = themes.findIndex((value) => value === currentTheme);

  console.log("currentTheme", currentTheme);
  console.log("currentThemeIndex", currentThemeIndex);
  console.log("themes.length", themes.length);

  if(currentThemeIndex === 0 && (currentThemeIndex + 1) <= themes.length) {
    document.documentElement.setAttribute('data-theme', themes[currentThemeIndex + 1]);
    themeSelector.innerText = themes[currentThemeIndex + 1];
  } else if(currentThemeIndex === (themes.length - 1) && themes.length > 1) {
    document.documentElement.setAttribute('data-theme', themes[0]);
    themeSelector.innerText = themes[0];
  }
})

//MINUTES
const minutesInput = document.getElementById("minutes");
let previousMinutesValue = document.getElementById("minutes").value;

minutesInput.addEventListener("input", () => {
    const minutes = parseInt(minutesInput.value);

    if (isNaN(minutes) || minutes < 0 || minutes > 60) {
        minutesInput.value = previousMinutesValue;
    } else {
        previousMinutesValue = minutesInput.value;
    }
});

//SECONDS  
const secondsInput = document.getElementById("seconds");
let secondsValue = document.getElementById("seconds").value;

secondsInput.addEventListener("input", () => {
    const seconds = parseInt(secondsInput.value);

    if (isNaN(seconds) || seconds < 0 || seconds > 60) {
        secondsInput.value = secondsValue;
    } else {
        secondsValue = secondsInput.value;
    }
});

//BUTTONS
let intervalId = null;
const startStopButton = document.getElementById("start-stop");

function startTime() {
  intervalId = setInterval(() => {
    let newSeconds = parseInt(secondsInput.value) - 1; 
    let newMinutes = parseInt(minutesInput.value) - 1; 
    
    if(newSeconds<10){
      newSeconds = "0" + newSeconds;
    }

    //Horrible way of doing this :D
    if(newSeconds == "0-1"){
      minutesInput.value = newMinutes;
      newSeconds = "59";
    }

    secondsInput.value = newSeconds;

  }, 1000)
}

function stopTime() {
  clearInterval(intervalId);
  intervalId = null;
}

//START/STOP BUTTON EVENT LISTENER
startStopButton.addEventListener("click", () => {

  if(secondsValue.length == 0) {
    secondsInput.value = "00";
  }

  if(secondsValue.length < 2) {
    secondsInput.value = "0" + secondsValue;
  }

  if(startStopButton.innerText == "Start"){
    startTime()
    startStopButton.innerText = "Stop"
    startStopButton.style.backgroundColor = "red"
  } else {
    stopTime()
    startStopButton.innerText = "Start"
    startStopButton.style.backgroundColor = "green"
  }

 })


