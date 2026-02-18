import type { CursorPaginatedResponse } from '@/api/types';
import { http } from '@/shared/utils';

import { COMPANY_LIST_LIMIT } from '../../constants';
import type { Company } from '../../models';

export const service = {
  async getCompanyList(params: {
    orderBy?: 'name' | 'bookmarks' | 'lastPostedAt' | 'postings';
    cursor?: string;
  }) {
    return http.get<CursorPaginatedResponse<Company, string>>('/company', {
      params: { ...params, limit: COMPANY_LIST_LIMIT },
    });
  },

  async getCompany(params: { id: number }) {
    return http.get<Company>(`/company/${params.id}`);
  },
};
