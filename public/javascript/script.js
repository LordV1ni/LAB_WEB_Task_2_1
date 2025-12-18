/* 
    Zweck: Frontend-Navigation für die Terminverwaltungs-Webseite
    Nutzergruppe: Alle (öffentlich und Anbieter:innen)
    Funktion: Navigation zwischen Seiten
*/

// ===== Navigation & Seitenwechsel =====

/**
 * Initialisiert die Navigation beim Laden der Seite
 * Setzt aktive Navigation-Links basierend auf der aktuellen Seite
 */
function initNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || 
            (currentPath.includes('index.html') && linkPath.includes('index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== Event Listeners =====

// Initialisiere Navigation beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

