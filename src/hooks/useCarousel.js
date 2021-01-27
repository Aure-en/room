import { useState, useEffect } from 'react';

export function useCarousel(slides, number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesNumber, setSlidesNumber] = useState(number);
  const [slidesGroups, setSlidesGroups] = useState([]);
  const [transition, setTransition] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0.3);
  const [isNext, setIsNext] = useState(false); // Indicates the carousel direction (previous/next)
  
  const previous = () => {
    setIsNext(false);
    setTransition((prev) => prev + 100 / slidesGroups.length);
    setCurrentSlide((prev) => {
      return prev === 0 ? slidesGroups.length - 1 : prev - 1;
    });
  };

  const next = () => {
    setIsNext(true);
    setTransition((prev) => prev - 100 / slidesGroups.length);
    setCurrentSlide((prev) => {
      return prev === slidesGroups.length - 1 ? 0 : prev + 1;
    });
  };

  /* At the end of each transition:
  - The transition duration is set to 0. It allows us to silently reset transform: translateX to 0.
  - The slides order is changed so that there is always a "previous slide" and a "next slide" to go to without jumping too far.
  - Thanks to useEffect, the transition duration is put back to 0.3s to have a smooth animation.
  */
  const handleTransitionEnd = () => {
    setTransitionDuration(0);
    setTransition(-100 / slidesGroups.length);

    if (isNext) {
      setSlidesGroups((prev) => {
        const slides = [...prev];
        slides.pop();
        const prevSlide = slides.shift();
        slides.push(prevSlide);
        slides.push(slides[0]);
        return slides;
      });
    } else {
      setSlidesGroups((prev) => {
        const slides = [...prev];
        slides.shift();
        const lastSlide = slides.pop();
        slides.unshift(lastSlide);
        slides.unshift(slides[slides.length - 1]);
        return slides;
      });
    }
  };

  // Organize slides.
  // 1 "slide" = 1 group of slidesNumber mini preview pictures.
  useEffect(() => {
    const slidesGroups = [];
    slides.forEach((slide, index) => {
      index % slidesNumber === 0
        ? slidesGroups.push([slide])
        : slidesGroups[slidesGroups.length - 1].push(slide);
    });

    // If there aren't enough preview images to fill the last slide, empty space is added to compensate.
    while (slidesGroups[slidesGroups.length - 1].length < slidesNumber) {
      slidesGroups[slidesGroups.length - 1].push(null);
    }
    setSlidesGroups([slidesGroups[slidesGroups.length - 1], ...slidesGroups]);
    setTransition(-100 / (slidesGroups.length + 1));
  }, []);

  useEffect(() => {
    if (transitionDuration === 0) {
      setTransitionDuration(0.3);
    }
  }, [transitionDuration]);

  return {
    currentSlide,
    slidesNumber,
    slidesGroups,
    setSlidesNumber,
    transition,
    transitionDuration,
    previous,
    next,
    handleTransitionEnd,
  };
}
