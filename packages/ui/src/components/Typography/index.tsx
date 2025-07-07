import clsx from 'clsx';

import { sprinkles, type SprinklesProps } from '#styles';
import { type UIComponent } from '#types';

import * as s from './Typography.css';

type TypographyElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type TypographyProps<T extends TypographyElement = TypographyElement> = Omit<
  UIComponent<T, typeof s.typography> & {
    as?: T;
    color?: SprinklesProps['color'];
    fontSize?: SprinklesProps['fontSize'];
    fontWeight?: SprinklesProps['fontWeight'];
    lineHeight?: SprinklesProps['lineHeight'];
  },
  'ref'
>;

export const Typography = ({
  children,
  as: Component = 'p',
  className,
  color = 'foreground',
  fontSize = 'md',
  fontWeight = 'normal',
  lineHeight,
  isEllipsis = false,
  sx,
  ...props
}: TypographyProps) => {
  return (
    <Component
      className={clsx(
        s.typography({ isEllipsis }),
        sprinkles({ color, fontSize, fontWeight, lineHeight }),
        sx && sprinkles(sx),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { s as typographyCss };
