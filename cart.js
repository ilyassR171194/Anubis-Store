// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const addToCart = (productId, productName, productPrice, productImage) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('تمت إضافة المنتج إلى السلة!');
    updateCartCount();
};

export const updateCartCount = () => {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
};

// تحديث العداد عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateCartCount);
