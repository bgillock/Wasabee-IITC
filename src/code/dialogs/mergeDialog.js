import { WDialog } from "../leafletClasses";
import wX from "../wX";
// import WasabeeAgent from "../model/agent";
import WasabeeOp from "../model/operation";
// import Sortable from "../sortable";
import { getSelectedOperation, makeSelectedOperation } from "../selectedOp";

import { computeRebaseChanges, applyRebaseChanges } from "../model/changes";

// import PortalUI from "../ui/portal";
// import LinkUI from "../ui/link";

const MergeDialog = WDialog.extend({
  statics: {
    TYPE: "mergeDialog",
  },

  options: {
    // title
    // opOwn
    // opRemote
    // updateCallback
  },

  addHooks: function () {
    WDialog.prototype.addHooks.call(this);
    this._layer = new L.LayerGroup();
    this._layer.addTo(window.map);
    this._displayDialog();
  },

  removeHooks: function () {
    WDialog.prototype.addHooks.call(this);
    this._layer.remove();
  },

  rebase: async function (changes) {
    applyRebaseChanges(this._opRebase, this.options.opOwn, changes);
    await this._opRebase.store();
    if (getSelectedOperation().ID == this._opRebase.ID)
      await makeSelectedOperation(this._opRebase.ID);
    if (this.options.updateCallback)
      this.options.updateCallback(this._opRebase);
    this.closeDialog();
  },

  useServer: async function () {
    await this.options.opRemote.store();
    if (getSelectedOperation().ID == this.options.opRemote.ID)
      await makeSelectedOperation(this.options.opRemote.ID);
    this.closeDialog();
  },

  useLocal: function () {
    // nothing to do except upload
    if (this.options.updateCallback)
      this.options.updateCallback(this.options.opOwn);
    this.closeDialog();
  },

  _displayDialog: function () {
    this._opRebase = new WasabeeOp(this.options.opRemote);
    const origin = this.options.opOwn.getFetchedOp()
      ? new WasabeeOp(this.options.opOwn.getFetchedOp())
      : new WasabeeOp({
          // dummy op
          ID: this.options.opOwn.ID,
          name: this.options.opOwn.name,
          comment: this.options.opOwn.comment,
          color: this.options.opOwn.color,
          referencetime: this.options.opOwn.referencetime,
        });
    const changes = computeRebaseChanges(
      origin,
      this._opRebase,
      this.options.opOwn
    );
    console.debug(changes);
    const conflicts = [];

    for (const pc of changes.portals.conflict) {
      if (pc.type === "edition/edition") {
        conflicts.push({
          conflict: pc,
          masterValue: this._opRebase.getPortal(pc.id),
          followerValue: this.options.opOwn.getPortal(pc.id),
        });
      }
    }
    for (const zc of changes.zones.conflict) {
      if (zc.type === "edition/edition") {
        conflicts.push({
          conflict: zc,
          masterValue: this._opRebase.getZone(zc.id),
          followerValue: this.options.opOwn.getZone(zc.id),
        });
      }
    }
    // don't show double addition, caused by old export
    for (const mc of changes.markers.conflict) {
      if (mc.type !== "addition/addition") {
        conflicts.push({
          conflict: mc,
          masterValue: this._opRebase.getMarker(mc.id),
          followerValue: this.options.opOwn.getMarker(mc.id),
        });
      }
    }
    for (const lc of changes.links.conflict) {
      if (lc.type !== "addition/addition") {
        conflicts.push({
          conflict: lc,
          masterValue: this._opRebase.getLinkById(lc.id),
          followerValue: this.options.opOwn.getLinkById(lc.id),
        });
      }
    }

    if (conflicts.length === 0) {
      this.rebase(changes);
      return;
    }

    const content = L.DomUtil.create("div", "container");
    const desc = L.DomUtil.create("div", "desc", content);
    desc.textContent = wX("MERGE_MESSAGE", { opName: this.options.opOwn.name });

    L.DomUtil.create("h3", "", content).textContent = "Conflicts:";

    const details = L.DomUtil.create("table", "conflicts", content);
    const head = L.DomUtil.create("tr", "", details);
    // master head
    const masterHead = L.DomUtil.create("th", "master", head);
    masterHead.colSpan = 2;
    masterHead.textContent = "Master copy";
    const masterRadioHead = L.DomUtil.create(
      "input",
      "",
      L.DomUtil.create("th", "master", head)
    );
    masterRadioHead.type = "radio";
    masterRadioHead.name = this.options.opOwn.ID;
    // follower head
    const followerRadioHead = L.DomUtil.create(
      "input",
      "",
      L.DomUtil.create("th", "follower", head)
    );
    followerRadioHead.type = "radio";
    followerRadioHead.name = this.options.opOwn.ID;
    const followerHead = L.DomUtil.create("th", "follower", head);
    followerHead.colSpan = 2;
    followerHead.textContent = "Local copy";

    L.DomEvent.on(masterRadioHead, "change", () => {
      if (masterRadioHead.checked) {
        details
          .querySelectorAll("td.master input")
          .forEach((el) => (el.checked = true));
        for (const c of conflicts) c.conflict.value = c.masterValue;
      }
    });
    L.DomEvent.on(followerRadioHead, "change", () => {
      if (followerRadioHead.checked) {
        details
          .querySelectorAll("td.follower input")
          .forEach((el) => (el.checked = true));
        for (const c of conflicts) c.conflict.value = c.followerValue;
      }
    });

    for (const c of conflicts) {
      const row = L.DomUtil.create("tr", "", details);
      // master props
      const masterTD = L.DomUtil.create("td", "master", row);
      masterTD.textContent = JSON.stringify(c.conflict.master.props);
      // master type
      L.DomUtil.create("td", "master", row).textContent =
        c.conflict.master.type === "edition" ? "~" : "-";
      // master radio
      const masterRadio = L.DomUtil.create(
        "input",
        "",
        L.DomUtil.create("td", "master", row)
      );
      masterRadio.type = "radio";
      masterRadio.name = c.conflict.id;
      masterRadio.value = "master";
      masterRadio.checked = true;
      // follower radio
      const followerRadio = L.DomUtil.create(
        "input",
        "",
        L.DomUtil.create("td", "follower", row)
      );
      followerRadio.type = "radio";
      followerRadio.name = c.conflict.id;
      followerRadio.value = "master";
      // follower type
      L.DomUtil.create("td", "follower", row).textContent =
        c.conflict.follower.type === "edition" ? "~" : "-";
      // follower props
      const followerTD = L.DomUtil.create("td", "follower", row);
      followerTD.textContent = JSON.stringify(c.conflict.follower.props);

      L.DomEvent.on(masterRadio, "change", () => {
        if (masterRadio.checked) {
          c.conflict.value = c.masterValue;
          followerRadioHead.checked = false;
        }
      });
      L.DomEvent.on(followerRadio, "change", () => {
        if (followerRadio.checked) {
          c.conflict.value = c.followerValue;
          masterRadioHead.checked = false;
        }
      });
    }

    const buttons = [];
    buttons.push({
      text: wX("MERGE_REBASE"),
      click: () => this.rebase(changes),
    });
    buttons.push({
      text: wX("MERGE_REPLACE"),
      click: () => this.useServer(),
    });
    buttons.push({
      text: wX("MERGE_LOCAL"),
      click: () => this.useLocal(),
    });
    buttons.push({
      text: wX("CANCEL"),
      click: () => this.closeDialog(),
    });
    this.createDialog({
      title: this.options.title || wX("MERGE_TITLE"),
      html: content,
      width: "auto",
      dialogClass: "merge",
      buttons: buttons,
    });
  },
});

export default MergeDialog;
