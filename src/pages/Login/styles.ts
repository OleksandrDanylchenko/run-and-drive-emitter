import { css } from '@emotion/react';
import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

export const LoginWrapper = css`
  display: flex;
  align-items: center;
  height: 100vh;
`;

export const FormWrapper = css`
  padding: ${pxToRem('20px')};
`;

export const TitleWrapper = css`
  ${flexbox({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: pxToRem('20px'),
  })}

  padding-bottom: ${pxToRem('10px')}
`;

export const Title = css`
  font-size: ${pxToRem('27px')};
  font-weight: 500;
`;

export const Form = css`
  ${flexbox({ direction: 'column' })}
`;

export const FormButtons = css`
  ${flexbox({ alignItems: 'center', justifyContent: 'end', gap: pxToRem('8px') })};
  padding-top: ${pxToRem('10px')};
`;
