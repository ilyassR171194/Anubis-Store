// products.js
import { db } from './firebase.js';
import { addToCart } from './cart.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const productsContainer = document.getElementById('productsContainer');

// جعل الدالة متاحة عالمياً ليتم استدعاؤها من onclick
window.addToCartGlobal = (id, name, price, image) => {
    addToCart(id, name, price, image);
};

export const loadProducts = async () => {
    if (!productsContainer) return;

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productsContainer.innerHTML = ''; 
        
        if (querySnapshot.empty) {
            productsContainer.innerHTML = '<p>لا توجد منتجات حالياً.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productHTML = `
                <div class="product-card">
                    <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>${product.price} $</p>
                    <button onclick="window.addToCartGlobal('${doc.id}', '${product.name}', ${product.price}, '${product.image}')">أضف إلى السلة</button>
                </div>
            `;
            productsContainer.innerHTML += productHTML;
        });
    } catch (error) {
        console.error("خطأ في جلب المنتجات:", error);
        productsContainer.innerHTML = '<p>حدث خطأ في تحميل المنتجات.</p>';
    }
};

loadProducts();
