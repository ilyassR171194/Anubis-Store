// cart.js
import { db, auth } from './firebase.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// الحصول على مرجع سلة المستخدم في Firebase
const getCartRef = () => {
    const user = auth.currentUser;
    if (!user) return null;
    return doc(db, "carts", user.uid);
};

// إضافة منتج إلى السلة
export const addToCart = async (productId, productName, productPrice, productImage) => {
    const user = auth.currentUser;
    if (!user) {
        alert("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة.");
        window.location.href = 'login.html';
        return;
    }

    const cartRef = getCartRef();
    const cartSnap = await getDoc(cartRef);
    let cart = cartSnap.exists() ? cartSnap.data().items || [] : [];

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    await setDoc(cartRef, { items: cart });
    alert('تمت إضافة المنتج إلى السلة!');
    updateCartCount();
};

// تحديث عداد السلة
export const updateCartCount = async () => {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    const user = auth.currentUser;
    if (!user) {
        cartCount.textContent = 0;
        return;
    }

    const cartRef = getCartRef();
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
        const cart = cartSnap.data().items || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    } else {
        cartCount.textContent = 0;
    }
};

// الحصول على محتوى السلة
export const getCart = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const cartRef = getCartRef();
    const cartSnap = await getDoc(cartRef);
    return cartSnap.exists() ? cartSnap.data().items || [] : [];
};

// إزالة منتج من السلة
export const removeFromCart = async (productId) => {
    const user = auth.currentUser;
    if (!user) return;

    const cartRef = getCartRef();
    const cartSnap = await getDoc(cartRef);
    if (!cartSnap.exists()) return;

    let cart = cartSnap.data().items || [];
    cart = cart.filter(item => item.id !== productId);
    await setDoc(cartRef, { items: cart });
    updateCartCount();
};

// تفريغ السلة
export const clearCart = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const cartRef = getCartRef();
    await setDoc(cartRef, { items: [] });
    updateCartCount();
};
