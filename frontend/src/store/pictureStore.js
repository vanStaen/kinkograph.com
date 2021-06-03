import { action, makeObservable, observable } from "mobx";

import { getPicturesPerPage } from "../pages/Gallery/getPictures";

const fetchPictures = async () => {
  try {
    const pictures = await getPicturesPerPage(
      pictureStore.pageNumber,
      pictureStore.PAGE_SIZE
    );
    if (pictures.length < pictureStore.PAGE_SIZE) {
      pictureStore.lastPageReached = true;
    } else {
      pictureStore.lastPageReached = false;
    }
    pictureStore.setAllPictures(pictures);
  } catch (err) {
    console.log(err);
  }
};

const nextPageHandler = (
  async (next) => {
    if (next) {
      const nextPage = pictureStore.pageNumber + 1;
      pictureStore.setPageNumber(nextPage);
      await fetchPictures(nextPage);
    } else {
      const previousPage = pictureStore.pageNumber - 1;
      pictureStore.setPageNumber(previousPage);
      await fetchPictures(previousPage);
    }
  });

export class PictureStore {
  PAGE_SIZE = 100;

  pageNumber = 1;
  lastPageReached = false;

  showOverlay = false;
  allPictures = [];
  selected = null;
  totalPictures = 0;

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
      totalPictures: observable,
      setTotalPictures: action,
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

  changeSelected = async (next) => {
    const selected = this.selected;
    const maxSelectable = this.allPictures.length - 1;
    if (next) {
      if (selected === maxSelectable) {
        await nextPageHandler(true);
        this.selected = 0;
      } else {
        this.selected = selected + 1;
      }
    } else {
      if (selected === 0) {
        await nextPageHandler(false);
        this.selected = maxSelectable;
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

  setTotalPictures = (totalPictures) => {
    this.totalPictures = totalPictures;
  };

}

export const pictureStore = new PictureStore();
