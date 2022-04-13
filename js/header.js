/**
 * Opens header as responsive version.
 * @returns no return
 */
function openMobileMenu() {
  document.getElementById('navbarResponsive').style = "display:block;";
  document.getElementById('mobileMenu-btn').innerHTML = "&#10006;"
  document.getElementById('mobileMenu-btn').onclick = closeMobileMenu;
  //Highlight mobileNav
  highlightNav("mobile" + saveNav);
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