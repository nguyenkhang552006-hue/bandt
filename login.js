const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
loginForm.style.display = 'block';
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Lỗi: Mật khẩu nhập lại không khớp!');
        return;
    }

    alert(`Đăng ký thành công cho tài khoản: ${username}!`);
    registerForm.reset();

   window.location.href = "ketthucmon.html";
});
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('log-email').value;

    alert(`Đăng nhập thành công với tài khoản: ${email}!`);
    loginForm.reset();
    window.location.href = "ketthucmon.html";
});
