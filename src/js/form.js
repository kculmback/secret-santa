/**
 * This script is in charge of adding and removing participatents from form 
 * Relys on jQuery to clone Secret Santa form data
 */

// Define template variable. 
// This will contain the html required to create new participants
var template = $('#sections .section:first').clone();

var sectionsCount = 0;

// When user clicks .addsection button, adds new participant
$('body').on('click', '.addsection', function() {

  sectionsCount++;

  // Loop through each input
  var section = template.clone().find(':input').each(function(){
    var newId = this.id.slice(0, -1) + sectionsCount;
    this.id = newId;
    $(this).attr('name', newId);
	}).end()
  .appendTo('#sections');
  return false;
});

// When user clicks .remove button, removes that participant
$('#sections').on('click', '.remove', function() {
  $(this).parent().parent().fadeOut(300, function(){
    $(this).parent().empty();
    return false;
  });
  return false;
});

