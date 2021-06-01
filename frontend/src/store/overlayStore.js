import { action, makeObservable, observable } from "mobx";

export class OverlayStore {
  showOverlay = false;
  allPictures = [];
  selected = null;

  constructor() {
    makeObservable(this, {
      showOverlay: observable,
      selected: observable,
      allPictures: observable,
      setShowOverlay: action,
      setSelected: action,
      setAllPictures: action,
      changeSelected: action,
    });
  }

  setShowOverlay = (showOverlay) => {
    this.showOverlay = showOverlay;
  };

  changeSelected = (next) => {
    const selected = this.selected;
    const maxSelectable = this.allPictures.length - 1;
    if (next) {
      if (selected === maxSelectable) {
        //TODO
        console.log("Last one of the batch");
      } else {
        this.selected = selected + 1;
      }
    } else {if (selected === 0) {
        //TODO
        console.log("First one of the batch");
      } else {
      this.selected = selected - 1;
      }
    }
  };

  setSelected = async (selected) => {
    const index = await this.allPictures.findIndex(
      (pic) => pic.id === selected.id
    );
    this.selected = index;
  };

  setAllPictures = (allPictures) => {
    this.allPictures = allPictures;
  };
}

export const overlayStore = new OverlayStore();
