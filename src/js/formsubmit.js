/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
 function isValidElement(element) {
    return element.name && element.value;
};


/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
function handleFormSubmit(event) {
  
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  
  // Create object with names and emails of people participating
  // var data = {};
  /*$(form).find("input").each(function() {
	    // The selector will match buttons; if you want to filter
	    // them out, check `this.tagName` and `this.type`; see
	    // below
	    // var inputType = this.tagName.toUpperCase() === "INPUT" && this.type.toUpperCase();
	    
	    if (this.name.slice(0,4) === "name") {
	    	data[this.value] = [$(this).val(), $(this).next().next().next().next().val()]
	    }
	    
	});*/
  var data = {
  	"kasey": ["kasey", "crazyrawkr@gmail.com"],
	  "jason": ["jason", "jason@test.com"],
	  "tom": ["tom", "tom@test.com"],
	  "peter": ["peter", "peter@test.com"],
  };

  
  // Create array with names of people participating in Secret Santa
  var namesArr = [];
  for ( x in data ) {
  	namesArr.push(x);
  }

  // Function that randomly shuffles contents of array
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

	// Call the shuffle function on namesArr
	namesArr = shuffle(namesArr);

	/**
	 * Loop through the newly shuffled namesArr
	 * Push the name of the next person in the array to the current person's object property
	 * This ensures two people aren't paired together
	 */
	for (var i = 0; i < namesArr.length; i++) {
		if (i === namesArr.length - 1) {
			data[namesArr[i]].push(data[namesArr[0]][0]);
		} else {
			data[namesArr[i]].push(data[namesArr[i + 1]][0]);			
		}
	}

	/**
	 * Send email using EmailJS.com
	 * data[y][1] = email of secret santa
	 * data[y][2] = name of the person receiving gift
	 */
  for (y in data) {
  	emailjs.send("default_service","secret_santa",{
		  email: data[y][1], 
		  giftie: data[y][2]
		});
  }
  


	// Demo only: print the form data onscreen as a formatted JSON object.
  var dataContainer = document.getElementsByClassName('results__display')[0];
  
  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");

};

var form = document.getElementsByClassName('secretSantaForm')[0];
form.addEventListener('submit', handleFormSubmit);