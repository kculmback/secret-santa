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
/*function formToJSON(elements) {
    return [].reduce.call(elements, function (data, element) {
        if (element.name.slice(0,4) === "name") {
        	data[element.name] = element.value;
        }
        
        return data;
    }, {});
	

};*/


/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
function handleFormSubmit(event) {
  
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  
  // TODO: Call our function to get the form data.
  // var data = formToJSON(form.elements);
  /*var data = {};
  $(form).find("input").each(function() {
	    // The selector will match buttons; if you want to filter
	    // them out, check `this.tagName` and `this.type`; see
	    // below
	    // var inputType = this.tagName.toUpperCase() === "INPUT" && this.type.toUpperCase();
	    if (this.name.slice(0,4) === "name") {
	    	data[this.value] = $(this).next().next().next().next().val();
	    }
	});*/
  var data = {
  	"kasey": "kasey@test.com",
  "jason": "jason@jason.com",
  "tom": "tom@test.com",
  "peter": "peter@test.com",
  };


  // Demo only: print the form data onscreen as a formatted JSON object.
  var dataContainer = document.getElementsByClassName('results__display')[0];
  
  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");
  
  // ...this is where we’d actually do something with the form data...
  var namesArr = [];
  for ( x in data ) {
  	namesArr.push(x);
  }
  console.log("Array is " + namesArr);

  function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	};

	namesArr = shuffle(namesArr);

	console.log("Array is now " + namesArr);


};

var form = document.getElementsByClassName('secretSantaForm')[0];
form.addEventListener('submit', handleFormSubmit);