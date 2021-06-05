import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  HeartFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import { Tooltip } from "antd";

import { pictureStore } from "../../store/pictureStore";
import { userStore } from "../../store/userStore";

import "./GalleryOverlay.css";

export const GalleryOverlay = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const throttling = useRef(false);
  const selected = pictureStore.allPictures[pictureStore.selected];
  const indexInSelected = userStore.favorites.findIndex(
    (pictureId) => pictureId === selected.id
  );
  const isFavorite = indexInSelected >= 0;
  const isFirstPicFirstPage =
    pictureStore.pageNumber === 1 && pictureStore.selected === 0;
  const isLastPicLastPage =
    pictureStore.lastPageReached &&
    pictureStore.allPictures.length === pictureStore.selected + 1;

  const loadImage = async (image) => {
    setIsLoading(true);
    const isloaded = new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image;
      loadImg.onload = () => resolve(image.url);
      loadImg.onerror = (err) => reject(err);
    });
    await isloaded;
    setIsLoading(false);
  };

  useEffect(() => {
    selected && loadImage(selected.url_med);
  }, [selected]);

  const mouseHoverHandler = (hover) => {
    const closeButton = document.getElementById(`closeButton`);
    if (hover) {
      closeButton.style.visibility = "hidden";
      closeButton.style.opacity = 0;
    } else {
      closeButton.style.visibility = "visible";
      closeButton.style.opacity = 1;
    }
  };

  const doubleClickHandler = useCallback(
    (id) => {
      const heart = document.getElementById(`heart`);
      const unheart = document.getElementById(`unheart`);
      if (!isFavorite) {
        heart.style.visibility = "visible";
        heart.style.opacity = 0.5;
        heart.style.fontSize = "50em";
        setTimeout(() => {
          heart.style.visibility = "hidden";
          heart.style.opacity = 0;
          heart.style.fontSize = "1em";
        }, 500);
        userStore.addToFavorites(id);
      } else {
        unheart.style.visibility = "visible";
        unheart.style.opacity = 0.5;
        unheart.style.fontSize = "30em";
        setTimeout(() => {
          unheart.style.visibility = "hidden";
          unheart.style.opacity = 0;
          unheart.style.fontSize = "1em";
        }, 500);
        userStore.deleteFromFavorites(id);
      }
    },
    [isFavorite]
  );

  const keyDownHandler = useCallback(
    (event) => {
      event.preventDefault();
      const keyPressed = event.key.toLowerCase();
      const nextButton = document.getElementById(`nextButton`);
      const previousButton = document.getElementById(`previousButton`);
      if (throttling.current === false) {
        throttling.current = true;
        if (
          (keyPressed === "arrowdown" || keyPressed === "arrowright") &&
          !isLastPicLastPage
        ) {
          nextButton.style.backgroundColor = "rgba(255,255,255,.15)";
          pictureStore.changeSelected(true);
          setTimeout(() => {
            nextButton.style.backgroundColor = "rgba(255,255,255, 0)";
          }, 100);
        } else if (
          (keyPressed === "arrowup" || keyPressed === "arrowleft") &&
          !isFirstPicFirstPage
        ) {
          previousButton.style.backgroundColor = "rgba(255,255,255,.15)";
          pictureStore.changeSelected(false);
          setTimeout(() => {
            previousButton.style.backgroundColor = "rgba(255,255,255, 0)";
          }, 100);
        } else if (keyPressed === "enter") {
          doubleClickHandler(selected.id);
        } else if (keyPressed === "escape") {
          pictureStore.setShowOverlay(false);
        }
        setTimeout(() => {
          throttling.current = false;
        }, 100);
      }
    },
    [selected, doubleClickHandler, isFirstPicFirstPage, isLastPicLastPage]
  );

  const tagClickHander = (tag) => {
    pictureStore.setShowOverlay(false);
    pictureStore.addFilter(tag);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <div className="overlay__overlay">
      <div
        className="overlay__background"
        onClick={() => {
          pictureStore.setShowOverlay(false);
        }}
      ></div>
      {!isFirstPicFirstPage && (
        <div
          className="overlay__columnLeft"
          id="previousButton"
          onClick={() => {
            pictureStore.changeSelected(false);
          }}
        >
          <LeftOutlined />
        </div>
      )}
      {!isLastPicLastPage && (
        <div
          className="overlay__columnRight"
          id="nextButton"
          onMouseEnter={() => mouseHoverHandler(true)}
          onMouseLeave={() => mouseHoverHandler(false)}
          onClick={() => {
            pictureStore.changeSelected(true);
          }}
        >
          <RightOutlined />
        </div>
      )}
      <Tooltip
        placement="bottomLeft"
        title={
          <span>
            <b>TIP: </b> The keys ← and → will let you navigate through the
            pictures. You can use the <i>esc</i> key, or click outside the
            picture to go back to the gallery.
          </span>
        }
      >
        <div
          className="overlay__closeButton"
          id="closeButton"
          onClick={() => {
            pictureStore.setShowOverlay(false);
          }}
        >
          <CloseOutlined />
        </div>
      </Tooltip>
      {isLoading ? (
        <LoadingOutlined className="overlay__spinner" />
      ) : (
        <div
          className="overlay__pictureContainer"
          onDoubleClick={() => {
            doubleClickHandler(selected.id);
          }}
        >
          <div className="overlay__infoAction">
            {selected && <div className="overlay__info">#{selected.id}</div>}
            <div className="overlay__action">
              {isFavorite ? (
                <Fragment>
                  <span
                    role="img"
                    aria-label="heart"
                    style={{ fontSize: ".75em" }}
                  >
                    ❤️
                  </span>{" "}
                  Marked as favorite!
                </Fragment>
              ) : (
                "Doubleclick/Enter to mark as favorite."
              )}
            </div>
          </div>
          <div className="overlay__pictureHover">
            <div className="overlay__pictureWatermark">KINKOGRAPH</div>
            <HeartFilled id="heart" className="overlay__heart" />
            <CloseOutlined id="unheart" className="overlay__heart" />
          </div>
          {selected && (
            <img
              className="overlay__picture"
              src={selected.url_med}
              alt={selected.id}
              key={`img__${selected.id}`}
            />
          )}
          {selected && (
            <div className="overlay__tags">
              {JSON.parse(selected.tags).map((tag) => (
                <Fragment>
                  <span onClick={() => tagClickHander(tag)}>#{tag}</span>
                  &nbsp;
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
