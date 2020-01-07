const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

const mouse = { x: null, y: null };
const lastMouse = { x: null, y: null };
let isDrawing = false;
let strokeWidth = 90;
let isIncreasing = false;
let hue = 0;
let isHueDirection = 0;

// resizes the canvas
function resizeCanvas() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

// starts drawing
function startDrawing(e) {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  isDrawing = true;
}

// gets stroke's width
function getStrokeWidth() {
  if (strokeWidth < 1) {
    isIncreasing = true;
  } else if (strokeWidth > 100) {
    isIncreasing = false;
  }

  if (isIncreasing) {
    strokeWidth++;
  } else {
    strokeWidth--;
  }
  return strokeWidth;
}

// gets new hue value
function getHue() {
  if (hue <= 1) {
    isHueDirection = true;
  } else if (hue >= 360) {
    isHueDirection = false;
  }
  
  if (isHueDirection) {
    hue++;
  } else {
    hue--;
  }

  return hue;
}

// draws on canvas
function draw(e) {
  if (isDrawing) {
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    // Starting Path
    ctx.beginPath();
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    // Stroke Settings
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    // Closing stroke
    ctx.closePath();
    ctx.stroke();
    // updating stoke styles
    ctx.strokeStyle = `hsl(${getHue()}, 100%, 65%)`;
    ctx.lineWidth = getStrokeWidth();
  }
}

// stops drawing
function stopDrawing() {
  isDrawing = false;
}

// Adding event listeners
window.addEventListener('mousedown', startDrawing);
window.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);

// updating canvas height and width on window resize
window.addEventListener('resize', function() {
  resizeCanvas();
});

// resizing canvas on initial load
resizeCanvas();

// UX notification
alert('Start drawing by dragging the mouse! 👍');