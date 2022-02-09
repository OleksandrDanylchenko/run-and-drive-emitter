import { css } from '@emotion/react';
import { pxToRem } from '@styles/utils';

export const TitleBlock = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = css({
  fontSize: pxToRem('20px'),
});
