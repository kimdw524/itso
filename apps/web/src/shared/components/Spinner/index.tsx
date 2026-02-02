import type { RecipeVariantsProps } from '@kimdw-rtk/ui';

import * as s from './style.css';

interface SpinnerProps {
  size?: RecipeVariantsProps<typeof s.spinner>['size'];
  /** 부모 요소의 정중앙에 Spinner를 배치할지 여부 */
  fill?: boolean;
}

export const Spinner = ({ size = 'md', fill = false }: SpinnerProps) => {
  const spinner = <div className={s.spinner({ size })} />;

  if (fill) {
    return <div className={s.container}>{spinner}</div>;
  }

  return spinner;
};
