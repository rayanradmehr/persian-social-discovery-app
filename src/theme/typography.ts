export const fontFamily = {
  regular: 'Vazirmatn-Regular',
  medium: 'Vazirmatn-Medium',
  semiBold: 'Vazirmatn-SemiBold',
  bold: 'Vazirmatn-Bold'
} as const;

export const fontSize = {
  display: 28,
  title1: 24,
  title2: 20,
  title3: 18,
  body: 16,
  caption: 13,
  micro: 11
} as const;

export const lineHeight = {
  display: 34,
  title1: 30,
  title2: 28,
  title3: 26,
  body: 24,
  caption: 18,
  micro: 16
} as const;

export const typography = {
  display: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display
  },
  title1: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.title1,
    lineHeight: lineHeight.title1
  },
  title2: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.title2,
    lineHeight: lineHeight.title2
  },
  title3: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.title3,
    lineHeight: lineHeight.title3
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body
  },
  bodyStrong: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body
  },
  caption: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption
  },
  micro: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.micro,
    lineHeight: lineHeight.micro
  }
} as const;

export type TypographyVariant = keyof typeof typography;
