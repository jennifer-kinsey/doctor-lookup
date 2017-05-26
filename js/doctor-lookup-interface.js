var Doctor =  require('./../js/doctor-lookup.js').doctorsModule;

var displaySymptom = function(symptom){
  $('#symptoms-form').prepend(
    `<label><input type="radio" name="symptom" value="${symptom}">${symptom}</label><br>`);
};

var makeRow = function(){
  $('$result').append(`<div class="row"><div class="doc-info"></div></div>`);
};

var displayDocs = function(results){
  results.forEach(function(result){
    $('.doc-info').last().append(
      `<h2>${result.practices[0].name}</h2>
      <div class="row"><div class="doc-info"></div></div>`
    );
  })
};


// <div class="row"> DONE
//   <div class="doc-info"> DONE
//     <h2 class="practice"></h2>
//     <h3 class="doctor"></h3>
//     <h3 class="website"></h3>
//     <h4 class="description"></h4>
//     <h4 class="accepting"></h4>
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
