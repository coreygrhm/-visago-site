// VisaGo Landing Page — Language Switcher
// Must be loaded AFTER translations.js

function setPageLang(lang) {
    if (typeof VISAGO_TRANSLATIONS === "undefined") return;
    var t = VISAGO_TRANSLATIONS[lang];
    var en = VISAGO_TRANSLATIONS.en;
    if (!t) t = en;

    function T(key) { return t[key] || en[key] || ""; }

    // Nav
    var navFeatures = document.querySelector('a[href="#features"]');
    var navPricing = document.querySelector('a[href="#pricing"]');
    var navPartners = document.querySelector('a[href="#partners"]');
    var navCta = document.querySelector('.nav-cta');
    if (navFeatures) navFeatures.textContent = T("nav_features");
    if (navPricing) navPricing.textContent = T("nav_pricing");
    if (navPartners) navPartners.textContent = T("nav_partners");
    if (navCta) navCta.textContent = T("nav_download");

    // Hero
    var heroBadge = document.getElementById("t-hero-badge");
    if (heroBadge) heroBadge.innerHTML = "🇺🇸 🇪🇸 🇧🇷 🇫🇷 🇨🇳 🇯🇵 " + T("hero_badge");
    var heroTitle = document.getElementById("t-hero-title");
    if (heroTitle) heroTitle.innerHTML = T("hero_title_1") + " <span>" + T("hero_title_2") + "</span>";
    var heroSub = document.getElementById("t-hero-subtitle");
    if (heroSub) heroSub.textContent = T("hero_subtitle");
    var heroGplay = document.getElementById("t-hero-gplay");
    if (heroGplay) heroGplay.textContent = T("hero_google_play");
    var heroIos = document.getElementById("t-hero-ios");
    if (heroIos) heroIos.textContent = T("hero_ios_waitlist");

    // Stats
    var s1 = document.getElementById("t-stat-countries"); if (s1) s1.textContent = T("stat_countries");
    var s2 = document.getElementById("t-stat-tools"); if (s2) s2.textContent = T("stat_tools");
    var s3 = document.getElementById("t-stat-languages"); if (s3) s3.textContent = T("stat_languages");
    var s4 = document.getElementById("t-stat-offline"); if (s4) s4.textContent = T("stat_offline");

    // Features heading
    var fh = document.getElementById("t-feat-heading"); if (fh) fh.textContent = T("feat_heading");
    var fs = document.getElementById("t-feat-subheading"); if (fs) fs.textContent = T("feat_subheading");

    // Feature cards
    setFC("fc-countries", T("feat_countries"), T("badge_free"), "badge-free", T("feat_countries_desc"));
    setFC("fc-checklists", T("feat_checklists"), T("badge_free"), "badge-free", T("feat_checklists_desc"));
    setFC("fc-trip", T("feat_trip"), T("badge_free"), "badge-free", T("feat_trip_desc"));
    setFC("fc-currency", T("feat_currency"), T("badge_new"), "badge-new", T("feat_currency_desc"));
    setFC("fc-schengen", T("feat_schengen"), T("badge_premium"), "badge-premium", T("feat_schengen_desc"));
    setFC("fc-visa-stay", T("feat_visa_stay"), T("badge_premium"), "badge-premium", T("feat_visa_stay_desc"));
    setFC("fc-passport", T("feat_passport"), T("badge_premium"), "badge-premium", T("feat_passport_desc"));
    setFC("fc-nomad", T("feat_nomad"), T("badge_premium"), "badge-premium", T("feat_nomad_desc"));
    setFC("fc-docs", T("feat_docs"), null, null, T("feat_docs_desc"));
    setFC("fc-links", T("feat_links"), T("badge_new"), "badge-new", T("feat_links_desc"));
    setFC("fc-alerts", T("feat_alerts"), null, null, T("feat_alerts_desc"));
    setFC("fc-offline", T("feat_offline"), null, null, T("feat_offline_desc"));

    // Scam section
    var st = document.getElementById("t-scam-title"); if (st) st.textContent = T("scam_title");
    var sd = document.getElementById("t-scam-desc"); if (sd) sd.textContent = T("scam_desc");

    // Pricing
    var ph = document.getElementById("t-price-heading"); if (ph) ph.textContent = T("price_heading");
    var ps = document.getElementById("t-price-subheading"); if (ps) ps.textContent = T("price_subheading");
    var pm = document.getElementById("t-price-monthly"); if (pm) pm.textContent = T("price_monthly");
    var pa = document.getElementById("t-price-annual"); if (pa) pa.textContent = T("price_annual");
    var pmo = document.getElementById("t-price-mo"); if (pmo) pmo.textContent = T("price_mo");
    var pyr = document.getElementById("t-price-yr"); if (pyr) pyr.textContent = T("price_yr");
    var pbm = document.getElementById("t-price-billed-monthly"); if (pbm) pbm.textContent = T("price_billed_monthly");
    var pba = document.getElementById("t-price-billed-annual"); if (pba) pba.textContent = T("price_billed_annual");
    var pf = document.getElementById("t-price-free"); if (pf) pf.textContent = T("price_free_tier");
    document.querySelectorAll(".pricing-btn").forEach(function(b) { b.textContent = T("price_get_started"); });

    // Charity
    var ct = document.getElementById("t-charity-title"); if (ct) ct.textContent = T("charity_title");
    var cd = document.getElementById("t-charity-desc"); if (cd) cd.textContent = T("charity_desc");

    // Partners
    var pt2 = document.getElementById("t-partners-title"); if (pt2) pt2.textContent = T("partners_title");
    var pd2 = document.getElementById("t-partners-desc"); if (pd2) pd2.textContent = T("partners_desc");
    var pl = document.getElementById("t-partners-learn"); if (pl) pl.innerHTML = T("partners_learn_more") + " &rarr;";

    // Footer
    var fp = document.getElementById("t-footer-privacy"); if (fp) fp.textContent = T("footer_privacy");
    var ft2 = document.getElementById("t-footer-terms"); if (ft2) ft2.textContent = T("footer_terms");
    var fc = document.getElementById("t-footer-contact"); if (fc) fc.textContent = T("footer_contact");

    // Update active button
    document.querySelectorAll(".lang-btn").forEach(function(b) { b.classList.remove("active"); });
    var ab = document.querySelector('.lang-btn[data-lang="' + lang + '"]');
    if (ab) ab.classList.add("active");

    // Update URL and lang attribute
    var newUrl = lang === "en" ? window.location.pathname : window.location.pathname + "?lang=" + lang;
    try { history.replaceState(null, "", newUrl); } catch(e) {}
    document.documentElement.lang = lang;
}

function setFC(id, title, badgeText, badgeClass, desc) {
    var card = document.getElementById(id);
    if (!card) return;
    var h3 = card.querySelector("h3");
    var p = card.querySelector("p");
    if (h3) {
        if (badgeText && badgeClass) {
            h3.innerHTML = title + ' <span class="feature-badge ' + badgeClass + '">' + badgeText + '</span>';
        } else {
            h3.textContent = title;
        }
    }
    if (p) p.textContent = desc;
}

// Auto-initialize
(function() {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get("lang") || "en";
    if (lang !== "en") {
        // Run immediately if translations are loaded, otherwise wait
        if (typeof VISAGO_TRANSLATIONS !== "undefined") {
            setPageLang(lang);
        } else {
            document.addEventListener("DOMContentLoaded", function() { setPageLang(lang); });
        }
    }
})();
