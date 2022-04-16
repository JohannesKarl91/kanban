/**
 * Opens header as responsive version.
 * @returns no return
 */
function openMobileMenu() {
  document.getElementById('navbarResponsive').style = "display:block;";
  document.getElementById('mobileMenu-btn').innerHTML = "&#10006;"
  document.getElementById('mobileMenu-btn').onclick = closeMobileMenu;
}

/**
 * Closes header as responsive version.
 * @returns no return
 */
function closeMobileMenu() {
  document.getElementById('navbarResponsive').style = "display:none;";
  document.getElementById('mobileMenu-btn').innerHTML = "&#9776;"
  document.getElementById('mobileMenu-btn').onclick = openMobileMenu;
}


/**
 * Function to render content on right side.
 * 
 * @param {string} nav 
 */
function renderContent(navContent) {
  document.getElementById('innercontent').innerHTML = `
  <div w3-include-html="${navContent}.html"></div>
  `;
  includeHTML();
}


/**
 * Highlight the chosen header / navbar item.
 * @param {string} anchor 
 * @param {string} line 
 */
function highlightNavbarItem(anchor, line) {
  removeHighlightNavbarItem();
  let highlightedAnchor = document.getElementById(`${anchor}`);
  let highlightedLine = document.getElementById(`${line}`);
  highlightedAnchor.classList.add('d-bold');
  highlightedLine.classList.add('d-border');
}


/**
 * Removes all highlighted navbar items with class "d-bold" and "d-border".
 */
function removeHighlightNavbarItem() {
  for (i = 0; i < 12; i++) {
    let highlightedAnchor = document.getElementById(`navbarAnchor${i}`);
    highlightedAnchor.classList.remove('d-bold');
    let highlightedLine = document.getElementById(`navbarLine${i}`);
    highlightedLine.classList.remove('d-border');
  }
}