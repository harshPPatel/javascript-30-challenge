var panels = document.querySelectorAll('.panel');

// Adding click event listener to panels
panels.forEach(panel => {
  panel.addEventListener('click', function(e) {
    var element = this;
    // toggling `open` class
    element.classList.toggle('open');
    // toggling `open-active` class after 250ms delay
    setTimeout(function() {
      element.classList.toggle('open-active');
    }, 250);
  });
});