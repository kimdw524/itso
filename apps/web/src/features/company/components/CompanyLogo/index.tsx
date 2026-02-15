import { type CSSProperties } from 'react';

import { clsx } from 'clsx';

import * as s from './style.css';

interface CompanyLogoProps {
  logo: string | null;
  alt: string;
  className?: string;
  style?: CSSProperties;
  isSquare?: boolean;
}

export const CompanyLogo = ({
  logo,
  alt,
  className,
  style,
  isSquare = false,
}: CompanyLogoProps) => {
  if (logo === '' || logo === null) {
    return <div className={clsx(s.empty, className)} style={style} />;
  }

  if (!isSquare) {
    return (
      <img
        src={logo}
        alt={alt}
        loading="lazy"
        className={className}
        style={style}
      />
    );
  }

  return (
    <div className={clsx(s.frame, className)} style={style}>
      <img src={logo} alt={alt} loading="lazy" className={s.image} />
    </div>
  );
};
