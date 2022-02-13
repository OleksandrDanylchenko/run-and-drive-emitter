import { css, Theme } from '@emotion/react';
import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

export const SettingsWrapper = (theme: Theme) => css`
  ${flexbox({
    direction: 'column',
    justifyContent: 'space-between',
  })}
  height: calc(100vh - ${theme.mixins.toolbar.minHeight}px - 15px)
`;

export const EngineerWrapper = css`
  ${flexbox({
    direction: 'column',
    gap: pxToRem('15px'),
  })}

  margin-top: ${pxToRem('15px')};
  margin-bottom: ${pxToRem('15px')};
  padding: ${pxToRem('20px')};
`;

export const EngineerHeader = css`
  font-size: ${pxToRem('20px')};
  font-weight: 500;
`;
