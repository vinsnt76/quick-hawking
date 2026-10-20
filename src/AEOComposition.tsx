import React, { Fragment } from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/* ==========================================================================
   1. COMPOSITION CONFIG & STYLE TOKENS
   ========================================================================== */
export const AEObilityCarouselConfig = {
  id: 'AEObilityCorePrinciplesCarousel',
  fps: 30,
  durationInFrames: 1350, // 45 seconds total (9 slides × 5 seconds / 150 frames per slide)
  width: 1080,
  height: 1080,
  framesPerSlide: 150,
  defaultProps: {
    brandName: 'AEOBILITY',
    primaryColor: '#00E5FF',
    backgroundColor: '#030303',
    cardBackground: '#0A0D12',
    accentGlow: 'rgba(0, 229, 255, 0.15)',
  },
};

export const STYLE_TOKENS = {
  bgPrimary: '#030303',
  cardBackground: '#0A0D12',
  cardBorder: '#1E293B',
  accentPrimary: '#00E5FF',
  accentMagenta: '#ff006a',
  accentPurple: '#9333ea',
  textHighContrast: '#F8FAFC',
  textSecondary: '#94A3B8',
  bulletBg: 'rgba(15, 23, 42, 0.65)',
  bulletBorder: 'rgba(30, 41, 59, 0.7)',
  gridLine: 'rgba(255, 255, 255, 0.04)',
};

/* ==========================================================================
   2. DETERMINISTIC PSEUDO-RANDOM NUMBER GENERATOR
   ========================================================================== */
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
};

/* ==========================================================================
   3. SLIDE DATASET (9 SLIDES)
   ========================================================================== */
export interface CarouselSlideData {
  stepNumber: string;
  eyebrow: string;
  title: string;
  bullets: string[];
  ctaButton?: string;
  ctaLink?: string;
}

export const CAROUSEL_SLIDES: CarouselSlideData[] = [
  {
    stepNumber: '01',
    eyebrow: 'AEO ARCHITECTURE BREAKDOWN',
    title: '7 Core Principles That Get Your Brand Cited in AI Search',
    bullets: [
      'Stop optimizing for legacy keyword density.',
      'Start engineering structured content for machine retrieval.',
      'Swipe through for the 7 core principles of Answer Engine Optimization.',
    ],
  },
  {
    stepNumber: '02',
    eyebrow: '01 / DIRECT RETRIEVAL',
    title: 'Front-Load 40–60 Word Direct Answers',
    bullets: [
      'Place a clear 2-to-3 sentence answer directly beneath H2 or H3 question headings.',
      'AI models heavily bias toward the top 30% of a page during retrieval.',
      'State core facts immediately before expanding on context.',
    ],
  },
  {
    stepNumber: '03',
    eyebrow: '02 / SYNTACTIC CLARITY',
    title: 'Write for Natural Language Queries',
    bullets: [
      'Ditch rigid keyword strings for simple Subject-Verb-Object (S-V-O) structures.',
      'Match conversational query patterns rather than old-school keyword lists.',
      'Clear syntax reduces LLM parsing friction and eliminates hallucination risks.',
    ],
  },
  {
    stepNumber: '04',
    eyebrow: '03 / MACHINE LEGIBILITY',
    title: 'Deploy JSON-LD Schema Graphs',
    bullets: [
      'Implement explicit machine-readable schema (FAQPage, HowTo, Article).',
      'Give crawlers and RAG pipelines a deterministic roadmap of your data.',
      'Structured schema turns ambiguous copy into verified entity facts.',
    ],
  },
  {
    stepNumber: '05',
    eyebrow: '04 / KNOWLEDGE GRAPH',
    title: 'Establish Clear Entity Salience',
    bullets: [
      'Build distinct brand identity signals and interconnected entity graphs.',
      'Ensure LLMs recognize your business as a connected, authoritative authority.',
      'Entity authority beats page-level keyword ranking every time.',
    ],
  },
  {
    stepNumber: '06',
    eyebrow: '05 / ECOSYSTEM CONSENSUS',
    title: 'Unify External Brand Signals',
    bullets: [
      'AI engines evaluate brand consensus on Reddit, Quora, LinkedIn, YouTube, and niche directories.',
      'Consistent brand citations across platforms validate identity and trust.',
      'Off-site consensus heavily drives LLM recommendation rates.',
    ],
  },
  {
    stepNumber: '07',
    eyebrow: '06 / PROOF TRIPLES',
    title: 'Back Claims with Verifiable Data',
    bullets: [
      'Support claims with unique data, original research, and verifiable proof triples.',
      'Satisfy strict E-E-A-T requirements to earn higher retrieval priority.',
      'Generic filler gets skipped; grounded proof gets cited.',
    ],
  },
  {
    stepNumber: '08',
    eyebrow: '07 / RECENTNESS BIAS',
    title: 'Maintain Active Entity Records',
    bullets: [
      'Major AI chat tools heavily favor recently updated content and facts.',
      'Regularly audit and refresh key service details and schema graphs.',
      'Outdated pages lose positional priority in dense vector retrieval.',
    ],
  },
  {
    stepNumber: '09',
    eyebrow: 'GET FOUND. GET CHOSEN.',
    title: 'Is Your Business Visible in AI Search?',
    bullets: [
      'Uncover what ChatGPT, Perplexity, and Gemini see when crawling your brand.',
      'Take our rapid diagnostic scan to locate entity gaps and schema errors.',
    ],
    ctaButton: 'Claim Your Free Diagnostic Scan',
    ctaLink: 'aeobility.com.au/diagnostic',
  },
];

/* ==========================================================================
   4. CYBER PARTICLE NETWORK & AMBIENT FLOATING GLYPHS
   ========================================================================== */
const AMBIENT_TOKENS = [
  '0x7F',
  'RAG_CORE',
  'JSON-LD',
  'COSINE:0.96',
  'E-E-A-T',
  'ENTITY_NODE',
  'H2_TREE',
  'TOKEN:3.4x',
  'SSR:38ms',
  'INDEX_NOW',
  'WIKIDATA',
  'SCHEMA.ORG',
];

export const CyberParticleNetwork = ({ frame }: { frame: number }) => {
  // Generate 26 deterministic constellation node positions
  const nodes = Array.from({ length: 26 }).map((_, i) => {
    const bx = seededRandom(i * 17) * 1080;
    const by = seededRandom(i * 31) * 1080;
    const speed = 0.4 + seededRandom(i * 11) * 0.7;
    const angle = seededRandom(i * 23) * Math.PI * 2;
    const radius = 35 + seededRandom(i * 7) * 45;

    const x = (bx + Math.cos(frame * 0.018 * speed + angle) * radius + 1080) % 1080;
    const y = (by + Math.sin(frame * 0.015 * speed + angle) * radius + 1080) % 1080;

    return { x, y, id: i };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width={1080} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {/* Constellation Connection Lines */}
        {nodes.map((n1, i) =>
          nodes.slice(i + 1).map((n2) => {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 135) return null;

            const alpha = (1 - dist / 135) * 0.28;
            const isHighlight = (n1.id + n2.id) % 3 === 0;

            return (
              <line
                key={`${n1.id}-${n2.id}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={isHighlight ? STYLE_TOKENS.accentMagenta : STYLE_TOKENS.accentPrimary}
                strokeWidth={isHighlight ? 1.4 : 1}
                strokeOpacity={alpha}
              />
            );
          })
        )}

        {/* Orbiting Particles */}
        {nodes.map((n, i) => {
          const size = 2 + (i % 3.5);
          const isCore = i % 4 === 0;
          return (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={size}
              fill={isCore ? '#ffffff' : STYLE_TOKENS.accentPrimary}
              fillOpacity={0.45 + 0.4 * Math.sin(frame * 0.05 + i)}
            />
          );
        })}
      </svg>

      {/* Floating Ambient Data Glyphs (Upward Drift) */}
      {AMBIENT_TOKENS.map((token, i) => {
        const driftSpeed = 0.8 + (i % 3) * 0.4;
        const startX = 60 + seededRandom(i * 47) * 940;
        const currentY = 1140 - (((frame * driftSpeed * 1.5 + i * 95) % 1200));
        const floatX = startX + Math.sin(frame * 0.02 + i) * 16;
        const opacity = interpolate(
          currentY,
          [1080, 950, 150, 40],
          [0, 0.35, 0.35, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={token}
            style={{
              position: 'absolute',
              left: floatX,
              top: currentY,
              opacity,
              fontFamily: 'JetBrains Mono, Geist Mono, monospace',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: i % 2 === 0 ? STYLE_TOKENS.accentPrimary : '#7dd3fc',
              textShadow: '0 0 10px rgba(0, 229, 255, 0.4)',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {token}
          </div>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   5. BACKGROUND GRID PATTERN & CYAN RADIAL VIGNETTE
   ========================================================================== */
export const BackgroundGridPattern = ({
  glowOpacity,
  frame,
}: {
  glowOpacity: number;
  frame: number;
}) => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Precision 60px Tech Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, ${STYLE_TOKENS.gridLine} 1px, transparent 1px),
            linear-gradient(to bottom, ${STYLE_TOKENS.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Dynamic Radial Cyan Breathing Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 32%, rgba(0, 229, 255, ${glowOpacity * 1.2}), transparent 72%)`,
        }}
      />

      {/* Embedded Cyber Particle Network */}
      <CyberParticleNetwork frame={frame} />
    </div>
  );
};

/* ==========================================================================
   6. MODULAR CAROUSEL SLIDE CARD (WITH 3D KINETIC TRANSITIONS & SFX)
   ========================================================================== */
export const CarouselSlideCard = ({
  stepNumber,
  eyebrow,
  title,
  bullets,
  ctaButton,
  ctaLink,
}: CarouselSlideData) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance 3D Spring (Frames 0–22)
  const entranceSpring = spring({
    frame,
    fps,
    config: { mass: 0.85, damping: 13, stiffness: 105 },
  });

  // 2. Exit 3D Spring (Frames 135–150)
  const exitSpring = spring({
    frame: frame - 135,
    fps,
    config: { mass: 0.45, damping: 14, stiffness: 125 },
  });

  // Kinetic Camera Translations & 3D Tilt Values
  const translateY =
    interpolate(entranceSpring, [0, 1], [75, 0]) +
    interpolate(exitSpring, [0, 1], [0, -55]);

  const rotateX =
    interpolate(entranceSpring, [0, 1], [6, 0]) +
    interpolate(exitSpring, [0, 1], [0, -6]);

  const rotateY =
    interpolate(entranceSpring, [0, 1], [-8, 0]) +
    interpolate(exitSpring, [0, 1], [0, 6]);

  const scale =
    interpolate(entranceSpring, [0, 1], [0.92, 1]) *
    interpolate(exitSpring, [0, 1], [1, 0.94]);

  const opacity =
    interpolate(entranceSpring, [0, 1], [0, 1]) *
    interpolate(exitSpring, [0, 1], [1, 0]);

  // Dynamic Glow Breathing (Frames 15–135)
  const glowOpacity = interpolate(Math.sin(frame / 10), [-1, 1], [0.12, 0.28]);

  // Glitch Chromatic Aberration Peak during Transition Wipes (0–12 and 138–150)
  const glitchIntensity =
    (frame < 12 ? 1 - frame / 12 : frame > 138 ? (frame - 138) / 12 : 0) * 8;

  return (
    <AbsoluteFill
      className="flex items-center justify-center p-12 bg-[#030303]"
      style={{
        backgroundColor: STYLE_TOKENS.bgPrimary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        perspective: 1200,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Audio SFX: Tech Transition Whoosh at Slide Entrance */}
      <Sequence from={0} durationInFrames={18}>
        <Audio
          src={staticFile('audio/whoosh.wav')}
          volume={(f) => interpolate(f, [0, 12, 18], [0.8, 0.8, 0], { extrapolateRight: 'clamp' })}
        />
      </Sequence>

      <BackgroundGridPattern glowOpacity={glowOpacity} frame={frame} />

      {/* Main 3D Kinetic Slide Card (900x900) */}
      <div
        className="w-[900px] h-[900px] bg-[#0A0D12] border border-[#1E293B] rounded-3xl p-12 flex flex-col justify-between relative overflow-hidden"
        style={{
          width: 900,
          height: 900,
          backgroundColor: STYLE_TOKENS.cardBackground,
          border: `1px solid ${STYLE_TOKENS.cardBorder}`,
          borderRadius: 28,
          padding: 48,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          opacity,
          boxShadow: `
            0 0 50px rgba(0, 229, 255, ${glowOpacity}),
            ${-glitchIntensity}px 0 25px rgba(0, 229, 255, 0.45),
            ${glitchIntensity}px 0 25px rgba(255, 0, 106, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          zIndex: 10,
        }}
      >
        {/* Card Header Section */}
        <div>
          <div
            className="flex items-center justify-between mb-8"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 32,
            }}
          >
            {/* Pill Eyebrow */}
            <span
              className="px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] font-mono text-sm tracking-wider uppercase"
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: 999,
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                color: STYLE_TOKENS.accentPrimary,
                fontFamily: 'JetBrains Mono, Geist Mono, monospace',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: '0 0 14px rgba(0, 229, 255, 0.25)',
              }}
            >
              {eyebrow}
            </span>

            {/* Step Number */}
            <span
              className="font-mono text-4xl font-bold text-[#1E293B]"
              style={{
                fontFamily: 'JetBrains Mono, Geist Mono, monospace',
                fontSize: 38,
                fontWeight: 800,
                color: '#334155',
                letterSpacing: '-0.02em',
              }}
            >
              {stepNumber}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-4xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight mb-8"
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: STYLE_TOKENS.textHighContrast,
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              marginBottom: 28,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Staggered Bullets Section */}
        <div
          className="space-y-6 my-auto"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            margin: 'auto 0',
          }}
        >
          {bullets.map((bullet: string, idx: number) => {
            const bulletDelay = 10 + idx * 8;
            const bulletSpring = spring({
              frame: frame - bulletDelay,
              fps,
              config: { mass: 0.5, damping: 12, stiffness: 120 },
            });

            const bulletX = interpolate(bulletSpring, [0, 1], [-30, 0]);
            const bulletOpacity = interpolate(bulletSpring, [0, 1], [0, 1]);

            return (
              <Fragment key={idx}>
                {/* Audio SFX: Typewriter click per bullet entrance */}
                <Sequence from={bulletDelay} durationInFrames={6}>
                  <Audio src={staticFile('audio/click.wav')} volume={0.6} />
                </Sequence>

                <div
                  className="flex items-start space-x-4 bg-[#0F172A]/50 border border-[#1E293B]/60 p-5 rounded-xl"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    backgroundColor: STYLE_TOKENS.bulletBg,
                    border: `1px solid ${STYLE_TOKENS.bulletBorder}`,
                    padding: '18px 22px',
                    borderRadius: 14,
                    transform: `translateX(${bulletX}px)`,
                    opacity: bulletOpacity,
                  }}
                >
                  {/* Glowing Bullet Dot */}
                  <div
                    className="w-2 h-2 rounded-full bg-[#00E5FF] mt-2.5 flex-shrink-0"
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      backgroundColor: STYLE_TOKENS.accentPrimary,
                      marginTop: 8,
                      flexShrink: 0,
                      boxShadow: '0 0 10px #00E5FF',
                    }}
                  />

                  {/* Bullet Text */}
                  <p
                    className="text-xl text-[#94A3B8] leading-relaxed"
                    style={{
                      fontSize: 19.5,
                      color: STYLE_TOKENS.textSecondary,
                      lineHeight: 1.5,
                      margin: 0,
                      fontWeight: 450,
                    }}
                  >
                    {bullet}
                  </p>
                </div>
              </Fragment>
            );
          })}
        </div>

        {/* Slide 09 Special CTA Button */}
        {ctaButton && (
          <div
            style={{
              marginBottom: 16,
              opacity: spring({
                frame: frame - 40,
                fps,
                config: { mass: 0.5, damping: 10, stiffness: 140 },
              }),
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #00E5FF 0%, #38bdf8 60%, #9333ea 100%)',
                color: '#030303',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: '0.04em',
                boxShadow: '0 0 26px rgba(0, 229, 255, 0.45)',
              }}
            >
              <span>{ctaButton}</span>
              <span style={{ fontSize: 19 }}>↗</span>
            </div>
            {ctaLink && (
              <span
                style={{
                  marginLeft: 18,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 15,
                  color: STYLE_TOKENS.accentPrimary,
                  fontWeight: 600,
                }}
              >
                {ctaLink}
              </span>
            )}
          </div>
        )}

        {/* Card Footer Branding */}
        <div
          className="flex items-center justify-between pt-6 border-t border-[#1E293B]/80 text-xs font-mono text-[#64748B]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 20,
            borderTop: '1px solid rgba(30, 41, 59, 0.8)',
            fontSize: 13,
            fontFamily: 'JetBrains Mono, Geist Mono, monospace',
            color: '#64748B',
            letterSpacing: '0.06em',
          }}
        >
          <span>AEOBILITY // KNOWLEDGE ENGINE</span>
          <span style={{ color: STYLE_TOKENS.accentPrimary }}>aeobility.com.au</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ==========================================================================
   7. PERSISTENT UI OVERLAY (BRAND HEADER + PROGRESS BAR + INDICATOR)
   ========================================================================== */
export const PersistentUIOverlay = ({
  currentSlideIndex,
  totalSlides,
}: {
  currentSlideIndex: number;
  totalSlides: number;
}) => {
  const frame = useCurrentFrame();
  const totalFrames = AEObilityCarouselConfig.durationInFrames;
  const progressPercent = Math.min((frame / totalFrames) * 100, 100);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Top Persistent Brand Header */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 90,
          right: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'JetBrains Mono, Geist Mono, monospace',
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: '#F8FAFC',
          }}
        >
          <span>AEO</span>
          <span style={{ color: STYLE_TOKENS.accentPrimary }}>BILITY</span>
        </div>

        {/* Slide Counter Indicator */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, Geist Mono, monospace',
            fontSize: 14,
            fontWeight: 700,
            color: '#64748B',
            letterSpacing: '0.08em',
          }}
        >
          <span style={{ color: STYLE_TOKENS.accentPrimary }}>0{currentSlideIndex + 1}</span>
          <span> / 0{totalSlides}</span>
        </div>
      </div>

      {/* Bottom Glowing Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #38bdf8 0%, #00E5FF 100%)',
            boxShadow: '0 0 12px #00E5FF',
          }}
        />
      </div>
    </div>
  );
};

/* ==========================================================================
   8. MASTER 9-SLIDE CAROUSEL COMPOSITION
   ========================================================================== */
export const AEObilityCorePrinciplesCarousel = () => {
  const frame = useCurrentFrame();
  const currentSlideIndex = Math.min(
    Math.floor(frame / AEObilityCarouselConfig.framesPerSlide),
    CAROUSEL_SLIDES.length - 1
  );

  return (
    <AbsoluteFill style={{ backgroundColor: STYLE_TOKENS.bgPrimary, overflow: 'hidden' }}>
      {/* Ambient Looping Sci-Fi Pad Audio Track */}
      <Audio src={staticFile('audio/drone.wav')} loop volume={0.3} />

      <Series>
        {CAROUSEL_SLIDES.map((slide) => (
          <Series.Sequence
            key={slide.stepNumber}
            durationInFrames={AEObilityCarouselConfig.framesPerSlide}
          >
            <CarouselSlideCard {...slide} />
          </Series.Sequence>
        ))}
      </Series>

      <PersistentUIOverlay
        currentSlideIndex={currentSlideIndex}
        totalSlides={CAROUSEL_SLIDES.length}
      />
    </AbsoluteFill>
  );
};
