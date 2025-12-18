/* 
    Zweck: Template-System für Termin-Detailseiten
    Nutzergruppe: Alle (öffentlich und Anbieter:innen)
    Funktion: Generiert wiederverwendbares HTML-Template für Termin-Details
    Verwendung: Kann von verschiedenen Seiten aus aufgerufen werden
*/

/**
 * Erstellt das HTML-Template für eine Termin-Detailseite
 * @param {Object} termin - Das Termin-Objekt mit allen Details
 * @param {boolean} showAnmeldung - Ob das Anmeldeformular angezeigt werden soll
 * @returns {string} - Das generierte HTML
 */
function createTerminDetailTemplate(termin, showAnmeldung = true) {
    const statusBadge = termin.status === 'ausgebucht' 
        ? '<span class="termin-badge termin-badge-full">Ausgebucht</span>'
        : '<span class="termin-badge">Verfügbar</span>';

    const anmeldungSection = showAnmeldung ? `
        <section class="anmeldung-section" id="anmeldung-section">
            <h3 class="anmeldung-title">Anmeldung für diesen Termin</h3>
            
            <form class="anmeldung-form" id="anmeldung-form">
                <div class="form-group">
                    <label for="vorname" class="form-label">
                        Vorname <span class="required">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="vorname" 
                        name="vorname" 
                        class="form-input" 
                        required
                        placeholder="Ihr Vorname"
                    >
                </div>

                <div class="form-group">
                    <label for="nachname" class="form-label">
                        Nachname <span class="required">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="nachname" 
                        name="nachname" 
                        class="form-input" 
                        required
                        placeholder="Ihr Nachname"
                    >
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">
                        E-Mail-Adresse <span class="required">*</span>
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        class="form-input" 
                        required
                        placeholder="ihre.email@beispiel.de"
                    >
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary" id="anmeldung-submit">
                        Anmeldung absenden
                    </button>
                </div>
            </form>
        </section>
    ` : '';

    const unavailableSection = !showAnmeldung ? `
        <section class="termin-unavailable" id="termin-unavailable">
            <div class="message message-error">
                <p>Eine Anmeldung für diesen Termin ist nicht mehr möglich.</p>
                <p id="unavailable-reason">Der Termin ist ausgebucht oder die Anmeldefrist ist abgelaufen.</p>
            </div>
        </section>
    ` : '';

    return `
        <section class="termin-detail" id="termin-detail">
            <div class="termin-detail-header">
                <h2 class="termin-detail-title">${termin.titel}</h2>
                ${statusBadge}
            </div>

            <div class="termin-detail-content">
                <div class="termin-detail-info">
                    <div class="detail-item">
                        <span class="detail-label">Beschreibung:</span>
                        <p class="detail-value">${termin.beschreibung}</p>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Datum:</span>
                        <span class="detail-value">${termin.datum}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Uhrzeit:</span>
                        <span class="detail-value">${termin.uhrzeitVon} - ${termin.uhrzeitBis} Uhr</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Ort:</span>
                        <span class="detail-value">${termin.ort}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Anmeldefrist:</span>
                        <span class="detail-value">${termin.anmeldefrist}</span>
                    </div>
                </div>
            </div>
        </section>
        ${anmeldungSection}
        ${unavailableSection}
    `;
}

/**
 * Rendert das Termin-Detail-Template in einen Container
 * @param {HTMLElement} container - Der Container, in den das Template gerendert wird
 * @param {Object} termin - Das Termin-Objekt
 * @param {boolean} showAnmeldung - Ob das Anmeldeformular angezeigt werden soll
 */
function renderTerminDetailTemplate(container, termin, showAnmeldung = true) {
    container.innerHTML = createTerminDetailTemplate(termin, showAnmeldung);
}

