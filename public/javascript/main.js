import '../assets/javascript/pace.js';

// If the theme is not defined, which means the user is new to the website, set the default theme mode based on what the what the system prefers. Dark or light.
if (!window.localStorage.getItem('theme-mode')) window.localStorage.setItem('theme-mode', window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
