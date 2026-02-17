<template>
  <router-view />
</template>

<style>
:root{
  --font-display: "Playfair Display", serif;
  --font-heading: "Cormorant Garamond", serif;
  --font-body: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;

  --gold-1: #b38b2f;
  --gold-2: #ffeb9c;
  --glass: rgba(255,255,255,0.08);
  --glass-border: rgba(255,255,255,0.18);
}

html, body {
  height: 100%;
}

body{
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-family: var(--font-body);
  letter-spacing: 0.2px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

/* Smooth scroll for a premium feel */
html {
  scroll-behavior: smooth;
}

/* Selection polish */
::selection{
  background: rgba(255, 215, 0, 0.25);
}

body {
  margin: 0;
  font-family: 'Georgia', serif;
  overflow-x: hidden;
}
</style>

