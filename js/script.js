//set URL for backend
setURL('http://gruppe-221.developerakademie.net/smallest_backend_ever');

let users = [];
let allTasks =[];


/**
 * This function is called if board.html is onload.
 * 
 */
async function initBoard() {
    await initUsers();
    let session = sessionStorage.getItem('session');
    let email = users.filter(s => s['email'] == window.atob(session));

    if (session != null && email.length > 0 ){
        includeHTML();
        navHighlightDesktop('navbarAnchor0', 'navbarLine0');
        navHighlightMobile('navbarAnchor4', 'navbarLine4');
        let awaitrenderProfileImg = setInterval(() => {
            if(imgIncluded()){
                renderProfileImg(email);
                clearInterval(awaitrenderProfileImg);
            }
        }, 20);
    } else {
        location.href = 'index.html'; //redirect to login
    }
}


async function initHelp() {
    await initUsers();
    includeHTML();
    navHighlightDesktop('navbarAnchor3', 'navbarLine3');
    navHighlightMobile('navbarAnchor7', 'navbarLine7');
}



function navHighlightDesktop(navbarAnchor, navbarLine){
    let awaitHeaderDesktop = setInterval(() => {
        if(headerIncludedDesktop()){
            highlightNavbarItem(navbarAnchor, navbarLine);
            clearInterval(awaitHeaderDesktop);
        }
    },20);
}


function navHighlightMobile(navbarAnchor, navbarLine){
    let awaitHeaderMobile = setInterval(() => {
        if(headerIncludedMobile()){
            highlightNavbarItem(navbarAnchor, navbarLine);
            clearInterval(awaitHeaderMobile);
        }
    },20);
}


/**
 * Check whether the headerProfile exists
 * 
 * @returns 
 */
function imgIncluded() {
    return document.getElementById('headerProfile');
}


function headerIncludedDesktop(){
    return document.getElementById('navbar');
}


function headerIncludedMobile(){
    return document.getElementById('navbarResponsive');
}

/**
 * Function changes the image for the current user
 * 
 * @param {string} email 
 */
function renderProfileImg(email){
    document.getElementById('headerProfile').src = `${email[0]['profileimage']}`;
}



async function initLogin(){
    await initUsers();
    checkSession();
}


/**
 * Load users from backend
 * 
 */
async function initUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}


/**
 * This function checks whether you want to log in as a guest. If yes, the input fields are disabled.
 * 
 */
function loginAsGuest() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let guestCheckbox = document.getElementById('guest');

    if (!guestCheckbox.checked) {
        email.value = "";
        password.value = "";
        email.disabled = false;
        password.disabled = false;
    } else {
        email.value = users[3]['email'];
        password.value = window.btoa(users[3]['password']);
        email.disabled = true;
        password.disabled = true;
    }
}


/**
 * This function is executed when a user wants to log in.
 * If it is a guest, he will be forwarded immediately, otherwise the user data will be checked.
 * 
 * 
 */
function validateUser(event) {
    event.preventDefault(); //prevent reloading page
    let email = document.getElementById('email').value;
    let encodedPassword = window.btoa(document.getElementById('password').value);
    let guestCheckbox = document.getElementById('guest').checked;

    if (guestCheckbox) { //log-in as guest
        saveSession(email);
        location.href = 'board.html'; //redirect to board
    } else if (email && encodedPassword) {
        checkUserdata(email, encodedPassword);
    }
}


/**
 * This function checks the user data.
 * First, the email is searched for in the users array. If it is present, a comparison is carried out.
 * If the email does not exist, an error message is issued.
 * 
 * @param {string} email 
 * @param {string} encodedPassword 
 */
function checkUserdata(email, encodedPassword) {
    let searchResult = users.filter(s => s['email'] == email);

    if (searchResult.length > 0) {
        checkPasswordToUsername(searchResult, email, encodedPassword);

    } else {
        document.getElementById('invalid-data').classList.remove('d-none');
        document.getElementById('invalid-data').innerHTML = `
            Invalid username!<br>Please try again.
            `;
    }
}


/**
 * This function checks whether the entered credentials match the data in the array.
 * 
 * @param {Array} searchResult 
 * @param {string} email 
 * @param {string} encodedPassword 
 */
function checkPasswordToUsername(searchResult, email, encodedPassword) {
    let emailOfsearchResult = searchResult[0]['email'];
    let passwordOfsearchResult = searchResult[0]['password'];

    if (email == emailOfsearchResult && encodedPassword == passwordOfsearchResult) {
        saveSession(email);
        location.href = 'board.html'; //redirect to board

    } else {
        console.log(email);
        document.getElementById('invalid-data').classList.remove('d-none');
        document.getElementById('invalid-data').innerHTML = `
        Invalid login data!<br>Please try again.
        `;
    }
}


/**1
 * This function turns off the error display. 
 * 
 */
function clearAlertspan() {
    document.getElementById('invalid-data').classList.add('d-none');
}


/**
 * This function saves the current session
 * 
 * @param {string} email 
 */
function saveSession(email) {
    sessionStorage.setItem('session', window.btoa(email));
}


/**
 * This function checks if usersession is available
 * 
 */
function checkSession() {
    let session = sessionStorage.getItem('session');
    let email = users.filter(s => s['email'] == window.atob(session));
    if (session != null && email.length > 0 ){
        location.href = 'board.html'; //redirect to board
    } else {
         // user have to log in
    }
}


function includeHTML(navbarAnchor, navbarLine) {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
           
            /* Exit the function: */
            return;
        }
    }
}


/**
 * This function opens a modal-dialog
 * 
 */
function openModal(content) {
    document.getElementById('legal').innerHTML = renderLegalStuff();
    let modal = document.getElementById(content);
    modal.style.display = "block";
}


/**
 * This function closes a modal-dialog
 * 
 */
function closeModal(content) {
    let modal = document.getElementById(content);
    modal.style.display = "none";
}


function renderLegalStuff() {
    return `<div id="legal-modal-imprint">
    <div class="legal-content">
        <span class="close" onclick="closeModal('legal-modal-imprint')">&times;</span>
        <h1>Impressum</h1>
        <p>Angaben gem???? ?? 5 TMG</p>
        <p>Alexander Bachmann <br>
            Kriemhildstra??e 7<br>
            04279 Leipzig <br>
        </p>
        <p> <strong>Vertreten durch: </strong><br>
            Alexander Bachmann<br>
        </p>
        <p><strong>Kontakt:</strong> <br>
            E-Mail: <a href="mailto:alex20bachmann@gmx.de">alex20bachmann@gmx.de</a><br></p>
        <p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung f??r Links</strong><br><br>
            Unser Angebot enth??lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb k??nnen wir f??r diese fremden Inhalte auch keine Gew??hr ??bernehmen. F??r die Inhalte der
            verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
            wurden zum Zeitpunkt der Verlinkung auf m??gliche Rechtsverst????e ??berpr??ft. Rechtswidrige Inhalte waren
            zum
            Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
            ist
            jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p><br>
        Impressum vom <a href="https://www.impressum-generator.de">Impressum Generator</a> der <a
            href="https://www.kanzlei-hasselbach.de/">Kanzlei Hasselbach, Rechtsanw??lte f??r Arbeitsrecht und
            Familienrecht</a>
    </div>
</div>
<div id="legal-modal-dataprotection">
    <div class="legal-content">
        <span class="close" onclick="closeModal('legal-modal-dataprotection')">&times;</span>
        <h1>Datenschutzerkl??rung</h1>
        <p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung
            (DSGVO), ist:</p>
        <p>Alexander Bachmann</p>
        <h2>Ihre Betroffenenrechte</h2>
        <p>Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten k??nnen Sie jederzeit folgende
            Rechte aus??ben:</p>
        <ul>
            <li>Auskunft ??ber Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
            <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
            <li>L??schung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
            <li>Einschr??nkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch
                nicht l??schen d??rfen (Art. 18 DSGVO),</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
            <li>Daten??bertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag
                mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
        </ul>
        <p>Sofern Sie uns eine Einwilligung erteilt haben, k??nnen Sie diese jederzeit mit Wirkung f??r die
            Zukunft widerrufen.</p>
        <p>Sie k??nnen sich jederzeit mit einer Beschwerde an eine Aufsichtsbeh??rde wenden, z. B. an die
            zust??ndige Aufsichtsbeh??rde des Bundeslands Ihres Wohnsitzes oder an die f??r uns als verantwortliche
            Stelle zust??ndige Beh??rde.</p>
        <p>Eine Liste der Aufsichtsbeh??rden (f??r den nicht??ffentlichen Bereich) mit Anschrift finden Sie unter:
            <a href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html" target="_blank"
                rel="noopener nofollow">https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html</a>.
        </p>
        <p></p>
        <h2>Erfassung allgemeiner Informationen beim Besuch unserer Website</h2>
        <h3>Art und Zweck der Verarbeitung:</h3>
        <p>Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig
            Informationen ??bermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese
            Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete
            Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ??hnliches.
        </p>
        <p>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
        <ul>
            <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
            <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
            <li>Auswertung der Systemsicherheit und -stabilit??t sowie</li>
            <li>zur Optimierung unserer Website.</li>
        </ul>
        <p>Wir verwenden Ihre Daten nicht, um R??ckschl??sse auf Ihre Person zu ziehen. Informationen dieser Art
            werden von uns ggfs. anonymisiert statistisch ausgewertet, um unseren Internetauftritt und die
            dahinterstehende Technik zu optimieren. </p>
        <h3>Rechtsgrundlage und berechtigtes Interesse:</h3>
        <p>Die Verarbeitung erfolgt gem???? Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses
            an der Verbesserung der Stabilit??t und Funktionalit??t unserer Website.</p>
        <h3>Empf??nger:</h3>
        <p>Empf??nger der Daten sind ggf. technische Dienstleister, die f??r den Betrieb und die Wartung unserer
            Webseite als Auftragsverarbeiter t??tig werden.</p>
        <p></p>
        <h3>Speicherdauer:</h3>
        <p>Die Daten werden gel??scht, sobald diese f??r den Zweck der Erhebung nicht mehr erforderlich sind. Dies
            ist f??r die Daten, die der Bereitstellung der Website dienen, grunds??tzlich der Fall, wenn die
            jeweilige Sitzung beendet ist. </p>
        <p></p>
        <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
        <p>Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich
            vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsf??higkeit unserer Website
            nicht gew??hrleistet. Zudem k??nnen einzelne Dienste und Services nicht verf??gbar oder eingeschr??nkt
            sein. Aus diesem Grund ist ein Widerspruch ausgeschlossen. </p>
        <p></p>
        <h2>Cookies</h2>
        <p>Wie viele andere Webseiten verwenden wir auch so genannte ???Cookies???. Bei Cookies handelt es sich um
            kleine Textdateien, die auf Ihrem Endger??t (Laptop, Tablet, Smartphone o.??.) gespeichert werden,
            wenn Sie unsere Webseite besuchen. </p>
        <p>Sie k??nnen Sie einzelne Cookies oder den gesamten Cookie-Bestand l??schen. Dar??ber hinaus erhalten Sie
            Informationen und Anleitungen, wie diese Cookies gel??scht oder deren Speicherung vorab blockiert
            werden k??nnen. Je nach Anbieter Ihres Browsers finden Sie die notwendigen Informationen unter den
            nachfolgenden Links:</p>
        <ul>
            <li>Mozilla Firefox: <a
                    href="https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen"
                    target="_blank"
                    rel="nofollow noopener">https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen</a>
            </li>
            <li>Internet Explorer: <a
                    href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                    rel="nofollow noopener">https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies</a>
            </li>
            <li>Google Chrome: <a href="https://support.google.com/accounts/answer/61416?hl=de" target="_blank"
                    rel="nofollow noopener">https://support.google.com/accounts/answer/61416?hl=de</a></li>
            <li>Opera: <a href="http://www.opera.com/de/help" target="_blank"
                    rel="nofollow noopener">http://www.opera.com/de/help</a></li>
            <li>Safari: <a href="https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE"
                    target="_blank"
                    rel="nofollow noopener">https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE</a>
            </li>
        </ul>
        <h3>Speicherdauer und eingesetzte Cookies:</h3>
        <p>Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die Verwendung von Cookies erlauben,
            k??nnen folgende Cookies auf unseren Webseiten zum Einsatz kommen:</p>
        <p>Dauer der aktiven Sitzung.</p>
        <h2>Technisch notwendige Cookies </h2>
        <h3>Art und Zweck der Verarbeitung: </h3>
        <p>Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige Elemente unserer
            Internetseite erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel identifiziert
            werden kann.</p>
        <p>Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites f??r die Nutzer
            zu vereinfachen. Einige Funktionen unserer Internetseite k??nnen ohne den Einsatz von Cookies nicht
            angeboten werden. F??r diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel
            wiedererkannt wird.</p>
        <p>F??r folgende Anwendungen ben??tigen wir Cookies:</p>
        <p></p>
        <h3>Rechtsgrundlage und berechtigtes Interesse: </h3>
        <p>Die Verarbeitung erfolgt gem???? Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses
            an einer nutzerfreundlichen Gestaltung unserer Website.</p>
        <h3>Empf??nger: </h3>
        <p>Empf??nger der Daten sind ggf. technische Dienstleister, die f??r den Betrieb und die Wartung unserer
            Website als Auftragsverarbeiter t??tig werden.</p>
        <p></p>
        <h3>Bereitstellung vorgeschrieben oder erforderlich:</h3>
        <p>Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich
            vorgeschrieben. Ohne diese Daten ist jedoch der Dienst und die Funktionsf??higkeit unserer Website
            nicht gew??hrleistet. Zudem k??nnen einzelne Dienste und Services nicht verf??gbar oder eingeschr??nkt
            sein.</p>
        <h3>Widerspruch</h3>
        <p>Lesen Sie dazu die Informationen ??ber Ihr Widerspruchsrecht nach Art. 21 DSGVO weiter unten.</p>
        <p></p>
        <h2>Verwendung von Scriptbibliotheken (Google Webfonts)</h2>
        <p>Um unsere Inhalte browser??bergreifend korrekt und grafisch ansprechend darzustellen, verwenden wir
            auf dieser Website ???Google Web Fonts??? der Google LLC (1600 Amphitheatre Parkway, Mountain View, CA
            94043, USA; nachfolgend ???Google???) zur Darstellung von Schriften.</p>
        <p>Weitere Informationen zu Google Web Fonts finden Sie unter <a
                href="https://developers.google.com/fonts/faq" rel="noopener nofollow"
                target="_blank">https://developers.google.com/fonts/faq</a> und in der Datenschutzerkl??rung von
            Google: <a href="https://www.google.com/policies/privacy/" rel="noopener nofollow"
                target="_blank">https://www.google.com/policies/privacy/</a>.</p>
        <p></p>
        <hr>
        <h2>Information ??ber Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
        <h3>Einzelfallbezogenes Widerspruchsrecht</h3>
        <p>Sie haben das Recht, aus Gr??nden, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen
            die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO
            (Datenverarbeitung auf der Grundlage einer Interessenabw??gung) erfolgt, Widerspruch einzulegen; dies
            gilt auch f??r ein auf diese Bestimmung gest??tztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.</p>
        <p>Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei
            denn, wir k??nnen zwingende schutzw??rdige Gr??nde f??r die Verarbeitung nachweisen, die Ihre
            Interessen, Rechte und Freiheiten ??berwiegen, oder die Verarbeitung dient der Geltendmachung,
            Aus??bung oder Verteidigung von Rechtsanspr??chen.</p>
        <h3>Empf??nger eines Widerspruchs</h3>
        <p></p>
        <hr>
        <h2>??nderung unserer Datenschutzbestimmungen</h2>
        <p>Wir behalten uns vor, diese Datenschutzerkl??rung anzupassen, damit sie stets den aktuellen
            rechtlichen Anforderungen entspricht oder um ??nderungen unserer Leistungen in der
            Datenschutzerkl??rung umzusetzen, z.B. bei der Einf??hrung neuer Services. F??r Ihren erneuten Besuch
            gilt dann die neue Datenschutzerkl??rung.</p>
        <h2>Fragen an den Datenschutzbeauftragten</h2>
        <p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich
            direkt an die f??r den Datenschutz verantwortliche Person in unserer Organisation:</p>
        <p></p>
        <p><em>Die Datenschutzerkl??rung wurde mithilfe der activeMind AG erstellt, den Experten f??r <a
                    href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/" target="_blank"
                    rel="noopener">externe Datenschutzbeauftragte</a> (Version #2020-09-30).</em></p>
    </div>
</div>
`;
}


/**
 * Updates the local array "tasks" to the backend in string element "tasks".
 */
 async function updateBoardTasksToBackend() {
    let boardArrayAsJSON = tasks;
    //console.log('Loaded array to backlog', boardArrayAsJSON);
    await backend.setItem('tasks', JSON.stringify(boardArrayAsJSON));
}