/**
 * This script is in charge of adding and removing participatents from form 
 * Relys on jQuery to clone Secret Santa form data
 */

// Define template variable. 
// This will contain the html required to create new participants
var template = $('#sections .section:first').clone();

// Define counter
var sectionsCount = 0;

// When user clicks .addsection button, adds new participant
$('body').on('click', '.addsection', function() {
  // Increment sectionsCount
  sectionsCount++;
  // Loop through each input
  var section = template.clone().find(':input').each(function(){
    // Set id to store the updated section number
    var newId = this.id.slice(0, 4) + sectionsCount;
    // Update id
    this.id = newId;
    // Update name
    $(this).attr('name', newId);
	}).end()
  // Inject new section
  .appendTo('#sections');
  return false;
});

// When user clicks .remove button, removes that participant
$('#sections').on('click', '.remove', function() {
  // Fade out section
  $(this).parent().parent().fadeOut(300, function(){
    // Remove parent element (main section)
    $(this).parent().empty();
    return false;
  });
  return false;
});

