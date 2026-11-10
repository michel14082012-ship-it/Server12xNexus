// ===== Nexus × Server12 — script.js =====

// ---------- Navegación / buscador ----------
const form = document.getElementById("proxyForm");
const input = document.getElementById("urlInput");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  let target;
  // ¿Parece una URL o una búsqueda?
  if (/^https?:\/\//i.test(value)) {
    target = value;
  } else if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(value)) {
    target = "https://" + value;
  } else {
    target = "https://www.google.com/search?q=" + encodeURIComponent(value);
  }

  // Cambia esto cuando Server12 tenga su backend de proxy:
  // por ahora abre en una pestaña nueva (o viaja a Nexus).
  const PROXY_MODE = "direct"; // "direct" | "nexus"

  if (PROXY_MODE === "nexus") {
    window.location.href =
      "https://nexus-is.onthewifi.com/#" + encodeURIComponent(target);
  } else {
    window.open(target, "_blank", "noopener");
  }
});

// ---------- Tecla de pánico (Esc → Google Classroom) ----------
const PANIC_URL = "https://classroom.google.com/";

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.location.replace(PANIC_URL);
  }
});

// ---------- Tab cloak: disimular la pestaña ----------
const CLOAKS = [
  { title: "Google Classroom", icon: "https://www.google.com/s2/favicons?domain=classroom.google.com&sz=64" },
  { title: "Google Drive", icon: "https://www.google.com/s2/favicons?domain=drive.google.com&sz=64" },
  { title: "Docs", icon: "https://www.google.com/s2/favicons?domain=docs.google.com&sz=64" },
  { title: "Nexus × Server12", icon: null }, // original
];

let cloakIndex = 0;

document.getElementById("cloakBtn").addEventListener("click", () => {
  cloakIndex = (cloakIndex + 1) % CLOAKS.length;
  const cloak = CLOAKS[cloakIndex];
  document.title = cloak.title;
  const favicon = document.getElementById("favicon");
  if (cloak.icon) {
    favicon.href = cloak.icon;
  } else {
    favicon.href =
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>";
  }
});

// ---------- Scroll suave para los enlaces del nav ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});
