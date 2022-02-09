import { css } from '@emotion/react';
import { pxToRem } from '@styles/utils';

export const TitleBlock = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: pxToRem('20px'),
  padding: pxToRem('15px'),
});

export const Title = css({
  fontSize: pxToRem('35px'),
});
