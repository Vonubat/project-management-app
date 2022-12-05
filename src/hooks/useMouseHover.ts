import { useEffect, useRef, useState } from 'react';

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
