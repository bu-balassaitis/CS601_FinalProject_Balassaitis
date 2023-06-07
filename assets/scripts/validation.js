/*  Brad Balassaitis
    CS 601 Final Project -- Form Validation and Submission
*/


/* Take action based on whether the form is valid. */
function validate() {
    const frm = document.forms.addPlayer;
    const isValid = isFormValid(frm);
    const btn = frm.btnAddPlayer;

    console.log('validate()...Is form valid? ' + isValid);

    if (isValid) {
        // Enable the submit button
        btn.classList.remove('disabled');
    } else {
        // Disable the submit button
        btn.classList.add('disabled');
    }

    // Set the button disabled attribute and return whether the form is valid, accordingly
    btn.disabled = !isValid;
    return isValid;
}


/* Validate the form and return a boolean for whether it passes
Display error messages accordingly. */
function isFormValid(frm) {
    isValid = true;   // Start by assuming true, before running JS validation

    const PATTERN_NAME = /^[a-zA-Z0-9 ,.]{8,}$/;
    const NAME_ERROR_MSG = "Name must be at least 8 characters";

    const PATTERN_TEAM = /^[a-zA-Z0-9 ]{10,}$/;
    const TEAM_ERROR_MSG = "Team must be at least 10 characters";

    /* Validate First Name */
    let field = frm.name;
    if (PATTERN_NAME.test(field.value)) {
        // Valid
        field.classList.remove('errorField');
        document.querySelector('#error_name').innerText = '';
    } else {
        // Invalid
        isValid = false;
        field.classList.add('errorField');
        document.querySelector('#error_name').innerText = NAME_ERROR_MSG;
    }

    /* Validate Last Name */
    field = frm.team;
    if (PATTERN_TEAM.test(field.value)) {
        // Valid
        field.classList.remove('errorField');
        document.querySelector('#error_team').innerText = '';
    } else {
        // Invalid
        isValid = false;
        field.classList.add('errorField');
        document.querySelector('#error_team').innerText = TEAM_ERROR_MSG;
    }

    return isValid;
}


/* After the page loads, add event handlers to check validation when field values change */
window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM Loaded -- Adding event handlers...");

    const frm = document.forms.addPlayer;
    frm.name.addEventListener("change", validate);
    frm.team.addEventListener("change", validate);
  });

