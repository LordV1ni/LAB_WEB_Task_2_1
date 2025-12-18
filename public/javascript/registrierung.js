/* 
    Zweck: JavaScript für die Registrierungs-Seite
    Nutzergruppe: Anbieter:innen
    Funktion: Behandelt Registrierungs-Formular, Weiterleitung zum Login
    Backend-Integration: Wird später durch API-Call ersetzt (POST /api/auth/register)
*/

/**
 * Behandelt das Absenden des Registrierungs-Formulars
 * @param {Event} event - Das Submit-Event
 */
function handleRegistrierungSubmit(event) {
    event.preventDefault();
    
    // Weiterleitung zum Login
    // Später wird hier die echte Registrierung stattfinden
    window.location.href = 'login.html';
}

/**
 * Initialisiert die Registrierungs-Seite
 */
function initRegistrierung() {
    const registrierungForm = document.getElementById('registrierung-form');
    if (registrierungForm) {
        registrierungForm.addEventListener('submit', handleRegistrierungSubmit);
    }
}

// Initialisiere Seite beim Laden
document.addEventListener('DOMContentLoaded', initRegistrierung);

