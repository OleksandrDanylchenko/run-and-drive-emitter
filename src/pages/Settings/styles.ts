import { css } from '@emotion/react';
import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

export const SettingsWrapper = css`
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
