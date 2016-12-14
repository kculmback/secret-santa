/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
 function isValidElement(element) {
    return element.name && element.value;
};



/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
function formToJSON(elements) {
    return [].reduce.call(elements, function (data, element) {
        if (isValidElement(element)) {
        	data[element.name] = element.value;
        }
        
        return data;
    }, {});
};


/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
function handleFormSubmit(event) {
  
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  
  // TODO: Call our function to get the form data.
  var data = formToJSON(form.elements);
  
  // Demo only: print the form data onscreen as a formatted JSON object.
  var dataContainer = document.getElementsByClassName('results__display')[0];
  
  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");
  
  // ...this is where we’d actually do something with the form data...
  console.log(data);
};

var form = document.getElementsByClassName('secretSantaForm')[0];
form.addEventListener('submit', handleFormSubmit);