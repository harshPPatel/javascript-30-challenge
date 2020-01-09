const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let lastChecked = null;

// Adding event listner to all checkboxes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', selectMultiple);
});

/**
 * Handles click event of each checkboxes
 * @param {Event} e Event Object
 */
function selectMultiple(e) {
  let inBetween = false;
  // Checking if shift key is clicked and checkbox is checked
  if (e.shiftKey && this.checked && lastChecked) {
    // Looping through all checkboxes
    checkboxes.forEach(checkbox => {
      // Setting inBeteen to true on ends of the selections
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      // Checking checkboxes if they are in between
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  // adding checkbox to last checked
  lastChecked = this;
}