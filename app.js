// MPCL Website — DE/EN i18n + scroll reveal
(function () {
  const STORAGE_LANG = "mpcl-lang";

  // ---------- i18n ----------
  const I18N = window.MPCL_I18N || { de: {}, en: {} };

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.de;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll(".lang-toggle button").forEach(btn => {
      btn.setAttribute("aria-current", btn.dataset.lang === lang ? "true" : "false");
    });
    try { localStorage.setItem(STORAGE_LANG, lang); } catch (e) {}
  }

  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  let savedLang = "de";
  try { savedLang = localStorage.getItem(STORAGE_LANG) || "de"; } catch (e) {}
  applyLang(savedLang);

  // ---------- Scroll reveal ----------
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

    document.querySelectorAll(".hb-section, .hb-hero").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      io.observe(el);
    });
  }
})();
