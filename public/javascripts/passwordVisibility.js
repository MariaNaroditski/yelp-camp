function showPassword() {
    const password = document.querySelector('#password');
    password.type = (password.type==="password") ? "text" : "password";
}