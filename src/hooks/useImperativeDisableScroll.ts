import { useEffect } from 'react';

export const useImperativeDisableScroll = (): void => {
  const body = document.body;

  useEffect(() => {
    if (!body) {
      return;
    }

    body.style.overflowY = 'hidden';

    return () => {
      body.style.overflowY = 'scroll';
    };
  }, [body]);
};
