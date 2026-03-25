let cart = [];
const SDT_ZALO = "09xxxxxxxx"; // ⬅️ NHỚ THAY SỐ ZALO CỦA BẠN VÀO ĐÂY

// Đóng mở giỏ hàng
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
}

// Thêm vào giỏ
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const product = {
            name: card.querySelector('h3').innerText,
            price: card.querySelector('p').innerText
        };
        cart.push(product);
        updateUI();
        alert("Đã thêm " + product.name + " vào giỏ!");
    });
});

// Cập nhật giao diện giỏ hàng
function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseInt(item.price.replace(/\./g, ''));
        // Thêm nút "Xóa" màu đỏ ở đây
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px">
                <div>
                    <h4 style="font-size:14px">${item.name}</h4>
                    <b style="font-size:14px; color:#ff4757">${item.price}</b>
                </div>
                <span onclick="removeItem(${index})" style="color:#999; cursor:pointer; font-size:12px; font-weight:bold; border:1px solid #eee; padding:2px 8px; border-radius:4px">XÓA</span>
            </div>`;
    });
    document.getElementById('total-amount').innerText = total.toLocaleString('vi-VN') + 'đ';
}

// HÀM XÓA SẢN PHẨM KHỎI GIỎ
function removeItem(index) {
    cart.splice(index, 1); // Xóa 1 phần tử tại vị trí index
    updateUI(); // Vẽ lại giỏ hàng
}

// Gửi qua Zalo
function sendOrderToZalo() {
    if (cart.length === 0) return alert("Giỏ hàng trống!");
    let text = "Chào NVT Fashion, mình muốn đặt hàng:\n";
    cart.forEach(item => text += "- " + item.name + " (" + item.price + ")\n");
    text += "\nTổng cộng: " + document.getElementById('total-amount').innerText;
    window.open(`https://zalo.me{SDT_ZALO}?text=${encodeURIComponent(text)}`, '_blank');
}
