import { COMPANY_LIST_LIMIT } from '../../constants/company';
import { CompanyItemLoading } from '../CompanyItem/loaindg';

export const CompanyListLoading = () => {
  return (
    <>
      {new Array(COMPANY_LIST_LIMIT).fill(0).map((_, index) => (
        <CompanyItemLoading key={index} />
      ))}
    </>
  );
};
