import { css, Theme } from '@emotion/react';

export const LocationTableRow = (theme: Theme, highlighted?: boolean) => css`
  ${highlighted &&
  css`
    background-color: ${theme.palette.action.focus};
    td {
      font-weight: 600;
    }
  `}
`;
