let count = 0;
const cartCountElement = document.getElementById('cart-count');
const buttons = document.querySelectorAll('.add-to-cart');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        count++;
        cartCountElement.innerText = count;
        
        // Hiệu ứng thông báo nhỏ
        button.innerText = "Đã thêm ✅";
        button.style.background = "#2ed573";
        
        setTimeout(() => {
            button.innerText = "Thêm vào giỏ";
            button.style.background = "#333";
        }, 1000);
    });
});

