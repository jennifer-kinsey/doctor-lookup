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

Doctor.prototype.getDocs = function(symptom, displayDocs){
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}& location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&sort=rating-desc&skip=0&limit=10&user_key=${apiKey}`)
    .then(function(response) {
      // response.data.forEach(function(datum){
      //   makeRow();
      //   displayDocs(datum.name);
      // });
      displayDocs(response.data);
      console.log(response.data);
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

// var makeRow = function(){
//   $('$result').append(`<div class="row"><div class="doc-info"></div></div>`);
// };

var displayDocs = function(results){
  results.forEach(function(result){
    $('row').last().append(`
      <h2 id="header">${result.practices[0].name}</h2>
      <h3>Dr. ${result.practices[0].profile.first_name} ${result.practices[0].profile.last_name}</h3>
      <h3>${result.practices[0].website}</h3>
      <h4>${result.practices[0].description}</h4>
      <h3>Accepting Patients? ${result.practices[0].accepts_new_patients}</h3>
      <h4>Address: ${result.practices[0].visit_address.street}</h4>
      <h4>${result.practices[0].visit_address.street2}</h4>
      <h4>${result.practices[0].visit_address.city},
      ${result.practices[0].visit_address.state} ${result.practices[0].visit_address.zipcode}</h4>
      <h4>Phone: ${result.practices[0].phones[0].number}</h4>
      <div class="row"></div>`
    );
  });
};


// <div class="row"> DONE
//   <div class="doc-info"> DONE
//     <h2 class="practice"></h2> DONE
//     <h3 class="doctor"></h3> DONE
//     <h3 class="website"></h3> DONE
//     <h4 class="description"></h4> DONE
//     <h4 class="accepting"></h4> DONE
//     <h4 class="address"></h4>
//     <h4 class="phone"></h4>
//   </div>
// </div>

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
    doctor.getDocs(yourSymptom, displayDocs);
  });

  $('#reset-button').click(function() {
    location.reload();
  });

});

},{"./../js/doctor-lookup.js":2}]},{},[3]);
