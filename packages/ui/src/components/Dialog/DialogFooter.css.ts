import { styleWithLayer } from '#styleUtils';

export const container = styleWithLayer({
  maxWidth: 'calc(100vw - 2rem)',
  minWidth: 'min(20rem, calc(100vw - 2rem))',
  padding: '1rem',
  borderRadius: '0.25rem',
  boxSizing: 'border-box',

  backgroundColor: '#fff',

  userSelect: 'none',
});

export const message = styleWithLayer({
  marginBottom: '1rem',

  lineHeight: '150%',
  wordBreak: 'break-all',
});
