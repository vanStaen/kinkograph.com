import React from "react";
import { action, makeObservable, observable } from "mobx";
import { notification } from "antd";
import { CameraOutlined } from "@ant-design/icons";

import { getFilteredTags } from "./calls/getTags";
import { getPicturesPerPage, getTotalPictures } from "./calls/getPictures";
import { userStore } from "./userStore";
import { insertPageNotation } from "../pages/Gallery/insertPageNotation";

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
  isGalleryLazyLoading = false;
  isGalleryLazyMode = false;
  galleryNeedsRefresh = true;
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
      isGalleryLazyLoading: observable,
      isGalleryLazyMode: observable,
      galleryNeedsRefresh: observable,
      setGalleryNeedsRefresh: action,
      fetchPictures: action,
      fetchNewAndAddPictures: action,
      nextPageHandler: action,
      goToPageHandler: action,
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

      if (
        totalPictures > userStore.numberOfPicAtLastLogin &&
        userStore.numberOfPicAtLastLogin !== null
      ) {
        const numberOfNewPictures =
          totalPictures - userStore.numberOfPicAtLastLogin;
        notification.open({
          message: `There is ${numberOfNewPictures} new picture${
            numberOfNewPictures > 1 ? "s" : ""
          } since your last visit.`,
          placement: "bottomLeft",
          className: "app__blackNotification",
          duration: 5,
          icon: <CameraOutlined style={{ color: "#666" }} />,
        });
      }
    } catch (err) {
      console.log(err);
    }
    pictureStore.setIsGalleryLoading(false);
  };

  fetchNewAndAddPictures = async (nextPage) => {
    try {
      const nextPictures = await getPicturesPerPage(
        nextPage,
        this.PAGE_SIZE,
        this.filter
      );
      if (nextPictures.length < this.PAGE_SIZE) {
        pictureStore.setLastPageReached(true);
      } else {
        pictureStore.setLastPageReached(false);
      }
      await Promise.all(nextPictures.map((picture) => loadImage(picture)));
      const concatArrayPictures = this.allPictures.concat(nextPictures);
      this.setAllPictures(concatArrayPictures);
      this.isGalleryLazyLoading = false;
    } catch (err) {
      console.log(err);
    }
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

  nextPageLazyLoader = async (windowHeight) => {
    if (!this.isGalleryLazyMode){
      this.isGalleryLazyMode = true;
    }
    if (!this.isGalleryLazyLoading && !this.lastPageReached) {
      const nextPage = this.pageNumber + 1;
      this.isGalleryLazyLoading = true;
      await this.fetchNewAndAddPictures(nextPage);
      insertPageNotation(windowHeight, nextPage);
      this.setPageNumber(nextPage);
    }
  };

  goToPageHandler = async (page) => {
    pictureStore.setIsGalleryLoading(true);
    this.pageNumber = parseInt(page);
    await this.fetchPictures(page);
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
        this.selected = this.PAGE_SIZE - 1;
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

  setIsTagInputActive = (isTagInputActive) => {
    this.isTagInputActive = isTagInputActive;
  };

  setTags = (tags) => {
    this.tags = tags;
  };
}

export const pictureStore = new PictureStore();
