const videoElement = document.querySelector('video');
const playButton = document.querySelector('.player__button');
const timeSlider = document.querySelector('.progress__filled');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSlider = document.querySelector('input[name="playbackRate"]');
const forwardBackButtons = document.querySelectorAll('button[data-skip]');
const timeSliderContainer = document.querySelector('.progress');

let isVideoPlaying = false;

/**
 * Updates the timeline video acording to the video time
 */
videoElement.addEventListener('timeupdate', () => {
  const currentTime = (videoElement.currentTime * 100) / videoElement.duration;
  timeSlider.style.flexBasis = `${currentTime}%`;
  timeSlider.style.width = `${currentTime}%`;
});

/**
 * Adds click event to time line slider
 */
timeSliderContainer.addEventListener('click', (e) => {
  if (isVideoPlaying) {
    const elementWidth = e.target.offsetParent.offsetWidth;
    const scrubbedValue = Number(e.offsetX) * 100 / elementWidth;
    console.log(scrubbedValue);
    const currentTime = (scrubbedValue * videoElement.duration) / 100
    videoElement.currentTime = currentTime;
    timeSlider.style.flexBasis = `${currentTime}%`;
    timeSlider.style.width = `${currentTime}%`;
  }
});

/**
 * Adds input event listner for volume slider
 */
volumeSlider.addEventListener('input', function() {
  videoElement.volume = volumeSlider.value;
});

/**
 * Adds input event listner for playback speed slider
 */
playbackSlider.addEventListener('input', function() {
  videoElement.playbackRate = playbackSlider.value;
});

/**
 * Adds click event listner for both skip buttons
 */
forwardBackButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    videoElement.pause();
    videoElement.currentTime = videoElement.currentTime + Number(e.target.dataset.skip);
    videoElement.play();
  })
});

/**
 * Adds click event listner for play button
 */
playButton.addEventListener('click', (e) => {
  if (isVideoPlaying) {
    videoElement.pause();
    isVideoPlaying = false;
    playButton.innerText = '►';
  } else {
    videoElement.play();
    isVideoPlaying = true;
    playButton.innerText = '||';
  }
});

/**
 * Adds click event listner for video element
 */
videoElement.addEventListener('click', (e) => {
  if (isVideoPlaying) {
    videoElement.pause();
    isVideoPlaying = false;
    playButton.innerText = '►';
  } else {
    videoElement.play();
    isVideoPlaying = true;
    playButton.innerText = '||';
  }
});
