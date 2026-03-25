// 1. THIẾT LẬP BAN ĐẦU
let cart = [];
const SDT_ZALO = "0374122743"; // ⬅️ NHỚ THAY SỐ ZALO CỦA BẠN VÀO ĐÂY

// 2. HÀM HIỆN THÔNG BÁO "NGHỆ" (THAY CHO ALERT CŨ)
function showToast(message) {
    // Tạo phần tử thông báo
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
        background: #000; color: #fff; padding: 15px 30px; font-weight: 900; font-size: 13px;
        border-radius: 4px; z-index: 9999; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        opacity: 0; letter-spacing: 1px; pointer-events: none; text-transform: uppercase;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // Hiệu ứng hiện lên
    setTimeout(() => {
        toast.style.transform = "translateX(-50%) translateY(0)";
        toast.style.opacity = "1";
    }, 100);

    // Tự biến mất sau 2 giây
    setTimeout(() => {
        toast.style.transform = "translateX(-50%) translateY(100px)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// 3. ĐÓNG MỞ GIỎ HÀNG
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
}

// 4. XỬ LÝ KHI BẤM "THÊM VÀO GIỎ"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const product = {
            name: card.querySelector('h3').innerText,
            price: card.querySelector('p').innerText
        };
        cart.push(product);
        updateUI();
        
        // Gọi thông báo mới thay vì alert
        showToast("Đã thêm " + product.name + " vào giỏ!"); 
    });
});

// 5. CẬP NHẬT GIAO DIỆN GIỎ HÀNG
function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseInt(item.price.replace(/\./g, ''));
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:15px">
                <div>
                    <h4 style="font-size:14px; font-weight:900">${item.name}</h4>
                    <b style="font-size:14px; color:#ff4757">${item.price}</b>
                </div>
                <span onclick="removeItem(${index})" style="color:#999; cursor:pointer; font-size:11px; font-weight:900; border:1px solid #eee; padding:4px 10px; border-radius:4px; transition:0.3s">XÓA</span>
            </div>`;
    });
    document.getElementById('total-amount').innerText = total.toLocaleString('vi-VN') + 'đ';
}

// 6. XÓA SẢN PHẨM KHỎI GIỎ
function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}

// 7. GỬI ĐƠN QUA ZALO
function sendOrderToZalo() {
    if (cart.length === 0) return showToast("GIỎ HÀNG ĐANG TRỐNG!");
    let text = "Chào NVT Fashion, mình muốn đặt hàng:\n";
    cart.forEach(item => text += "- " + item.name + " (" + item.price + ")\n");
    text += "\nTổng cộng: " + document.getElementById('total-amount').innerText;
    window.open(`https://zalo.me{SDT_ZALO}?text=${encodeURIComponent(text)}`, '_blank');
}
