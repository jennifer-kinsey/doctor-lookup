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
