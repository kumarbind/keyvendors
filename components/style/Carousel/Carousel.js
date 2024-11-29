import React, { useEffect, useState, useImperativeHandle } from "react";
import { Box, Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const Carousel = (props, ref) => {
  const { children, show, onSelectedItem } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selected, setSelected] = useState(0);
  const [length, setLength] = useState(children.length);

  const [touchPosition, setTouchPosition] = useState(null);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  useImperativeHandle(ref, () => ({
    handleSelection: handleSelection,
  }));

  const handleSelection = (sel) => {
    setSelected(sel);
    if (sel >= show) {
      setCurrentIndex(sel - (sel % show));
    } else {
      setCurrentIndex(0);
    }
  };

  const next = () => {
    let sel = selected + 1;
    setSelected(sel);
    onSelectedItem && onSelectedItem(sel);

    if (sel >= show && sel % show == 0) {
      if (currentIndex < length - show) {
        setCurrentIndex(sel);
      }
    }
  };

  const prev = () => {
    if (selected % show == 0) {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - show);
      }
    }
    setSelected((prev) => {
      let c = prev - 1;
      onSelectedItem && onSelectedItem(c);
      return c;
    });
  };

  const itemOnclick = (index) => {
    setSelected(index);
    onSelectedItem && onSelectedItem(index);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  return (
    <Box className="carousel-container">
      <Box className="carousel-wrapper">
        {/* You can alwas change the content of the button to other things */}

        <button disabled={selected < 1} onClick={prev} className="left-arrow">
          <ArrowLeftIcon fontSize="large" />
        </button>

        <Box
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}>
          <Box
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}>
            {children.map((slide, index) => {
              return React.cloneElement(slide, {
                key: index,
                "is-selected": selected == index ? "true" : undefined,
                onClick: () => itemOnclick(index),
              });
            })}
          </Box>
        </Box>
        <button
          disabled={!(currentIndex < length - show)}
          onClick={next}
          className="right-arrow">
          <ArrowRightIcon fontSize="large" />
        </button>
      </Box>
    </Box>
  );
};

export default React.forwardRef(Carousel);
