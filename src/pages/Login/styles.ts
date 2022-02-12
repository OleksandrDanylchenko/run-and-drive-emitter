import { css } from '@emotion/react';
import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

export const TitleBlock = css`
  ${flexbox({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: pxToRem('20px'),
  })}

  padding-top: ${pxToRem('15px')};
`;

export const Title = css`
  font-size: ${pxToRem('35px')};
`;
