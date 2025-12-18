/* 
    Zweck: JavaScript für die Anmeldeliste
    Nutzergruppe: Anbieter:innen
    Funktion: Lädt und zeigt alle Anmeldungen zu einem Termin an
    Backend-Integration: Wird später durch API-Call ersetzt (GET /api/termine/{id}/anmeldungen mit JWT-Token)
*/

// ===== Mock-Daten: Statische Beispiel-Anmeldungen =====
// Diese Daten werden später vom Backend per API geladen: GET /api/termine/{id}/anmeldungen
const mockAnmeldungen = {
    1: [
        {
            id: 1,
            vorname: 'Max',
            nachname: 'Mustermann',
            email: 'max.mustermann@beispiel.de',
            anmeldedatum: '10.12.2025'
        },
        {
            id: 2,
            vorname: 'Anna',
            nachname: 'Schmidt',
            email: 'anna.schmidt@beispiel.de',
            anmeldedatum: '11.12.2025'
        },
        {
            id: 3,
            vorname: 'Peter',
            nachname: 'Müller',
            email: 'peter.mueller@beispiel.de',
            anmeldedatum: '12.12.2025'
        }
    ],
    2: [
        {
            id: 4,
            vorname: 'Lisa',
            nachname: 'Weber',
            email: 'lisa.weber@beispiel.de',
            anmeldedatum: '15.12.2025'
        },
        {
            id: 5,
            vorname: 'Thomas',
            nachname: 'Fischer',
            email: 'thomas.fischer@beispiel.de',
            anmeldedatum: '16.12.2025'
        }
    ],
    3: [
        {
            id: 6,
            vorname: 'Sarah',
            nachname: 'Wagner',
            email: 'sarah.wagner@beispiel.de',
            anmeldedatum: '02.01.2026'
        },
        {
            id: 7,
            vorname: 'Michael',
            nachname: 'Becker',
            email: 'michael.becker@beispiel.de',
            anmeldedatum: '03.01.2026'
        },
        {
            id: 8,
            vorname: 'Julia',
            nachname: 'Hoffmann',
            email: 'julia.hoffmann@beispiel.de',
            anmeldedatum: '04.01.2026'
        }
    ]
};

// Mock-Termin-Daten für die Anzeige
const mockTerminInfo = {
    1: {
        titel: 'Workshop: Webentwicklung Grundlagen',
        datum: '20.12.2025',
        uhrzeit: '10:00 - 14:00 Uhr'
    },
    2: {
        titel: 'Seminar: Projektmanagement',
        datum: '28.12.2025',
        uhrzeit: '09:00 - 17:00 Uhr'
    },
    3: {
        titel: 'Vortrag: Künstliche Intelligenz',
        datum: '10.01.2026',
        uhrzeit: '14:00 - 16:00 Uhr'
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
 * Zeigt die Termin-Informationen an
 * @param {Object} terminInfo - Die Termin-Informationen
 */
function displayTerminInfo(terminInfo) {
    document.getElementById('termin-titel').textContent = `Anmeldeliste: ${terminInfo.titel}`;
    
    const infoElement = document.getElementById('termin-info');
    infoElement.innerHTML = `
        <div class="info-item">
            <span class="info-label">Datum:</span>
            <span class="info-value">${terminInfo.datum}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Uhrzeit:</span>
            <span class="info-value">${terminInfo.uhrzeit}</span>
        </div>
    `;
}

/**
 * Erstellt eine Tabellenzeile für eine Anmeldung
 * @param {Object} anmeldung - Die Anmeldung
 * @returns {HTMLElement} - Die erstellte Tabellenzeile
 */
function createAnmeldungRow(anmeldung) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${anmeldung.vorname}</td>
        <td>${anmeldung.nachname}</td>
        <td>${anmeldung.email}</td>
        <td>${anmeldung.anmeldedatum}</td>
    `;
    return row;
}

/**
 * Lädt und zeigt die Anmeldungen an
 */
function displayAnmeldungen() {
    const terminId = getTerminIdFromUrl();
    
    if (!terminId) {
        document.querySelector('.anmeldeliste-section').innerHTML = `
            <div class="message message-error">
                <p>Termin-ID nicht gefunden. Bitte wählen Sie einen Termin aus dem Dashboard.</p>
                <a href="../dashboard.html" class="btn btn-primary" style="margin-top: 1rem;">Zum Dashboard</a>
            </div>
        `;
        return;
    }

    // Lade Termin-Info (Mock)
    // Später: GET /api/termine/{id}
    const terminInfo = mockTerminInfo[terminId];
    if (terminInfo) {
        displayTerminInfo(terminInfo);
    }

    // Lade Anmeldungen (Mock)
    // Später: GET /api/termine/{id}/anmeldungen
    const anmeldungen = mockAnmeldungen[terminId] || [];

    const tbody = document.getElementById('anmeldeliste-tbody');
    const table = document.getElementById('anmeldeliste-table');
    const emptyState = document.getElementById('empty-state');

    if (anmeldungen.length === 0) {
        table.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    table.style.display = 'table';
    emptyState.style.display = 'none';

    // Leere Tabelle
    tbody.innerHTML = '';

    // Füge Anmeldungen hinzu
    anmeldungen.forEach(anmeldung => {
        const row = createAnmeldungRow(anmeldung);
        tbody.appendChild(row);
    });
}

/**
 * Initialisiert die Anmeldeliste-Seite
 */
function initAnmeldeliste() {
    // Mock: Prüfe, ob Benutzer angemeldet ist
    // Später: Prüfe JWT-Token, leite zu Login weiter wenn nicht vorhanden
    console.log('Mock: Prüfe Authentifizierung...');
    console.log('Mock: Bei echter Implementierung würde JWT-Token geprüft werden');

    // Lade und zeige Anmeldungen
    displayAnmeldungen();
}

// Initialisiere Seite beim Laden
document.addEventListener('DOMContentLoaded', initAnmeldeliste);

