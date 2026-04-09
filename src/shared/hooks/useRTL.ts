import { I18nManager } from 'react-native';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';

/**
 * RTL layout hook for Persian/Arabic language support.
 * Forces RTL layout direction for the entire app.
 */
export const useRTL = () => {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      // Reload app for RTL change to take effect
      Updates.reloadAsync().catch(() => {});
    }
  }, []);

  return {
    isRTL: I18nManager.isRTL,
    // Flip horizontal values for RTL layout
    flipX: (value: number) => (I18nManager.isRTL ? -value : value),
    // Return correct text alignment
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    // Return correct flex direction
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    // Logical spacing helpers
    marginStart: (value: number) =>
      I18nManager.isRTL ? { marginRight: value } : { marginLeft: value },
    marginEnd: (value: number) =>
      I18nManager.isRTL ? { marginLeft: value } : { marginRight: value },
    paddingStart: (value: number) =>
      I18nManager.isRTL ? { paddingRight: value } : { paddingLeft: value },
    paddingEnd: (value: number) =>
      I18nManager.isRTL ? { paddingLeft: value } : { paddingRight: value },
  } as const;
};
