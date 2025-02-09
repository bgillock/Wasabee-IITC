// todo complete/rework
type Statics = {
  CSS: { [name: string]: string };
  dialogNames: { [name: string]: string };
  [name: string]: any;
};

const statics: Statics = {
  CSS: {
    main: require("./css/wasabee.css"),
    autodraws: require("./css/autodraws.css"),
    toolbar: require("./css/toolbar.css"),
    map: require("./css/map.css"),
    panes: require("./css/panes.css"),
    smallScreen: require("./css/smallscreen.css"),
    // fix for dialogs on mobile from iitc dev version
    // to remove on >IITC-0.30.1
    iitcfix: require("./css/iitcfix.css"),
  },
  dialogNames: {
    linkDialogButton: "wasabee-addlinks",
    markerButton: "wasabee-marker",
    mustauth: "wasabee-mustauth",
    newopButton: "wasabee-newop",
    opsList: "wasabee-operations",
    opSettings: "wasabee-operation-settings",
    wasabeeButton: "wasabee-userinfo",
    linkList: "wasabee-linklist",
    markerList: "wasabee-markerlist",
    assign: "wasabee-assign",
    state: "wasabee-state",
    multimaxButton: "wasabee-multimax",
    importDialog: "wasabee-import",
    operationChecklist: "wasabee-operation-checklist",
    blockerList: "wasabee-blockerlist",
    exportDialog: "wasabee-export",
    keysList: "wasabee-keys",
    keyListPortal: "wasabee-keyByPortal",
    wasabeeDKeyButton: "wasabee-DKey",
    wasabeeDList: "wasabee-DList",
    madrid: "wasabee-madrid",
    autodraws: "wasabee-autodraws",
    starburst: "wasabee-starburst",
    savelinks: "wasabee-savelinks",
    settings: "wasabee-settings",
  },
  constants: {
    SELECTED_OP_KEY: "wasabee-selected-op",
    OPS_LIST_KEY: "wasabee-ops",
    OPS_LIST_HIDDEN_KEY: "wasabee-hidden-ops",
    OPS_SHOW_HIDDEN_OPS: "wasabee-show-hidden-ops",
    SEND_LOCATION_KEY: "wasabee-send-location",
    SEND_ANALYTICS_KEY: "wasabee-analytics",
    EXPERT_MODE_KEY: "wasabee-expert-mode",
    LANGUAGE_KEY: "wasabee-language",
    DEFAULT_LANGUAGE: "English",
    AGENT_INFO_KEY: "wasabee-me",
    LINK_SOURCE_KEY: "wasabee-link-source",
    ANCHOR_ONE_KEY: "wasabee-anchor-1",
    ANCHOR_TWO_KEY: "wasabee-anchor-2",
    ANCHOR_THREE_KEY: "wasabee-anchor-3",
    PORTAL_DETAIL_RATE_KEY: "wasabee-portaldetail-rate",
    SKIN_KEY: "wasabee-skin",
    LAST_MARKER_KEY: "wasabee-last-marker-type",
    AUTO_LOAD_FAKED: "wasabee-autoload-faked",
    TRAWL_SKIP_STEPS: "wasabee-trawl-skip",
    USE_PANES: "wasabee-use-panes",
    SKIP_CONFIRM: "wasabee-skip-confirm",
    OAUTH_CLIENT_ID:
      "269534461245-jbnes60ebd7u0b8naba19h4vqm7ji219.apps.googleusercontent.com",
    SERVER_BASE_KEY: "wasabee-server",
    SERVER_BASE_DEFAULT: "https://am.wasabee.rocks",
    REBASE_UPDATE_KEY: "wasabee-rebase-on-update",
    DEFAULT_MARKER_TYPE: "DestroyPortalAlert",
    QUICKDRAW_GUIDE_STYLE: {
      color: "#0f0",
      dashArray: [8, 2],
      opacity: 0.7,
      weight: 5,
      smoothFactor: 1,
      interactive: false,
    },
    WEBUI_DEFAULT: "https://webui.wasabee.rocks",
    JOIN_TEAM_TEMPLATE:
      "https://webui.wasabee.rocks/?server={server}#/team/{teamid}/join/{token}",
    FIREBASE_IFRAME: "https://cdn2.wasabee.rocks/iitcplugin/firebase/",
  },
  publicServers: [
    { name: "Americas", url: "https://am.wasabee.rocks", short: "🇺🇸" },
    { name: "Europe", url: "https://eu.wasabee.rocks", short: "🇪🇺" },
    { name: "Asia/Pacific", url: "https://ap.wasabee.rocks", short: "AP" },
  ],
};

statics.strings = {}; // empty object, fill it below
statics.strings["Deutsch"] = require("./translations/German.json");
statics.strings["Espanol"] = require("./translations/Spanish.json");
statics.strings["English"] = require("./translations/English.json");
statics.strings["Italiano"] = require("./translations/Italian.json");
statics.strings["Tagalog"] = require("./translations/Filipino.json");
statics.strings["Français"] = require("./translations/French.json");
statics.strings["Português"] = require("./translations/Portuguese.json");
statics.strings["Русский"] = require("./translations/Russian.json");
statics.strings["Dansk"] = require("./translations/Danish.json");

statics.defaultOperationColor = "orange";

statics.linkStyle = {
  dashArray: [5, 5, 1, 5],
  assignedDashArray: [4, 2, 1],
  opacity: 1,
  weight: 2,
};

statics.selfBlockStyle = {
  color: "#ff1111",
  dashArray: [1, 5],
  opacity: 4,
  weight: 3,
};

statics.backgroundLinkStyle = {
  dashArray: [8, 5],
  opacity: 0.4,
  weight: 2,
  color: "green",
  interactive: false,
};

statics.anchorTemplate = require("!raw-loader?esModule=false!./images/pin_custom.svg");

// https://leafletjs.com/reference-1.0.3.html#path
statics.layerTypes = new Map([
  [
    "main",
    {
      name: "main",
      displayName: "Red",
      color: "#ff0000",
    },
  ],
  [
    "groupa",
    {
      name: "groupa",
      displayName: "Orange",
      color: "#ff6600",
    },
  ],
  [
    "groupb",
    {
      name: "groupb",
      displayName: "Light Orange",
      color: "#ff9900",
    },
  ],
  [
    "groupc",
    {
      name: "groupc",
      displayName: "Tan",
      color: "#bb9900",
    },
  ],
  [
    "groupd",
    {
      name: "groupd",
      displayName: "Purple",
      color: "#bb22cc",
    },
  ],
  [
    "groupe",
    {
      name: "groupe",
      displayName: "Teal",
      color: "#33cccc",
    },
  ],
  [
    "groupf",
    {
      name: "groupf",
      displayName: "Pink",
      color: "#ff55ff",
    },
  ],
]);

export const constants = statics.constants;
export default statics;
