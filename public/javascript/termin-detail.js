/* 
    Zweck: JavaScript für die Termin-Detailseite
    Nutzergruppe: Öffentlich (Interessent:innen)
    Funktion: Lädt Mock-Daten basierend auf URL-Parameter, zeigt Termin-Details an, verwaltet Anmeldeformular
    Backend-Integration: Wird später durch API-Calls ersetzt (GET für Termin-Details, POST für Anmeldung)
    Template: Nutzt termin-detail-template.js für wiederverwendbare Template-Generierung
*/

// ===== Mock-Daten: Statische Beispiel-Termine =====
// Diese Daten werden später vom Backend per API geladen
const mockTermine = {
    1: {
        id: 1,
        titel: 'Workshop: Webentwicklung Grundlagen',
        beschreibung: 'Ein umfassender Workshop zur Einführung in moderne Webentwicklung. Sie lernen die Grundlagen von HTML, CSS und JavaScript kennen und erstellen Ihre erste interaktive Webseite. Der Workshop richtet sich an Einsteiger:innen und vermittelt praxisnahe Kenntnisse.',
        datum: '20.12.2025',
        uhrzeitVon: '10:00',
        uhrzeitBis: '14:00',
        ort: 'Hörsaal A, Gebäude 1',
        anmeldefrist: '19.12.2025',
        status: 'verfügbar',
        maxTeilnehmer: 30,
        aktuelleTeilnehmer: 15
    },
    2: {
        id: 2,
        titel: 'Seminar: Projektmanagement',
        beschreibung: 'Praktische Methoden und Tools für erfolgreiches Projektmanagement. In diesem Seminar lernen Sie bewährte Techniken kennen, um Projekte effizient zu planen, zu steuern und erfolgreich abzuschließen. Ideal für alle, die ihre Projektmanagement-Skills verbessern möchten.',
        datum: '28.12.2025',
        uhrzeitVon: '09:00',
        uhrzeitBis: '17:00',
        ort: 'Seminarraum B, Gebäude 2',
        anmeldefrist: '25.12.2025',
        status: 'verfügbar',
        maxTeilnehmer: 25,
        aktuelleTeilnehmer: 12
    },
    3: {
        id: 3,
        titel: 'Vortrag: Künstliche Intelligenz',
        beschreibung: 'Aktuelle Entwicklungen und Anwendungen von KI in verschiedenen Bereichen. Erfahren Sie mehr über die neuesten Trends, praktische Anwendungsfälle und zukünftige Perspektiven der künstlichen Intelligenz.',
        datum: '10.01.2026',
        uhrzeitVon: '14:00',
        uhrzeitBis: '16:00',
        ort: 'Hörsaal C, Gebäude 1',
        anmeldefrist: '05.01.2026',
        status: 'ausgebucht',
        maxTeilnehmer: 50,
        aktuelleTeilnehmer: 50
    }
};

/**
 * Liest die Termin-ID aus der URL
 * @returns {number|null} - Die Termin-ID oder null, wenn nicht gefunden
 */
function getTerminIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id ? parseInt(id, 10) : null;
}

/**
 * Prüft, ob die Anmeldefrist noch nicht abgelaufen ist
 * @param {string} anmeldefrist - Das Datum der Anmeldefrist (Format: DD.MM.YYYY)
 * @returns {boolean} - true wenn Anmeldung noch möglich, false wenn abgelaufen
 */
function isAnmeldefristAktiv(anmeldefrist) {
    // Mock-Implementierung: Prüft, ob Anmeldefrist in der Zukunft liegt
    // Später wird dies durch Backend-Validierung ersetzt
    const heute = new Date();
    const [tag, monat, jahr] = anmeldefrist.split('.');
    const fristDatum = new Date(jahr, monat - 1, tag);
    
    return fristDatum >= heute;
}

/**
 * Lädt und zeigt die Termin-Details an
 * @param {Object} termin - Das Termin-Objekt mit allen Details
 */
function displayTerminDetails(termin) {
    // Titel und Status
    document.getElementById('termin-title').textContent = termin.titel;
    
    const statusBadge = document.getElementById('termin-status');
    if (termin.status === 'ausgebucht') {
        statusBadge.textContent = 'Ausgebucht';
        statusBadge.classList.add('termin-badge-full');
    } else {
        statusBadge.textContent = 'Verfügbar';
        statusBadge.classList.remove('termin-badge-full');
    }

    // Details
    document.getElementById('termin-description').textContent = termin.beschreibung;
    document.getElementById('termin-datum').textContent = termin.datum;
    document.getElementById('termin-uhrzeit').textContent = `${termin.uhrzeitVon} - ${termin.uhrzeitBis} Uhr`;
    document.getElementById('termin-ort').textContent = termin.ort;
    document.getElementById('termin-anmeldefrist').textContent = termin.anmeldefrist;

    // Prüfe, ob Anmeldung möglich ist
    const kannAnmelden = termin.status === 'verfügbar' && isAnmeldefristAktiv(termin.anmeldefrist);
    
    if (kannAnmelden) {
        // Zeige Anmeldeformular
        document.getElementById('anmeldung-section').style.display = 'block';
        document.getElementById('termin-unavailable').style.display = 'none';
    } else {
        // Zeige Meldung, dass Anmeldung nicht möglich ist
        document.getElementById('anmeldung-section').style.display = 'none';
        document.getElementById('termin-unavailable').style.display = 'block';
        
        const reasonElement = document.getElementById('unavailable-reason');
        if (termin.status === 'ausgebucht') {
            reasonElement.textContent = 'Der Termin ist bereits ausgebucht.';
        } else if (!isAnmeldefristAktiv(termin.anmeldefrist)) {
            reasonElement.textContent = 'Die Anmeldefrist ist bereits abgelaufen.';
        }
    }
}

/**
 * Behandelt das Absenden des Anmeldeformulars
 * @param {Event} event - Das Submit-Event
 */
function handleAnmeldungSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    
    // Formular zurücksetzen
    // Später wird hier die Anmeldung an das Backend gesendet
    form.reset();
}

/**
 * Initialisiert die Termin-Detailseite
 */
function initTerminDetail() {
    const terminId = getTerminIdFromUrl();
    
    if (!terminId) {
        // Keine ID gefunden - zeige Fehlermeldung
        document.getElementById('termin-detail').innerHTML = `
            <div class="message message-error">
                <p>Termin-ID nicht gefunden. Bitte wählen Sie einen Termin aus der Übersicht.</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">Zur Übersicht</a>
            </div>
        `;
        return;
    }

    // Lade Termin-Daten (Mock)
    // Später: GET /api/termine/{id}
    const termin = mockTermine[terminId];
    
    if (!termin) {
        // Termin nicht gefunden
        document.getElementById('termin-detail').innerHTML = `
            <div class="message message-error">
                <p>Der angeforderte Termin konnte nicht gefunden werden.</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">Zur Übersicht</a>
            </div>
        `;
        return;
    }

    // Zeige Termin-Details
    displayTerminDetails(termin);

    // Event Listener für Anmeldeformular
    const anmeldungForm = document.getElementById('anmeldung-form');
    if (anmeldungForm) {
        anmeldungForm.addEventListener('submit', handleAnmeldungSubmit);
    }
}

// Initialisiere Seite beim Laden
document.addEventListener('DOMContentLoaded', initTerminDetail);

