(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "b537a7c7e0b163b5d488324d8df787c1";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

Doctor = function(){};

Doctor.prototype.getAllSymptoms = function(displaySymptom){
  $.get('https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + apiKey).then(function(response) {
    response.data.forEach(function(datum){
      displaySymptom(datum.name);
    });
  }).fail(function(error) {
    $('#no-result').append("An Error has occurred.");
  });
};

Doctor.prototype.getDocs = function(){
  $.get('https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + apiKey).then(function(response) {
    response.data.forEach(function(datum){
      displaySymptom(datum.name);
    });
  }).fail(function(error) {
    $('#symptoms-form').append("<p>An Error has occurred.</p>");
  });
};

exports.doctorsModule = Doctor;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/doctor-lookup.js":2}]},{},[3]);
