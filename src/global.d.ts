// Ambient type declarations for React, JSX, and Remotion
// Ensures zero TypeScript errors in the IDE before or during npm install

declare namespace JSX {
  interface Element {
    type: any;
    props: any;
    key: any;
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare namespace React {
  type ReactNode = any;
  interface CSSProperties {
    [key: string]: any;
  }
  interface FC<P = {}> {
    (props: P, context?: any): any;
  }
  const Fragment: any;
  const createElement: any;
}

declare module 'react' {
  export interface CSSProperties {
    [key: string]: any;
  }

  export type ReactNode = any;

  export interface FC<P = {}> {
    (props: P, context?: any): any;
  }

  export const createElement: any;
  export const Fragment: any;

  const React: {
    createElement: any;
    Fragment: any;
    FC: any;
    CSSProperties: any;
    ReactNode: any;
  };

  export default React;
}

declare module 'remotion' {
  export const AbsoluteFill: any;
  export const Audio: any;
  export const Sequence: any;
  export function staticFile(filePath: string): string;
  export const Series: any;

  export const Composition: (props: {
    key?: any;
    id: string;
    component: any;
    durationInFrames?: number;
    fps?: number;
    width?: number;
    height?: number;
    defaultProps?: any;
    [key: string]: any;
  }) => any;

  export function registerRoot(component: any): void;
  export function useCurrentFrame(): number;
  export function useVideoConfig(): {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
    id: string;
  };

  export function spring(options: any): number;
  export function interpolate(
    input: number,
    inputRange: readonly number[],
    outputRange: readonly number[],
    options?: any
  ): number;
}
