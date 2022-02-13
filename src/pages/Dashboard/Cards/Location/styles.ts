import { css, Theme } from '@emotion/react';
import { pxToRem } from '@styles/utils';

export const LocationCardHeader = css`
  padding-bottom: 0;
`;

export const LocationTable = (theme: Theme) => css`
  margin-top: ${pxToRem('8px')};
  border: 1px solid ${theme.palette.grey.A200};
  border-radius: 4px;
`;

export const LocationTableRow = (theme: Theme, highlighted?: boolean) => css`
  ${highlighted &&
  css`
    background-color: ${theme.palette.action.focus};
    td {
      font-weight: 600;
    }
  `}
`;
