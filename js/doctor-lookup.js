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
