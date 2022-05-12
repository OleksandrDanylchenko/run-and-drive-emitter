import { css, Theme } from '@emotion/react';

import { flexbox } from '@styles/mixins';

export const SettingsWrapper = (theme: Theme) => css`
  ${flexbox({
    direction: 'column',
    justifyContent: 'space-between',
  })}
  height: calc(100vh - ${theme.mixins.toolbar.minHeight}px);
  padding-top: 15px;
  padding-bottom: 15px;
`;
