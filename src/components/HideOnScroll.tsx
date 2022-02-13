// Inspired: https://mui.com/components/app-bar/#hide-app-bar

import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { UseScrollTriggerOptions } from '@mui/material/useScrollTrigger/useScrollTrigger';
import React, { FC, ReactElement } from 'react';

interface HideOnScrollProps {
  scrollTriggerProps?: UseScrollTriggerOptions;
  children: ReactElement;
}

const HideOnScroll: FC<HideOnScrollProps> = ({ scrollTriggerProps, children }) => {
  const trigger = useScrollTrigger(scrollTriggerProps);

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
