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