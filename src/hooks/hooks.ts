import { useEffect, useState, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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

type THook<T extends HTMLElement> = [React.RefObject<T>, boolean];

export const useMouseHover = <T extends HTMLElement>(): THook<T> => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseOver = (): void => setHovered(true);
    const handleMouseOut = (): void => setHovered(false);
    const node = ref && ref.current;

    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return [ref, hovered];
};
