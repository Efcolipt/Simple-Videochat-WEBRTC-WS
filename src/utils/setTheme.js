export default function setTheme(theme) {
  localStorage.setItem('theme-preference', theme);
  document.getElementsByTagName('body')[0].setAttribute('data-theme', theme);
}
