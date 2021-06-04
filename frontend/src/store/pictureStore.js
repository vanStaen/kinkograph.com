import { action, makeObservable, observable } from "mobx";

import {
  getPicturesPerPage,
  getTotalPictures,
} from "../pages/Gallery/getPictures";

const loadImage = (image) => {
  return new Promise((resolve, reject) => {
    const loadImg = new Image();
    loadImg.src = image.url_thumb;
    loadImg.onload = () => resolve(image.url);
    loadImg.onerror = (err) => reject(err);
  });
};

export class PictureStore {
  PAGE_SIZE = 100;

  pageNumber = 1;
  lastPageReached = false;
  showOverlay = false;
  allPictures = [];
  selected = null;
  totalPictures = 0;
  filter = [];
  isGalleryLoading = true;
  galleryNeedsRefresh = true;
  showFilterSelect = false;

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
      filter: observable,
      addFilter: action,
      deleteFilter: action,
      setFilter: action,
      isGalleryLoading: observable,
      setIsGalleryLoading: action,
      galleryNeedsRefresh: observable,
      setGalleryNeedsRefresh: action,
      showFilterSelect: observable,
      setShowFilterSelect: action,
      fetchPictures: action,
      nextPageHandler: action,
    });
  }

  fetchPictures = async () => {
    try {
      const pictures = await getPicturesPerPage(
        pictureStore.pageNumber,
        pictureStore.PAGE_SIZE,
        pictureStore.filter
      );
      const totalPictures = await getTotalPictures(pictureStore.filter);
      if (pictures.length < pictureStore.PAGE_SIZE) {
        pictureStore.setLastPageReached(true);
      } else {
        pictureStore.setLastPageReached(false);
      }
      await Promise.all(pictures.map((picture) => loadImage(picture)));
      pictureStore.setAllPictures(pictures);
      pictureStore.setTotalPictures(totalPictures);
    } catch (err) {
      console.log(err);
    }
    pictureStore.setIsGalleryLoading(false);
  };

  nextPageHandler = async (next) => {
    if (next) {
      const nextPage = this.pageNumber + 1;
      this.pageNumber = nextPage;
      await this.fetchPictures(nextPage);
    } else {
      const previousPage = this.pageNumber - 1;
      this.pageNumber = previousPage;
      await this.fetchPictures(previousPage);
    }
  };

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
        await this.nextPageHandler(true);
        this.selected = 0;
      } else {
        this.selected = selected + 1;
      }
    } else {
      if (selected === 0) {
        await this.nextPageHandler(false);
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

  addFilter = (filter) => {
    this.filter.push(filter);
    this.pageNumber = 1;
  };

  deleteFilter = (filter) => {
    const index = this.filter.findIndex((element) => element === filter);
    this.filter.splice(index, 1);
    this.pageNumber = 1;
  };

  setFilter = (filter) => {
    this.filter = filter;
    this.pageNumber = 1;
    this.galleryLoading = true;
    this.galleryNeedsRefresh = true;
  };

  setIsGalleryLoading = (isGalleryLoading) => {
    this.isGalleryLoading = isGalleryLoading;
  };

  setGalleryNeedsRefresh = (galleryNeedsRefresh) => {
    this.galleryNeedsRefresh = galleryNeedsRefresh;
  };

  setShowFilterSelect = (showFilterSelect) => {
    this.showFilterSelect = showFilterSelect;
  };
}

export const pictureStore = new PictureStore();
