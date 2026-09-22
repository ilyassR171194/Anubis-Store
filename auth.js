// js/auth.js
import { auth } from './firebase.js';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// إعداد مزودي تسجيل الدخول
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// دالة تسجيل الدخول باستخدام Google
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("تم تسجيل الدخول بنجاح:", result.user);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول بـ Google:", error);
        alert("فشل تسجيل الدخول. حاول مرة أخرى.");
    }
};

// دالة تسجيل الدخول باستخدام GitHub
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

// دالة تسجيل الخروج
export const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("خطأ في تسجيل الخروج:", error);
    }
};

// مراقبة حالة المستخدم وتحديث الواجهة
onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById('loginBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    
    if (user) {
        // المستخدم مسجل دخول
        if (loginBtn) {
            loginBtn.textContent = 'تسجيل الخروج';
            loginBtn.href = '#';
            loginBtn.onclick = (e) => {
                e.preventDefault();
                logout();
            };
        }
        if (dashboardBtn) dashboardBtn.style.display = 'inline-block';
        
        // حفظ بيانات المستخدم في المتصفح للاستخدام لاحقاً
        localStorage.setItem('userName', user.displayName || 'مستخدم');
        localStorage.setItem('userEmail', user.email || '');
    } else {
        // المستخدم غير مسجل دخول
        if (loginBtn) {
            loginBtn.textContent = 'تسجيل الدخول';
            loginBtn.href = 'login.html';
            loginBtn.onclick = null;
        }
        if (dashboardBtn) dashboardBtn.style.display = 'none';
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
    }
});
