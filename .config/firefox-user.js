//-------------------------------|
//  Based on LibreWolf settings  |
//-------------------------------|

// -------------------------------
// # SANITIZING, TP, SESSIONS
// -------------------------------

/**
 strict mode includes:
 - dFPI for both normal and private browsing
 - strict blocking lists for trackers, including crypto, fping and socialtracking
 - shims to avoid breakage caused by blocking lists
 - stricter policies for xorigin referrers
 - cookie cleaning mechanism specific to dFPI
*/
pref("browser.contentblocking.category", "strict");

pref("network.cookie.cookieBehavior", 5); // dFPI is default for strict mode, but enforce
pref("network.cookie.lifetimePolicy", 2); // keep cookies until end of the session, then clear

// make third party and http cookies session-only
pref("network.cookie.thirdparty.sessionOnly", true);
pref("network.cookie.thirdparty.nonsecureSessionOnly", true);

/**
 this way of sanitizing cookies would override the exceptions set by the users and just delete everything,
 we disable it but cookies and site data are still cleared per session unless exceptions are set.
 all the cleaning prefs true by default except for siteSetting and offlineApps, which is what we want.
*/
pref("privacy.clearOnShutdown.cookies", false);
pref("privacy.sanitize.sanitizeOnShutdown", true);
pref("privacy.sanitize.timeSpan", 0);

// disable browsing, search and form history
//pref("places.history.enabled", false);
pref("browser.formfill.enable", false);

// prevent websites from storing session data like cookies and forms, increase time between session saves
pref("browser.sessionstore.privacy_level", 2);
pref("browser.sessionstore.interval", 60000);

// ----------------------
// # NETWORKING
// ----------------------

// https and mixed content
pref("dom.security.https_only_mode", true); // only allow https in all windows, including private browsing
pref("network.auth.subresource-http-auth-allow", 1); // stop cross-origin resources from using HTTP authentication
pref("security.insecure_connection_text.enabled", true); // display http websites as insecure in the ui
pref("security.mixed_content.block_display_content", true); // block insecure passive content

pref("network.dns.disableIPv6", true); // disable ipv6

// always send xorigin referer but trim them
pref("network.http.referer.XOriginPolicy", 0); // default, might be worth changing to 2
pref("network.http.referer.XOriginTrimmingPolicy", 2); // trim referer to only send scheme, host and port

pref("network.file.disable_unc_paths", true); // hidden, disable using uniform naming convention
pref("network.IDN_show_punycode", true); // use punycode in idn to prevent spoofing

// proxy
pref("network.proxy.socks_remote_dns", true); // forces dns query through the proxy when using one
pref("network.gio.supported-protocols", ""); // disable gio as it could bypass proxy

// doh
pref("network.trr.confirmationNS", "skip"); // skip undesired doh test connection
/**
 0 = default
 1 = browser picks faster
 2 = DoH with system dns fallback
 3 = DoH without fallback
 5 = DoH is off, default currently
 
 below prefs must be applied with pref in order to work
*/
pref pref("network.trr.mode", 2);
pref pref("network.trr.uri", "https://dns.quad9.net/dns-query");

// prefetching
pref("network.dns.disablePrefetch", true); // disable dns prefetching
pref("network.predictor.enabled", false); // disable predictor
pref("network.prefetch-next", false); // disable link prefetching
pref("network.http.speculative-parallel-limit", 0); // disable prefetching on mouse over

pref("network.manage-offline-status", false); // let user control the offline behavior

// ------------
// # DOM
// ------------

// pop-ups and window related preferences
pref("dom.disable_beforeunload", true); // disable "confirm you want to leave" pop-ups on close
pref("dom.disable_open_during_load", true); // block pop-ups windows
pref("dom.popup_maximum", 4); // limit maximum number of pop-ups 
pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown"); // limit events that cause pop-ups
pref("dom.disable_window_move_resize", true); // block scripts from resizing windows
pref("browser.link.open_newwindow", 3); // open 'new windows' targeted links in 'new tab'
pref("browser.link.open_newwindow.restriction", 0); // ignore the size when applying the above pref

// push notifications and service workeers
pref("dom.push.enabled", false); // disable push notifications
pref("dom.push.serverURL", ""); // default "wss://push.services.mozilla.com/"
pref("dom.serviceWorkers.enabled", false); // disable service workers, must enable for push notifications

// --------------------------------
// # CACHE AND TEMPORARY FILES
// --------------------------------

pref("browser.cache.disk.enable", false); // disable disk cache
pref("browser.privatebrowsing.forceMediaMemoryCache", true); // block media cache from writing to disk in pb mode
pref("media.memory_cache_max_size", 65536); // increase max cache size to avoid playback issues caused by above setting

pref("browser.shell.shortcutFavicons", false); // disable shortcut favicons from being stored in profile
pref("browser.helperApps.deleteTempFileOnExit", true); // delete temporary files opened with external apps
pref("browser.pagethumbnails.capturing_disabled", true); // disable page thumbnails capturing

// ----------------------
// # MEDIA
// ----------------------

/**
 * limit potential private IP leaks for webrtc users.
 * mDNS protects the value on linux, osx and win10+.
 * these prefs protect the value when allowing mic and camera access, and for win7/8.x.
 * */
//pref("media.peerconnection.ice.no_host", true); // don't use any private IPs for ICE candidate
pref("media.peerconnection.ice.default_address_only", true); // use a single interface for ICE candidates, the vpn one when a vpn is used
pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true); // force webrtc inside proxy, when one is used

// autoplay
pref("media.autoplay.blocking_policy", 2); // only allow to play when a certain element is clicked
pref("media.autoplay.default", 5); // personal preference, currently apply blocking policy to all autplay including muted

// --------------------------------------
// # FINGERPRINTING
// --------------------------------------

pref("privacy.resistFingerprinting", true); // master switch

// rfp compatibility settings
pref("privacy.resistFingerprinting.block_mozAddonManager", true); // prevents rfp from breaking AMO
pref("browser.startup.blankWindow", false); // if set to true it breaks RFP windows resizing
pref("browser.display.use_system_colors", false); // default but enforced due to RFP

pref("privacy.resistFingerprinting.letterboxing", false); // expose hidden letterboxing pref, but do not enable by default

/**
 * increase the size of new RFP windows for better usability, while still using a rounded value.
 * if the screen resolution is lower it will stretch to the biggest possible rounded value.
 * */
pref("privacy.window.maxInnerWidth", 1600);
pref("privacy.window.maxInnerHeight", 900);

pref("webgl.disabled", true); // master switch, disable webgl

// --------------------------------
// # SECURITY
// --------------------------------

pref("fission.autostart", true); // enable fission by default

// certificates
pref("security.cert_pinning.enforcement_level", 2); // enable strict public key pinning
pref("security.pki.sha1_enforcement_level", 1); // disable sha-1 certificates
pref("security.OCSP.enabled", 0); // disable ocsp fetching

// crl with no ocsp fallback
pref("security.remote_settings.crlite_filters.enabled", true);
pref("security.pki.crlite_mode", 2);

// safe negotiation
pref("security.ssl.require_safe_negotiation", true); // block websites that do not support safe negotiation, occasional breakage
pref("security.ssl.treat_unsafe_negotiation_as_broken", true); // show warning when safe negotiation is not enable and website is accessed

// tls behavior
pref("security.tls.enable_0rtt_data", false); // disable 0 round trip time to improve tls 1.3 security
pref("security.tls.version.enable-deprecated", false); // default but helps resetting the preference
pref("browser.ssl_override_behavior", 1); // prepopulate url on ssl warning screens
pref("browser.xul.error_pages.expert_bad_cert", true); // advanced ui infos for broken connections

// permissions
pref("permissions.delegation.enabled", false); // force permission request to show the real origin
pref("permissions.manager.defaultsUrl", ""); // revoke special permissions from some mozilla domains

pref("gfx.font_rendering.opentype_svg.enabled", false); // disale svg opentype fonts

pref("browser.download.useDownloadDir", false); // force user interaction on downloads, by always asking location

pref("security.csp.enable", true); // default

// ---------------------------------
// # SAFE BROWSING
// ---------------------------------

// disable safe browsing, including the fetch of updates and all outgoing connections 
pref("browser.safebrowsing.malware.enabled", false);
pref("browser.safebrowsing.phishing.enabled", false);
pref("browser.safebrowsing.blockedURIs.enabled", false);
pref("browser.safebrowsing.provider.google4.gethashURL", "");
pref("browser.safebrowsing.provider.google4.updateURL", "");
pref("browser.safebrowsing.provider.google.gethashURL", "");
pref("browser.safebrowsing.provider.google.updateURL", "");

// disable safe browsing checks on downloads, both local and remote
pref("browser.safebrowsing.downloads.enabled", false);
pref("browser.safebrowsing.downloads.remote.enabled", false);
pref("browser.safebrowsing.downloads.remote.url", "");
pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
pref("browser.safebrowsing.downloads.remote.block_uncommon", false);

// other safe browsing options, all default but enforce
pref("browser.safebrowsing.passwords.enabled", false);
pref("browser.safebrowsing.provider.google4.dataSharing.enabled", false);
pref("browser.safebrowsing.provider.google4.dataSharingURL", "");

// -----------------------
// # DRM
// -----------------------

pref("media.eme.enabled", false); // disable drm content, master switch that also controls widevine plugin
pref("media.gmp-manager.url", "data:text/plain,"); // prevent outgoing connections when DRM is disabled

// disable the openh264 plugin
pref("media.gmp-provider.enabled", false);
pref("media.gmp-gmpopenh264.enabled", false);

// ---------------------------------------------
// # LOCATION, LANGUAGE AND REGION
// ---------------------------------------------

// use mozilla geo service as deault
pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");

// prevent use of OS location services
pref("geo.provider.ms-windows-location", false); // [WINDOWS]
pref("geo.provider.use_corelocation", false); // [MAC]
pref("geo.provider.use_gpsd", false); // [LINUX]

// show language as en-US for all users, regardless of their OS language and local version, to avoid leaking
pref("javascript.use_us_english_locale", true);
pref("intl.locale.requested", "en-US");
pref("privacy.spoof_english", 2);

// disable region updates
pref("browser.region.network.url", "");
pref("browser.region.update.enabled", false);

// --------------------------------
// # SEARCH AND URLBAR
// --------------------------------

// disable search suggestions
pref("browser.urlbar.suggest.searches", false);
pref("browser.search.suggest.enabled", false);

// firefox suggest, review to trim
pref("browser.urlbar.quicksuggest.scenario", "history"); // prevent opt-in, doesn't work alone
pref("browser.urlbar.quicksuggest.enabled", false); // disable suggest and hide its ui
pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false); // disable suggestions from firefox
pref("browser.urlbar.suggest.quicksuggest.sponsored", false); // disable sponsored suggestions
pref("browser.urlbar.quicksuggest.dataCollection.enabled", false); // default

pref("browser.search.region", "US"); // set a default search region for all users
pref("browser.search.update", false); // do not update open search search engines
pref("browser.urlbar.trimURLs", false); // do not trim urls in the urlbar

// urlbar-dns interactions, avoid unwanted and speculative connections
pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", 0);
pref("browser.urlbar.speculativeConnect.enabled", false);
pref("browser.fixup.alternate.enabled", false);

// ----------------------------------
// # BROWSER BEHAVIOR
// ----------------------------------

pref("app.update.auto", false); // disable update auto installs

// password manager
pref("signon.rememberSignons", false); // disable saving passwords in the browser
pref("signon.autofillForms", false); // disable username and password autofills
pref("signon.formlessCapture.enabled", false); // disable formless login capture

// autofill
pref("extensions.formautofill.available", "off");
pref("extensions.formautofill.addresses.enabled", false);
pref("extensions.formautofill.creditCards.enabled", false);
pref("extensions.formautofill.creditCards.available", false);
pref("extensions.formautofill.heuristics.enabled", false);

// mouse and input
pref("general.autoScroll", false); // prevent mouse middle click from triggering scrolling
pref("middlemouse.contentLoadURL", false); // prevent mouse middle click from opening links
pref("clipboard.autocopy", false); // disable autocopy to clibpboard

// containers
pref("privacy.userContext.enabled", true); // enable containers
pref("privacy.userContext.ui.enabled", true);  // enable containers ui

pref("pdfjs.enableScripting", false); // block pdf js scripting

pref("accessibility.force_disabled", 1); // block accessibility services

// devtools
pref("devtools.chrome.enabled", false); // disable chrome debugging tools
pref("devtools.debugger.remote-enabled", false); // default, disable remote debugging
pref("devtools.remote.adb.extensionURL", ""); // url to download ad extension
pref("devtools.selfxss.count", 0); // see https://gitlab.com/librewolf-community/browser/linux/-/issues/80

// misc
pref("browser.shell.checkDefaultBrowser", false); // do not check if default browser
pref("browser.aboutConfig.showWarning", false); // disable about:config warning
pref("browser.download.autohideButton", false); // hide download button automatically
pref("browser.download.manager.addToRecentDocs", false); // do not add downloads to recents
pref("browser.tabs.loadBookmarksInTabs", true); // always open bookmarks in new tab
pref("webchannel.allowObject.urlWhitelist", ""); // remove webchannel whitelist

// --------------------------------------
// # EXTENSIONS
// --------------------------------------

/**
 allow extensions to work on all domains.
 default is "debug-notes.log"
 */
pref("extensions.webextensions.restrictedDomains", "");

// set extensions scopes
pref("extensions.enabledScopes", 5); // hidden

pref("extensions.postDownloadThirdPartyPrompt", false); // force install prompt for thrid party extensions 

/**
 prevent users from adding lang packs, which would cause leaks.
 default is https://services.addons.mozilla.org/api/v3/addons/language-tools/?app=firefox&type=language&appversion=%VERSION%
*/
pref("extensions.getAddons.langpacks.url", "");

// about:addons ui
pref("extensions.getAddons.showPane", false); // disable recommendations section
pref("extensions.htmlaboutaddons.recommendations.enabled", false); // disable recommendations from addons list
pref("lightweightThemes.getMoreURL", ""); // disable button to get more themes

// background checking and updating of extensions
pref("extensions.update.enabled", false); // disable automatic checks for extension updates
pref("extensions.update.autoUpdateDefault", false); // disable automatic installs of extension updates
pref("extensions.getAddons.cache.enabled", false); // disable fetching of extension metadata

// extension firewall, disabled by default
pref defaultPref("extensions.webextensions.base-content-security-policy", "default-src 'none'; script-src 'none'; object-src 'none';");
pref defaultPref("extensions.webextensions.base-content-security-policy.v3", "default-src 'none'; script-src 'none'; object-src 'none';");

// report site issue, disable button and url for in depth defense
pref("extensions.webcompat-reporter.enabled", false);
pref("extensions.webcompat-reporter.newIssueEndpoint", "");

// system addons, prevent updates and strip url for in depth defense
pref("extensions.systemAddon.update.enabled", false);
pref("extensions.systemAddon.update.url", "");

// --------------------------------
// # URLS AND ANNOYANCES
// --------------------------------

// set librewolf support and releases urls
pref("app.support.baseURL", "https://librewolf.net/docs/faq/#");
pref("browser.search.searchEnginesURL", "https://librewolf.net/docs/faq/#how-do-i-add-a-search-engine");
pref("browser.geolocation.warning.infoURL", "https://librewolf.net/docs/faq/#how-do-i-enable-location-aware-browsing");
pref("app.feedback.baseURL", "https://librewolf.net/#questions");
pref("app.releaseNotesURL", "https://gitlab.com/librewolf-community/browser");
pref("app.releaseNotesURL.aboutDialog", "https://gitlab.com/librewolf-community/browser");
pref("app.update.url.details", "https://gitlab.com/librewolf-community/browser");
pref("app.update.url.manual", "https://gitlab.com/librewolf-community/browser");

// remove default handlers and translation engine
pref("gecko.handlerService.schemes.mailto.0.uriTemplate", "");
pref("gecko.handlerService.schemes.mailto.0.name", "");
pref("gecko.handlerService.schemes.mailto.1.uriTemplate", "");
pref("gecko.handlerService.schemes.mailto.1.name", "");
pref("gecko.handlerService.schemes.irc.0.uriTemplate", "");
pref("gecko.handlerService.schemes.irc.0.name", "");
pref("gecko.handlerService.schemes.ircs.0.uriTemplate", "");
pref("gecko.handlerService.schemes.ircs.0.name", "");
pref("browser.translation.engine", "");

// disable welcome, what is new pages and ui tour
pref("browser.startup.homepage_override.mstone", "ignore");
pref("startup.homepage_override_url", "about:blank");
pref("startup.homepage_welcome_url", "about:blank");
pref("startup.homepage_welcome_url.additional", "");
pref("browser.messaging-system.whatsNewPanel.enabled", false);
pref("browser.uitour.enabled", false);
pref("browser.uitour.url", "");

// hide annoying ui elements from about:protections
pref("browser.contentblocking.report.lockwise.enabled", false);
pref("browser.contentblocking.report.monitor.enabled", false);
pref("browser.contentblocking.report.hide_vpn_banner", true);
pref("browser.contentblocking.report.vpn.enabled", false);
pref("browser.contentblocking.report.show_mobile_app", false);

pref("browser.topsites.useRemoteSetting", false); // hide sponsored shortcuts button from about:preferences#home

// ------------------------------------
// # NEW TAB PAGE
// ------------------------------------

pref("browser.newtab.preload", false);
pref("browser.newtabpage.activity-stream.section.highlights.includeDownloads", false);
pref("browser.newtabpage.activity-stream.section.highlights.includeVisited", false);
pref("browser.newtabpage.activity-stream.feeds.topsites", false);

// hide pocket and sponsored content, from new tab page and search bar
pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
pref("browser.newtabpage.activity-stream.feeds.system.topstories", false);
pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
pref("browser.newtabpage.activity-stream.feeds.section.topstories.options", "{\"hidden\":true}"); // hide buggy pocket section from about:preferences#home
pref("browser.newtabpage.activity-stream.showSponsored", false);
pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
pref("browser.newtabpage.activity-stream.telemetry", false);
pref("browser.newtabpage.activity-stream.default.sites", "");
pref("browser.newtabpage.activity-stream.feeds.discoverystreamfeed", false);
pref("browser.newtabpage.activity-stream.discoverystream.enabled", false);
pref("browser.newtabpage.activity-stream.feeds.snippets", false); // default

// disable recommend as you browse
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);

// --------------------------------
// # TELEMETRY
// --------------------------------

pref("toolkit.telemetry.unified", false); // master switch
pref("toolkit.telemetry.enabled", false);  // master switch
pref("toolkit.telemetry.server", "data:,");
pref("toolkit.telemetry.archive.enabled", false);
pref("toolkit.telemetry.newProfilePing.enabled", false);
pref("toolkit.telemetry.updatePing.enabled", false);
pref("toolkit.telemetry.firstShutdownPing.enabled", false);
pref("toolkit.telemetry.shutdownPingSender.enabled", false);
pref("toolkit.telemetry.shutdownPingSender.enabledFirstSession", false); // default
pref("toolkit.telemetry.bhrPing.enabled", false);
pref("toolkit.telemetry.reportingpolicy.firstRun", false); // default
pref("toolkit.telemetry.cachedClientID", "");
pref("toolkit.telemetry.previousBuildID", "");
pref("toolkit.telemetry.server_owner", "");
pref("toolkit.coverage.opt-out", true); // hidden
pref("toolkit.telemetry.coverage.opt-out", true); // hidden
pref("toolkit.coverage.enabled", false);
pref("toolkit.coverage.endpoint.base", "");
pref("toolkit.crashreporter.infoURL", "");
pref("datareporting.healthreport.uploadEnabled", false);
pref("datareporting.policy.dataSubmissionEnabled", false);
pref("security.protectionspopup.recordEventTelemetry", false);
pref("browser.ping-centre.telemetry", false);

// crash report
pref("breakpad.reportURL", "");
pref("browser.tabs.crashReporting.sendReport", false);

// normandy and studies
pref("app.normandy.enabled", false);
pref("app.normandy.api_url", "");
pref("app.shield.optoutstudies.enabled", false);

// personalized extension recommendations
pref("browser.discovery.enabled", false);
pref("browser.discovery.containers.enabled", false);
pref("browser.discovery.sites", "");

// connectivity checks
pref("network.connectivity-service.enabled", false);

// captive portal
pref("network.captive-portal-service.enabled", false);
pref("captivedetect.canonicalURL", "");

// prevent sending server side analytics
pref("beacon.enabled", false);

// --------------------------------
// # WINDOWS
// --------------------------------

// disable windows specific background update service
pref("app.update.service.enabled", false);
pref("app.update.background.scheduling.enabled", false);

pref("network.protocol-handler.external.ms-windows-store", false); // disable links launching windows store

pref("toolkit.winRegisterApplicationRestart", false); // disable automatic Firefox start and session restore after reboot

pref("security.family_safety.mode", 0); // disable win8.1 family safety cert

pref("default-browser-agent.enabled", false); // disable windows specific telemetry

pref("network.http.windows-sso.enabled", false); // disable MS auto authentication via sso

// -----------------------------------
// # OVERRIDES
// -----------------------------------

user_pref("browser.uidensity", 1);
user_pref("layout.spellcheckDefault", 0);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("ui.systemUsesDarkTheme", 1);

