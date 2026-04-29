(function () {
  const storageKey = "tiago-website-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateToggleLabel(button) {
    const isDark = root.getAttribute("data-theme") === "dark";
    button.textContent = isDark ? "\u2600" : "\u263E";
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  updateToggleLabel(toggle);

  toggle.addEventListener("click", function () {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";

    applyTheme(next);
    localStorage.setItem(storageKey, next);
    updateToggleLabel(toggle);
  });
})();
