import { css } from '@emotion/react';
import { flexbox } from '@styles/mixins';
import { pxToRem } from '@styles/utils';

export const LoginWrapper = css`
  display: flex;
  align-items: center;
  height: 100vh;
`;

export const FormWrapper = css`
  ${flexbox({
    direction: 'column',
    gap: pxToRem('15px'),
  })}

  padding: ${pxToRem('20px')};
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
`;
