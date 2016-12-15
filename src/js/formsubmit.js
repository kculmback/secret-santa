/**
 * Function that will randomly shuffle an array. 
 * Fisher-Yates (aka Knuth) Shuffle
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */

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

/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
function handleFormSubmit(event) {

	// Stop the form from submitting since we’re handling that with AJAX.
	event.preventDefault();

	// Create object with names and emails of people participating
	var data = {};
	$(form).find("input").each(function() {
		// Check to see if input is a name or an email
		// Only fire if working with a name
		if (this.name.slice(0,4) === "name") {
			data[this.value] = [$(this).val(), $(this).next().val()]
		}
	});

	// Capture length of data object
	var objSize = Object.keys(data).length;

	// Create array with names of people participating in Secret Santa
	// This will make it easy to randomly assign people to one another
	var namesArr = [];
	for ( x in data ) {
		namesArr.push(x);
	}
	// Call the shuffle function on namesArr
	namesArr = shuffle(namesArr);

	/**
	 * Loop through the newly shuffled namesArr.
	 * Assigns the next name in the array to the current name's property in the data object
	 * If last name in the array, it will assign the first name to their property 
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
	 * data[y][0] = name of secret santa
	 * data[y][1] = email of secret santa
	 * data[y][2] = name of the person receiving gift
	 */

	// Change text of submit button while function runs
	$(form).find(".submitBtn").text("Pairing...");

	// Initialize variables to be used in for...in loop
	var successArr = [];
	var z = 0;
	for (y in data) {
		emailjs.send("default_service","secret_santa",{
			santa: data[y][0],
			email: data[y][1],
			giftie: data[y][2]
		})
		// After sending email perform this function if succeeds
		.then(function() {
			// Originally tried to push only the successful names to the succerArr using:
			// successArr.push(" " + data[y][0]);
			// However, this wouldn't work. Currently doing so below.
		}, 
		// If there is an error, alert it to user
		function(err) {
			alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
		});
		// Push names of secret santas to successArr
		// Later on will display these names
		// Need to fix: will still push failed names to array
		successArr.push(" " + data[y][0]);
		// Increment counter
		z++;
		// Call back to perform once program is at end of the loop
		if (z === objSize) {
			// Show the names from successArr and change the submit button back to normal
			$(form).find(".results").css("display", "block");
			$(form).find(".results__display").text(successArr);
			$(form).find(".submitBtn").text("Pair up!")
		}
	}
  
};

// Find the Secret Santa form in the dom and assign it to form variable
var form = document.getElementsByClassName('secretSantaForm')[0];

// When the submit button is clicked for our form fire the function that
// assigns secret santas and sends emails
form.addEventListener('submit', handleFormSubmit);