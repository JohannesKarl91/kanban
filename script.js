//set URL for backend
setURL('http://gruppe-221.developerakademie.net/smallest_backend_ever');

let users = [];

/**
 * Load users from backend
 * 
 */
async function initUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('test')) || [];
}
