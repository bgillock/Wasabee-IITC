import { WDialog, WDialogOptions } from "../leafletClasses";
import WasabeeMarker from "../model/marker";

interface MarkerChangeDialogOptions extends WDialogOptions {
  marker: WasabeeMarker;
}
declare class MarkerChangeDialog extends WDialog {
  options: MarkerChangeDialogOptions;
  constructor(options: MarkerChangeDialogOptions);
}
export default MarkerChangeDialog;
