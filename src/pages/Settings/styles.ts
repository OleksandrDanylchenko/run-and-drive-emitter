import { css, Theme } from '@emotion/react';
import { flexbox, pxToRem } from 'run-and-drive-lib/styles';

export const SettingsWrapper = (theme: Theme) => css`
  ${flexbox({
    direction: 'column',
    justifyContent: 'space-between',
    gap: pxToRem('15px'),
  })}
  min-height: calc(100vh - ${theme.mixins.toolbar.minHeight}px);
  padding-top: ${pxToRem('15px')};
  padding-bottom: ${pxToRem('15px')};
`;
