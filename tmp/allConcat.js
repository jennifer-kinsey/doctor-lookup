var Doctor =  require('./../js/doctor-lookup.js').doctorsModule;

var displaySymptom = function(symptom){
  $('#symptoms-form').prepend(
    `<label><input type="radio" name="symptom" value="${symptom}">${symptom}</label><br>`);
};

var displayDocs = function(yourSymptom, results){
  console.log(results);
  $('#result').append(`
    <h3>There are ${results.length} results for ${yourSymptom} query within 100 miles of your query.<h3>
    `);
  results.forEach(function(result){
    var office = result.practices[0].name || "unavailable";
    // var first = result.practices[0].profile.first_name;
    // var docName = result.practices[0].profile.last_name;
    var website = result.practices[0].website || "unavailable";
    // var description = result.practices[0].description;
    // var accept = result.practices[0].accepts_new_patients;
    // var street = result.practices[0].visit_address.street;
    // var street2 = result.practices[0].visit_address.street2;
    var city = result.practices[0].visit_address.city || "unavailable";
    var state = result.practices[0].visit_address.state || "unavailable";
    var phone = result.practices[0].phones[0].number || "unavailable";
    // var zipcode = result.practices[0].visit_address.zipcode;
    $('#result').append(`
      <h2>${office}</h2>
      <h4>${city}, ${state}</h4>
      <h4>phone: ${phone}</h4>
      <h4>website: ${website}</h4>

      `);
  });
};


$(document).ready(function() {
  var doctor = new Doctor();
  doctor.getAllSymptoms(displaySymptom);

  $('#submit-button').click(function() {
    $('form').hide();
    $('#reset-button').show();
    var yourLat = parseFloat($('#latitude').val());
    var yourLong = parseFloat($('#longitude').val());
    var yourSymptom = $('input[name=symptom]:checked').val();
    if (!yourSymptom){
      $('#result').text("You didn't select anything. Have another go.");
    }
    if (!yourLat || !yourLong){
      $('#result').text("You didn't enter a latitude and/or longitude. Have another go.");
    }
    doctor.getDocs(yourSymptom, yourLat, yourLong, displayDocs);
  });

  $('#reset-button').click(function() {
    location.reload();
  });

});
