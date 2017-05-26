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
