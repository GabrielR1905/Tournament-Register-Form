const NAME_INPUT = document.getElementById('nameInput');
const EMAIL_INPUT = document.getElementById('emailInput');
const SEND_BUTTON = document.getElementById('sendButton');
const NOTIFICATION = document.getElementById('notification');
const FIRST_WEEK_RADIO_INPUT = document.getElementById('firstWeekInput');
const SECOND_WEEK_RADIO_INPUT = document.getElementById('secondWeekInput');
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const DELETE_PARTICIPANT_BUTTON = document.getElementById('deleteParticipantButton');
const LEFT_ARROW_BUTTON = document.getElementById('leftArrowButton');
const RIGHT_ARROW_BUTTON = document.getElementById('rightArrowButton');
let message = document.getElementById('message');
let firstWeekSelect = document.getElementById('firstWeekSelect');
let secondWeekSelect = document.getElementById('secondWeekSelect');



SEND_BUTTON.addEventListener('click', (event) => {
    event.preventDefault();
    validateForm(NAME_INPUT, EMAIL_INPUT, FIRST_WEEK_RADIO_INPUT, SECOND_WEEK_RADIO_INPUT);
});

DELETE_PARTICIPANT_BUTTON.addEventListener('click', () => {
    let firstWeekOptions = firstWeekSelect.options[firstWeekSelect.selectedIndex];
    let secondWeekOptions = secondWeekSelect.options[secondWeekSelect.selectedIndex];
    if (firstWeekOptions) {
        firstWeekOptions.remove();
        showNotification('error', 'Has eliminado a un participante')
    } else if (secondWeekOptions) {
        secondWeekOptions.remove();
    }
});

LEFT_ARROW_BUTTON.addEventListener('click', () => {
    let secondWeekOptions = secondWeekSelect.options[secondWeekSelect.selectedIndex];

    if (secondWeekOptions) {
        confirm('Confirmar cambio de semana?')
        if (confirm) {
            firstWeekSelect.appendChild(secondWeekOptions)
            showNotification('info', 'Has cambiado al participante de semana')
        } else {
            return;
        }
    }
});

RIGHT_ARROW_BUTTON.addEventListener('click', () => {
    let firstWeekOptions = firstWeekSelect.options[firstWeekSelect.selectedIndex];
    
    if (firstWeekOptions) {
        confirm('Confirmar cambio de semana?')
        if (confirm) {
            secondWeekSelect.appendChild(firstWeekOptions)
            showNotification('info', 'Has cambiado al participante de semana')
        } else {
            return;
        }
    }
});

function validateForm(firstInput, secondInput, firstRadioInput, secondRadioInput) {
    if (isFormEmpty(firstInput, secondInput)) {
        showNotification('error', 'Debes llenar todos los campos');
    } else if (isNoWeekSelected(firstRadioInput, secondRadioInput)) {
        showNotification('error', 'Debes seleccionar al menos una semana');
    } else if (isInvalidEmail(secondInput)) {
        showNotification('error', 'El correo electrónico es inválido');
    } else if (isDuplicated(firstInput, secondInput)) {
        showNotification('error', 'Este participante ya está registrado')
    } else {
        addUser(firstInput.value, secondInput.value, FIRST_WEEK_RADIO_INPUT, SECOND_WEEK_RADIO_INPUT);
        showNotification('success', 'Has agregado al participante');
    }
}

function isFormEmpty(firstInput, secondInput) {
    return firstInput.value.trim() === '' || secondInput.value.trim() === '';
}

function isNoWeekSelected(firstWeekRadioInput, secondWeekRadioInput) {
    return !firstWeekRadioInput.checked && !secondWeekRadioInput.checked;
}

function isInvalidEmail(secondInput) {
    return !EMAIL_REGEX.test(secondInput.value);
}

function isDuplicated(participantName, participantEmail) {
    let participantData = `${participantName.value} - ${participantEmail.value}`;
    // * iterate through the select element and check for duplicates
    for (let i = 0; i < firstWeekSelect.length; i++) {
        if (firstWeekSelect[i].value === participantData) {
            return true;
        }
    }
    for (let i = 0; i < secondWeekSelect.length; i++) {
        if (secondWeekSelect[i].value === participantData) {
            return true;
        }
    }
    return false;
}

/**
 * * Adds a new option to a select element in the HTML document.
 * * The option is created based on the values of two input fields.
 * * After adding the option, a success notification is displayed.
 * 
 * @param {string} firstInputValue - The value of the first input field.
 * @param {string} secondInputValue - The value of the second input field.
 */
function addUser(firstInputValue, secondInputValue, firstWeekRadioInput, secondWeekRadioInput) {

    if (firstWeekRadioInput.checked) {
        // * Create the option value by concatenating the input values
        let weekOneValue = `${firstInputValue} - ${secondInputValue}`;

        // * Create a new option element
        let newOption = document.createElement("option");
        newOption.textContent = weekOneValue;

        // * Append the option element to the select element
        firstWeekSelect.appendChild(newOption);

        // * Show a success notification
        showNotification('success', 'Has agregado al participante');
    } else if (secondWeekRadioInput.checked) {
        let secondWeekValue = `${firstInputValue} - ${secondInputValue}`;

        let newOption = document.createElement("option");

        newOption.textContent = secondWeekValue;

        secondWeekSelect.appendChild(newOption);

        showNotification('success', 'Has agregado al participante');

    }

}

function showNotification(type, text) {
    // * handle notification appearing when the field is empty
    NOTIFICATION.classList.add(type);
    message.textContent = text;
    notificationIsVisible = true;

    if (notificationIsVisible) {
        setTimeout(() => {
            NOTIFICATION.classList.add('vanished');
            setTimeout(() => {
                NOTIFICATION.classList.remove('vanished', `${type}`);
                NOTIFICATION.classList.add('notification');
                notificationIsVisible = false;
            }, 500);
        }, 3000);
    } else {
        NOTIFICATION.classList.add(type);
        message.textContent = text;
        notificationIsVisible = true;
    }
}
