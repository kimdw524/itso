import type { CursorPaginatedResponse } from '@/api/types';
import { http } from '@/utils/http';

import { COMPANY_LIST_LIMIT } from '../../constants/company';
import type { Company } from '../../models';

export const service = {
  async getCompanyList(params: {
    orderBy?: 'name' | 'bookmarks';
    cursor?: string;
  }) {
    return http.get<CursorPaginatedResponse<Company, string>>('/company', {
      params: { ...params, limit: COMPANY_LIST_LIMIT },
    });
  },
};
