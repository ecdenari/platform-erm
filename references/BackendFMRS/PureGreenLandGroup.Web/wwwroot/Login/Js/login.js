//$(document).ready(function () {
//    var validationSpans = $('.validationSpan');
    
//    validationSpans.each(function () {
//        debugger
//        if ($(this).text().trim() !== '') {
//            $('#Loader').hide();
//        }
//    })
//});

$('#ShowPasswordIdcon').on('click', function () {
    debugger
    const passwordInput = document.querySelector("#PasswordInput");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const togglePasswordIcon = document.querySelector("#ShowPasswordIdcon");

    // toggle the icon
    const showPass = togglePasswordIcon.getAttribute("data-show-pass") === "true";
    togglePasswordIcon.setAttribute("data-show-pass", !showPass);
    if (showPass) {
        togglePasswordIcon.classList.remove("fa-eye");
        togglePasswordIcon.classList.add("fa-eye-slash");
    } else {
        togglePasswordIcon.classList.remove("fa-eye-slash");
        togglePasswordIcon.classList.add("fa-eye");
    }
});

function FormatValidation() {
    var pwdValidation = $('#PasswordValidationContainer').text();
    if (pwdValidation == 'Please enter a value greater than or equal to 8.') {
        pwdValidation.text('');
    }
}