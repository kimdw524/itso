interface CompanyLogoProps extends React.ComponentProps<'img'> {
  logo: string | null;
  alt: string;
}

export const CompanyLogo = ({
  logo,
  alt,
  loading,
  ...rest
}: CompanyLogoProps) => {
  return (
    logo !== null && (
      <img src={logo} alt={alt} loading={loading ?? 'lazy'} {...rest} />
    )
  );
};
