let cart = JSON.parse(localStorage.getItem('cart')) || [];
const SĐT_ZALO = "09xxxxxxxx"; // ⬅️ THAY SỐ ĐIỆN THOẠI CỦA BẠN VÀO ĐÂY

// Mở/Đóng giỏ hàng
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
    renderCart();
}

// Thêm vào giỏ
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const product = {
            name: card.querySelector('h3').innerText,
            price: card.querySelector('p').innerText,
            img: card.querySelector('img').src
        };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert("Đã thêm vào giỏ!");
    });
});

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Hiển thị giỏ hàng
function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalElem = document.getElementById('total-amount');
    list.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseInt(item.price.replace(/\./g, ''));
        list.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <small style="color:red; cursor:pointer" onclick="removeItem(${index})">Xóa</small>
                </div>
            </div>
        `;
    });
    totalElem.innerText = total.toLocaleString('vi-VN') + 'đ';
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Gửi qua Zalo
function sendOrderToZalo() {
    if (cart.length === 0) return alert("Giỏ hàng trống!");
    
    let message = "Chào Shop, mình muốn đặt hàng:\n";
    cart.forEach(item => {
        message += `- ${item.name} (${item.price})\n`;
    });
    message += `\nTổng cộng: ${document.getElementById('total-amount').innerText}`;
    
    // Tạo link Zalo (Mở chat trực tiếp)
    const encodeMsg = encodeURIComponent(message);
    window.open(`https://zalo.me{0374122743}?text=${encodeMsg}`, '_blank');
}

updateCartCount();
