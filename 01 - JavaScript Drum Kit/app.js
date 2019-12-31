var keys = document.querySelectorAll('.key');
var audioElements = document.querySelectorAll('audio');

/**
 * Plays the audio related to the key number passed to it
 * @param {Number|String} key Pressed Key's Code
 */
function playSound(key) {
  audioElements.forEach(function(audio) {
    // playing sound if related key is pressed
    if (audio.dataset.key == key) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  });
};

// Looping through keys to add event listeners
keys.forEach(function(key) {
  // Adding transitionend event listener to remove playing class
  key.addEventListener('transitionend', function(e) {
    e.target.classList.remove('playing');
  });
  // Adds click event to key to play related sound
  key.addEventListener('click', function(e) {
    addPlayingClassToKey(key.dataset.key);
    playSound(key.dataset.key);
  });
});

/**
 * Adds playing class to related key
 * @param {Number|String} key Pressed Key's Code
 */
function addPlayingClassToKey(key) {
  // finding key in document and adding 'playing' class
  var keyDiv = document.querySelector(`.key[data-key="${key}"]`);
  keyDiv.classList.add('playing');
};

// Adding 'keypress' event listener to document and playing related sound
document.addEventListener('keypress', function(e) {
  const key = e.key.toUpperCase().charCodeAt(0);
  addPlayingClassToKey(key);
  playSound(key);
});
