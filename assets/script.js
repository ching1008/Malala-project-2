const menu = document.querySelector(".menu");
const links = document.querySelector(".nav-links");
if (menu && links) {
  menu.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });
}

const indexMenu = document.querySelector(".menu-btn");
const indexLinks = document.querySelector(".nav-links");
if (indexMenu && indexLinks) {
  indexMenu.addEventListener("click", () => {
    const open = indexLinks.classList.toggle("open");
    indexMenu.setAttribute("aria-expanded", open);
  });
}

const translationStyles = document.createElement("style");
translationStyles.textContent = `
  .language-switcher {
    position: fixed;
    z-index: 9999;
    right: 18px;
    bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #102d3b;
    color: #fff;
    border: 1px solid rgba(231,184,75,.7);
    border-radius: 8px;
    padding: 8px 10px;
    box-shadow: 0 12px 30px rgba(16,45,59,.22);
  }
  .language-switcher label { font-size: 12px; font-weight: 700; }
  .language-switcher select {
    border: 0;
    border-radius: 5px;
    background: #fff;
    color: #18313b;
    padding: 7px 8px;
    font: inherit;
    font-size: 12px;
  }
  #google_translate_element { position: fixed; left: -9999px; }
  .goog-te-banner-frame { display: none !important; }
  body { top: 0 !important; }
`;
document.head.appendChild(translationStyles);

const translateRoot = document.createElement("div");
translateRoot.id = "google_translate_element";
document.body.appendChild(translateRoot);

window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement({
    pageLanguage: "en",
    includedLanguages: "en,tl,hil",
    autoDisplay: false
  }, "google_translate_element");
};

const switcher = document.createElement("div");
switcher.className = "language-switcher";
switcher.innerHTML = `
  <label for="language-select">Language</label>
  <select id="language-select" aria-label="Choose language">
    <option value="en">English</option>
    <option value="tl">Filipino</option>
    <option value="hil">Hiligaynon</option>
  </select>
`;
document.body.appendChild(switcher);

const languageSelect = switcher.querySelector("#language-select");
const savedCookie = document.cookie.split("; ").find(row => row.startsWith("googtrans="));
const savedLanguage = savedCookie ? savedCookie.split("/").pop() : "en";
languageSelect.value = ["en", "tl", "hil"].includes(savedLanguage) ? savedLanguage : "en";

languageSelect.addEventListener("change", () => {
  const language = languageSelect.value;
  if (language === "en") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
  } else {
    document.cookie = "googtrans=/en/" + language + "; path=/";
  }
  location.reload();
});

const googleScript = document.createElement("script");
googleScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
googleScript.async = true;
document.body.appendChild(googleScript);
