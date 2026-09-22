// auth.js
import { auth } from './firebase.js';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// دالة تسجيل الدخول باستخدام Google (النافذة المنبثقة)
export const loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ Google:", error);
        alert("فشل تسجيل الدخول. تأكد من أن النطاق مسموح به في Firebase.");
    }
};

// دالة تسجيل الدخول باستخدام GitHub
export const loginWithGithub = async () => {
    try {
        await signInWithPopup(auth, githubProvider);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ GitHub:", error);
        alert("فشل تسجيل الدخول بـ GitHub. تأكد من إعدادات OAuth.");
    }
};

// دالة تسجيل الخروج
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
    const currentPage = window.location.pathname.split('/').pop();
    
    if (user) {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.textContent = 'تسجيل الخروج';
            loginBtn.href = '#';
            loginBtn.onclick = (e) => { e.preventDefault(); logout(); };
        }
        
        if (currentPage === 'login.html' || currentPage === '') {
            window.location.href = 'index.html';
        }
    } else {
        if (currentPage !== 'login.html') {
            window.location.href = 'login.html';
        }
    }
});
