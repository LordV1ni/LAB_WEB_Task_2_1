/* 
    Zweck: JavaScript für die Login-Seite
    Nutzergruppe: Anbieter:innen
    Funktion: Behandelt Login-Formular, Weiterleitung zum Dashboard
    Backend-Integration: Wird später durch API-Call ersetzt (POST /api/auth/login)
*/

/**
 * Behandelt das Absenden des Login-Formulars
 * @param {Event} event - Das Submit-Event
 */
function handleLoginSubmit(event) {
    event.preventDefault();
    
    // Weiterleitung zum Dashboard
    // Später wird hier die echte Authentifizierung stattfinden
    window.location.href = 'dashboard.html';
}

/**
 * Initialisiert die Login-Seite
 */
function initLogin() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
}

// Initialisiere Seite beim Laden
document.addEventListener('DOMContentLoaded', initLogin);

