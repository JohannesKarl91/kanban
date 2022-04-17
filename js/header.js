let saveNavAnchor =""; //Save navpoints
let saveNavLine =""; //Save navpoints

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
 * Highlight the chosen header / navbar item.
 * @param {string} anchor 
 * @param {string} line 
 */
function highlightNavbarItem(anchor, line) {
  let highlightedAnchor = document.getElementById(anchor);
  let highlightedLine = document.getElementById(line);
  highlightedAnchor.classList.add('d-bold');
  highlightedLine.classList.add('d-border');
}