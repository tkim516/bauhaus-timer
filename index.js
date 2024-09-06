let timerInterval;
let isRunning = false;
let initialMinutes = 25;
let startTime;

function dropdownFunction() {
  document.getElementById("timerDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdownButton')) {
    var dropdowns = document.getElementsByClassName("dropdownContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}

function startTimer() {
  if (!isRunning) {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    startClockHands();
    isRunning = true;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  clearInterval(clockInterval);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  resetClockHands();
  document.getElementById("timer").innerHTML = `0m 0s`;
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;

  const minutes = Math.floor(elapsedTime / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

  if (minutes >= initialMinutes) {
    clearInterval(timerInterval);
    document.getElementById("timer").innerHTML = "Done!";
    isRunning = false;
  }
}

function setTimer() {
  const userMinutes = parseInt(document.getElementById("timerInput").value);
  if (!isNaN(userMinutes)) {
    initialMinutes = userMinutes;
    resetTimer();
  }
}

function updateClockHands(minutes, seconds) {
  const secondHand = document.querySelector('.secondHand');
  const minuteHand = document.querySelector('.minuteHand');

  const secondsDegrees = (seconds / 60) * 360;
  const minutesDegrees = (minutes / initialMinutes) * 360;

  secondHand.style.transform = `rotate(${secondsDegrees + 90}deg)`; // Adding 90deg to start from the top
  minuteHand.style.transform = `rotate(${minutesDegrees + 90}deg)`; // Adding 90deg to start from the top
}

function startClockHands() {
  clockInterval = setInterval(updateClockHandsFromTimer, 1000);
}

function updateClockHandsFromTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;

  const minutes = Math.floor(elapsedTime / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  updateClockHands(minutes, seconds);
}

function resetClockHands() {
  const secondHand = document.querySelector('.secondHand');
  const minuteHand = document.querySelector('.minuteHand');

  secondHand.style.transform = `rotate(90deg)`; // Reset to start position
  minuteHand.style.transform = `rotate(90deg)`; // Reset to start position
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("timerInput").addEventListener("input", setTimer);
