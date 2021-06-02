import { action, makeObservable, observable } from "mobx";

export class PictureStore {

  PAGE_SIZE = 100;

  pageNumber = 1;
  lastPageReached = false;

  showOverlay = false;
  allPictures = [];
  selected = null;

  constructor() {
    makeObservable(this, {
      pageNumber: observable,
      setPageNumber: action,
      lastPageReached: observable,
      setLastPageReached: action,
      showOverlay: observable,
      setShowOverlay: action,
      selected: observable,
      setSelected: action,
      changeSelected: action,
      allPictures: observable,
      setAllPictures: action,
    });
  }

  setPageNumber = (pageNumber) => {
    this.pageNumber = pageNumber;
  };

  setLastPageReached = (lastPageReached) => {
    this.lastPageReached = lastPageReached;
  };

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

export const pictureStore = new PictureStore();
