 const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const passwort = document.getElementById('password')
const passwort2 = document.getElementById('password2')

// Show input error message
function showError(input, message) {
    const formControle = input.parentElement
    formControle.className = 'form-controle error';
    const small = formControle.querySelector('small');
    small.innerText = message
}

// Show succeess outline
function showSuccess(input) {
    const formControle = input.parentElement
    formControle.className = 'form-controle success';
}

// Check email is Valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, `Email is not Valid`)
    }
};

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} Is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input Length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min}`)
    }else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input)
    }
} 

// Check Password Match
function checkPasswordsMatch(input1, input2) {
    if (input1.value === input2.value) {
        showSuccess()
    } else {
        showError(input2, "Passwords don't match!")
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listener
form.addEventListener('submit', function(e) {
    e.preventDefault()

    checkRequired([username, email, passwort, passwort2])
    checkLength(username, 3, 15);
    checkLength(passwort, 6, 25);
    checkEmail(email)
    checkPasswordsMatch(passwort, passwort2);
})