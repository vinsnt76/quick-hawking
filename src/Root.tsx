import React from 'react';
import { Composition } from 'remotion';
import { AEOFullReel, AEOSceneSlide, SCENES } from './AEOComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Exact Hero Poster Animated (5 Seconds @ 60fps, 1080x1350 4:5 Portrait) */}
      <Composition
        id="AEOHeroPoster"
        component={() => <AEOSceneSlide scene={SCENES[0]} sceneIndex={0} />}
        durationInFrames={300}
        fps={60}
        width={1080}
        height={1350}
      />
      {/* 2. Complete 8-Scene Reel: Hero + All 7 Core Principles (24 Seconds @ 60fps) */}
      <Composition
        id="AEOFullReel"
        component={AEOFullReel}
        durationInFrames={300 * SCENES.length}
        fps={60}
        width={1080}
        height={1350}
      />
    </>
  );
};
