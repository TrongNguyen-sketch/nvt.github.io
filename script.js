let cart = [];
const SDT_ZALO = "0374122743"; // ⬅️ THAY SỐ ZALO CỦA BẠN VÀO ĐÂY

function toggleCart() { document.getElementById('cartModal').classList.toggle('active'); }

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const product = { name: card.querySelector('h3').innerText, price: card.querySelector('p').innerText };
        cart.push(product);
        updateUI();
        alert("Đã thêm " + product.name + " vào giỏ!");
    });
});

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += parseInt(item.price.replace(/\./g, ''));
        list.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px"><span>${item.name}</span><b>${item.price}</b></div>`;
    });
    document.getElementById('total-amount').innerText = total.toLocaleString('vi-VN') + 'đ';
}

function sendOrderToZalo() {
    if (cart.length === 0) return alert("Giỏ hàng trống!");
    let text = "Chào NVT Fashion, mình muốn đặt hàng:\n";
    cart.forEach(item => text += "- " + item.name + " (" + item.price + ")\n");
    text += "\nTổng cộng: " + document.getElementById('total-amount').innerText;
    window.open(`https://zalo.me{SDT_ZALO}?text=${encodeURIComponent(text)}`, '_blank');
}
