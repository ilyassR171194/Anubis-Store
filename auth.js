// auth.js
import { auth } from './firebase.js';
import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// دالة تسجيل الدخول باستخدام Google (بطريقة إعادة التوجيه)
export const loginWithGoogle = async () => {
    try {
        await signInWithRedirect(auth, googleProvider);
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ Google:", error);
        alert("فشل تسجيل الدخول. حاول مرة أخرى.");
    }
};

// دالة تسجيل الدخول باستخدام GitHub (بطريقة إعادة التوجيه)
export const loginWithGithub = async () => {
    try {
        await signInWithRedirect(auth, githubProvider);
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ GitHub:", error);
        alert("فشل تسجيل الدخول بـ GitHub.");
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

// معالجة نتيجة إعادة التوجيه بعد عودة المستخدم من Google
getRedirectResult(auth)
    .then((result) => {
        if (result) {
            console.log("تم تسجيل الدخول بنجاح:", result.user);
            window.location.href = 'index.html';
        }
    })
    .catch((error) => {
        console.error("خطأ في إعادة التوجيه:", error);
    });

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
