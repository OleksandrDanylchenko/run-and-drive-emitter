import { css } from '@emotion/react';
import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

export const AppToolbar = css`
  gap: ${pxToRem('10px')};
`;

export const AppButtonWrapper = css`
  ${flexbox({ grow: 1 })}
`;

export const AppButton = css`
  font-size: 1.2em;
  color: inherit;
  text-transform: none;
`;
