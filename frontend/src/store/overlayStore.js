import { action, makeObservable, observable } from "mobx";

export class OverlayStore {

    showOverlay = false;
    selected = null;

    constructor() {
        makeObservable(this, {
            showOverlay: observable,
            selected: observable,
            setShowOverlay: action,
            setSelected: action,
        });
    }

    setShowOverlay = (showOverlay) => {
        this.showOverlay = showOverlay;
    };

    setSelected = (selected) => {
        this.selected = selected;
    };

}

export const overlayStore = new OverlayStore();
