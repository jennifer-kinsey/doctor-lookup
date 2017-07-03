(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "b537a7c7e0b163b5d488324d8df787c1";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

Doctor = function(){};

Doctor.prototype.getAllSymptoms = function(displaySymptom){
  $.get('https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + apiKey)
    .then(function(response) {
      response.data.forEach(function(datum){
        displaySymptom(datum.name);
      });
    })
    .fail(function(error) {
      $('#no-result').append("An Error has occurred.");
    });
};

Doctor.prototype.getDocs = function(yourSymptom, yourLat, yourLong, displayDocs){
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${yourSymptom}& location=${yourLat},${yourLong},100&user_location=${yourLat},${yourLong}&sort=rating-desc&skip=0&limit=10&user_key=${apiKey}`)
    .then(function(response) {
      displayDocs(yourSymptom, response.data);
    })
    .fail(function(error) {
      $('#symptoms-form').append("No results found.");
    });
};

exports.doctorsModule = Doctor;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/doctor-lookup.js":2}]},{},[3]);
