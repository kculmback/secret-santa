// Main function for Secret Santa web app
// Stores data from form in array and uses that data to pair participants
function secretSantaFormSubmit(event) {

	event.preventDefault();

	$(submitBtn).text("Pairing...");
	$(secretSantaForm).find(".results").css("display", "block");

	var participants = [];

	// Create an array for each participant within the participants array
	// Ends up with a 2 dimensional array
	$(secretSantaForm).find(".section").each(function() {
		var participant = {
			name: $(this).find(".nameInput").val(),
			email: $(this).find(".emailInput").val()
		};
		participants.push(participant);
	});

	participants = shuffle(participants);

	participants.forEach(matchParticipants);

	participants.forEach(emailParticipants);
};


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

// Function to match participants with recipients
// Matches current participant in array with the next participant in array
// Unless they are the last, in which case matches them with the first participant in array
function matchParticipants (participant, index, array) {
	return participant.recipient = (array[index + 1] || array[0]).name;
};

// Function that uses emailjs API to send notification emails to secret santas
function emailParticipants (participant, index, array) {
	emailjs.send("default_service","secret_santa",{
		santa: participant.name,
		email: participant.email,
		giftie: participant.recipient
	})
		// After sending email perform this function if succeeds
		.then(function(response) {
			console.log(participant.name + ": SUCCESS", response);
			$(resultsDisplay).append("<p>Successfully sent to: " + participant.name + "</p>");

			if (index === array.length - 1) {
				$(submitBtn).text("Pair up!");
			}
		},
		// If there is an error, alert it to user
		function(err) {
			$(resultsDisplay).append("<p>Uh oh! Unable to send email to: " + participant.name + "<br>Error: " + JSON.stringify(err) + "</p>");
			console.log("FAILED", err);
			if (index === array.length - 1) {
				$(submitBtn).text("Pair up!");
			}
		});
};

// Store elements that are used multiple times in functions as variables
var secretSantaForm = document.getElementsByClassName('secretSantaForm')[0];
var resultsDisplay = document.getElementsByClassName('results-display')[0];
var submitBtn = document.getElementsByClassName('submitBtn')[0];

// Trigger secretSantaFormSubmit function when form is submitted
secretSantaForm.addEventListener('submit', secretSantaFormSubmit);
