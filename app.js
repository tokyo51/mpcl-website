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

  // ---------- Contact form ----------
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const label = btn.querySelector("[data-i18n]");
      const status = document.getElementById("formStatus");
      const saved = label.textContent;
      const lang = document.documentElement.lang || "de";

      label.textContent = lang === "en" ? "Sending…" : "Wird gesendet…";
      btn.disabled = true;
      status.hidden = true;

      try {
        const res = await fetch("https://formsubmit.co/ajax/mail@mpcl.agency", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name.value,
            contact: form.contact.value,
            subject: form.subject.value,
            message: form.message.value,
            _subject: form.querySelector('[name="_subject"]').value,
            _honey: form.querySelector('[name="_honey"]').value,
            _captcha: "false",
            _template: "table"
          })
        });
        const json = await res.json();
        if (json.success) {
          form.reset();
          status.textContent = lang === "en"
            ? "✓ Message sent! I’ll get back to you shortly."
            : "✓ Nachricht gesendet! Ich melde mich in Kürze.";
          status.className = "hb-form__status hb-form__status--ok";
          status.hidden = false;
          label.textContent = saved;
          btn.disabled = false;
        } else {
          throw new Error("fail");
        }
      } catch (_) {
        status.textContent = lang === "en"
          ? "Something went wrong — please try again or call directly."
          : "Etwas hat nicht geklappt — bitte nochmal versuchen oder direkt anrufen.";
        status.className = "hb-form__status hb-form__status--err";
        status.hidden = false;
        label.textContent = saved;
        btn.disabled = false;
      }
    });
  }

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
