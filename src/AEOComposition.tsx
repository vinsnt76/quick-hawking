import React from 'react';
import {
  AbsoluteFill,
  Series,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/* ==========================================================================
   1. SCENE DATA: HERO POSTER + 7 CORE PRINCIPLES
   ========================================================================== */
export interface SceneData {
  id: string;
  pillText: string;
  line1: string;
  line2: string;
  line3Highlight: string;
  subcopy: string[];
  nodeLabels?: string[];
  metricTag?: string;
}

export const SCENES: SceneData[] = [
  {
    id: '00',
    pillText: 'AEO ARCHITECTURE BREAKDOWN',
    line1: '7 Core Principles',
    line2: 'That Get Your Brand',
    line3Highlight: 'Cited in AI Search',
    subcopy: [
      'Stop optimising for',
      'legacy keywords.',
      'Start engineering for',
      'machine retrieval.',
    ],
  },
  {
    id: '01',
    pillText: 'PRINCIPLE 01 // ENTITY ARCHITECTURE',
    line1: 'Anchor Your Brand',
    line2: 'As a Canonical',
    line3Highlight: 'Knowledge Entity',
    subcopy: [
      'LLMs traverse entity triples,',
      'not keyword strings.',
      'Bind your brand to explicit',
      'Wikidata & SameAs nodes.',
    ],
    nodeLabels: ['BrandID', 'SameAs', 'Wikidata', 'Founder', 'Category', 'API'],
    metricTag: 'ENTITY SALIENCE: 0.96 COSINE',
  },
  {
    id: '02',
    pillText: 'PRINCIPLE 02 // ATOMIC CHUNKING',
    line1: 'Engineer Self-Contained',
    line2: '40–60 Token',
    line3Highlight: 'Citation Chunks',
    subcopy: [
      'Structure high-density claims',
      'backed by hard metrics so',
      'RAG rerankers extract your',
      'exact passage verbatim.',
    ],
    nodeLabels: ['Claim_01', 'Stat_99%', 'Source', 'Vector', 'Top_K', 'Quote'],
    metricTag: 'RERANKER LIFT: +310%',
  },
  {
    id: '03',
    pillText: 'PRINCIPLE 03 // SEMANTIC JSON-LD',
    line1: 'Feed Machine Parsers',
    line2: 'Deeply Nested',
    line3Highlight: 'Schema.org Graphs',
    subcopy: [
      'Deploy linked @id graphs across',
      'Organization, Product & FAQ',
      'to bypass noisy HTML DOM',
      'scraping altogether.',
    ],
    nodeLabels: ['@context', '@id', 'Product', 'FAQPage', 'Offer', 'Review'],
    metricTag: 'PARSE LATENCY: <12ms',
  },
  {
    id: '04',
    pillText: 'PRINCIPLE 04 // QUERY FAN-OUT RAG',
    line1: 'Mirror Sub-Query',
    line2: 'Fan-Out Vectors In',
    line3Highlight: 'Heading Hierarchies',
    subcopy: [
      'AI search expands 1 prompt',
      'into 8+ synthetic queries.',
      'Match those embeddings in',
      'structured H2/H3 Q&A trees.',
    ],
    nodeLabels: ['Prompt', 'Fan_01', 'Fan_02', 'Fan_03', 'H2_Match', 'Cite'],
    metricTag: 'RECALL DENSITY: 98.4%',
  },
  {
    id: '05',
    pillText: 'PRINCIPLE 05 // CONSENSUS QUORUM',
    line1: 'Build Multi-Source',
    line2: 'Co-Occurrence Across',
    line3Highlight: 'Authority Domains',
    subcopy: [
      'LLMs cross-verify claims',
      'before citing a brand.',
      'Align benchmarks, docs, and',
      'third-party mentions.',
    ],
    nodeLabels: ['Docs', 'G2/Peer', 'Press', 'GitHub', 'Reddit', 'Quorum'],
    metricTag: 'HALLUCINATION RISK: -84%',
  },
  {
    id: '06',
    pillText: 'PRINCIPLE 06 // ZERO-CLICK SYNTHESIS',
    line1: 'Pre-Format Direct',
    line2: 'Comparison Matrices',
    line3Highlight: '& Decision Tables',
    subcopy: [
      'Semantic HTML tables and',
      'TL;DR spec blocks compress',
      'cleanly into LLM output',
      'tokens with footnote links.',
    ],
    nodeLabels: ['Table', 'Row_A', 'Row_B', 'Metric', 'Token', 'Footnote'],
    metricTag: 'TOKEN COMPRESSION: 3.4x',
  },
  {
    id: '07',
    pillText: 'PRINCIPLE 07 // CRAWL VELOCITY',
    line1: 'Serve Zero-JS Edge',
    line2: 'Markdown & Live',
    line3Highlight: 'llms.txt Feeds',
    subcopy: [
      'AI retrieval bots demand',
      'sub-100ms SSR responses,',
      'clean /llms.txt indexes,',
      'and instant IndexNow pings.',
    ],
    nodeLabels: ['OAI_Bot', 'Claude', 'Perplex', 'llms.txt', 'EdgeSSR', '200_OK'],
    metricTag: 'EDGE TTFB: 38ms SSR',
  },
];

/* ==========================================================================
   2. DETERMINISTIC PRNG HELPER FOR GLITCH & MATRIX SWEATER PARTICLES
   ========================================================================== */
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
};

/* ==========================================================================
   3. TOP-LEFT 3D HOLOGRAPHIC PRISM ICON (SVG + FRAME INTERPOLATION)
   ========================================================================== */
const HolographicPrismNode: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const floatY = Math.sin(frame / 18) * 5;
  const tilt = Math.sin(frame / 28) * 7;
  const corePulse = 1 + Math.sin(frame / 8) * 0.14;
  return (
    <div
      style={{
        width: 96,
        height: 96,
        transform: `translateY(${floatY}px) scale(${enter}) rotate(${tilt}deg)`,
        filter: 'drop-shadow(0 0 18px rgba(0, 240, 255, 0.55))',
      }}
    >
      <svg viewBox="0 0 120 120" width="96" height="96">
        <defs>
          <linearGradient id="prismShell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <radialGradient id="cyanLens" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Metallic Rounded Tetrahedron Body */}
        <path
          d="M60 14 L104 92 L16 92 Z"
          fill="#07192e"
          stroke="url(#prismShell)"
          strokeWidth="12"
          strokeLinejoin="round"
        />
        {/* Inner Dark Facet Lines */}
        <path
          d="M60 18 L60 64 M60 64 L22 88 M60 64 L98 88"
          stroke="rgba(125, 211, 252, 0.45)"
          strokeWidth="2.5"
        />
        {/* Corner Specular Pods */}
        <circle cx="60" cy="18" r="5" fill="#e0f2fe" />
        <circle cx="22" cy="88" r="5" fill="#38bdf8" />
        <circle cx="98" cy="88" r="5" fill="#38bdf8" />
        {/* Pulsing Cyan Optical Core */}
        <circle
          cx="60"
          cy="63"
          r={18 * corePulse}
          fill="url(#cyanLens)"
        />
        <circle
          cx="60"
          cy="63"
          r="9"
          fill="#00f0ff"
          stroke="#ffffff"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

/* ==========================================================================
   4. RIGHT-SIDE HOLOGRAPHIC ARCHITECT CHARACTER + MATRIX CODE SWEATER
      (SCENE 00) & DYNAMIC NODE GRAPH (SCENES 01–07)
   ========================================================================== */
const RightStageVisual: React.FC<{
  frame: number;
  fps: number;
  scene: SceneData;
  sceneIndex: number;
}> = ({ frame, fps, scene, sceneIndex }) => {
  const slideIn = spring({
    frame: frame - 8,
    fps,
    config: { damping: 15, stiffness: 90 },
  });
  const codeChars = ['0', '1', '{', '}', '[', ']', ':', '/', 'A', 'E', 'O', ';'];
  return (
    <div
      style={{
        position: 'absolute',
        right: -20,
        top: 210,
        width: 580,
        height: 1020,
        transform: `translateX(${interpolate(slideIn, [0, 1], [180, 0])}px)`,
        opacity: slideIn,
      }}
    >
      {/* Concentric Dark Teal Sonar Aura (Matches Reference Backdrop) */}
      <svg
        width="580"
        height="1020"
        viewBox="0 0 580 1020"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <radialGradient id="tealAura" cx="58%" cy="54%" r="52%">
            <stop offset="0%" stopColor="rgba(0, 210, 230, 0.22)" />
            <stop offset="55%" stopColor="rgba(0, 90, 105, 0.09)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
          <clipPath id="sweaterClip">
            <path d="M98 430 Q145 585 250 530 L282 465 L425 465 Q535 540 520 960 L235 960 Q245 710 140 650 Q65 565 65 445 Z" />
          </clipPath>
        </defs>
        {/* Teal Sonar Background Fill */}
        <rect x="0" y="0" width="580" height="1020" fill="url(#tealAura)" />
        {/* Expanding Sonar Rings */}
        {[0, 1, 2, 3, 4, 5].map((ringIdx) => {
          const r = ((ringIdx * 75 + frame * 1.6) % 450) + 30;
          const alpha = interpolate(r, [30, 480], [0.24, 0], {
            extrapolateRight: 'clamp',
          });
          return (
            <circle
              key={ringIdx}
              cx="340"
              cy="550"
              r={r}
              fill="none"
              stroke={`rgba(0, 240, 255, ${alpha})`}
              strokeWidth="1.5"
            />
          );
        })}
        {sceneIndex === 0 ? (
          /* ================= SCENE 00: 3D SAGE CHARACTER + CODE SWEATER ================= */
          <g>
            {/* Laser Target Guide Beam from Pointing Finger to "Cited in AI Search" */}
            <line
              x1="78"
              y1="418"
              x2="-140"
              y2="375"
              stroke="#ff006a"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              strokeDashoffset={-frame * 3}
              opacity={0.75}
            />
            {/* Sweater Silhouette Base */}
            <path
              d="M98 430 Q145 585 250 530 L282 465 L425 465 Q535 540 520 960 L235 960 Q245 710 140 650 Q65 565 65 445 Z"
              fill="#111827"
              stroke="rgba(56, 189, 248, 0.35)"
              strokeWidth="2.5"
            />
            {/* Glowing Cyan Code Matrix Streaming Inside the Sweater Fabric */}
            <g clipPath="url(#sweaterClip)">
              {Array.from({ length: 64 }).map((_, i) => {
                const bx = 75 + seededRandom(i * 11) * 440;
                const speed = 1.2 + seededRandom(i * 23) * 2.4;
                const by =
                  440 + ((seededRandom(i * 37) * 520 + frame * speed) % 520);
                const glyph =
                  codeChars[Math.floor((i + frame / 10) % codeChars.length)];
                const glowOpacity =
                  0.25 + 0.65 * Math.abs(Math.sin(frame / 12 + i));
                return (
                  <text
                    key={i}
                    x={bx}
                    y={by}
                    fill={i % 6 === 0 ? '#ffffff' : '#00f0ff'}
                    fillOpacity={glowOpacity}
                    fontFamily="JetBrains Mono, monospace"
                    fontSize={14 + (i % 5)}
                    fontWeight="700"
                  >
                    {glyph}
                  </text>
                );
              })}
            </g>
            {/* Ribbed Turtleneck Collar */}
            <rect
              x="280"
              y="428"
              width="142"
              height="46"
              rx="14"
              fill="#1e293b"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Pointing Hand & Extended Index Finger */}
            <g transform={`translate(0, ${Math.sin(frame / 14) * 5})`}>
              {/* Index Finger */}
              <path
                d="M72 396 L96 436 L76 446 L54 406 Z"
                fill="#eab696"
              />
              {/* Palm & Curled Fingers */}
              <circle cx="88" cy="448" r="28" fill="#dfb395" />
              <circle cx="102" cy="442" r="12" fill="#c99576" />
              {/* Holographic Target Ring at Fingertip */}
              <circle
                cx="62"
                cy="398"
                r={14 + Math.sin(frame / 6) * 4}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
              />
            </g>
            {/* Sculpted Head, Swept Silver Hair & Expressive Beard */}
            <g transform={`translate(0, ${Math.sin(frame / 18) * 4})`}>
              {/* Swept White Hair Crown */}
              <path
                d="M275 235 C270 155, 435 150, 445 245 C455 280, 445 310, 430 320 Z"
                fill="#e2e8f0"
              />
              {/* Face Base */}
              <ellipse cx="355" cy="285" rx="68" ry="84" fill="#e5b89b" />
              {/* Eyes Looking Left Toward Headline */}
              <ellipse cx="328" cy="268" rx="14" ry="17" fill="#ffffff" />
              <ellipse cx="374" cy="268" rx="14" ry="17" fill="#ffffff" />
              <circle cx="323" cy="268" r="7.5" fill="#292524" />
              <circle cx="369" cy="268" r="7.5" fill="#292524" />
              <circle cx="320" cy="264" r="2.5" fill="#00f0ff" />
              <circle cx="366" cy="264" r="2.5" fill="#00f0ff" />
              {/* Raised White Eyebrows */}
              <path
                d="M308 242 Q328 228 344 242"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M358 242 Q374 228 392 242"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="9"
                strokeLinecap="round"
              />
              {/* Sculpted Nose */}
              <ellipse cx="344" cy="296" rx="14" ry="18" fill="#d49b7e" />
              {/* Full Flowing White Beard & Mustache */}
              <path
                d="M286 295 C278 395, 315 432, 352 435 C395 432, 428 395, 422 295 C392 318, 372 312, 348 310 C324 312, 305 318, 286 295 Z"
                fill="#f1f5f9"
              />
              {/* Astonished "O" Mouth */}
              <ellipse
                cx="348"
                cy="342"
                rx="13"
                ry={16 + Math.sin(frame / 7) * 2.5}
                fill="#450a0a"
              />
            </g>
          </g>
        ) : (
          /* ================= SCENES 01–07: FORCE-DIRECTED AEO GRAPH ================= */
          <g>
            {(scene.nodeLabels || []).map((label, i, arr) => {
              const angle =
                (i / arr.length) * Math.PI * 2 + frame * 0.012;
              const radius = 165 + Math.sin(frame / 15 + i) * 18;
              const nx = 310 + Math.cos(angle) * radius;
              const ny = 510 + Math.sin(angle) * radius;
              const pktProgress = ((frame * 0.02 + i * 0.17) % 1);
              const px = 310 + (nx - 310) * pktProgress;
              const py = 510 + (ny - 510) * pktProgress;
              return (
                <g key={label}>
                  <line
                    x1="310"
                    y1="510"
                    x2={nx}
                    y2={ny}
                    stroke={i % 2 === 0 ? '#00f0ff' : '#ff006a'}
                    strokeWidth="2.5"
                    strokeOpacity="0.5"
                  />
                  <circle cx={px} cy={py} r="5" fill="#ffffff" />
                  <circle
                    cx={nx}
                    cy={ny}
                    r="38"
                    fill="#061320"
                    stroke={i % 2 === 0 ? '#00f0ff' : '#ff006a'}
                    strokeWidth="3"
                  />
                  <text
                    x={nx}
                    y={ny + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="13"
                    fontWeight="700"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
            {/* Central Canonical Entity Core */}
            <circle
              cx="310"
              cy="510"
              r={64 + Math.sin(frame / 8) * 5}
              fill="#7e22ce"
              stroke="#00f0ff"
              strokeWidth="4"
            />
            <text
              x="310"
              y="505"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="JetBrains Mono, monospace"
              fontSize="16"
              fontWeight="800"
            >
              AEO::{scene.id}
            </text>
            <text
              x="310"
              y="526"
              textAnchor="middle"
              fill="#00f0ff"
              fontFamily="JetBrains Mono, monospace"
              fontSize="12"
            >
              CITED_LOCK
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/* ==========================================================================
   5. SINGLE SCENE SLIDE COMPONENT (1080x1350 POSTER LAYOUT)
   ========================================================================== */
export const AEOSceneSlide: React.FC<{
  scene: SceneData;
  sceneIndex: number;
}> = ({ scene, sceneIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered Spring Animations for Headline Lines
  const pillSpring = spring({ frame: frame - 4, fps, config: { damping: 14 } });
  const line1Spring = spring({ frame: frame - 12, fps, config: { damping: 13 } });
  const line2Spring = spring({ frame: frame - 20, fps, config: { damping: 13 } });
  const line3Spring = spring({ frame: frame - 28, fps, config: { damping: 13 } });
  const highlightSweep = spring({
    frame: frame - 34,
    fps,
    config: { damping: 16, stiffness: 110 },
  });

  // Typewriter Sub-Copy Calculation
  const fullSubcopy = scene.subcopy.join('\n');
  const charsToShow = Math.floor(
    interpolate(frame, [42, 135], [0, fullSubcopy.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const visibleSubcopy = fullSubcopy.slice(0, charsToShow);
  const cursorVisible = Math.floor(frame / 18) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Top-Left Cyber Corner Bracket */}
      <svg
        width="82"
        height="82"
        viewBox="0 0 82 82"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 30 }}
      >
        <path d="M0 0 H64 L48 16 H16 V48 L0 64 Z" fill="#00e5ff" />
        <path
          d="M10 10 H42 M10 10 V42"
          stroke="#ff006a"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Upper-Center Purple Nebula Glow */}
      <div
        style={{
          position: 'absolute',
          top: 290,
          left: 260,
          width: 480,
          height: 190,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.38) 0%, rgba(88, 28, 135, 0.12) 55%, transparent 78%)',
          filter: 'blur(26px)',
          transform: `scale(${1 + Math.sin(frame / 25) * 0.08})`,
        }}
      />

      {/* Right-Side Character / Principle Graph Visualizer */}
      <RightStageVisual
        frame={frame}
        fps={fps}
        scene={scene}
        sceneIndex={sceneIndex}
      />

      {/* Left Foreground Content Column */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          paddingLeft: 84,
          paddingTop: 158,
          width: 680,
        }}
      >
        {/* 3D Holographic Prism Node */}
        <div style={{ marginBottom: 24 }}>
          <HolographicPrismNode frame={frame} fps={fps} />
        </div>

        {/* Framed Pill Header ("AEO ARCHITECTURE BREAKDOWN") */}
        <div
          style={{
            display: 'inline-block',
            border: '1.5px solid rgba(255, 255, 255, 0.65)',
            padding: 3,
            marginBottom: 56,
            transform: `scale(${pillSpring})`,
            transformOrigin: 'left center',
            backgroundColor: 'rgba(4, 20, 30, 0.75)',
          }}
        >
          <div
            style={{
              border: '2px solid #9333ea',
              borderRadius: 999,
              padding: '12px 32px',
              background:
                'radial-gradient(circle at 50% 50%, rgba(8, 48, 66, 0.9), rgba(3, 12, 20, 0.96))',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: '0.13em',
              color: '#ffffff',
            }}
          >
            {scene.pillText}
          </div>
        </div>

        {/* Kinetic 3-Line Headline */}
        <div style={{ marginBottom: 95 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.22,
              letterSpacing: '-0.02em',
              opacity: line1Spring,
              transform: `translateY(${interpolate(line1Spring, [0, 1], [28, 0])}px)`,
            }}
          >
            {scene.line1}
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.22,
              letterSpacing: '-0.02em',
              opacity: line2Spring,
              transform: `translateY(${interpolate(line2Spring, [0, 1], [28, 0])}px)`,
            }}
          >
            {scene.line2}
          </div>

          {/* Neon Magenta Highlight Box ("Cited in AI Search") */}
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              marginTop: 10,
              padding: '4px 16px 10px 12px',
              opacity: line3Spring,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#ff006a',
                transform: `scaleX(${highlightSweep})`,
                transformOrigin: 'left center',
                boxShadow: '0 0 38px rgba(255, 0, 106, 0.6)',
                zIndex: -1,
              }}
            />
            <span
              style={{
                fontSize: 58,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              {scene.line3Highlight}
            </span>
          </div>
        </div>

        {/* Monospace Sub-Copy Typewriter Block */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 35,
            lineHeight: 1.46,
            color: '#f8fafc',
            whiteSpace: 'pre-line',
            minHeight: 210,
          }}
        >
          {visibleSubcopy}
          <span
            style={{
              display: 'inline-block',
              width: 16,
              height: 36,
              backgroundColor: '#00f0ff',
              marginLeft: 6,
              verticalAlign: 'middle',
              opacity: cursorVisible ? 1 : 0,
              boxShadow: '0 0 12px #00f0ff',
            }}
          />
        </div>

        {/* Optional Metric Telemetry Pill on Scenes 01–07 */}
        {scene.metricTag && (
          <div
            style={{
              marginTop: 28,
              display: 'inline-block',
              padding: '10px 20px',
              borderLeft: '4px solid #00f0ff',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 18,
              color: '#00f0ff',
              letterSpacing: '0.08em',
            }}
          >
            {scene.metricTag}
          </div>
        )}
      </div>

      {/* Bottom Perspective Grid Footer & Neon Horizon Beam */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 135,
          backgroundColor: '#050507',
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '72px 68px',
          zIndex: 25,
        }}
      >
        {/* Purple-to-Blue Neon Horizon Divider */}
        <div
          style={{
            position: 'absolute',
            top: -5,
            left: 0,
            width: '100%',
            height: 10,
            background:
              'linear-gradient(90deg, #a82ff7 0%, #7c3aed 55%, #3b82f6 85%, #00d2ff 100%)',
            boxShadow: '0 0 24px rgba(168, 47, 247, 0.85)',
          }}
        />

        {/* Bottom-Left Stacked Isometric Layers Circle Badge */}
        <div
          style={{
            position: 'absolute',
            top: -44,
            left: 82,
            width: 88,
            height: 88,
            borderRadius: '50%',
            backgroundColor: '#000000',
            border: '1.8px solid rgba(0, 240, 255, 0.75)',
            boxShadow: '0 0 26px rgba(0, 240, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="56" height="56" viewBox="0 0 60 60" fill="none">
            <path
              d="M12 38 L30 48 L48 38"
              stroke="#a82ff7"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(0, ${Math.sin(frame / 12) * 2})`}
            />
            <path
              d="M14 30 L30 39 L46 30"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 11 L48 21 L30 31 L12 21 Z"
              stroke="#00f0ff"
              strokeWidth="4"
              fill="rgba(0, 240, 255, 0.14)"
              strokeLinejoin="round"
              transform={`translate(0, ${-Math.sin(frame / 12) * 2.5})`}
            />
          </svg>
        </div>

        {/* Bottom-Right AEObility Brand Signature */}
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 555,
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: '#ffffff' }}>AEO </span>
          <span style={{ color: '#00f0ff' }}>bility</span>
          <span style={{ color: '#00f0ff', margin: '0 8px' }}>|</span>
          <span style={{ color: '#8e9299', fontWeight: 600 }}>
            GET FOUND. GET CHOSEN.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ==========================================================================
   6. FULL 8-SCENE SEQUENCED REEL COMPOSITION
   ========================================================================== */
export const AEOFullReel: React.FC = () => {
  return (
    <Series>
      {SCENES.map((scene, index) => (
        <Series.Sequence key={scene.id} durationInFrames={300}>
          <AEOSceneSlide scene={scene} sceneIndex={index} />
        </Series.Sequence>
      ))}
    </Series>
  );
};
