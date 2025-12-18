/* 
    Zweck: JavaScript für die Termin-Erstellen-Seite
    Nutzergruppe: Anbieter:innen
    Funktion: Behandelt Formular zum Erstellen eines neuen Termins, Weiterleitung zum Dashboard
    Backend-Integration: Wird später durch API-Call ersetzt (POST /api/termine mit JWT-Token)
*/

/**
 * Behandelt das Absenden des Termin-Erstellen-Formulars
 * @param {Event} event - Das Submit-Event
 */
function handleTerminErstellenSubmit(event) {
    event.preventDefault();
    
    // Weiterleitung zum Dashboard
    // Später wird hier der Termin erstellt und gespeichert
    window.location.href = 'dashboard.html';
}

/**
 * Initialisiert die Termin-Erstellen-Seite
 */
function initTerminErstellen() {
    const terminForm = document.getElementById('termin-erstellen-form');
    if (terminForm) {
        terminForm.addEventListener('submit', handleTerminErstellenSubmit);
    }
}

// Initialisiere Seite beim Laden
document.addEventListener('DOMContentLoaded', initTerminErstellen);

