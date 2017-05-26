var Doctor =  require('./../js/doctor-lookup.js').doctorsModule;

var displaySymptom = function(symptom){
  $('#symptoms-form').prepend(
    `<label><input type="radio" name="symptom" value="${symptom}">${symptom}</label><br>`);
};

// var displayResultNum = function(num){
//   $('#result').append(`<h4>${num} results </h4>`);
// };

var displayDocs = function(slug){
  $('#result').append(`<h4>${slug} slug </h4>`);
};



$(document).ready(function() {
  var doctor = new Doctor();
  doctor.getAllSymptoms(displaySymptom);

  $('#submit-button').click(function() {
    $('form').hide();
    $('#reset-button').show();
    var yourSymptom = $('input[name=symptom]:checked').val();
    if (!yourSymptom){
      $('#result').text("You didn't select anything. Have another go.");
    }
    doctor.getDocs(displayDocs);
  });

  $('#reset-button').click(function() {
    location.reload();
  });

});
