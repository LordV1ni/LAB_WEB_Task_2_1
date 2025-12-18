/* 
    Zweck: JavaScript für das Dashboard
    Nutzergruppe: Anbieter:innen
    Funktion: Lädt und zeigt alle Termine des angemeldeten Anbieters an
    Backend-Integration: Wird später durch API-Call ersetzt (GET /api/termine mit JWT-Token)
*/

// ===== Mock-Daten: Statische Beispiel-Termine des Anbieters =====
// Diese Daten werden später vom Backend per API geladen: GET /api/termine
const mockAnbieterTermine = [
    {
        id: 1,
        titel: 'Workshop: Webentwicklung Grundlagen',
        datum: '20.12.2025',
        uhrzeitVon: '10:00',
        uhrzeitBis: '14:00',
        ort: 'Hörsaal A, Gebäude 1',
        anmeldefrist: '19.12.2025',
        status: 'verfügbar',
        anmeldungen: 15,
        maxTeilnehmer: 30
    },
    {
        id: 2,
        titel: 'Seminar: Projektmanagement',
        datum: '28.12.2025',
        uhrzeitVon: '09:00',
        uhrzeitBis: '17:00',
        ort: 'Seminarraum B, Gebäude 2',
        anmeldefrist: '25.12.2025',
        status: 'verfügbar',
        anmeldungen: 12,
        maxTeilnehmer: 25
    },
    {
        id: 3,
        titel: 'Vortrag: Künstliche Intelligenz',
        datum: '10.01.2026',
        uhrzeitVon: '14:00',
        uhrzeitBis: '16:00',
        ort: 'Hörsaal C, Gebäude 1',
        anmeldefrist: '05.01.2026',
        status: 'ausgebucht',
        anmeldungen: 50,
        maxTeilnehmer: 50
    }
];

/**
 * Erstellt eine Termin-Karte für das Dashboard
 * @param {Object} termin - Das Termin-Objekt
 * @returns {HTMLElement} - Das erstellte Karten-Element
 */
function createTerminCard(termin) {
    const card = document.createElement('article');
    card.className = 'termin-card';
    card.setAttribute('data-termin-id', termin.id);

    const statusBadge = termin.status === 'ausgebucht' 
        ? '<span class="termin-badge termin-badge-full">Ausgebucht</span>'
        : '<span class="termin-badge">Verfügbar</span>';

    card.innerHTML = `
        <div class="termin-card-header">
            <h3 class="termin-title">${termin.titel}</h3>
            ${statusBadge}
        </div>
        <div class="termin-card-body">
            <div class="termin-info">
                <div class="info-item">
                    <span class="info-label">Datum:</span>
                    <span class="info-value">${termin.datum}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Uhrzeit:</span>
                    <span class="info-value">${termin.uhrzeitVon} - ${termin.uhrzeitBis} Uhr</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ort:</span>
                    <span class="info-value">${termin.ort}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Anmeldungen:</span>
                    <span class="info-value">${termin.anmeldungen} / ${termin.maxTeilnehmer}</span>
                </div>
            </div>
        </div>
        <div class="termin-card-footer termin-card-footer-actions">
            <!-- Button zur Anmeldeliste - lädt später die Anmeldeliste des Termins -->
            <a href="anmeldeliste.html?id=${termin.id}" class="btn btn-secondary">Anmeldeliste anzeigen</a>
            <!-- Button zur öffentlichen Detailseite - zeigt Termin wie Interessent:innen es sehen -->
            <a href="termin-detail.html?id=${termin.id}" class="btn btn-primary">Details anzeigen</a>
        </div>
    `;

    return card;
}

/**
 * Lädt und zeigt die Termine an
 */
function displayTermine() {
    const terminList = document.getElementById('termin-list');
    const emptyState = document.getElementById('empty-state');

    // Mock: Lade Termine
    // Später: GET /api/termine (mit JWT-Token)
    const termine = mockAnbieterTermine;

    if (termine.length === 0) {
        terminList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    terminList.style.display = 'grid';
    emptyState.style.display = 'none';

    // Leere Liste
    terminList.innerHTML = '';

    // Füge Termine hinzu
    termine.forEach(termin => {
        const card = createTerminCard(termin);
        terminList.appendChild(card);
    });
}

/**
 * Initialisiert das Dashboard
 */
function initDashboard() {
    // Mock: Prüfe, ob Benutzer angemeldet ist
    // Später: Prüfe JWT-Token, leite zu Login weiter wenn nicht vorhanden
    console.log('Mock: Prüfe Authentifizierung...');
    console.log('Mock: Bei echter Implementierung würde JWT-Token geprüft werden');

    // Lade und zeige Termine
    displayTermine();
}

// Initialisiere Seite beim Laden
document.addEventListener('DOMContentLoaded', initDashboard);

