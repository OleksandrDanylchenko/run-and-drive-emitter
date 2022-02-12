import { css } from '@emotion/react';
import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

export const AppButton = css`
  ${flexbox({
    gap: pxToRem('15px'),
  })}

  text-transform: none;
`;
