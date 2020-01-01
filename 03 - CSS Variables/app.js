var spacingElement = document.getElementById('spacing');
var blurElement = document.getElementById('blur');
var baseColorElement = document.getElementById('base');

/**
 * handles input event handler and updates global CSS variables
 * @param {Event} e Event Object from input event
 */
function updateStyles(e) {
  var element = e.target;
  var id = element.id;
  var rootElement = document.documentElement;
  // Updating the css variables values
  if (id === 'spacing') {
    rootElement.style.setProperty('--padding', element.value + 'px');
  }
  if (id === 'blur') {
    rootElement.style.setProperty('--blur', element.value + 'px');
  }
  if (id === 'base') {
    rootElement.style.setProperty('--color', element.value);
  }
}

// Adding Event Listeners
spacingElement.addEventListener('input', updateStyles);
blurElement.addEventListener('input', updateStyles);
baseColorElement.addEventListener('input', updateStyles);
