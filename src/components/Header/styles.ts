import { css } from '@emotion/react';
import { flexbox, pxToRem } from 'run-and-drive-lib/styles';

export const HeaderToolbar = css`
  gap: ${pxToRem('10px')};
`;

export const HeaderButtonWrapper = css`
  ${flexbox({ grow: 1 })}
`;

export const HeaderButton = css`
  font-size: 1.2em;
  color: inherit;
  text-transform: none;
`;
