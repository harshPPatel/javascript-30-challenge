// Getting elements from html
var hourHand = document.getElementsByClassName('hour-hand')[0];
var minuteHand = document.getElementsByClassName('min-hand')[0];
var secondHand = document.getElementsByClassName('second-hand')[0];

/**
 * Updates the clock elements
 */
function updateClock() {
  // getting time and other unit values
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Calculating the angle for each hand
  var secondsAngle = (seconds * 6) + 90;
  var minutesAngle = (minutes * 6) + (seconds / 10) + 90;
  var hoursAngle = (hours * 30) + (minutes / 2) + 90;

  // Updating styles of each hand
  hourHand.style.transform = `rotate(${hoursAngle}deg)`;
  minuteHand.style.transform = `rotate(${minutesAngle}deg)`;
  secondHand.style.transform = `rotate(${secondsAngle}deg)`;
}

// Calling 'updateClock' method every second
setInterval(updateClock, 1000);
