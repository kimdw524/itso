import { styleWithLayer } from '#styleUtils';

export const cardInteraction = styleWithLayer({
  position: 'relative',
  overflow: 'hidden',

  height: '100%',

  transition: 'all 0.15s ease',

  cursor: 'pointer',
  userSelect: 'none',
});
