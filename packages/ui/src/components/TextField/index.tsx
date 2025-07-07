import { clsx } from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './TextField.css';

interface TextFieldProps extends UIComponent<'input', typeof s.textField> {
  type?: React.HTMLInputTypeAttribute;
}

export const TextField = ({
  className,
  type = 'text',
  size = 'md',
  color = 'primary',
  sx: propSx,
  ...props
}: TextFieldProps) => {
  return <input type={type} className={clsx(className, s.textField({ size, color }), sx(propSx))} {...props} />;
};

export { s as textFieldCss };
