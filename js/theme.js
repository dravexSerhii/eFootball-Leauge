(() => {
  const storageKey = "leagueColorMode";
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyMode(mode) {
    if (mode === "dark") root.dataset.colorMode = "dark";
    else delete root.dataset.colorMode;

    if (themeColor) themeColor.content = mode === "dark" ? "#101725" : "#f5f7fb";

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isDark = mode === "dark";
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      button.title = isDark ? "Switch to light theme" : "Switch to dark theme";
      button.querySelector("[data-theme-icon]").textContent = isDark ? "☀" : "☾";
    });
  }

  applyMode(localStorage.getItem(storageKey) === "dark" ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", () => {
    applyMode(root.dataset.colorMode === "dark" ? "dark" : "light");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const mode = root.dataset.colorMode === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(storageKey, mode);
        } catch (error) {
          console.error("Could not save the color theme preference.", error);
        }
        applyMode(mode);
      });
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) applyMode(event.newValue === "dark" ? "dark" : "light");
  });
})();
