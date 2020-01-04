const suggestionList = document.querySelector('.suggestions');
const inputElement = document.querySelector('.search');
const URL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities;

/**
 * Gets data from the json file
 */
function getData() {
  fetch(URL)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      cities = data;
    });
}

/**
 * Clears suggestion list
 */
function clearList() {
  suggestionList.innerHTML = '';
}

/**
 * Resets the suggestion list
 */
function resetList() {
  suggestionList.innerHTML = `
    <li>Filter for a city</li>
    <li>or a state</li>
  `;
}

/**
 * Adds not found list item
 */
function setNotFoundList() {
  suggestionList.innerHTML = `
    <li>Not Found ☹️!</li>
  `;
}

/**
 * Returns the filtered array
 * @param {String} value String to match it with data
 * @returns {Array} filtered array
 */
function getFilteredArray(value) {
  const regExp = new RegExp(value, 'gi');
  // Filtering the array
  const filteredArray = cities.filter(function(city) {
    return regExp.test(city.city) || regExp.test(city.state);
  });
  return filteredArray;
}

/**
 * Returns the html for list item for provided city
 * @param {Object} city City Object returned from JSON file
 * @param {RegExp} regExp Regular Expression to match values
 * @param {Event} e Event Object
 */
function getListItem(city, regExp, e) {
  // Adding hl class to matched text
  const cityName = city.city.replace(
    regExp,
    `<span class="hl">${e.target.value}</span>`
  );
  const stateName = city.state.replace(
    regExp,
    `<span class="hl">${e.target.value}</span>`
  );
  // returning the markup
  return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(city.population)}</span>
    </li>
  `;
}

/**
 * Formats the number with commas
 * @param {Number} x number to be formatted
 * @returns {String} formatted number
 */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// resetting the list when input is clicked
inputElement.addEventListener('click', function() {
  clearList();
});

// addind input event listener
inputElement.addEventListener('input', function(e) {
  // clearing the list
  clearList();
  // resetting the list if value is empty string
  if (e.target.value === '') {
    clearList();
    resetList();
    return;
  }

  const regExp = new RegExp(e.target.value, 'gi');
  const filteredList = getFilteredArray(e.target.value);

  // Adding not found list item if search result is empty
  if (filteredList.length === 0) {
    setNotFoundList();
    return;
  }

  // Getting gtml for all the matched cities
  const html = filteredList.map(city => {
    return getListItem(city, regExp, e);
  });

  // adding html to webpage
  suggestionList.innerHTML = html.join('');
});

// Getting data from JSOn file when page loads
window.addEventListener('load', function() {
  getData();
});
