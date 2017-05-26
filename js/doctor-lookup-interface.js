var Doctor =  require('./../js/doctor-lookup.js').doctorsModule;

var makeRow = function() {
  $('#table-body').append(`<tr></tr>`);
};

var displaySymptom = function(symptom){
  $('#symptoms-form').append(
    `<input type="checkbox" name="${symptom}" value="${symptom}">${symptom}<br>`);
};


$(document).ready(function() {
  var doctor = new Doctor();
  doctor.getAllSymptoms(displaySymptom);
});
