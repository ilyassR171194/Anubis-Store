// auth.js
import { auth } from './firebase.js';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ Google:", error);
        alert("فشل تسجيل الدخول. تأكد من أن النطاق مسموح به في Firebase.");
    }
};

export const loginWithGithub = async () => {
    try {
        await signInWithPopup(auth, githubProvider);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ GitHub:", error);
        alert("فشل تسجيل الدخول بـ GitHub. تأكد من إعدادات OAuth.");
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        console.error("خطأ في تسجيل الخروج:", error);
    }
};

// مراقبة حالة المستخدم
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split('/').pop(); // معرفة الصفحة الحالية
    
    if (user) {
        // المستخدم مسجل دخول
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.textContent = 'تسجيل الخروج';
            loginBtn.href = '#';
            loginBtn.onclick = (e) => { e.preventDefault(); logout(); };
        }
        
        // إذا كان في صفحة تسجيل الدخول، انتقل للرئيسية
        if (currentPage === 'login.html' || currentPage === '') {
            window.location.href = 'index.html';
        }
        
    } else {
        // المستخدم غير مسجل دخول -> أجبره على تسجيل الدخول
        if (currentPage !== 'login.html') {
            window.location.href = 'login.html';
        }
    }
});
