import { css } from '@emotion/react';
import { flexbox } from '@styles/mixins';

export const AppButtonWrapper = css`
  ${flexbox({ grow: 1 })}
`;

export const AppButton = css`
  font-size: 1.2em;
  color: inherit;
  text-transform: none;
`;
