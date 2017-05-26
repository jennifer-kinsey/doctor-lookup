var Doctor =  require('./../js/doctor-lookup.js').doctorsModule;

var displaySymptom = function(symptom){
  $('#symptoms-form').prepend(
    `<label><input type="radio" name="symptom" value="${symptom}">${symptom}</label><br>`);
};


$(document).ready(function() {
  var doctor = new Doctor();
  doctor.getAllSymptoms(displaySymptom);

  $('#submit-button').click(function() {
    $('form').hide();
    $('#reset-button').show();
    var yourSymptom = $('input[name=symptom]:checked').val();
    console.log(yourSymptom)
    if (!yourSymptom){
      $('#result').text("You didn't select anything. Have another go.");
    }

    // currentWeatherObject.getHumidity(city, displayHumidity);
    // currentWeatherObject.getDescription(city, displayDescription);
    // currentWeatherObject.getTemperatures(city, displayTemperatures);
    // currentWeatherObject.getSunrise(city, displaySunrise);
    // currentWeatherObject.getSunset(city, displaySunset);
  });

  $('#reset-button').click(function() {
    location.reload();
  });

});
