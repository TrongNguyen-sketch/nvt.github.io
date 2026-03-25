let cart = [];
const SDT_ZALO = "09xxxxxxxx"; // ⬅️ THAY SỐ ĐIỆN THOẠI ZALO CỦA BẠN VÀO ĐÂY

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
}

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

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    const totalElem = document.getElementById('total-amount');
    list.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseInt(item.price.replace(/\./g, ''));
        list.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px">
            <span>${item.name}</span>
            <b>${item.price}</b>
        </div>`;
    });
    totalElem.innerText = total.toLocaleString('vi-VN') + 'đ';
}

function sendOrderToZalo() {
    if (cart.length === 0) return alert("Giỏ hàng trống!");
    let text = "Chào Shop, mình muốn mua:\n";
    cart.forEach(item => text += "- " + item.name + " (" + item.price + ")\n");
    text += "\nTổng: " + document.getElementById('total-amount').innerText;
    window.open(`https://zalo.me{SDT_ZALO}?text=${encodeURIComponent(text)}`, '_blank');
}
