// auth.js
import { auth } from './firebase.js';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("تم تسجيل الدخول بنجاح:", result.user);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ Google:", error);
        alert("فشل تسجيل الدخول. تأكد من أن النطاق مسموح به في Firebase.");
    }
};

export const loginWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        console.log("تم تسجيل الدخول بنجاح:", result.user);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ GitHub:", error);
        alert("فشل تسجيل الدخول بـ GitHub. تأكد من إعدادات OAuth.");
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الخروج:", error);
    }
};

onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById('loginBtn');
    if (user) {
        if (loginBtn) {
            loginBtn.textContent = 'تسجيل الخروج';
            loginBtn.href = '#';
            loginBtn.onclick = (e) => { e.preventDefault(); logout(); };
        }
    } else {
        if (loginBtn) {
            loginBtn.textContent = 'تسجيل الدخول';
            loginBtn.href = 'login.html';
            loginBtn.onclick = null;
        }
    }
});
