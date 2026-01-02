import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

const MapContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`

const MapSvg = styled.svg`
  width: 100%;
  height: 100%;
  opacity: 0.15;
`

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    ${theme.colors.background} 70%
  );
  pointer-events: none;
`

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${theme.colors.primary}08 1px, transparent 1px),
    linear-gradient(90deg, ${theme.colors.primary}08 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
`

// Simplified world map path (continents outline)
const worldMapPath = `
  M 150,120 Q 180,100 220,110 L 250,105 Q 280,95 320,100 L 360,110 Q 380,120 370,140
  L 350,160 Q 330,180 290,175 L 250,170 Q 210,165 180,150 L 160,135 Q 145,125 150,120 Z

  M 380,100 Q 420,90 470,95 L 520,100 Q 560,105 590,120 L 610,140 Q 620,160 600,180
  L 570,195 Q 530,210 480,200 L 440,190 Q 400,175 385,150 L 375,125 Q 370,110 380,100 Z

  M 620,110 Q 680,95 750,100 L 820,110 Q 870,120 890,145 L 900,170 Q 905,200 880,220
  L 840,240 Q 790,255 730,245 L 670,230 Q 630,215 615,185 L 610,150 Q 605,125 620,110 Z

  M 200,200 Q 230,190 270,195 L 310,205 Q 340,215 350,240 L 355,270 Q 358,300 340,325
  L 310,345 Q 270,360 230,350 L 195,335 Q 170,315 175,285 L 185,250 Q 190,215 200,200 Z

  M 750,260 Q 790,245 840,255 L 890,270 Q 930,285 940,315 L 945,350 Q 948,385 920,410
  L 875,430 Q 820,445 765,430 L 720,410 Q 690,385 700,345 L 715,300 Q 730,270 750,260 Z

  M 920,100 Q 960,90 1010,95 L 1060,105 Q 1100,115 1110,140 L 1115,170 Q 1118,200 1095,220
  L 1055,240 Q 1000,255 950,240 L 910,220 Q 885,195 895,160 L 905,130 Q 910,110 920,100 Z
`

export const WorldMapBackground = () => {
  return (
    <MapContainer>
      <GridLines />
      <MapSvg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.colors.primary} />
            <stop offset="50%" stopColor={theme.colors.secondary} />
            <stop offset="100%" stopColor={theme.colors.accent} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={worldMapPath}
          fill="none"
          stroke="url(#mapGradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </MapSvg>
      <GradientOverlay />
    </MapContainer>
  )
}
