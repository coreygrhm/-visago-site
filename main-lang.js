// VisaGo Landing Page — Language Switcher
// Reads translations from /translations.js (VISAGO_TRANSLATIONS global)

function setPageLang(lang) {
    var t = VISAGO_TRANSLATIONS[lang] || VISAGO_TRANSLATIONS.en;
    var en = VISAGO_TRANSLATIONS.en;

    // Nav
    var navFeatures = document.querySelector('a[href="#features"]');
    var navPricing = document.querySelector('a[href="#pricing"]');
    var navPartners = document.querySelector('a[href="#partners"]');
    var navCta = document.querySelector('.nav-cta');
    if (navFeatures) navFeatures.textContent = t.nav_features || en.nav_features;
    if (navPricing) navPricing.textContent = t.nav_pricing || en.nav_pricing;
    if (navPartners) navPartners.textContent = t.nav_partners || en.nav_partners;
    if (navCta) navCta.textContent = t.nav_download || en.nav_download;

    // Hero
    setText("t-hero-badge", t.hero_badge || en.hero_badge);
    setHtml("t-hero-title", (t.hero_title_1 || en.hero_title_1) + " <span>" + (t.hero_title_2 || en.hero_title_2) + "</span>");
    setText("t-hero-subtitle", t.hero_subtitle || en.hero_subtitle);
    setText("t-hero-gplay", t.hero_google_play || en.hero_google_play);
    setText("t-hero-ios", t.hero_ios_waitlist || en.hero_ios_waitlist);
    setText("t-stat-countries", t.stat_countries || en.stat_countries);
    setText("t-stat-tools", t.stat_tools || en.stat_tools);
    setText("t-stat-languages", t.stat_languages || en.stat_languages);
    setText("t-stat-offline", t.stat_offline || en.stat_offline);

    // Features section
    setText("t-feat-heading", t.feat_heading || en.feat_heading);
    setText("t-feat-subheading", t.feat_subheading || en.feat_subheading);

    // Feature cards
    setFeatureCard("fc-countries", t.feat_countries || en.feat_countries, t.badge_free || en.badge_free, "badge-free", t.feat_countries_desc || en.feat_countries_desc);
    setFeatureCard("fc-checklists", t.feat_checklists || en.feat_checklists, t.badge_free || en.badge_free, "badge-free", t.feat_checklists_desc || en.feat_checklists_desc);
    setFeatureCard("fc-trip", t.feat_trip || en.feat_trip, t.badge_free || en.badge_free, "badge-free", t.feat_trip_desc || en.feat_trip_desc);
    setFeatureCard("fc-currency", t.feat_currency || en.feat_currency, t.badge_new || en.badge_new, "badge-new", t.feat_currency_desc || en.feat_currency_desc);
    setFeatureCard("fc-schengen", t.feat_schengen || en.feat_schengen, t.badge_premium || en.badge_premium, "badge-premium", t.feat_schengen_desc || en.feat_schengen_desc);
    setFeatureCard("fc-visa-stay", t.feat_visa_stay || en.feat_visa_stay, t.badge_premium || en.badge_premium, "badge-premium", t.feat_visa_stay_desc || en.feat_visa_stay_desc);
    setFeatureCard("fc-passport", t.feat_passport || en.feat_passport, t.badge_premium || en.badge_premium, "badge-premium", t.feat_passport_desc || en.feat_passport_desc);
    setFeatureCard("fc-nomad", t.feat_nomad || en.feat_nomad, t.badge_premium || en.badge_premium, "badge-premium", t.feat_nomad_desc || en.feat_nomad_desc);
    setFeatureCard("fc-docs", t.feat_docs || en.feat_docs, null, null, t.feat_docs_desc || en.feat_docs_desc);
    setFeatureCard("fc-links", t.feat_links || en.feat_links, t.badge_new || en.badge_new, "badge-new", t.feat_links_desc || en.feat_links_desc);
    setFeatureCard("fc-alerts", t.feat_alerts || en.feat_alerts, null, null, t.feat_alerts_desc || en.feat_alerts_desc);
    setFeatureCard("fc-offline", t.feat_offline || en.feat_offline, null, null, t.feat_offline_desc || en.feat_offline_desc);

    // Scam section
    setText("t-scam-title", t.scam_title || en.scam_title);
    setText("t-scam-desc", t.scam_desc || en.scam_desc);

    // Pricing
    setText("t-price-heading", t.price_heading || en.price_heading);
    setText("t-price-subheading", t.price_subheading || en.price_subheading);
    setText("t-price-monthly", t.price_monthly || en.price_monthly);
    setText("t-price-annual", t.price_annual || en.price_annual);
    setText("t-price-mo", t.price_mo || en.price_mo);
    setText("t-price-yr", t.price_yr || en.price_yr);
    setText("t-price-billed-monthly", t.price_billed_monthly || en.price_billed_monthly);
    setText("t-price-billed-annual", t.price_billed_annual || en.price_billed_annual);
    var getBtns = document.querySelectorAll(".pricing-btn");
    getBtns.forEach(function(b) { b.textContent = t.price_get_started || en.price_get_started; });
    setText("t-price-free", t.price_free_tier || en.price_free_tier);

    // Best Value badge
    var bestVal = document.querySelector(".pricing-card.featured::before");
    // Can't change pseudo-element text via JS, so we use a data attribute approach
    var featuredCard = document.querySelector(".pricing-card.featured");
    if (featuredCard) featuredCard.setAttribute("data-badge", t.price_best_value || en.price_best_value);

    // Charity
    setText("t-charity-title", t.charity_title || en.charity_title);
    setText("t-charity-desc", t.charity_desc || en.charity_desc);

    // Partners
    setText("t-partners-title", t.partners_title || en.partners_title);
    setText("t-partners-desc", t.partners_desc || en.partners_desc);
    setText("t-partners-learn", t.partners_learn_more || en.partners_learn_more);

    // Footer
    setText("t-footer-privacy", t.footer_privacy || en.footer_privacy);
    setText("t-footer-terms", t.footer_terms || en.footer_terms);
    setText("t-footer-contact", t.footer_contact || en.footer_contact);

    // Update active lang button
    document.querySelectorAll(".lang-btn").forEach(function(b) { b.classList.remove("active"); });
    var activeBtn = document.querySelector('.lang-btn[data-lang="' + lang + '"]');
    if (activeBtn) activeBtn.classList.add("active");

    // Save preference
    try { localStorage.setItem("visago_lang", lang); } catch(e) {}

    // Update URL without reload
    var newUrl = lang === "en" ? "/" : "/?lang=" + lang;
    history.replaceState(null, "", newUrl);

    // Update html lang attribute
    document.documentElement.lang = lang;
}

function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setHtml(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function setFeatureCard(id, title, badgeText, badgeClass, desc) {
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

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get("lang") || "en";
    try {
        var saved = localStorage.getItem("visago_lang");
        if (saved && !params.get("lang")) lang = saved;
    } catch(e) {}

    if (lang !== "en") {
        setPageLang(lang);
    }
});
