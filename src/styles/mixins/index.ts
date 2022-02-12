import { css } from '@emotion/react';

// https://allyjs.io/tutorials/hiding-elements.html#2017-edition-of-visuallyhidden
export const visuallyHidden = css`
  &:not(:focus):not(:active) {
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    white-space: nowrap;

    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
`;

export const flexbox = (options: {
  display?: string;
  direction?: string;
  placeContent?: string;
  placeItems?: string;
  wrap?: string;
  shrink?: string;
  grow?: string;
  alignContent?: string;
  justifyContent?: string;
  alignItems?: string;
  justifyItems?: string;
  gap?: string;
}) => css`
  display: ${options.display};
  flex-direction: ${options.direction};

  ${options.placeContent
    ? css`
        place-content: ${options.placeContent};
      `
    : css`
        align-content: ${options.alignContent};
        justify-content: ${options.justifyContent};
      `}

  ${options.placeItems
    ? css`
        place-items: ${options.placeContent};
      `
    : css`
        align-items: ${options.alignItems};
        justify-items: ${options.justifyItems};
      `}

  flex-wrap: ${options.wrap};
  flex-shrink: ${options.shrink};
  flex-grow: ${options.grow};
  gap: ${options.gap};
`;
