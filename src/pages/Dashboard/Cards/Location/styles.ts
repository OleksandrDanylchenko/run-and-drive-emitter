import { css, Theme } from '@emotion/react';
import { pxToRem } from '@styles/utils';

export const LocationTable = (theme: Theme) => css`
  margin-top: ${pxToRem('8px')};
  border: 1px solid ${theme.palette.grey.A200};
  border-radius: 4px;
`;
