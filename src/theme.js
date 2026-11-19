// Token diambil terus daripada Figma: Sistem Pengurusan Resepi
export const colors = {
  primary: '#323d25',
  primarySubtle: '#9a7e3b',
  onPrimary: '#ffffff',
  bgApp: '#fff4ec',      // orange-50
  surface: '#ffffff',
  muted: '#f5f5f4',
  border: '#e7e5e4',
  borderStrong: '#d6d3d1',
  text: '#1c1917',
  textSecondary: '#57534e',
  textTertiary: '#78716c',
  orange100: '#ffe5d1',
  orange700: '#9a3412',
  orange900: '#7c2d12',
  danger: '#dc2626',
};

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
export const radius = { md: 12, lg: 16, full: 999 };

export const fonts = {
  body: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  heading: 'SourceSerifPro_600SemiBold',
  headingBold: 'SourceSerifPro_700Bold',
};

export const type = {
  h1: { fontFamily: fonts.headingBold, fontSize: 28, lineHeight: 36, color: colors.text },
  h2: { fontFamily: fonts.heading, fontSize: 22, lineHeight: 28, color: colors.text },
  h3: { fontFamily: fonts.heading, fontSize: 18, lineHeight: 24, color: colors.text },
  bodyLarge: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.text },
  body: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.textSecondary },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: colors.text },
  chip: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 16 },
  caption: { fontFamily: fonts.body, fontSize: 12, lineHeight: 16, color: colors.textSecondary },
  button: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 20 },
};

export const shadowCard = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};

export const CATEGORIES = ['Sarapan', 'Tengah Hari', 'Malam', 'Western', 'Local Malaysia'];
