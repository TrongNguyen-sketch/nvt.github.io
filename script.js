const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea');

// Hàm hiển thị lỗi
const showError = (input, message) => {
    const group = input.parentElement;
    const errorText = group.querySelector('.error-msg');
    input.classList.add('invalid');
    errorText.innerText = message;
};

// Hàm xóa lỗi
const showSuccess = (input) => {
    const group = input.parentElement;
    const errorText = group.querySelector('.error-msg');
    input.classList.remove('invalid');
    errorText.innerText = '';
};

// Kiểm tra Email hợp lệ
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${input.placeholder} không được để trống`);
            isFormValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showError(input, 'Email không đúng định dạng');
            isFormValid = false;
        } else {
            showSuccess(input);
        }
    });

    if (isFormValid) {
        alert('🚀 Tin nhắn đã được gửi thành công!');
        form.reset();
    }
});
