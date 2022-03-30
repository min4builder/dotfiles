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
user_pref("browser.contentblocking.category", "strict");

user_pref("network.cookie.cookieBehavior", 5); // dFPI is default for strict mode, but enforce
user_pref("network.cookie.lifetimePolicy", 2); // keep cookies until end of the session, then clear

// make third party and http cookies session-only
user_pref("network.cookie.thirdparty.sessionOnly", true);
user_pref("network.cookie.thirdparty.nonsecureSessionOnly", true);

/**
 this way of sanitizing cookies would override the exceptions set by the users and just delete everything,
 we disable it but cookies and site data are still cleared per session unless exceptions are set.
 all the cleaning prefs true by default except for siteSetting and offlineApps, which is what we want.
*/
user_pref("privacy.clearOnShutdown.cookies", false);
user_pref("privacy.sanitize.sanitizeOnShutdown", true);
user_pref("privacy.sanitize.timeSpan", 0);

// disable browsing, search and form history
user_pref("browser.formfill.enable", false);

// prevent websites from storing session data like cookies and forms, increase time between session saves
user_pref("browser.sessionstore.privacy_level", 2);
user_pref("browser.sessionstore.interval", 60000);

// ----------------------
// # NETWORKING
// ----------------------

// https and mixed content
user_pref("dom.security.https_only_mode", true); // only allow https in all windows, including private browsing
user_pref("network.auth.subresource-http-auth-allow", 1); // stop cross-origin resources from using HTTP authentication
user_pref("security.insecure_connection_text.enabled", true); // display http websites as insecure in the ui
user_pref("security.mixed_content.block_display_content", true); // block insecure passive content

user_pref("network.dns.disableIPv6", true); // disable ipv6

// always send xorigin referer but trim them
user_pref("network.http.referer.XOriginPolicy", 0); // default, might be worth changing to 2
user_pref("network.http.referer.XOriginTrimmingPolicy", 2); // trim referer to only send scheme, host and port

user_pref("network.file.disable_unc_paths", true); // hidden, disable using uniform naming convention
user_pref("network.IDN_show_punycode", true); // use punycode in idn to prevent spoofing

// proxy
user_pref("network.proxy.socks_remote_dns", true); // forces dns query through the proxy when using one
user_pref("network.gio.supported-protocols", ""); // disable gio as it could bypass proxy

// doh
user_pref("network.trr.confirmationNS", "skip"); // skip undesired doh test connection
/**
 0 = default
 1 = browser picks faster
 2 = DoH with system dns fallback
 3 = DoH without fallback
 5 = DoH is off, default currently
 
 below prefs must be applied with pref in order to work
*/
user_pref("network.trr.mode", 2);
user_pref("network.trr.uri", "https://dns.quad9.net/dns-query");

// prefetching
user_pref("network.dns.disablePrefetch", true); // disable dns prefetching
user_pref("network.predictor.enabled", false); // disable predictor
user_pref("network.prefetch-next", false); // disable link prefetching
user_pref("network.http.speculative-parallel-limit", 0); // disable prefetching on mouse over

user_pref("network.manage-offline-status", false); // let user control the offline behavior

// ------------
// # DOM
// ------------

// pop-ups and window related preferences
user_pref("dom.disable_beforeunload", true); // disable "confirm you want to leave" pop-ups on close
user_pref("dom.disable_open_during_load", true); // block pop-ups windows
user_pref("dom.popup_maximum", 4); // limit maximum number of pop-ups 
user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown"); // limit events that cause pop-ups
user_pref("dom.disable_window_move_resize", true); // block scripts from resizing windows
user_pref("browser.link.open_newwindow", 3); // open 'new windows' targeted links in 'new tab'
user_pref("browser.link.open_newwindow.restriction", 0); // ignore the size when applying the above pref

// push notifications and service workeers
user_pref("dom.push.enabled", false); // disable push notifications
user_pref("dom.push.serverURL", ""); // default "wss://push.services.mozilla.com/"
user_pref("dom.serviceWorkers.enabled", false); // disable service workers, must enable for push notifications

// --------------------------------
// # CACHE AND TEMPORARY FILES
// --------------------------------

user_pref("browser.cache.disk.enable", false); // disable disk cache
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true); // block media cache from writing to disk in pb mode
user_pref("media.memory_cache_max_size", 65536); // increase max cache size to avoid playback issues caused by above setting

user_pref("browser.shell.shortcutFavicons", false); // disable shortcut favicons from being stored in profile
user_pref("browser.helperApps.deleteTempFileOnExit", true); // delete temporary files opened with external apps
user_pref("browser.pagethumbnails.capturing_disabled", true); // disable page thumbnails capturing

// ----------------------
// # MEDIA
// ----------------------

/**
 * limit potential private IP leaks for webrtc users.
 * mDNS protects the value on linux, osx and win10+.
 * these prefs protect the value when allowing mic and camera access, and for win7/8.x.
 * */
//pref("media.peerconnection.ice.no_host", true); // don't use any private IPs for ICE candidate
user_pref("media.peerconnection.ice.default_address_only", true); // use a single interface for ICE candidates, the vpn one when a vpn is used
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true); // force webrtc inside proxy, when one is used

// autoplay
user_pref("media.autoplay.blocking_policy", 2); // only allow to play when a certain element is clicked
user_pref("media.autoplay.default", 5); // personal preference, currently apply blocking policy to all autplay including muted

// --------------------------------------
// # FINGERPRINTING
// --------------------------------------

user_pref("privacy.resistFingerprinting", true); // master switch

// rfp compatibility settings
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true); // prevents rfp from breaking AMO
user_pref("browser.startup.blankWindow", false); // if set to true it breaks RFP windows resizing
user_pref("browser.display.use_system_colors", false); // default but enforced due to RFP

user_pref("privacy.resistFingerprinting.letterboxing", false); // expose hidden letterboxing pref, but do not enable by default

/**
 * increase the size of new RFP windows for better usability, while still using a rounded value.
 * if the screen resolution is lower it will stretch to the biggest possible rounded value.
 * */
user_pref("privacy.window.maxInnerWidth", 1600);
user_pref("privacy.window.maxInnerHeight", 900);

user_pref("webgl.disabled", true); // master switch, disable webgl

// --------------------------------
// # SECURITY
// --------------------------------

user_pref("fission.autostart", true); // enable fission by default

// certificates
user_pref("security.cert_pinning.enforcement_level", 2); // enable strict public key pinning
user_pref("security.pki.sha1_enforcement_level", 1); // disable sha-1 certificates
user_pref("security.OCSP.enabled", 0); // disable ocsp fetching

// crl with no ocsp fallback
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);

// safe negotiation
user_pref("security.ssl.require_safe_negotiation", true); // block websites that do not support safe negotiation, occasional breakage
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true); // show warning when safe negotiation is not enable and website is accessed

// tls behavior
user_pref("security.tls.enable_0rtt_data", false); // disable 0 round trip time to improve tls 1.3 security
user_pref("security.tls.version.enable-deprecated", false); // default but helps resetting the preference
user_pref("browser.ssl_override_behavior", 1); // prepopulate url on ssl warning screens
user_pref("browser.xul.error_pages.expert_bad_cert", true); // advanced ui infos for broken connections

// permissions
user_pref("permissions.delegation.enabled", false); // force permission request to show the real origin
user_pref("permissions.manager.defaultsUrl", ""); // revoke special permissions from some mozilla domains

user_pref("gfx.font_rendering.opentype_svg.enabled", false); // disale svg opentype fonts

user_pref("browser.download.useDownloadDir", false); // force user interaction on downloads, by always asking location

user_pref("security.csp.enable", true); // default

// ---------------------------------
// # SAFE BROWSING
// ---------------------------------

// disable safe browsing, including the fetch of updates and all outgoing connections 
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);
user_pref("browser.safebrowsing.blockedURIs.enabled", false);
user_pref("browser.safebrowsing.provider.google4.gethashURL", "");
user_pref("browser.safebrowsing.provider.google4.updateURL", "");
user_pref("browser.safebrowsing.provider.google.gethashURL", "");
user_pref("browser.safebrowsing.provider.google.updateURL", "");

// disable safe browsing checks on downloads, both local and remote
user_pref("browser.safebrowsing.downloads.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", "");
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);

// other safe browsing options, all default but enforce
user_pref("browser.safebrowsing.passwords.enabled", false);
user_pref("browser.safebrowsing.provider.google4.dataSharing.enabled", false);
user_pref("browser.safebrowsing.provider.google4.dataSharingURL", "");

// -----------------------
// # DRM
// -----------------------

user_pref("media.eme.enabled", false); // disable drm content, master switch that also controls widevine plugin
user_pref("media.gmp-manager.url", "data:text/plain,"); // prevent outgoing connections when DRM is disabled

// disable the openh264 plugin
user_pref("media.gmp-provider.enabled", false);
user_pref("media.gmp-gmpopenh264.enabled", false);

// ---------------------------------------------
// # LOCATION, LANGUAGE AND REGION
// ---------------------------------------------

// use mozilla geo service as deault
user_pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");

// prevent use of OS location services
user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
user_pref("geo.provider.use_corelocation", false); // [MAC]
user_pref("geo.provider.use_gpsd", false); // [LINUX]

// show language as en-US for all users, regardless of their OS language and local version, to avoid leaking
user_pref("javascript.use_us_english_locale", true);
user_pref("intl.locale.requested", "en-US");
user_pref("privacy.spoof_english", 2);

// disable region updates
user_pref("browser.region.network.url", "");
user_pref("browser.region.update.enabled", false);

// --------------------------------
// # SEARCH AND URLBAR
// --------------------------------

// disable search suggestions
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.search.suggest.enabled", false);

// firefox suggest, review to trim
user_pref("browser.urlbar.quicksuggest.scenario", "history"); // prevent opt-in, doesn't work alone
user_pref("browser.urlbar.quicksuggest.enabled", false); // disable suggest and hide its ui
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false); // disable suggestions from firefox
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false); // disable sponsored suggestions
user_pref("browser.urlbar.quicksuggest.dataCollection.enabled", false); // default

user_pref("browser.search.region", "US"); // set a default search region for all users
user_pref("browser.search.update", false); // do not update open search search engines
user_pref("browser.urlbar.trimURLs", false); // do not trim urls in the urlbar

// urlbar-dns interactions, avoid unwanted and speculative connections
user_pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", 0);
user_pref("browser.urlbar.speculativeConnect.enabled", false);
user_pref("browser.fixup.alternate.enabled", false);

// ----------------------------------
// # BROWSER BEHAVIOR
// ----------------------------------

user_pref("app.update.auto", false); // disable update auto installs

// password manager
user_pref("signon.rememberSignons", false); // disable saving passwords in the browser
user_pref("signon.autofillForms", false); // disable username and password autofills
user_pref("signon.formlessCapture.enabled", false); // disable formless login capture

// autofill
user_pref("extensions.formautofill.available", "off");
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.creditCards.enabled", false);
user_pref("extensions.formautofill.creditCards.available", false);
user_pref("extensions.formautofill.heuristics.enabled", false);

// mouse and input
user_pref("general.autoScroll", false); // prevent mouse middle click from triggering scrolling
user_pref("middlemouse.contentLoadURL", false); // prevent mouse middle click from opening links
user_pref("clipboard.autocopy", false); // disable autocopy to clibpboard

// containers
user_pref("privacy.userContext.enabled", true); // enable containers
user_pref("privacy.userContext.ui.enabled", true);  // enable containers ui

user_pref("pdfjs.enableScripting", false); // block pdf js scripting

user_pref("accessibility.force_disabled", 1); // block accessibility services

// devtools
user_pref("devtools.chrome.enabled", false); // disable chrome debugging tools
user_pref("devtools.debugger.remote-enabled", false); // default, disable remote debugging
user_pref("devtools.remote.adb.extensionURL", ""); // url to download ad extension
user_pref("devtools.selfxss.count", 0); // see https://gitlab.com/librewolf-community/browser/linux/-/issues/80

// misc
user_pref("browser.shell.checkDefaultBrowser", false); // do not check if default browser
user_pref("browser.aboutConfig.showWarning", false); // disable about:config warning
user_pref("browser.download.autohideButton", false); // hide download button automatically
user_pref("browser.download.manager.addToRecentDocs", false); // do not add downloads to recents
user_pref("browser.tabs.loadBookmarksInTabs", true); // always open bookmarks in new tab
user_pref("webchannel.allowObject.urlWhitelist", ""); // remove webchannel whitelist

// --------------------------------------
// # EXTENSIONS
// --------------------------------------

/**
 allow extensions to work on all domains.
 default is "debug-notes.log"
 */
user_pref("extensions.webextensions.restrictedDomains", "");

// set extensions scopes
user_pref("extensions.enabledScopes", 5); // hidden

user_pref("extensions.postDownloadThirdPartyPrompt", false); // force install prompt for thrid party extensions 

/**
 prevent users from adding lang packs, which would cause leaks.
 default is https://services.addons.mozilla.org/api/v3/addons/language-tools/?app=firefox&type=language&appversion=%VERSION%
*/
user_pref("extensions.getAddons.langpacks.url", "");

// about:addons ui
user_pref("extensions.getAddons.showPane", false); // disable recommendations section
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false); // disable recommendations from addons list
user_pref("lightweightThemes.getMoreURL", ""); // disable button to get more themes

// background checking and updating of extensions
user_pref("extensions.update.enabled", false); // disable automatic checks for extension updates
user_pref("extensions.update.autoUpdateDefault", false); // disable automatic installs of extension updates
user_pref("extensions.getAddons.cache.enabled", false); // disable fetching of extension metadata

// extension firewall, disabled by default
user_pref("extensions.webextensions.base-content-security-policy", "default-src 'none'; script-src 'none'; object-src 'none';");
user_pref("extensions.webextensions.base-content-security-policy.v3", "default-src 'none'; script-src 'none'; object-src 'none';");

// report site issue, disable button and url for in depth defense
user_pref("extensions.webcompat-reporter.enabled", false);
user_pref("extensions.webcompat-reporter.newIssueEndpoint", "");

// system addons, prevent updates and strip url for in depth defense
user_pref("extensions.systemAddon.update.enabled", false);
user_pref("extensions.systemAddon.update.url", "");

// --------------------------------
// # URLS AND ANNOYANCES
// --------------------------------

// set librewolf support and releases urls
user_pref("app.support.baseURL", "https://librewolf.net/docs/faq/#");
user_pref("browser.search.searchEnginesURL", "https://librewolf.net/docs/faq/#how-do-i-add-a-search-engine");
user_pref("browser.geolocation.warning.infoURL", "https://librewolf.net/docs/faq/#how-do-i-enable-location-aware-browsing");
user_pref("app.feedback.baseURL", "https://librewolf.net/#questions");
user_pref("app.releaseNotesURL", "https://gitlab.com/librewolf-community/browser");
user_pref("app.releaseNotesURL.aboutDialog", "https://gitlab.com/librewolf-community/browser");
user_pref("app.update.url.details", "https://gitlab.com/librewolf-community/browser");
user_pref("app.update.url.manual", "https://gitlab.com/librewolf-community/browser");

// remove default handlers and translation engine
user_pref("gecko.handlerService.schemes.mailto.0.uriTemplate", "");
user_pref("gecko.handlerService.schemes.mailto.0.name", "");
user_pref("gecko.handlerService.schemes.mailto.1.uriTemplate", "");
user_pref("gecko.handlerService.schemes.mailto.1.name", "");
user_pref("gecko.handlerService.schemes.irc.0.uriTemplate", "");
user_pref("gecko.handlerService.schemes.irc.0.name", "");
user_pref("gecko.handlerService.schemes.ircs.0.uriTemplate", "");
user_pref("gecko.handlerService.schemes.ircs.0.name", "");
user_pref("browser.translation.engine", "");

// disable welcome, what is new pages and ui tour
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("startup.homepage_override_url", "about:blank");
user_pref("startup.homepage_welcome_url", "about:blank");
user_pref("startup.homepage_welcome_url.additional", "");
user_pref("browser.messaging-system.whatsNewPanel.enabled", false);
user_pref("browser.uitour.enabled", false);
user_pref("browser.uitour.url", "");

// hide annoying ui elements from about:protections
user_pref("browser.contentblocking.report.lockwise.enabled", false);
user_pref("browser.contentblocking.report.monitor.enabled", false);
user_pref("browser.contentblocking.report.hide_vpn_banner", true);
user_pref("browser.contentblocking.report.vpn.enabled", false);
user_pref("browser.contentblocking.report.show_mobile_app", false);

user_pref("browser.topsites.useRemoteSetting", false); // hide sponsored shortcuts button from about:preferences#home

// ------------------------------------
// # NEW TAB PAGE
// ------------------------------------

user_pref("browser.newtab.preload", false);
user_pref("browser.newtabpage.activity-stream.section.highlights.includeDownloads", false);
user_pref("browser.newtabpage.activity-stream.section.highlights.includeVisited", false);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);

// hide pocket and sponsored content, from new tab page and search bar
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref("browser.newtabpage.activity-stream.feeds.system.topstories", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories.options", "{\"hidden\":true}"); // hide buggy pocket section from about:preferences#home
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.default.sites", "");
user_pref("browser.newtabpage.activity-stream.feeds.discoverystreamfeed", false);
user_pref("browser.newtabpage.activity-stream.discoverystream.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false); // default

// disable recommend as you browse
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);

// --------------------------------
// # TELEMETRY
// --------------------------------

user_pref("toolkit.telemetry.unified", false); // master switch
user_pref("toolkit.telemetry.enabled", false);  // master switch
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabledFirstSession", false); // default
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.reportingpolicy.firstRun", false); // default
user_pref("toolkit.telemetry.cachedClientID", "");
user_pref("toolkit.telemetry.previousBuildID", "");
user_pref("toolkit.telemetry.server_owner", "");
user_pref("toolkit.coverage.opt-out", true); // hidden
user_pref("toolkit.telemetry.coverage.opt-out", true); // hidden
user_pref("toolkit.coverage.enabled", false);
user_pref("toolkit.coverage.endpoint.base", "");
user_pref("toolkit.crashreporter.infoURL", "");
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("security.protectionspopup.recordEventTelemetry", false);
user_pref("browser.ping-centre.telemetry", false);

// crash report
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);

// normandy and studies
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
user_pref("app.shield.optoutstudies.enabled", false);

// personalized extension recommendations
user_pref("browser.discovery.enabled", false);
user_pref("browser.discovery.containers.enabled", false);
user_pref("browser.discovery.sites", "");

// connectivity checks
user_pref("network.connectivity-service.enabled", false);

// captive portal
user_pref("network.captive-portal-service.enabled", false);
user_pref("captivedetect.canonicalURL", "");

// prevent sending server side analytics
user_pref("beacon.enabled", false);

// --------------------------------
// # WINDOWS
// --------------------------------

// disable windows specific background update service
user_pref("app.update.service.enabled", false);
user_pref("app.update.background.scheduling.enabled", false);

user_pref("network.protocol-handler.external.ms-windows-store", false); // disable links launching windows store

user_pref("toolkit.winRegisterApplicationRestart", false); // disable automatic Firefox start and session restore after reboot

user_pref("security.family_safety.mode", 0); // disable win8.1 family safety cert

user_pref("default-browser-agent.enabled", false); // disable windows specific telemetry

user_pref("network.http.windows-sso.enabled", false); // disable MS auto authentication via sso

// -----------------------------------
// # OVERRIDES
// -----------------------------------

user_pref("browser.uidensity", 1);
user_pref("layout.spellcheckDefault", 0);
user_pref("privacy.clearOnShutdown.history", false);
user_pref("privacy.cpd.history", false);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("toolkit.tabbox.switchByScrolling", true);
user_pref("ui.systemUsesDarkTheme", 1);

