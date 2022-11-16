import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useImperativeDisableScroll = (element: HTMLElement): void => {
  useEffect(() => {
    if (!element) {
      return;
    }

    element.style.overflowY = 'hidden';

    return () => {
      element.style.overflowY = 'scroll';
    };
  }, [element]);
};
