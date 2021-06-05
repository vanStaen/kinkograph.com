import { action, makeObservable, observable } from "mobx";

import {
  getPicturesPerPage,
  getTotalPictures,
} from "../pages/Gallery/getPictures";
import { getFilteredTags } from "../component/EditDrawer/getTags";

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
  totalPictures = 0;
  selected = null;
  lastPageReached = false;
  showOverlay = false;
  isGalleryLoading = true;
  galleryNeedsRefresh = true;
  showFilterSelect = false;
  isTagInputActive = false;
  allPictures = [];
  tags = [];
  filter = [];

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
      setFilter: action,
      isGalleryLoading: observable,
      setIsGalleryLoading: action,
      galleryNeedsRefresh: observable,
      setGalleryNeedsRefresh: action,
      showFilterSelect: observable,
      setShowFilterSelect: action,
      fetchPictures: action,
      nextPageHandler: action,
      tags: observable,
      setTags: action,
      isTagInputActive: observable,
      setIsTagInputActive: action,
    });
  }

  fetchPictures = async () => {
    try {
      const pictures = await getPicturesPerPage(
        this.pageNumber,
        this.PAGE_SIZE,
        this.filter
      );
      const totalPictures = await getTotalPictures(this.filter);
      if (pictures.length < this.PAGE_SIZE) {
        pictureStore.setLastPageReached(true);
      } else {
        pictureStore.setLastPageReached(false);
      }
      const tags = await getFilteredTags(this.filter);
      await Promise.all(pictures.map((picture) => loadImage(picture)));
      pictureStore.setTags(tags);

      this.setAllPictures(pictures);
      this.setTotalPictures(totalPictures);
    } catch (err) {
      console.log(err);
    }
    pictureStore.setIsGalleryLoading(false);
  };

  nextPageHandler = async (next) => {
    pictureStore.setIsGalleryLoading(true);
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
    this.selected = selected;
  };

  setAllPictures = (allPictures) => {
    this.allPictures = allPictures;
  };

  setTotalPictures = (totalPictures) => {
    this.totalPictures = totalPictures;
  };

  addFilter = async (filter) => {
    await this.filter.push(filter);
    pictureStore.setIsGalleryLoading(true);
    pictureStore.setPageNumber(1);
    pictureStore.fetchPictures();
  };

  setFilter = (filter) => {
    this.filter = filter;
    pictureStore.setIsGalleryLoading(true);
    this.setPageNumber(1);
    pictureStore.fetchPictures();
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

  setIsTagInputActive = (isTagInputActive) => {
    this.isTagInputActive = isTagInputActive;
  };

  setTags = (tags) => {
    this.tags = tags;
  };
}

export const pictureStore = new PictureStore();
