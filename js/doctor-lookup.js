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
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}& location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&sort=rating-desc&skip=0&limit=20&user_key=${apiKey}`)
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
