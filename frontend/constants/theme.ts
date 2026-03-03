const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/** Onboarding dark-theme design tokens */
export const OB = {
  BG_DARK: '#111114',
  BG_CARD: '#1E1E24',
  BG_CARD_SELECTED: '#2A1B22',
  ACCENT: '#E8185F',
  ACCENT_GLOW: 'rgba(232, 24, 95, 0.35)',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#9FA3B0',
  BORDER_DEFAULT: '#2E2E38',
  BORDER_SELECTED: '#E8185F',
} as const;
