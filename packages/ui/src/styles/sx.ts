import { sprinkles } from '#styles';

export const sx = (param?: Parameters<typeof sprinkles>[0] | string) => {
  if (param === undefined) {
    return '';
  }

  if (typeof param === 'string') {
    return param;
  }

  return sprinkles(param);
};
