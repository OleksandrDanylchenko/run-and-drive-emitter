import { css } from '@emotion/react';

import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

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
