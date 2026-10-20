import React from 'react';
import { Composition } from 'remotion';
import {
  AEObilityCarouselConfig,
  AEObilityCorePrinciplesCarousel,
  CAROUSEL_SLIDES,
  CarouselSlideCard,
} from './AEOComposition';

export const RemotionRoot = () => {
  return (
    <>
      {/* 1. Master 9-Slide Core Principles Carousel (1080x1080 @ 30fps, 45 Seconds) */}
      <Composition
        id={AEObilityCarouselConfig.id}
        component={AEObilityCorePrinciplesCarousel}
        durationInFrames={AEObilityCarouselConfig.durationInFrames}
        fps={AEObilityCarouselConfig.fps}
        width={AEObilityCarouselConfig.width}
        height={AEObilityCarouselConfig.height}
        defaultProps={AEObilityCarouselConfig.defaultProps}
      />

      {/* 2. Standalone Cover Slide (5 Seconds @ 30fps) */}
      <Composition
        id="AEOCoverSlide"
        component={() => <CarouselSlideCard {...CAROUSEL_SLIDES[0]} />}
        durationInFrames={AEObilityCarouselConfig.framesPerSlide}
        fps={AEObilityCarouselConfig.fps}
        width={AEObilityCarouselConfig.width}
        height={AEObilityCarouselConfig.height}
      />

      {/* 3. Individual Slide Compositions (for frame inspection or still export) */}
      {CAROUSEL_SLIDES.map((slide) => {
        const cleanId = `Slide_${slide.stepNumber}_${slide.eyebrow.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '')}`;
        return (
          <Composition
            key={slide.stepNumber}
            id={cleanId}
            component={() => <CarouselSlideCard {...slide} />}
            durationInFrames={AEObilityCarouselConfig.framesPerSlide}
            fps={AEObilityCarouselConfig.fps}
            width={AEObilityCarouselConfig.width}
            height={AEObilityCarouselConfig.height}
          />
        );
      })}
    </>
  );
};
